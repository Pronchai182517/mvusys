import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { KnowledgeItem } from '../types';
import { BookOpen, Search, Plus, FileText, Tag, ShieldCheck } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ระเบียบ');
  const [source, setSource] = useState('สำนักงานสภาวิทยาลัย');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const data = await api.getKnowledge();
      setKnowledge(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await api.createKnowledge({
      title,
      category,
      file_type: 'PDF',
      source,
      content,
      tags: `${category}, ${source}`
    });
    setShowModal(false);
    setTitle('');
    setContent('');
    loadKnowledge();
  };

  const filtered = knowledge.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📚 คลังเอกสารและฐานความรู้ภายใน (Internal Knowledge Base)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            จัดเก็บระเบียบ คำสั่ง แบบฟอร์ม คู่มือ รายงานการประชุม ปลอดภัยไม่ส่งออก AI ภายนอก
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> เพิ่มเอกสารใหม่
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="ค้นหาชื่อระเบียบ คำสั่ง หรือเนื้อหา..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'ระเบียบ', 'คำสั่ง', 'รายงานการประชุม', 'คู่มือ'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-mvu-500/20 text-mvu-300 border border-mvu-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'ทุกประเภท' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Documents Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดคลังความรู้...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-mvu-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> ปลอดภัยใน Local RAG
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {item.content}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span>ที่มา: <strong className="text-slate-300">{item.source}</strong></span>
                {item.tags && <span className="text-mvu-400/80">🏷️ {item.tags}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Knowledge */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700 w-full max-w-lg space-y-4 animate-scaleUp">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-mvu-400" /> เพิ่มเอกสารเข้าฐานความรู้
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">ชื่อเอกสาร / ระเบียบ / คำสั่ง</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ประกาศแนวปฏิบัติด้าน AI 2569"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">หมวดหมู่เอกสาร</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  >
                    <option value="ระเบียบ">ระเบียบ</option>
                    <option value="คำสั่ง">คำสั่ง</option>
                    <option value="รายงานการประชุม">รายงานการประชุม</option>
                    <option value="คู่มือ">คู่มือ</option>
                    <option value="แบบฟอร์ม">แบบฟอร์ม</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">หน่วยงานเจ้าของเรื่อง</label>
                  <input
                    type="text"
                    value={source}
                    onChange={e => setSource(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">เนื้อหาเอกสารสาระสำคัญ</label>
                <textarea
                  rows={4}
                  required
                  placeholder="พิมพ์หรือคัดลอกข้อความสาระสำคัญของเอกสารเพื่อให้ Local AI Agent ค้นหาได้..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs"
                >
                  บันทึกเอกสาร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
