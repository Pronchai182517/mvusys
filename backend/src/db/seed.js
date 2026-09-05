import { supabase, mockData } from './supabaseClient.js';

async function seedDatabase() {
  console.log('🌱 Starting database seeding to Supabase at https://supabase.palithaillm.in.th...');

  try {
    // 1. Seed Users
    const { error: userErr } = await supabase.from('users').upsert(mockData.users);
    if (userErr) console.log('Notice: Users table insert/upsert info:', userErr.message);
    else console.log('✅ Users seeded successfully');

    // 2. Seed Tasks
    const { error: taskErr } = await supabase.from('tasks').upsert(mockData.tasks);
    if (taskErr) console.log('Notice: Tasks table insert/upsert info:', taskErr.message);
    else console.log('✅ Tasks seeded successfully');

    // 3. Seed Projects
    const { error: projErr } = await supabase.from('projects').upsert(mockData.projects);
    if (projErr) console.log('Notice: Projects table insert/upsert info:', projErr.message);
    else console.log('✅ Projects seeded successfully');

    // 4. Seed Resolutions
    const { error: resErr } = await supabase.from('resolutions').upsert(mockData.resolutions);
    if (resErr) console.log('Notice: Resolutions table insert/upsert info:', resErr.message);
    else console.log('✅ Resolutions seeded successfully');

    // 5. Seed Knowledge Base
    const { error: kbErr } = await supabase.from('knowledge_base').upsert(mockData.knowledge_base);
    if (kbErr) console.log('Notice: Knowledge base table insert/upsert info:', kbErr.message);
    else console.log('✅ Knowledge base seeded successfully');

    console.log('🎉 Seeding complete!');
  } catch (err) {
    console.error('Database seeding warning:', err.message);
  }
}

seedDatabase();
