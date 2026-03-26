import { useState } from 'react'
import { T } from '../theme.js'
import { PEOPLE, PROJECTS, STAKEHOLDERS, MESH_ENTRIES, SIGNALS } from '../data.js'
import { EntityRow, FilterPill, SLabel, HDot, WorkBar, Pulse, Card, Tag, Src, ContextCard, OKRBar } from '../components/UI.jsx'

const entities = [
  ...PEOPLE.filter(p => p.type === 'human').map(p => ({ id:p.id, name:p.name, type:'person', health:p.health, sub:p.role, diScore:p.workload > 90 ? 72 : p.workload > 75 ? 45 : 20, raw:p })),
  ...PROJECTS.map(p => ({ id:p.id, name:p.name, type:'project', health:p.status, sub:`${p.client} · ${p.value}`, diScore:p.status==='risk'?65:p.status==='drifting'?40:15, raw:p })),
  ...STAKEHOLDERS.map(s => ({ id:s.id, name:s.name, type:'deal', health:s.health, sub:`${s.role} · ${s.company}`, diScore:s.health==='risk'?70:s.health==='drifting'?42:12, raw:s })),
  ...PEOPLE.filter(p => p.type === 'agent').map(p => ({ id:p.id, name:p.name, type:'agent', health:p.health||'track', sub:p.role, diScore:null, raw:p })),
]

const healthOrder = { risk:0, drifting:1, track:2 }
const typeIcons = { person:'◎', project:'◈', deal:'◉', agent:'→' }
const typeColors = { person:T.blue || '#4A90D9', project:T.amber, deal:T.green, agent:T.teal }
const healthLabels = { risk:'At Risk', drifting:'Drifting', track:'On Track' }
const healthColors = { risk:T.red, drifting:T.amber, track:T.green }

function getRelatedEntities(entity) {
  const related = []
  if (entity.type === 'person') {
    const personName = entity.name
    PROJECTS.forEach(pr => {
      const isAssigned = pr.ownerName === personName || pr.tasks.some(t => t.owner === personName)
      if (isAssigned) {
        const match = entities.find(e => e.id === pr.id && e.type === 'project')
        if (match) related.push(match)
      }
    })
  } else if (entity.type === 'project') {
    const proj = entity.raw
    const ownerNames = new Set()
    if (proj.ownerName) ownerNames.add(proj.ownerName)
    if (proj.tasks) proj.tasks.forEach(t => { if (t.owner) ownerNames.add(t.owner) })
    ownerNames.forEach(name => {
      const match = entities.find(e => e.name === name && (e.type === 'person' || e.type === 'agent'))
      if (match) related.push(match)
    })
  } else if (entity.type === 'deal') {
    const deal = entity.raw
    if (deal.owner) {
      const match = entities.find(e => e.name === deal.owner && e.type === 'person')
      if (match) related.push(match)
    }
    if (deal.company) {
      PROJECTS.forEach(pr => {
        if (pr.client === deal.company) {
          const match = entities.find(e => e.id === pr.id && e.type === 'project')
          if (match) related.push(match)
        }
      })
    }
    if (deal.commitments) {
      deal.commitments.forEach(c => {
        if (c.owner) {
          const match = entities.find(e => e.name === c.owner && (e.type === 'person' || e.type === 'agent'))
          if (match && !related.find(r => r.id === match.id)) related.push(match)
        }
      })
    }
    if (deal.meetings) {
      deal.meetings.forEach(m => {
        if (m.attendees) {
          m.attendees.forEach(a => {
            const match = entities.find(e => e.name === a && (e.type === 'person' || e.type === 'agent'))
            if (match && !related.find(r => r.id === match.id)) related.push(match)
          })
        }
      })
    }
  }
  return related
}

