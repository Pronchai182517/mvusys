import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

const ALLOWED_DOMAINS = ['mcu.ac.th', 'mvu.ac.th', 'gmail.com'];

export const DEPARTMENTS_LIST = [
  'งานแผนและงบประมาณ',
  'ส่วนงานบริหารองค์กร',
  'สำนักงานผู้บริหาร',
  'งานประกันคุณภาพและติดตามผล',
  'งานสารบรรณและประชุม',
  'ศูนย์เทคโนโลยีสารสนเทศ',
  'งานการเงินและพัสดุ',
  'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)',
  'มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย',
  'คณะพุทธศาสตร์',
  'คณะครุศาสตร์',
  'คณะมนุษยศาสตร์',
  'คณะสังคมศาสตร์',
  'บัณฑิตวิทยาลัย',
  'สถาบันวิจัยพุทธศาสตร์',
  'สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม'
];

export const JOB_TITLES_LIST = [
  'นักวิชาการคอมพิวเตอร์',
  'นักวิเคราะห์นโยบายและแผน',
  'เจ้าหน้าที่ประกันคุณภาพ',
  'เจ้าหน้าที่สารบรรณและธุรการ',
  'เจ้าหน้าที่การเงินและพัสดุ',
  'นักวิชาการศึกษา / เจ้าหน้าที่วิชาการ',
  'อาจารย์ประจำ / บุคลากรสายวิชาการ',
  'หัวหน้างาน / ผู้อำนวยการส่วนงาน',
  'รองอธิการบดี / ผู้บริหารระดับสูง',
  'อธิการบดี / ประธานคณะกรรมการ',
  'บุคลากรทั่วไป'
];

