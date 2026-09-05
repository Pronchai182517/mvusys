import React, { useState } from 'react';
import { api } from '../services/api';
import { AIChatMessage } from '../types';
import { Bot, Send, Sparkles, FileText, Search, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react';

export const AIAgentPage: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: `เจริญพร / สวัสดีครับ ผมคือ **Local AI Agent สำหรับการบริหารหน่วยงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย** 

ผมสามารถช่วยท่านดำเนินการได้ดังนี้:
1. 🔍 **ค้นหาและสรุปมติที่ประชุมสภาวิทยาลัย / คณะกรรมการ**
2. 📄 **ร่างรายงานสรุปการบริหารงานและภาพรวมโครงการสำหรับผู้บริหาร**
3. ⚠️ **วิเคราะห์ภารกิจที่ล่าช้าและความเสี่ยง พร้อมอ้างอิงแหล่งข้อมูล (Citations)**

พิมพ์คำถามหรือเลือกปุ่มด่วนด้านล่างได้เลยครับ`,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryText?: string, mode: 'search' | 'draft_report' = 'search') => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const responseData = await api.queryAIAgent(textToSend, mode);
      const agentMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: responseData.answer,
        citations: responseData.citations,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-mvu-500 to-amber-600 text-slate-950 shadow-lg shadow-mvu-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">Local AI Agent RAG Assistant</h2>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure Local Processing
              </span>
            </div>
            <p className="text-xs text-slate-400">ค้นหา สรุปมติที่ประชุม วิเคราะห์ความก้าวหน้า และร่างรายงานผู้บริหาร</p>
          </div>
        </div>

        {/* Quick Action Prompt Shortcuts */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSend('สรุปมติที่ประชุมสภาวิทยาลัยที่เกี่ยวข้องกับ AI', 'search')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-mvu-300 flex items-center gap-1.5 transition-colors"
          >
            <Search className="w-3.5 h-3.5" /> ค้นหามติเรื่อง AI
          </button>
          <button
            onClick={() => handleSend('จัดทำร่างรายงานสรุปผลการบริหารงานสำหรับผู้บริหาร', 'draft_report')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-mvu-500 to-amber-600 hover:from-mvu-400 hover:to-amber-500 text-xs text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-mvu-500/10 transition-all hover:scale-105"
          >
            <FileText className="w-3.5 h-3.5" /> ร่างรายงานผู้บริหาร
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 min-h-[480px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-1 px-1">
              <span>{msg.sender === 'user' ? 'คุณ' : 'Local AI Agent'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-mvu-600 to-amber-600 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-mvu-500/10'
                  : 'glass-card border border-slate-800 text-slate-100 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-1.5">
                  <div className="text-[11px] font-semibold text-mvu-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> แหล่งข้อมูลอ้างอิง (Citations):
                  </div>
                  <div className="space-y-1">
                    {msg.citations.map((c, i) => (
                      <div key={i} className="text-[10px] bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300">
                        <span className="font-medium text-slate-200">📌 {c.title}</span>
                        <span className="text-slate-400">{c.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-xs text-mvu-400 glass-card p-3 rounded-2xl w-fit">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Local AI Agent กำลังวิเคราะห์ฐานความรู้และประมวลผลข้อมูล...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center space-x-3">
        <input
          type="text"
          placeholder="พิมพ์ข้อความสอบถาม Local AI เช่น 'สรุปโครงการที่มีความเสี่ยง' หรือ 'ค้นหาระเบียบการเงิน'..."
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500 transition-colors"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-mvu-500/20 transition-all"
        >
          <span>ส่งคำถาม</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