function EntityDetail({ entity, onSelectEntity, isMobile }) {
  const [showCapture, setShowCapture] = useState(false)
  const [captureText, setCaptureText] = useState('')
  const [captureSaved, setCaptureSaved] = useState(false)

  const signals = SIGNALS.filter(s => s.entityId === entity.id).slice(0, 5)

  const meshEntries = MESH_ENTRIES.filter(m =>
    m.entity.toLowerCase().includes(entity.name.toLowerCase().split(' ')[0]) ||
    (entity.raw.company && m.entity.includes(entity.raw.company))
  )

  const related = getRelatedEntities(entity)

  const summaryText = entity.raw.bio || entity.sub

  const handleSaveCapture = () => {
    setCaptureSaved(true)
    setCaptureText('')
    setTimeout(() => {
      setShowCapture(false)
      setCaptureSaved(false)
    }, 1500)
  }

  return (
    <div style={{ padding: isMobile ? 16 : 24, overflowY:'auto', height:'100%' }}>
      {/* 1. Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, marginBottom:8 }}>
          {entity.name}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:10 }}>
          <Tag color={typeColors[entity.type]} bg={entity.type==='person'?'rgba(74,144,217,0.1)':entity.type==='project'?T.amberDim:entity.type==='deal'?T.greenDim:T.tealDim}>
            {typeIcons[entity.type]} {entity.type}
          </Tag>
          <div style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
            <HDot health={entity.health} />
            <span style={{ fontSize:12, color:healthColors[entity.health], fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>
              {healthLabels[entity.health] || entity.health}
            </span>
          </div>
          <span
            onClick={() => alert('Patrick calculates health status by analyzing workload capacity, delivery timelines, communication frequency, and comparing internal signals against external-facing activity. When these diverge, health degrades.')}
            style={{ fontSize:10, color:T.textDim, cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", textDecoration:'underline', textUnderlineOffset:2 }}
          >
            How Patrick calculates this
          </span>
          {entity.diScore != null && (
            <span style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:entity.diScore>60?T.red:entity.diScore>30?T.amber:T.green }}>
              DI {entity.diScore}
            </span>
          )}
        </div>
        <div style={{ fontSize:14, color:T.textSub, lineHeight:1.6, fontFamily:"'DM Sans', sans-serif" }}>
          {summaryText}
        </div>
      </div>

      {/* 2. Current Signals */}
      <div style={{ marginBottom:28 }}>
        <SLabel>Current Signals</SLabel>
        {signals.length === 0 ? (
          <div style={{ fontSize:13, color:T.textDim, fontStyle:'italic', padding:'12px 0' }}>
            No active signals for this entity.
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {signals.map(sig => {
              const sevColor = sig.severity === 'critical' ? T.red : sig.severity === 'developing' ? T.amber : T.textSub
              return (
                <div key={sig.id} style={{ padding:'10px 12px', background:T.surface, borderRadius:8, border:`1px solid ${T.border}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:sevColor, flexShrink:0 }} />
                    <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:sevColor, textTransform:'uppercase', fontWeight:600 }}>
                      {sig.severity}
                    </span>
                    <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginLeft:'auto' }}>
                      {sig.detected}
                    </span>
                  </div>
                  <div style={{ fontSize:13, color:T.text, lineHeight:1.5 }}>{sig.text}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 3. Activity Timeline */}
      <div style={{ marginBottom:28 }}>
        {entity.type === 'person' && (
          <>
            <SLabel>Activity</SLabel>
            <WorkBar label="Workload" value={entity.raw.workload} style={{ marginBottom:14 }} />
            {entity.raw.connectors && entity.raw.connectors.length > 0 && (
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, color:T.textDim, fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>Connected Sources</div>
                <div style={{ display:'flex', gap:6 }}>
                  {entity.raw.connectors.map(c => <Src key={c} id={c} />)}
                </div>
              </div>
            )}
            {entity.raw.dept && (
              <div style={{ fontSize:12, color:T.textSub, fontFamily:"'JetBrains Mono',monospace" }}>
                Department: {entity.raw.dept}
              </div>
            )}
          </>
        )}

        {entity.type === 'project' && (
          <>
            <SLabel>Project Progress</SLabel>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontSize:12, color:T.textSub, fontFamily:"'JetBrains Mono',monospace" }}>
                Owner: {entity.raw.ownerName}
              </span>
              <span style={{ fontSize:12, color:T.textSub, fontFamily:"'JetBrains Mono',monospace" }}>
                Due: {entity.raw.due}
              </span>
            </div>
            <OKRBar pct={entity.raw.pct} color={entity.health==='risk'?T.red:entity.health==='drifting'?T.amber:T.green} style={{ marginBottom:14 }} />
            <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:10 }}>
              {entity.raw.pct}% complete
            </div>
            {entity.raw.tasks && entity.raw.tasks.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                {entity.raw.tasks.map((task, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 10px', background:T.surface, borderRadius:6, border:`1px solid ${T.border}` }}>
                    <span style={{ fontSize:14, color:task.done ? T.green : task.overdue ? T.red : T.textDim, flexShrink:0 }}>
                      {task.done ? '✓' : task.overdue ? '!' : '○'}
                    </span>
                    <span style={{ fontSize:13, color:task.done ? T.textSub : T.text, textDecoration:task.done?'line-through':'none', flex:1 }}>
                      {task.text}
                    </span>
                    <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, whiteSpace:'nowrap' }}>
                      {task.owner}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {entity.type === 'deal' && (
          <>
            <SLabel>Relationship Details</SLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>
                <span style={{ color:T.textDim }}>Last Contact</span>
                <span style={{ color:entity.raw.daysSince > entity.raw.cadence ? T.red : T.textSub }}>
                  {entity.raw.lastContact} ({entity.raw.daysSince}d ago)
                </span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>
                <span style={{ color:T.textDim }}>Cadence</span>
                <span style={{ color:T.textSub }}>Every {entity.raw.cadence} days</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>
                <span style={{ color:T.textDim }}>Next Meeting</span>
                <span style={{ color:entity.raw.nextMeeting === 'Not scheduled' ? T.amber : T.textSub }}>{entity.raw.nextMeeting}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>
                <span style={{ color:T.textDim }}>Owner</span>
                <span style={{ color:T.textSub }}>{entity.raw.owner}</span>
              </div>
            </div>

            {entity.raw.commitments && entity.raw.commitments.length > 0 && (
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:6 }}>Commitments</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {entity.raw.commitments.map((c, i) => {
                    const statusColor = c.status === 'overdue' ? T.red : c.status === 'open' ? T.amber : T.green
                    return (
                      <div key={i} style={{ padding:'8px 10px', background:T.surface, borderRadius:6, border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:13, color:T.text, marginBottom:4 }}>{c.text}</div>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, fontFamily:"'JetBrains Mono',monospace" }}>
                          <span style={{ color:T.textDim }}>Due: {c.due}</span>
                          <span style={{ color:statusColor, textTransform:'uppercase', fontWeight:600 }}>{c.status}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {entity.raw.meetings && entity.raw.meetings.length > 0 && (
              <div>
                <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:6 }}>Recent Meetings</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {entity.raw.meetings.map((m, i) => (
                    <div key={i} style={{ padding:'8px 10px', background:T.surface, borderRadius:6, border:`1px solid ${T.border}` }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                        <span style={{ fontSize:12, fontWeight:600, color:T.text }}>{m.type}</span>
                        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>{m.date}</span>
                      </div>
                      <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5, marginBottom:4 }}>{m.notes}</div>
                      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>
                        {m.attendees.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {entity.type === 'agent' && (
          <>
            <SLabel>Agent Status</SLabel>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <Pulse status={entity.raw.status} />
            </div>
            <WorkBar label="Workload" value={entity.raw.workload} style={{ marginBottom:14 }} />
            {entity.raw.bio && (
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:14, fontFamily:"'DM Sans', sans-serif" }}>
                {entity.raw.bio}
              </div>
            )}
            {entity.raw.connectors && entity.raw.connectors.length > 0 && (
              <div>
                <div style={{ fontSize:11, color:T.textDim, fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>Connected Sources</div>
                <div style={{ display:'flex', gap:6 }}>
                  {entity.raw.connectors.map(c => <Src key={c} id={c} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Institutional Context */}
      <div style={{ marginBottom:28 }}>
        <SLabel>Institutional Context</SLabel>
        {meshEntries.length === 0 ? (
          <div style={{ fontSize:13, color:T.textDim, lineHeight:1.6, fontStyle:'italic', padding:'12px 0' }}>
            No institutional context captured yet. When decisions are made about this entity, capturing context here ensures that knowledge stays with your organization even when people leave.
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {meshEntries.map(m => (
              <div key={m.id} style={{ padding:14, background:'rgba(0,196,161,0.06)', borderRadius:10, border:'1px solid rgba(0,196,161,0.15)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.teal, fontWeight:600 }}>{m.entity}</span>
                  <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>{m.date}</span>
                </div>
                <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5, marginBottom:4 }}>{m.text}</div>
                <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>Captured by {m.by}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Capture Context */}
      <div style={{ marginBottom:28 }}>
        {!showCapture ? (
          <button
            onClick={() => { setShowCapture(true); setCaptureSaved(false) }}
            style={{
              padding:'10px 18px', borderRadius:8, background:T.surfaceHigh,
              border:`1px solid ${T.borderMid}`, color:T.textSub, fontSize:13,
              cursor:'pointer', fontFamily:"'DM Sans', sans-serif", width:'100%',
              textAlign:'left', transition:'border-color 0.2s'
            }}
          >
            + Add context Patrick should remember
          </button>
        ) : (
          <div style={{ background:T.surface, borderRadius:10, border:`1px solid ${T.border}`, padding:14 }}>
            <SLabel>Capture Context</SLabel>
            {captureSaved ? (
              <div style={{ fontSize:14, color:T.green, fontWeight:600, padding:'12px 0', textAlign:'center' }}>
                Context captured
              </div>
            ) : (
              <>
                <textarea
                  value={captureText}
                  onChange={e => setCaptureText(e.target.value)}
                  placeholder="What does Patrick need to know about this entity that it cannot see in your tools?"
                  style={{
                    width:'100%', minHeight:80, padding:10, borderRadius:6,
                    background:T.bg, border:`1px solid ${T.border}`, color:T.text,
                    fontSize:13, fontFamily:"'DM Sans', sans-serif", resize:'vertical',
                    outline:'none', lineHeight:1.6, boxSizing:'border-box'
                  }}
                />
                <div style={{ display:'flex', gap:8, marginTop:8, justifyContent:'flex-end' }}>
                  <button
                    onClick={() => { setShowCapture(false); setCaptureText('') }}
                    style={{
                      padding:'6px 14px', borderRadius:6, background:'transparent',
                      border:`1px solid ${T.borderMid}`, color:T.textDim, fontSize:12,
                      cursor:'pointer', fontFamily:"'DM Sans', sans-serif"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCapture}
                    disabled={!captureText.trim()}
                    style={{
                      padding:'6px 14px', borderRadius:6, background:captureText.trim() ? T.violet : T.textDim,
                      border:'none', color:'#fff', fontSize:12, cursor:captureText.trim() ? 'pointer' : 'not-allowed',
                      fontFamily:"'DM Sans', sans-serif", fontWeight:600
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 6. Related Entities */}
      {related.length > 0 && (
        <div style={{ marginBottom:28 }}>
          <SLabel>Related Entities</SLabel>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
            {related.map(r => (
              <div
                key={`${r.type}-${r.id}`}
                onClick={() => onSelectEntity(r.id)}
                style={{
                  flexShrink:0, padding:'10px 14px', background:T.surface, borderRadius:8,
                  border:`1px solid ${T.border}`, cursor:'pointer', minWidth:120,
                  transition:'border-color 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderMid }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:12, color:T.textDim, fontFamily:"'JetBrains Mono',monospace" }}>
                    {typeIcons[r.type]}
                  </span>
                  <HDot health={r.health} />
                </div>
                <div style={{ fontSize:13, color:T.text, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {r.name}
                </div>
                <div style={{ fontSize:10, color:T.textDim, fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', marginTop:2 }}>
                  {r.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EntitiesScreen({ isMobile, onNavigate }) {
  const [selected, setSelected] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [healthFilter, setHealthFilter] = useState('all')

  const filtered = entities
    .filter(e => typeFilter === 'all' || e.type === typeFilter)
    .filter(e => healthFilter === 'all' || (healthFilter === 'risk' && e.health === 'risk') || (healthFilter === 'drifting' && e.health === 'drifting') || (healthFilter === 'track' && e.health === 'track'))
    .sort((a, b) => (healthOrder[a.health] || 2) - (healthOrder[b.health] || 2))

  const selectedEntity = selected ? entities.find(e => e.id === selected) : null

  // Mobile: detail view replaces list
  if (isMobile && selectedEntity) {
    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', background:T.bg }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:10 }}>
          <button
            onClick={() => setSelected(null)}
            style={{
              background:'none', border:'none', color:T.textSub, fontSize:14,
              cursor:'pointer', fontFamily:"'DM Sans', sans-serif", padding:'4px 8px'
            }}
          >
            ← Back
          </button>
          <span style={{ fontSize:14, color:T.text, fontWeight:600 }}>{selectedEntity.name}</span>
        </div>
        <div style={{ flex:1, overflowY:'auto' }}>
          <EntityDetail entity={selectedEntity} onSelectEntity={setSelected} isMobile={isMobile} />
        </div>
      </div>
    )
  }

  // Mobile: list view
  if (isMobile) {
    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', background:T.bg }}>
        <div style={{ padding:'16px 16px 0' }}>
          <div style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, marginBottom:12 }}>
            Entities
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:6 }}>
            {[['all','All'],['person','People'],['project','Projects'],['deal','Deals'],['agent','Agents']].map(([val,label]) => (
              <FilterPill key={val} label={label} active={typeFilter===val} onClick={() => setTypeFilter(val)} />
            ))}
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8 }}>
            {[['all','All'],['risk','At Risk'],['drifting','Drifting'],['track','On Track']].map(([val,label]) => (
              <FilterPill key={val} label={label} active={healthFilter===val} onClick={() => setHealthFilter(val)} />
            ))}
          </div>
          <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:8 }}>
            {filtered.length} entities
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'0 4px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding:32, textAlign:'center', color:T.textDim, fontSize:13, fontStyle:'italic' }}>
              Patrick is still mapping your organization.
            </div>
          ) : (
            filtered.map(e => (
              <EntityRow key={e.id} entity={e} selected={selected===e.id} onClick={() => setSelected(e.id)} />
            ))
          )}
        </div>
      </div>
    )
  }

  // Desktop: two-column layout
  return (
    <div style={{ display:'flex', height:'100%', background:T.bg }}>
      {/* Left Column — Entity List */}
      <div style={{ width:280, flexShrink:0, borderRight:`1px solid ${T.border}`, display:'flex', flexDirection:'column', height:'100%' }}>
        <div style={{ padding:'20px 16px 0' }}>
          <div style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, marginBottom:14 }}>
            Entities
          </div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:6 }}>
            {[['all','All'],['person','People'],['project','Projects'],['deal','Deals'],['agent','Agents']].map(([val,label]) => (
              <FilterPill key={val} label={label} active={typeFilter===val} onClick={() => setTypeFilter(val)} />
            ))}
          </div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
            {[['all','All'],['risk','At Risk'],['drifting','Drifting'],['track','On Track']].map(([val,label]) => (
              <FilterPill key={val} label={label} active={healthFilter===val} onClick={() => setHealthFilter(val)} />
            ))}
          </div>
          <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:8 }}>
            {filtered.length} entities
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'0 4px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding:32, textAlign:'center', color:T.textDim, fontSize:13, fontStyle:'italic' }}>
              Patrick is still mapping your organization.
            </div>
          ) : (
            filtered.map(e => (
              <EntityRow key={e.id} entity={e} selected={selected===e.id} onClick={() => setSelected(e.id)} />
            ))
          )}
        </div>
      </div>

      {/* Right Column — Entity Detail */}
      <div style={{ flex:1, height:'100%', overflowY:'auto' }}>
        {!selectedEntity ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
            <span style={{ fontSize:15, color:T.textDim, fontStyle:'italic' }}>
              Select an entity to investigate
            </span>
          </div>
        ) : (
          <EntityDetail entity={selectedEntity} onSelectEntity={setSelected} isMobile={isMobile} />
        )}
      </div>
    </div>
  )
}
