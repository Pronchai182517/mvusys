const fs = require('fs');
const path = require('path');

const DEPARTMENTS_LIST = [
  'งานแผนและงบประมาณ', 'ส่วนงานบริหารองค์กร', 'สำนักงานผู้บริหาร',
  'งานประกันคุณภาพและติดตามผล', 'งานสารบรรณและประชุม', 'ศูนย์เทคโนโลยีสารสนเทศ',
  'งานการเงินและพัสดุ', 'มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (ส่วนกลาง)',
  'มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย', 'คณะพุทธศาสตร์', 'คณะครุศาสตร์',
  'คณะมนุษยศาสตร์', 'คณะสังคมศาสตร์', 'บัณฑิตวิทยาลัย', 'สถาบันวิจัยพุทธศาสตร์',
  'สำนักส่งเสริมพระพุทธศาสนาและบริการสังคม'
];

const priorites = ['Low', 'Medium', 'High', 'Urgent'];
const statuses = ['Pending', 'In Progress', 'Completed', 'Delayed'];

let tasks = [];
let idCounter = 1;

DEPARTMENTS_LIST.forEach(dept => {
  for (let i = 1; i <= 20; i++) {
    tasks.push({
      id: idCounter++,
      title: `งานที่ ${i} ของ ${dept}`,
      assignee: `เจ้าหน้าที่ ${dept}`,
      deadline: `2026-10-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      priority: priorites[Math.floor(Math.random() * priorites.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      evidence: Math.random() > 0.5 ? `https://mvu.ac.th/docs/${dept}_task_${i}.pdf` : '',
      category: dept
    });
  }
});

const tasksStr = JSON.stringify(tasks, null, 2);

const file = path.join(__dirname, '..', 'backend', 'src', 'db', 'supabaseClient.js');
let content = fs.readFileSync(file, 'utf8');

const tasksRegex = /tasks:\s*\[[\s\S]*?\],\s*projects:/;
content = content.replace(tasksRegex, 'tasks: ' + tasksStr + ',\n  projects:');

fs.writeFileSync(file, content);
console.log('Successfully generated 320 tasks and updated mockData.tasks in supabaseClient.js.');
