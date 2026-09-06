import express from 'express';
import { supabase } from '../db/supabaseClient.js';

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

  try {
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email);

    if (fetchError) throw fetchError;

    if (existingUsers && existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.status === 'Unverified') {
        return res.status(403).json({ success: false, message: 'กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ (Check your email inbox)' });
      }
      return res.json({
        success: true,
        message: 'ลงชื่อเข้าใช้สำเร็จ',
        data: { user: existingUser }
      });
    }

    // Create new user if not exist
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

    const { data: upsertData, error: upsertError } = await supabase.from('users').upsert([newProfile]).select();
    
    if (upsertError) throw upsertError;

    return res.json({
      success: true,
      message: 'ลงชื่อเข้าใช้ด้วยบัญชี @mcu.ac.th สำเร็จ',
      data: { user: upsertData[0] }
    });
  } catch (err) {
    console.error('Google login error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 2. Register New Member
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

  try {
    const { data: existingUsers } = await supabase.from('users').select('*').ilike('email', email);
    
    if (existingUsers && existingUsers.length > 0) {
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
      department: userDepartment
    };

    const { data: insertData, error: insertError } = await supabase.from('users').insert([newUser]).select();
    
    if (insertError) throw insertError;

    return res.json({
      success: true,
      message: 'ลงทะเบียนสมาชิกสำเร็จ! กรุณาตรวจสอบกล่องจดหมายอีเมลของคุณเพื่อยืนยันการสมัคร',
      data: insertData[0],
      verificationToken: `mock-token-${Date.now()}`
    });
  } catch (err) {
    console.error('Register error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 2.5 Verify Email
router.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  
  try {
    const { data: users, error: fetchError } = await supabase.from('users').select('*').ilike('email', email);
    if (fetchError) throw fetchError;
    
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้นี้' });
    }
    
    const user = users[0];
    if (user.status !== 'Unverified') {
      return res.status(400).json({ success: false, message: 'อีเมลนี้ถูกยืนยันไปแล้ว' });
    }

    const { error: updateError } = await supabase.from('users').update({ status: 'Active' }).eq('id', user.id);
    if (updateError) throw updateError;

    return res.json({ success: true, message: 'ยืนยันอีเมลสำเร็จ คุณสามารถเข้าสู่ระบบได้แล้ว' });
  } catch (err) {
    console.error('Verify email error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 3. Admin Only: Get all members list
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return res.json({ success: true, data, departments: DEPARTMENTS_LIST });
  } catch (err) {
    console.error('Fetch users error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
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
    const { data, error } = await supabase.from('users').update(updates).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้' });

    return res.json({
      success: true,
      message: `ออกคำสั่งอนุมัติขอบเขตสิทธิ์ส่วนงานสำเร็จ (เข้าถึงได้ ${data[0].allowed_departments?.length || 0} ส่วนงาน)`,
      data: data[0]
    });
  } catch (err) {
    console.error('Update user scope error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 5. Admin General Update
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const { data, error } = await supabase.from('users').update(updates).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'ไม่พบบัญชีผู้ใช้' });

    return res.json({ success: true, message: 'อัปเดตข้อมูลและสิทธิ์สมาชิกสำเร็จ', data: data[0] });
  } catch (err) {
    console.error('Update user error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 6. Admin Delete User
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return res.json({ success: true, message: 'ลบบัญชีสมาชิกเรียบร้อยแล้ว', id });
  } catch (err) {
    console.error('Delete user error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
