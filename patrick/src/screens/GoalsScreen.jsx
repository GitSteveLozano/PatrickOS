import { useState } from 'react'
import { T } from '../theme.js'
import { PROJECTS, MESH_ENTRIES } from '../data.js'
import { Card, SLabel, Sheet, Tag, NNLTag, NNL_CONFIG, WorkBar } from '../components/UI.jsx'

const statusColor = { risk:T.red, drifting:T.amber, track:T.green }

export default function GoalsScreen({ isMobile }) {
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [projects, setProjects] = useState(PROJECTS)

  const nowCount = projects.filter(p => p.nnl==='now').length

  const filtered = filter==='all' ? projects : projects.filter(p => p.nnl===filter)

  const grouped = { now:filtered.filter(p=>p.nnl==='now'), next:filtered.filter(p=>p.nnl==='next'), later:filtered.filter(p=>p.nnl==='later') }

  const allTasks = projects.flatMap(p => p.tasks.filter(t => !t.done).map(t => ({ ...t, project:p.name, nnl:p.nnl })))

  const updateNNL = (id, val) => setProjects(prev => prev.map(p => p.id===id ? {...p, nnl:val} : p))

  const renderProject = (p) => (
    <Card key={p.id} onClick={() => setSelected(p)} style={{ marginBottom:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
        <div style={{ fontSize:15, fontWeight:600, color:T.text }}>{p.name}</div>
        <NNLTag value={p.nnl} onChange={(v) => { updateNNL(p.id, v) }} />
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>
        {p.client !== 'Internal' && <Tag color={T.blue} bg={T.blueDim}>{p.client}</Tag>}
        {p.client === 'Internal' && <Tag>INTERNAL</Tag>}
        {p.value !== '—' && <Tag color={T.green} bg={T.greenDim}>{p.value}</Tag>}
      </div>
      <div style={{ height:4, borderRadius:2, background:T.border, marginBottom:8 }}>
        <div style={{ height:'100%', borderRadius:2, background:statusColor[p.status], width:`${p.pct}%`, transition:'width 0.3s' }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:T.textSub }}>
        <span>{p.ownerName}</span>
        <span>Due: {p.due}</span>
      </div>
    </Card>
  )

  return (
    <div>
      <div style={{ display:'flex', gap:0, marginBottom:24, borderBottom:`1px solid ${T.border}` }}>
        {['Projects','All Tasks'].map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ padding:'10px 16px', background:'none', border:'none', borderBottom:tab===i?`2px solid ${T.violet}`:'2px solid transparent', color:tab===i?T.text:T.textSub, fontSize:13, fontFamily:'DM Sans, sans-serif', fontWeight:tab===i?600:400, cursor:'pointer' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <>
        {nowCount > 3 && (
          <div style={{ padding:12, borderRadius:8, background:T.amberDim, borderLeft:`3px solid ${T.amber}`, marginBottom:16 }}>
            <span style={{ fontSize:13, color:T.amber, fontWeight:600 }}>Capacity warning: </span>
            <span style={{ fontSize:13, color:T.textSub }}>{nowCount} items in Now — consider moving lower-priority work to Next.</span>
          </div>
        )}

        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {['all','now','next','later'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 14px', borderRadius:6, border:`1px solid ${filter===f?T.violet:T.border}`, background:filter===f?T.violetDim:'transparent', color:filter===f?T.violet:T.textSub, fontSize:11, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', cursor:'pointer', fontWeight:600 }}>
              {f}
            </button>
          ))}
        </div>

        {filter === 'all' ? (
          Object.entries(grouped).map(([k, items]) => items.length > 0 && (
            <div key={k} style={{ marginBottom:24 }}>
              <SLabel style={{ color:NNL_CONFIG[k].color }}>{NNL_CONFIG[k].label} — {items.length} project{items.length>1?'s':''}</SLabel>
              {items.map(renderProject)}
            </div>
          ))
        ) : (
          filtered.map(renderProject)
        )}
      </>}

      {tab === 1 && (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {allTasks.map((t, i) => (
            <Card key={i}>
              <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                <Tag color={NNL_CONFIG[t.nnl]?.color} bg={NNL_CONFIG[t.nnl]?.bg}>{t.nnl}</Tag>
                <span style={{ fontSize:13, color:T.textSub }}>{t.project}</span>
                {t.overdue && <Tag color={T.red} bg={T.redDim}>OVERDUE</Tag>}
              </div>
              <div style={{ fontSize:14, color:T.text, marginTop:6 }}>{t.text}</div>
              <div style={{ fontSize:12, color:T.textSub, marginTop:4 }}>{t.owner}</div>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:16 }}>
            <NNLTag value={selected.nnl} onChange={(v) => updateNNL(selected.id, v)} />
            {selected.client !== 'Internal' && <Tag color={T.blue} bg={T.blueDim}>{selected.client}</Tag>}
            {selected.value !== '—' && <Tag color={T.green} bg={T.greenDim}>{selected.value}</Tag>}
          </div>

          <SLabel>Tasks</SLabel>
          {selected.tasks.map((t, i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${T.border}` }}>
              <span style={{ fontSize:16, color:t.done?T.green:t.overdue?T.red:T.textDim }}>{t.done?'✓':'○'}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:t.overdue?T.red:t.done?T.textSub:T.text, textDecoration:t.done?'line-through':'none' }}>{t.text}</div>
                <div style={{ fontSize:11, color:T.textSub }}>{t.owner}</div>
              </div>
              {t.overdue && <Tag color={T.red} bg={T.redDim}>OVERDUE</Tag>}
            </div>
          ))}

          {(() => {
            const meshItems = MESH_ENTRIES.filter(m => selected.client && m.entity.toLowerCase().includes(selected.client.toLowerCase()))
            if (meshItems.length === 0) return null
            return <>
              <SLabel style={{ marginTop:20 }}>Mesh Context</SLabel>
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
