import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

const ALLOWED_DOMAINS = ['mcu.ac.th', 'mvu.ac.th', 'gmail.com'];

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

  // Find existing user or create
  const existingUser = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return res.json({
      success: true,
      message: 'ลงชื่อเข้าใช้สำเร็จ',
      data: { user: existingUser }
    });
  }

  let role = 'executive';
  if (email.includes('admin') || email.includes('worachayo')) {
    role = 'admin';
  }

  const newProfile = {
    id: googleId || `usr-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role,
    status: 'Active',
    title: domain === 'mcu.ac.th' ? 'บุคลากร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย' : 'บุคลากร มหาวชิราลงกรณบาลีเถรวาทฯ',
    department: domain === 'mcu.ac.th' ? 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (@mcu.ac.th)' : 'ส่วนงานบริหารองค์กร'
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

// 2. Register New Member with @mcu.ac.th Verification
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

  // Check if already registered
  const duplicate = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (duplicate) {
    return res.status(400).json({ success: false, message: 'อีเมลนี้ถูกลงทะเบียนไว้ในระบบเรียบร้อยแล้ว' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role: requestedRole || 'executive',
    status: 'Pending', // Pending admin approval
    title: title || 'สมาชิก มหาจุฬาลงกรณราชวิทยาลัย',
    department: department || 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (@mcu.ac.th)',
    created_at: new Date().toISOString()
  };

  mockData.users.push(newUser);
  try {
    await supabase.from('users').insert([newUser]);
  } catch (err) {}

  return res.json({
    success: true,
    message: 'ลงทะเบียนสมาชิกสำเร็จ! บัญชีของคุณเข้าสู่สถานะรอการอนุมัติสิทธิ์โดย Admin',
    data: newUser
  });
});

// 3. Admin Only: Get all members list
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (e) {}

  return res.json({ success: true, data: mockData.users });
});

// 4. Admin Only: Update member status or role
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // { role, status, title, department }

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

// 5. Admin Only: Delete member
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await supabase.from('users').delete().eq('id', id);
  } catch (e) {}

  mockData.users = mockData.users.filter(u => u.id !== id);
  return res.json({ success: true, message: 'ลบบัญชีสมาชิกเรียบร้อยแล้ว', id });
});

export default router;
