import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

// Allow domains for MCU / MVU institutional accounts
const ALLOWED_DOMAINS = ['mcu.ac.th', 'mvu.ac.th', 'gmail.com'];

// Verify & Login with Google Account (@mcu.ac.th)
router.post('/google-login', async (req, res) => {
  const { email, name, picture, googleId } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุอีเมลบัญชี Google' });
  }

  const domain = email.split('@')[1]?.toLowerCase();

  // Validate Domain Restriction (Support @mcu.ac.th, @mvu.ac.th, gmail)
  const isAllowedDomain = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain?.endsWith('.' + allowed));

  if (!isAllowedDomain) {
    return res.status(403).json({
      success: false,
      message: `เฉพาะบัญชีอีเมลสถาบัน @mcu.ac.th เท่านั้นที่ได้รับอนุญาตเข้าใช้งานระบบ (โดเมนปัจจุบัน: @${domain})`
    });
  }

  // Determine user role
  let role = 'executive';
  if (email.includes('admin') || email.includes('worachayo')) {
    role = 'admin';
  } else if (email.includes('plan')) {
    role = 'project_lead';
  } else if (email.includes('qa')) {
    role = 'tracking_officer';
  }

  const userProfile = {
    id: googleId || `google-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role,
    title: domain === 'mcu.ac.th' ? 'บุคลากร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย' : 'บุคลากร มหาวชิราลงกรณบาลีเถรวาทฯ',
    department: domain === 'mcu.ac.th' ? 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (@mcu.ac.th)' : 'ส่วนงานบริหารองค์กร',
    picture: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  };

  // Upsert into Supabase database if connected
  try {
    await supabase.from('users').upsert([userProfile]);
  } catch (err) {
    console.log('Supabase user sync notice:', err.message);
  }

  return res.json({
    success: true,
    message: 'ลงชื่อเข้าใช้ด้วยบัญชี Google @mcu.ac.th สำเร็จ',
    data: {
      user: userProfile,
      allowedDomains: ALLOWED_DOMAINS
    }
  });
});

// GET Authentication settings & status
router.get('/config', (req, res) => {
  return res.json({
    success: true,
    provider: 'Google Workspace OAuth2',
    allowedDomains: ALLOWED_DOMAINS,
    supabaseAuthUrl: `${process.env.SUPABASE_URL || 'https://supabase.palithaillm.in.th'}/auth/v1/authorize?provider=google`
  });
});

export default router;