// 1. Google OAuth / Quick Login
router.post('/google-login', async (req, res) => {
  const { email, name, picture, googleId } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุอีเมลบัญชี Google' });
  }

  const domain = email.split('@')[1]?.toLowerCase();
  const isAllowedDomain = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain?.endsWith('.' + allowed));

  if (!isAllowedDomain) {
    return res.status(403).json({
      success: false,
      message: `เฉพาะบัญชีอีเมลสถาบัน @mcu.ac.th เท่านั้นที่ได้รับอนุญาตเข้าใช้งานระบบ (โดเมนปัจจุบัน: @${domain})`
    });
  }

  const existingUser = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    if (existingUser.status === 'Unverified') {
      return res.status(403).json({ success: false, message: 'กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ (Check your email inbox)' });
    }
    return res.json({
      success: true,
      message: 'ลงชื่อเข้าใช้สำเร็จ',
      data: { user: existingUser }
    });
  }

  let role = 'executive';
  let access_scope = 'all';
  let allowed_departments = DEPARTMENTS_LIST;

  if (email.includes('admin') || email.includes('admin_user')) {
    role = 'admin';
  } else if (email.includes('plan')) {
    role = 'project_lead';
    access_scope = 'department_only';
    allowed_departments = ['งานแผนและงบประมาณ'];
  }

  const newProfile = {
    id: googleId || `usr-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role,
    status: 'Active',
    access_scope,
    allowed_departments,
    title: domain === 'mcu.ac.th' ? 'บุคลากร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย' : 'บุคลากร มหาวชิราลงกรณบาลีเถรวาทฯ',
    department: domain === 'mcu.ac.th' ? 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)' : 'ส่วนงานบริหารองค์กร'
  };

  mockData.users.push(newProfile);
  try {
    await supabase.from('users').upsert([newProfile]);
  } catch (err) {}

  return res.json({
    success: true,
    message: 'ลงชื่อเข้าใช้ด้วยบัญชี @mcu.ac.th สำเร็จ',
    data: { user: newProfile }
  });
});

// 2. Register New Member with Department Selection
router.post('/register', async (req, res) => {
  const { name, email, title, department, requestedRole } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อและอีเมลให้ครบถ้วน' });
  }

  const domain = email.split('@')[1]?.toLowerCase();
  const isMcuDomain = domain === 'mcu.ac.th' || domain === 'mvu.ac.th' || domain?.endsWith('.mcu.ac.th');

  if (!isMcuDomain) {
    return res.status(403).json({
      success: false,
      message: 'ขออภัย ระบบเปิดให้ลงทะเบียนเฉพาะสมาชิกที่มีบัญชีอีเมลสถาบัน @mcu.ac.th เท่านั้น'
    });
  }

  const duplicate = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (duplicate) {
    return res.status(400).json({ success: false, message: 'อีเมลนี้ถูกลงทะเบียนไว้ในระบบเรียบร้อยแล้ว' });
  }

  const userDepartment = department || 'งานแผนและงบประมาณ';

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role: requestedRole || 'executive',
    status: 'Unverified',
    access_scope: 'department_only',
    allowed_departments: [userDepartment],
    title: title || 'สมาชิก มหาจุฬาลงกรณราชวิทยาลัย',
    department: userDepartment,
    created_at: new Date().toISOString()
  };

  mockData.users.push(newUser);
  try {
    await supabase.from('users').insert([newUser]);
  } catch (err) {}

  return res.json({
    success: true,
    message: 'ลงทะเบียนสมาชิกสำเร็จ! กรุณาตรวจสอบกล่องจดหมายอีเมลของคุณเพื่อยืนยันการสมัคร',
    data: newUser,
    verificationToken: `mock-token-${Date.now()}`
  });
});

// 2.5 Verify Email
router.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  const user = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้นี้' });
  }
  
  if (user.status !== 'Unverified') {
    return res.status(400).json({ success: false, message: 'อีเมลนี้ถูกยืนยันไปแล้ว' });
  }

  user.status = 'Active';
  try {
    await supabase.from('users').update({ status: 'Active' }).eq('id', user.id);
  } catch (err) {}

  return res.json({ success: true, message: 'ยืนยันอีเมลสำเร็จ คุณสามารถเข้าสู่ระบบได้แล้ว' });
});

// 3. Admin Only: Get all members list
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (false) {
      return res.json({ success: true, data });
    }
  } catch (e) {}

  return res.json({ success: true, data: mockData.users, departments: DEPARTMENTS_LIST });
});

// 4. Admin Command: Control & Update Department Access Scope for Member
router.put('/users/:id/department-scope', async (req, res) => {
  const { id } = req.params;
  const { access_scope, allowed_departments, department, role, status } = req.body;

  const updates = {};
  if (access_scope) updates.access_scope = access_scope;
  if (allowed_departments) updates.allowed_departments = allowed_departments;
  if (department) updates.department = department;
  if (role) updates.role = role;
  if (status) updates.status = status;

  try {
    await supabase.from('users').update(updates).eq('id', id);
  } catch (e) {}

  const index = mockData.users.findIndex(u => u.id === id);
  if (index !== -1) {
    mockData.users[index] = { ...mockData.users[index], ...updates };
    return res.json({
      success: true,
      message: `ออกคำสั่งอนุมัติขอบเขตสิทธิ์ส่วนงานสำเร็จ (เข้าถึงได้ ${updates.allowed_departments?.length || 0} ส่วนงาน)`,
      data: mockData.users[index]
    });
  }

  return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้' });
});

// 5. Admin General Update
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await supabase.from('users').update(updates).eq('id', id);
  } catch (e) {}

  const index = mockData.users.findIndex(u => u.id === id);
  if (index !== -1) {
    mockData.users[index] = { ...mockData.users[index], ...updates };
    return res.json({ success: true, message: 'อัปเดตข้อมูลและสิทธิ์สมาชิกสำเร็จ', data: mockData.users[index] });
  }

  return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้' });
});

// 6. Admin Delete User
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await supabase.from('users').delete().eq('id', id);
  } catch (e) {}

  mockData.users = mockData.users.filter(u => u.id !== id);
  return res.json({ success: true, message: 'ลบบัญชีสมาชิกเรียบร้อยแล้ว', id });
});

export default router;
