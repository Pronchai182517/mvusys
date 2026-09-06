import React, { useState } from 'react';
import { api } from '../services/api';
import { AIChatMessage } from '../types';

export const AIAgentPage: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: `เจริญพร / สวัสดีครับ ผมคือ **Local AI Agent สำหรับการบริหารหน่วยงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย** \n\nผมสามารถช่วยท่านดำเนินการได้ดังนี้:\n1. 🔍 **ค้นหาและสรุปมติที่ประชุมสภาวิทยาลัย / คณะกรรมการ**\n2. 📄 **ร่างรายงานสรุปการบริหารงานและภาพรวมโครงการสำหรับผู้บริหาร**\n3. ⚠️ **วิเคราะห์ภารกิจที่ล่าช้าและความเสี่ยง พร้อมอ้างอิงแหล่งข้อมูล (Citations)**\n\nพิมพ์คำถามหรือเลือกปุ่มด่วนด้านล่างได้เลยครับ`,
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
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fadeIn">
      {/* Header banner */}
      <div className="px-screen-margin-mobile pt-space-md pb-space-sm bg-surface flex flex-col sm:flex-row items-center justify-between gap-space-md border-b border-border-subtle shrink-0">
        <div className="flex items-center space-x-3 w-full">
          <div className="p-3 rounded-[12px] bg-primary text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading-md text-[18px] font-bold text-text-primary tracking-tight">Local AI Agent</h2>
              <span className="font-mono-badge text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-status-success/10 text-status-success flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">shield</span> Local Secure
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-text-secondary">ค้นหา สรุปมติที่ประชุม วิเคราะห์ความก้าวหน้า และร่างรายงานผู้บริหาร</p>
          </div>
        </div>
      </div>

      {/* Quick Action Prompt Shortcuts */}
      <div className="px-screen-margin-mobile py-space-sm bg-surface-subtle border-b border-border-subtle shrink-0 flex flex-nowrap overflow-x-auto gap-2 no-scrollbar">
        <button
          onClick={() => handleSend('สรุปมติที่ประชุมสภาวิทยาลัยที่เกี่ยวข้องกับ AI', 'search')}
          className="whitespace-nowrap px-3 py-1.5 rounded-[8px] bg-surface-card border border-border-subtle hover:border-primary/50 text-text-secondary font-label-sm text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">search</span> ค้นหามติเรื่อง AI
        </button>
        <button
          onClick={() => handleSend('จัดทำร่างรายงานสรุปผลการบริหารงานสำหรับผู้บริหาร', 'draft_report')}
          className="whitespace-nowrap px-3 py-1.5 rounded-[8px] bg-primary text-on-primary font-label-sm text-[12px] font-bold flex items-center gap-1.5 active:scale-[0.98] transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">article</span> ร่างรายงานผู้บริหาร
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-screen-margin-mobile py-space-md space-y-space-md bg-surface-subtle/30">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-2 font-label-sm text-[10px] text-text-muted mb-1 px-1 font-bold">
              <span>{msg.sender === 'user' ? 'คุณ' : 'Local AI Agent'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-space-md rounded-[16px] max-w-[85%] font-body-sm text-[13px] leading-relaxed space-y-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-tr-none'
                  : 'bg-surface-card border border-border-subtle text-text-primary rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border-subtle/50 space-y-2">
                  <div className="font-label-sm text-[11px] font-bold text-accent-gold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">menu_book</span> แหล่งข้อมูลอ้างอิง (Citations):
                  </div>
                  <div className="space-y-1.5">
                    {msg.citations.map((c, i) => (
                      <div key={i} className="font-body-sm text-[11px] bg-surface-subtle px-2.5 py-1.5 rounded-[8px] border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between text-text-secondary gap-1">
                        <span className="font-semibold text-text-primary">📌 {c.title}</span>
                        <span className="text-text-muted truncate">{c.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 font-label-sm text-[12px] font-bold text-primary bg-surface-card border border-border-subtle p-3 rounded-[12px] w-fit shadow-sm rounded-tl-none">
            <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
            <span>กำลังวิเคราะห์ฐานความรู้และประมวลผล...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="px-screen-margin-mobile py-space-sm bg-surface border-t border-border-subtle shrink-0">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="สอบถามข้อมูล หรือให้ AI ร่างรายงาน..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-surface-subtle border border-border-subtle rounded-[24px] px-4 py-3 font-body-sm text-[13px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputQuery.trim()}
            className="w-[44px] h-[44px] shrink-0 rounded-full bg-primary disabled:opacity-50 text-on-primary font-bold flex items-center justify-center active:scale-[0.95] transition-transform shadow-md"
          >
            <span className="material-symbols-outlined text-[20px] ml-1">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
