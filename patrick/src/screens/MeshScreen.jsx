import { useState, useRef, useEffect } from 'react'
import { T, API_URL } from '../theme.js'
import { MESH_ENTRIES, MESH_SYSTEM_PROMPT } from '../data.js'
import { Card, SLabel, Sheet } from '../components/UI.jsx'

const suggestions = [
  'Why does Hartwell get special treatment?',
  'What do I need to know before the Cascade call?',
  'Who\'s the biggest retention risk?',
  'Why is Tech Advisory a strategic priority?',
]

export default function MeshScreen({ isMobile }) {
  const [messages, setMessages] = useState([{ role:'assistant', content:'I hold everything Meridian Advisory has captured — every decision, tradeoff, and institutional note. Ask me anything about why your company is the way it is.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [browse, setBrowse] = useState(false)
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
        body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:MESH_SYSTEM_PROMPT, messages:newMsgs.map(m => ({ role:m.role, content:m.content })) })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || 'Unable to get response.'
      setMessages(prev => [...prev, { role:'assistant', content:reply }])
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Connection error. Check your API key in Settings.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 140px)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:20, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:0 }}>Mesh</h2>
          <span style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:T.textSub }}>247 captures · ask anything</span>
        </div>
        <button onClick={() => setBrowse(true)} style={{ padding:'8px 16px', borderRadius:8, border:`1px solid ${T.borderMid}`, background:'transparent', color:T.textSub, fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Browse</button>
      </div>

      <div style={{ flex:1, overflow:'auto', paddingBottom:16 }}>
        {messages.length === 0 && (
          <div style={{ padding:'40px 0' }}>
            <div style={{ fontSize:48, textAlign:'center', marginBottom:16 }}>⟆</div>
            <div style={{ textAlign:'center', fontSize:14, color:T.textSub, marginBottom:24 }}>Ask Mesh anything about Meridian's institutional knowledge.</div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:8 }}>
              {suggestions.map(s => (
                <div key={s} onClick={() => send(s)} style={{ padding:12, borderRadius:8, background:T.tealDim, border:`1px solid ${T.teal}22`, color:T.teal, fontSize:13, cursor:'pointer', lineHeight:1.4, transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = `${T.teal}22`}
                  onMouseLeave={e => e.currentTarget.style.background = T.tealDim}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent:m.role==='user'?'flex-end':'flex-start', marginBottom:12 }}>
            {m.role==='assistant' && <div style={{ width:28, height:28, borderRadius:'50%', background:T.tealDim, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:T.teal, marginRight:8, flexShrink:0, marginTop:4 }}>⟆</div>}
            <div style={{ maxWidth:'75%', padding:'10px 14px', borderRadius:12, background:m.role==='user'?T.violet:T.surfaceHigh, color:m.role==='user'?'#fff':T.text, fontSize:14, lineHeight:1.6, whiteSpace:'pre-wrap' }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:'flex', gap:4, padding:12 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:T.tealDim, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:T.teal, marginRight:8 }}>⟆</div>
            {[0,1,2].map(i => (
              <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:T.teal, animation:`pulse 1.4s ${i*0.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display:'flex', gap:8, padding:'12px 0' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
          placeholder="Ask Mesh..." style={{ flex:1, background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:10, padding:'12px 16px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
        <button onClick={() => send()} disabled={loading} style={{ padding:'0 20px', borderRadius:10, background:T.teal, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', opacity:loading?0.5:1 }}>Send</button>
      </div>

      <Sheet open={browse} onClose={() => setBrowse(false)} title="Mesh Entries">
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {MESH_ENTRIES.map(m => (
            <Card key={m.id} onClick={() => { setBrowse(false); send(`Tell me about: ${m.entity}`) }}>
              <div style={{ fontSize:14, fontWeight:600, color:T.teal, marginBottom:4 }}>{m.entity}</div>
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5, overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{m.text}</div>
              <div style={{ fontSize:11, color:T.textDim, marginTop:6, fontFamily:'JetBrains Mono, monospace' }}>{m.date} · {m.by}</div>
            </Card>
          ))}
        </div>
      </Sheet>
    </div>
  )
}
