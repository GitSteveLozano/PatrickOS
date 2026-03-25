import { useState } from 'react'
import { T } from '../theme.js'
import { FOUNDATION, OKRS, PEOPLE, MESH_ENTRIES } from '../data.js'
import { Card, SLabel, Sheet, Tag, HDot, Pulse, WorkBar, OKRBar } from '../components/UI.jsx'
import StakeholdersTab from './StakeholdersTab.jsx'

const tabs = ['Foundation','OKRs','People & Agents','Stakeholders']
const statusColor = { risk:T.red, drifting:T.amber, track:T.green }

export default function OrgScreen({ isMobile }) {
  const [tab, setTab] = useState(0)
  const [selectedPerson, setSelectedPerson] = useState(null)

  const humans = PEOPLE.filter(p => p.type==='human')
  const agents = PEOPLE.filter(p => p.type==='agent')
  const atRisk = PEOPLE.filter(p => p.health==='risk' || (p.workload && p.workload >= 90)).length

  return (
    <div>
      <div style={{ display:'flex', gap:0, marginBottom:24, borderBottom:`1px solid ${T.border}`, overflow:'auto' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ padding:'10px 16px', background:'none', border:'none', borderBottom:tab===i?`2px solid ${T.violet}`:'2px solid transparent', color:tab===i?T.text:T.textSub, fontSize:13, fontFamily:'DM Sans, sans-serif', fontWeight:tab===i?600:400, cursor:'pointer', whiteSpace:'nowrap' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <Card>
            <SLabel>Mission</SLabel>
            <div style={{ fontSize:16, fontFamily:'Fraunces, serif', fontStyle:'italic', color:T.text, lineHeight:1.6 }}>
              "{FOUNDATION.mission}"
            </div>
          </Card>
          <Card>
            <SLabel>Q4 Focus</SLabel>
            <div style={{ fontSize:14, color:T.text, lineHeight:1.6 }}>{FOUNDATION.focus}</div>
          </Card>
          <Card>
            <SLabel>Values</SLabel>
            {FOUNDATION.values.map((v, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:8 }}>
                <span style={{ color:T.violet, fontSize:12, marginTop:2 }}>◆</span>
                <span style={{ fontSize:14, color:T.text, lineHeight:1.5 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <SLabel>Known Exceptions</SLabel>
            {FOUNDATION.exceptions.map((e, i) => (
              <div key={i} style={{ padding:12, borderRadius:8, background:T.amberDim, marginBottom:i<FOUNDATION.exceptions.length-1?8:0 }}>
                <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{e.text}</div>
                <div style={{ fontSize:11, color:T.amber, marginTop:6, fontFamily:'JetBrains Mono, monospace' }}>
                  Expires: {e.expiry} · Set by: {e.by}
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === 1 && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {OKRS.map(o => (
            <Card key={o.id} accent={statusColor[o.status]}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, flex:1 }}>{o.objective}</div>
                <div style={{ fontSize:32, fontFamily:'Fraunces, serif', fontWeight:700, color:statusColor[o.status], marginLeft:16 }}>{o.pct}%</div>
              </div>
              <OKRBar pct={o.pct} color={statusColor[o.status]} style={{ marginBottom:16 }} />
              {o.keyResults.map((kr, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10 }}>
                  <div style={{ position:'relative', width:28, height:28, flexShrink:0 }}>
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="12" fill="none" stroke={T.border} strokeWidth="2" />
                      <circle cx="14" cy="14" r="12" fill="none" stroke={statusColor[o.status]} strokeWidth="2"
                        strokeDasharray={`${(kr.pct/100)*75.4} 75.4`} strokeLinecap="round"
                        transform="rotate(-90 14 14)" />
                    </svg>
                    <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontFamily:'JetBrains Mono, monospace', color:T.textSub }}>{kr.pct}</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, color:T.text }}>{kr.text}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>{kr.done}/{kr.total}</div>
                  </div>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8, marginBottom:20 }}>
            {[
              { label:'Humans', value:humans.length, color:T.text },
              { label:'Agents', value:agents.length, color:T.violet },
              { label:'At Risk', value:atRisk, color:T.red },
            ].map(s => (
              <div key={s.label} style={{ textAlign:'center', padding:12, background:T.surface, borderRadius:8, border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:700, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:9, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', color:T.textSub }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {PEOPLE.map(p => (
              <Card key={p.id} onClick={() => setSelectedPerson(p)}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  {p.type==='human' ? <HDot health={p.health} /> : <Pulse status={p.status} />}
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{p.name}</span>
                      <Tag>{p.type==='agent'?'AGENT':'HUMAN'}</Tag>
                    </div>
                    <div style={{ fontSize:12, color:T.textSub, marginTop:2 }}>{p.role} · {p.dept}</div>
                    {p.type==='human' && <WorkBar value={p.workload} style={{ marginTop:8 }} />}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 3 && <StakeholdersTab />}

      <Sheet open={!!selectedPerson} onClose={() => setSelectedPerson(null)} title={selectedPerson?.name}>
        {selectedPerson && <>
          <div style={{ fontSize:13, color:T.textSub, marginBottom:4 }}>{selectedPerson.role} · {selectedPerson.dept}</div>
          <div style={{ display:'flex', gap:6, marginBottom:16 }}>
            <Tag>{selectedPerson.type==='agent'?'AGENT':'HUMAN'}</Tag>
            {selectedPerson.type==='human' && <Tag color={statusColor[selectedPerson.health]} bg={selectedPerson.health==='risk'?T.redDim:selectedPerson.health==='drifting'?T.amberDim:T.greenDim}>{selectedPerson.health?.toUpperCase()}</Tag>}
          </div>
          <div style={{ fontSize:14, color:T.text, lineHeight:1.6, marginBottom:16 }}>{selectedPerson.bio}</div>
          {selectedPerson.type==='human' && <WorkBar label="Workload" value={selectedPerson.workload} style={{ marginBottom:20 }} />}
          {(() => {
            const meshItems = MESH_ENTRIES.filter(m => m.entity.toLowerCase().includes(selectedPerson.name.toLowerCase()) || m.by.toLowerCase().includes(selectedPerson.name.toLowerCase()) || m.text.toLowerCase().includes(selectedPerson.name.toLowerCase()))
            if (meshItems.length === 0) return null
            return <>
              <SLabel>Institutional Context</SLabel>
              {meshItems.map(m => (
                <div key={m.id} style={{ padding:10, borderRadius:6, background:T.tealDim, borderLeft:`2px solid ${T.teal}`, marginBottom:8 }}>
                  <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{m.text}</div>
                  <div style={{ fontSize:11, color:T.teal, marginTop:4, fontFamily:'JetBrains Mono, monospace' }}>{m.date} · {m.by}</div>
                </div>
              ))}
            </>
          })()}
        </>}
      </Sheet>
    </div>
  )
}
