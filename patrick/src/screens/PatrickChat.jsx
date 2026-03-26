import { useState, useRef, useEffect } from 'react'
import { T, API_URL } from '../theme.js'
import { COMBINED_SYSTEM_PROMPT } from '../data.js'

const suggestions = [
  'What should I focus on today?',
  'Why is the Disagreement Index at 64?',
  'What does Patrick know about Hartwell that I might be missing?',
  'Should Sarah call Rachel about Cascade personally?',
]

export default function PatrickChat({ onClose, isMobile }) {
  const [messages, setMessages] = useState([{ role:'assistant', content:'I have full context on Meridian Advisory. What do you need?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async (text) => {
    const q = text || input.trim()
    if (!q) return
    setInput('')
    const newMsgs = [...messages, { role:'user', content:q }]
    setMessages(newMsgs)
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'x-api-key':localStorage.getItem('anthropic_key')||'', 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true' },
        body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:COMBINED_SYSTEM_PROMPT, messages:newMsgs.map(m => ({ role:m.role, content:m.content })) })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || 'Unable to get response.'
      setMessages(prev => [...prev, { role:'assistant', content:reply }])
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Connection error. Check your API key in Settings.' }])
    }
    setLoading(false)
  }

  const containerStyle = isMobile
    ? { position:'fixed', inset:0, zIndex:1500, background:T.bg, display:'flex', flexDirection:'column' }
    : { position:'fixed', top:0, right:0, bottom:0, width:380, background:T.bg, borderLeft:`1px solid ${T.border}`, display:'flex', flexDirection:'column', zIndex:1500 }

  return (
    <div style={containerStyle}>
      <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:16, fontWeight:600, color:T.text }}>🦞 Patrick</div>
          <div style={{ fontSize:11, color:T.textSub }}>Meridian Advisory · 247 context captures</div>
        </div>
        <button onClick={onClose} style={{ background:'none', border:'none', color:T.textSub, fontSize:20, cursor:'pointer', padding:'4px 8px' }}>&times;</button>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:16 }}>
        {messages.length === 0 && (
          <div style={{ paddingTop:40, display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ textAlign:'center', fontSize:32, marginBottom:8 }}>🦞</div>
            <div style={{ textAlign:'center', fontSize:14, color:T.textSub, marginBottom:16 }}>Ask Patrick anything about Meridian.</div>
            {suggestions.map(s => (
              <div key={s} onClick={() => send(s)} style={{ padding:12, borderRadius:8, background:T.violetDim, border:`1px solid ${T.violet}22`, color:T.violet, fontSize:13, cursor:'pointer', textAlign:'center', transition:'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = `${T.violet}33`}
                onMouseLeave={e => e.currentTarget.style.background = T.violetDim}>
                {s}
              </div>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent:m.role==='user'?'flex-end':'flex-start', marginBottom:12 }}>
            <div style={{ maxWidth:'85%', padding:'10px 14px', borderRadius:12, background:m.role==='user'?T.violet:T.surfaceHigh, color:m.role==='user'?'#fff':T.text, fontSize:14, lineHeight:1.6, whiteSpace:'pre-wrap' }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:'flex', gap:4, padding:12 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:T.violet, animation:`pulse 1.4s ${i*0.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding:'12px 16px', borderTop:`1px solid ${T.border}`, display:'flex', gap:8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
          placeholder="Ask Patrick..." style={{ flex:1, background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:10, padding:'10px 14px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
        <button onClick={() => send()} disabled={loading} style={{ padding:'0 16px', borderRadius:10, background:T.violet, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', opacity:loading?0.5:1 }}>Send</button>
      </div>
    </div>
  )
}
