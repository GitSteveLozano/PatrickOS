import { useState } from 'react'
import { T } from '../theme.js'
import { DECISIONS, PEOPLE } from '../data.js'
import { Card, SLabel, Sheet, Tag, Pulse, WorkBar } from '../components/UI.jsx'

const stats = [
  { label:'Active Agents', value:'2', sub:'1 idle', color:T.green },
  { label:'Awaiting You', value:'2', sub:'both urgent', color:T.amber },
  { label:'Disagreement Index', value:'64↑', sub:'from 58 yesterday', color:T.red },
  { label:'Mesh Captures', value:'14', sub:'today', color:T.teal },
]

export default function CommandScreen({ onNavigate, isMobile }) {
  const [selected, setSelected] = useState(null)
  const agents = PEOPLE.filter(p => p.type === 'agent' && p.status === 'active')

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', letterSpacing:'1px' }}>
          {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
        </div>
        <h1 style={{ fontSize:24, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:'8px 0 0' }}>
          Two things need your attention.
        </h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4, 1fr)', gap:12, marginBottom:32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:T.surface, borderRadius:10, padding:16, borderTop:`3px solid ${s.color}`, border:`1px solid ${T.border}`, borderTopColor:s.color, borderTopWidth:3, borderTopStyle:'solid' }}>
            <div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:700, color:s.color, lineHeight:1, marginBottom:2 }}>{s.value}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <SLabel>Decisions Awaiting You</SLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
        {DECISIONS.map(d => (
          <Card key={d.id} onClick={() => setSelected(d)}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:20, color:T.violet, flexShrink:0 }}>{d.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:4 }}>{d.title}</div>
                <div style={{ fontSize:13, color:T.textSub, marginBottom:8, lineHeight:1.5 }}>{d.context}</div>
                <div style={{ padding:'8px 12px', borderRadius:6, background:T.tealDim, borderLeft:`2px solid ${T.teal}`, marginBottom:8 }}>
                  <span style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.teal, textTransform:'uppercase', fontWeight:600 }}>MESH </span>
                  <span style={{ fontSize:12, color:T.textSub }}>{d.meshNote}</span>
                </div>
                <div style={{ fontSize:12, color:T.violet, fontWeight:600 }}>Tap to review →</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <SLabel>Agent Work Ready</SLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {agents.map(a => (
          <Card key={a.id}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <Pulse status={a.status} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:T.text }}>{a.name}</div>
                <div style={{ fontSize:12, color:T.textSub }}>{a.bio}</div>
                <WorkBar value={a.workload} style={{ marginTop:8 }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && <>
          <div style={{ fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:16 }}>{selected.context}</div>
          <div style={{ padding:12, borderRadius:8, background:T.violetDim, borderLeft:`3px solid ${T.violet}`, marginBottom:16 }}>
            <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.violet, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>PATRICK RECOMMENDS</div>
            <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{selected.recommendation}</div>
          </div>
          <div style={{ padding:12, borderRadius:8, background:T.tealDim, borderLeft:`3px solid ${T.teal}`, marginBottom:20 }}>
            <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.teal, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>MESH</div>
            <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{selected.meshNote}</div>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {selected.actions.map(a => (
              <button key={a} onClick={() => setSelected(null)} style={{ padding:'10px 20px', borderRadius:8, border:'none', background:T.violet, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                {a}
              </button>
            ))}
          </div>
        </>}
      </Sheet>
    </div>
  )
}
