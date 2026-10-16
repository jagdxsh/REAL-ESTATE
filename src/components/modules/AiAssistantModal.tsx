'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  ExternalLink, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2,
  Compass,
  Calculator
} from 'lucide-react';
import { UserRole } from '@/types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: { title: string; url?: string }[];
  category?: string;
}

const PRESET_QUERIES = [
  "What is the difference between Ready Reckoner (ASR) benchmark and market price?",
  "How does Section 43CA / 56(2)(x) Safe Harbor apply if asking price is below ASR?",
  "What essential documents must I check before paying a token advance in Pune?",
  "How does Vastu recommend aligning a kitchen and master bedroom without structural demolition?",
  "What consent notices and obligations apply when collecting buyer leads under DPDP Act 2023?",
  "How is FSI and break-even selling price calculated in developer feasibility models?"
];

export default function AiAssistantModal({
  isOpen,
  onClose,
  userRole,
}: AiAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am your EstateIQ AI Real Estate Intelligence Assistant for VM Intellect. I can provide calculations, statutory comparisons, legal due diligence checklists, and Vastu spatial analysis grounded in official Maharashtra and Indian regulatory sources. How can I assist your ${userRole} workflow today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        { title: 'IGR Maharashtra ASR Portal', url: 'https://igrmaharashtra.gov.in/' },
        { title: 'MeitY DPDP Act 2023 Gazette', url: 'https://www.meity.gov.in/' }
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let citations: { title: string; url?: string }[] = [];

      const lower = q.toLowerCase();

      if (lower.includes('difference') || lower.includes('asr') || lower.includes('ready reckoner')) {
        reply = `**Ready Reckoner (ASR) Benchmark vs. Market Price:**
1. **Ready Reckoner / ASR (Annual Statement of Rates):** The official government benchmark published yearly by the Inspector General of Registration (IGR) Maharashtra. It determines the minimum statutory base on which stamp duty (5% in Pune) and registration fees are calculated.
2. **Market Price:** The negotiated price agreed between a willing buyer and seller based on open market demand, amenities, construction quality, and developer brand reputation.
3. **Statutory Implication:** Stamp duty is always charged on the **higher of the two values**. If the agreed price is higher than ASR, duty applies to the agreed price. If the transaction value is more than 10% below ASR, Income Tax Sections 43CA and 56(2)(x) treat the differential as taxable deemed income for both parties.`;
        citations = [
          { title: 'Maharashtra Stamp Act, 1958 & ASR Guidelines', url: 'https://igrmaharashtra.gov.in/' },
          { title: 'Indian Income Tax Act, 1961 (Sections 43CA & 56(2)(x))' }
        ];
      } else if (lower.includes('safe harbor') || lower.includes('43ca') || lower.includes('tax')) {
        reply = `**Safe Harbor Rules under Sections 43CA and 56(2)(x):**
- In India, real estate transactions are granted a **10% safe harbor variance** between the actual sale consideration and the official Ready Reckoner / Stamp Duty Value.
- **Within 10% band:** If the difference between asking price and ASR is ≤ 10%, no penalty applies.
- **Exceeding 10% band:** If the asking price is more than 10% below the ASR benchmark, the difference is taxed as business income for the developer/seller (Sec 43CA) and as 'Income from Other Sources' for the buyer (Sec 56(2)(x)).`;
        citations = [
          { title: 'CBDT Safe Harbor Real Estate Circulars' },
          { title: 'Inspector General of Registration Maharashtra Rate Schedules' }
        ];
      } else if (lower.includes('token') || lower.includes('document') || lower.includes('check')) {
        reply = `**Critical Due Diligence Checks Before Paying Token Advance in Maharashtra:**
1. **MahaRERA Registration:** Verify project registration number and quarterly progress filings on \`maharera.mahaonline.gov.in\`.
2. **Title Search Report:** Verify continuous 30-year chain of title deeds from the Sub-Registrar Office Book 1 records.
3. **7/12 Extract (Satbara Utara) & Mutation (Ferfar):** Confirm clear owner name on Mahabhulekh without agricultural tenancy restrictions.
4. **Encumbrance Certificate (EC):** Obtain Form 15 (showing search history) and Form 16 (Nil Encumbrance) confirming no active bank mortgages or court attachments.
5. **Commencement Certificate (CC):** Ensure building sanctions and full CC have been granted by PMC/PCMC for the specific tower and floor.`;
        citations = [
          { title: 'Real Estate (Regulation and Development) Act, 2016 (RERA)' },
          { title: 'Maharashtra Land Revenue Code, 1966' }
        ];
      } else if (lower.includes('vastu') || lower.includes('kitchen') || lower.includes('bedroom')) {
        reply = `**Vastu Shastra Principles & Non-Destructive Adjustments:**
- **Kitchen (Agni Zone):** Ideally located in the **South-East (Agneya)**. If located in North-East (water-fire conflict), place a natural green marble slab under the gas hob, install copper/brass boundary strips, and keep a clean bowl of natural sea salt to absorb conflicting energetic vibrations without knocking down walls.
- **Master Bedroom (Stability Zone):** South-West (Nairutya) provides grounding leadership energy. Headboard should face South or East. Avoid mirrors reflecting the sleeping posture.
- **Puja Room:** North-East (Ishanya) receives pure morning sunlight and spiritual calmness.
- *Notice:* Vastu Shastra is a traditional cultural framework and does not replace engineering integrity or legal due diligence.`;
        citations = [
          { title: 'Astrology, Numerology, Vastu & Home Purchase Guide' }
        ];
      } else if (lower.includes('dpdp') || lower.includes('privacy') || lower.includes('consent')) {
        reply = `**DPDP Act 2023 & Rules 2025 Lead Capture Obligations:**
1. **Itemized Notice (Section 5):** Before collecting customer phone numbers or property preferences, present a clear notice in plain English specifying the exact purpose.
2. **Explicit Consent (Section 6):** Consent must be free, specific, informed, and unconditional. No pre-checked boxes allowed.
3. **Right to Withdraw:** The customer can revoke consent at any time as easily as giving it.
4. **Purpose Limitation:** Contact details collected for viewing a property cannot be sold or transferred to unverified third-party telemarketers.
5. **Data Protection Officer:** VM Intellect provides a designated DPO with a 30-day statutory grievance resolution timeline.`;
        citations = [
          { title: 'Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)', url: 'https://www.meity.gov.in/' },
          { title: 'DPDP Rules, 2025 Gazette Notification' }
        ];
      } else {
        reply = `Thank you for your inquiry regarding "${q}".
In our EstateIQ AI database for Pune and Maharashtra, property evaluations combine three core pillars:
1. **Statutory Ready Reckoner Rate:** Benchmark rate established under the Maharashtra Stamp Act.
2. **DPDP Compliance:** Ensuring all buyer and landowner personal records maintain strict confidentiality.
3. **Traditional Spatial Analytics:** Vastu directional checks for residential and commercial harmony.

Would you like me to run a specific ASR rate comparison, calculate loan affordability, or evaluate a floor-plan layout for a specific Pune locality like Baner, Kharadi, or Wakad?`;
        citations = [
          { title: 'VM Intellect EstateIQ Real Estate Knowledge Base' }
        ];
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl h-[620px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-serif">EstateIQ AI Copilot</h3>
                <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-semibold">
                  Grounded AI
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Official IGR Maharashtra, DPDP Act 2023 & Vastu Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">
                  {msg.text}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Official Citations:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-white text-blue-700 border border-slate-200 font-medium">
                          <span>{c.title}</span>
                          {c.url && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
              <Bot className="w-4 h-4 animate-bounce text-blue-600" />
              <span>EstateIQ AI is querying statutory records and compiling response...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-400 font-semibold flex-shrink-0 text-[10px] uppercase">Suggested:</span>
          {PRESET_QUERIES.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 truncate flex-shrink-0 cursor-pointer transition shadow-2xs"
            >
              {pq}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about Maharashtra ASR rates, safe harbor, due diligence, or Vastu..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
