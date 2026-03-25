import { useState } from 'react'
import { T } from '../theme.js'
import { STAKEHOLDERS } from '../data.js'
import { Card, SLabel, Sheet, Tag } from '../components/UI.jsx'

function engagementHealth(daysSince, cadence) {
  const ratio = daysSince / cadence
  if (ratio > 1.5) return { label:'LAPSED', color:T.red, bg:T.redDim }
  if (ratio > 1) return { label:'OVERDUE', color:T.amber, bg:T.amberDim }
  return { label:'CURRENT', color:T.green, bg:T.greenDim }
}

export default function StakeholdersTab() {
  const [selected, setSelected] = useState(null)
  const [commitments, setCommitments] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ text:'', due:'', owner:'' })

  const totalOverdue = STAKEHOLDERS.reduce((n, s) => n + s.commitments.filter(c => c.status==='overdue').length, 0)
  const withMeetings = STAKEHOLDERS.filter(s => s.nextMeeting !== 'Not scheduled').length
  const noMeeting = STAKEHOLDERS.filter(s => s.nextMeeting === 'Not scheduled').length

  const getCommitments = (s) => [...(s.commitments||[]), ...(commitments[s.id]||[])]

  const addCommitment = () => {
    if (!form.text || !selected) return
    setCommitments(prev => ({ ...prev, [selected.id]: [...(prev[selected.id]||[]), { ...form, status:'open' }] }))
    setForm({ text:'', due:'', owner:'' })
    setShowForm(false)
  }

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginBottom:16 }}>
        {[
          { label:'Total', value:STAKEHOLDERS.length, color:T.text },
          { label:'Overdue', value:totalOverdue, color:T.red },
          { label:'Meetings', value:withMeetings, color:T.green },
          { label:'No Meeting', value:noMeeting, color:T.amber },
        ].map(s => (
          <div key={s.label} style={{ textAlign:'center', padding:12, background:T.surface, borderRadius:8, border:`1px solid ${T.border}` }}>
            <div style={{ fontSize:20, fontFamily:'Fraunces, serif', fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:9, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', color:T.textSub }}>{s.label}</div>
          </div>
        ))}
      </div>

      {totalOverdue > 0 && (
        <div style={{ padding:12, borderRadius:8, background:T.amberDim, borderLeft:`3px solid ${T.amber}`, marginBottom:16 }}>
          <span style={{ fontSize:13, color:T.amber, fontWeight:600 }}>Patrick: </span>
          <span style={{ fontSize:13, color:T.textSub }}>{totalOverdue} overdue commitment{totalOverdue>1?'s':''} need attention today.</span>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {STAKEHOLDERS.map(s => {
          const health = engagementHealth(s.daysSince, s.cadence)
          const cadencePct = Math.min((s.daysSince / s.cadence) * 100, 150)
          const overdue = s.commitments.filter(c => c.status==='overdue').length
          return (
            <Card key={s.id} onClick={() => setSelected(s)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:600, color:T.text }}>{s.name}</div>
                  <div style={{ fontSize:12, color:T.textSub }}>{s.role}, {s.company}</div>
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <Tag color={s.type==='client'?T.green:T.blue} bg={s.type==='client'?T.greenDim:T.blueDim}>{s.type}</Tag>
                  <Tag color={health.color} bg={health.bg}>{health.label}</Tag>
                </div>
              </div>
              <div style={{ marginBottom:6 }}>
                <div style={{ height:3, borderRadius:2, background:T.border, marginTop:8 }}>
                  <div style={{ height:'100%', borderRadius:2, background:cadencePct>100?T.red:cadencePct>75?T.amber:T.green, width:`${Math.min(cadencePct,100)}%`, transition:'width 0.3s' }} />
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                <span style={{ fontSize:11, color:T.textSub }}>{s.nextMeeting === 'Not scheduled' ? 'No meeting scheduled' : s.nextMeeting}</span>
                {overdue > 0 && <Tag color={T.red} bg={T.redDim}>{overdue} OVERDUE</Tag>}
              </div>
            </Card>
          )
        })}
      </div>

      <Sheet open={!!selected} onClose={() => { setSelected(null); setShowForm(false) }} title={selected?.name}>
        {selected && <>
          <div style={{ fontSize:13, color:T.textSub, marginBottom:16 }}>{selected.role}, {selected.company}</div>

          <div style={{ padding:12, borderRadius:8, background:T.tealDim, borderLeft:`3px solid ${T.teal}`, marginBottom:20 }}>
            <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.teal, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>MESH</div>
            <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{selected.meshNote}</div>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <SLabel style={{ marginBottom:0 }}>Open Commitments</SLabel>
            <button onClick={() => setShowForm(!showForm)} style={{ background:T.violet, color:'#fff', border:'none', borderRadius:6, padding:'4px 12px', fontSize:11, cursor:'pointer', fontFamily:'JetBrains Mono, monospace' }}>+ Add</button>
          </div>

          {showForm && (
            <div style={{ padding:12, background:T.surfaceHigh, borderRadius:8, marginBottom:12, display:'flex', flexDirection:'column', gap:8 }}>
              <input placeholder="Commitment text" value={form.text} onChange={e => setForm({...form, text:e.target.value})} style={{ background:T.bg, border:`1px solid ${T.borderMid}`, borderRadius:6, padding:'8px 12px', color:T.text, fontSize:13, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
              <div style={{ display:'flex', gap:8 }}>
                <input placeholder="Due date" value={form.due} onChange={e => setForm({...form, due:e.target.value})} style={{ flex:1, background:T.bg, border:`1px solid ${T.borderMid}`, borderRadius:6, padding:'8px 12px', color:T.text, fontSize:13, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
                <input placeholder="Owner" value={form.owner} onChange={e => setForm({...form, owner:e.target.value})} style={{ flex:1, background:T.bg, border:`1px solid ${T.borderMid}`, borderRadius:6, padding:'8px 12px', color:T.text, fontSize:13, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
              </div>
              <button onClick={addCommitment} style={{ background:T.violet, color:'#fff', border:'none', borderRadius:6, padding:'8px 16px', fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif', fontWeight:600 }}>Add Commitment</button>
            </div>
          )}

          {getCommitments(selected).map((c, i) => (
            <div key={i} style={{ padding:10, borderRadius:6, background:c.status==='overdue'?T.redDim:T.surfaceHigh, borderLeft:`2px solid ${c.status==='overdue'?T.red:T.borderMid}`, marginBottom:8 }}>
              <div style={{ fontSize:13, color:T.text }}>{c.text}</div>
              <div style={{ fontSize:11, color:c.status==='overdue'?T.red:T.textSub, marginTop:4 }}>
                Due: {c.due} · {c.owner} {c.status==='overdue' && <Tag color={T.red} bg={T.redDim} style={{ marginLeft:6 }}>OVERDUE</Tag>}
              </div>
            </div>
          ))}

          <SLabel style={{ marginTop:20 }}>Meeting History</SLabel>
          {selected.meetings.map((m, i) => (
            <div key={i} style={{ padding:12, background:T.surfaceHigh, borderRadius:8, marginBottom:8 }}>
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                <Tag>{m.date}</Tag>
                <Tag color={T.violet} bg={T.violetDim}>{m.type}</Tag>
              </div>
              <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>{m.attendees.join(', ')}</div>
              <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{m.notes}</div>
            </div>
          ))}
        </>}
      </Sheet>
    </div>
  )
}
