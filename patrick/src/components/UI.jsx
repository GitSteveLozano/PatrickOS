import { useState, useRef, useEffect } from 'react'
import { T } from '../theme.js'

const srcColors = { slack:'#E01E5A', jira:'#0052CC', github:'#F0F0F0', salesforce:'#00A1E0', hubspot:'#FF7A59' }
export function Src({ id }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:24, height:24, borderRadius:6, background:srcColors[id]||T.surfaceHigh, color:id==='github'?'#000':'#fff', fontSize:10, fontFamily:'JetBrains Mono, monospace', fontWeight:700 }}>
      {(id||'').slice(0,2).toUpperCase()}
    </span>
  )
}

export function Tag({ children, color=T.textSub, bg, style }) {
  return (
    <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:4, background:bg||'rgba(255,255,255,0.06)', color, fontSize:10, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', fontWeight:600, letterSpacing:'0.5px', whiteSpace:'nowrap', ...style }}>
      {children}
    </span>
  )
}

export function HDot({ health }) {
  const c = health==='risk'?T.red:health==='drifting'?T.amber:T.green
  return <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:c, flexShrink:0 }} />
}

export function Pulse({ status }) {
  const active = status === 'active'
  const c = active ? T.teal : T.textDim
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:c }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:c, display:'inline-block', boxShadow:active?`0 0 6px ${c}`:undefined }} />
      {active ? 'Active' : 'Idle'}
    </span>
  )
}

export function WorkBar({ label, value, max=100, style }) {
  const pct = Math.min((value/max)*100, 100)
  const color = pct >= 90 ? T.red : pct >= 75 ? T.amber : T.green
  return (
    <div style={{ width:'100%', ...style }}>
      {label && <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:11, color:T.textSub, fontFamily:'JetBrains Mono, monospace' }}>{label}</span>
        <span style={{ fontSize:11, color, fontFamily:'JetBrains Mono, monospace', fontWeight:600 }}>{value}%</span>
      </div>}
      <div style={{ height:4, borderRadius:2, background:T.border }}>
        <div style={{ height:'100%', borderRadius:2, background:color, width:`${pct}%`, transition:'width 0.3s' }} />
      </div>
    </div>
  )
}

export function OKRBar({ pct, color, style }) {
  return (
    <div style={{ height:3, borderRadius:2, background:T.border, width:'100%', ...style }}>
      <div style={{ height:'100%', borderRadius:2, background:color||T.violet, width:`${Math.min(pct,100)}%`, transition:'width 0.3s' }} />
    </div>
  )
}

export function Card({ children, accent, onClick, style }) {
  return (
    <div onClick={onClick} style={{ background:T.surface, borderRadius:10, padding:16, border:`1px solid ${T.border}`, borderLeft:accent?`3px solid ${accent}`:`1px solid ${T.border}`, cursor:onClick?'pointer':'default', transition:'border-color 0.2s', ...style }}
      onMouseEnter={e => { if(onClick) e.currentTarget.style.borderColor = T.borderMid }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; if(accent) e.currentTarget.style.borderLeft = `3px solid ${accent}` }}>
      {children}
    </div>
  )
}

export function SLabel({ children, style }) {
  return (
    <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', color:T.textDim, letterSpacing:'1px', fontWeight:600, marginBottom:8, ...style }}>
      {children}
    </div>
  )
}

export function Sheet({ open, onClose, children, title }) {
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)
  const sheetRef = useRef(null)

  if (!open) return null

  const handleTouchStart = (e) => { startY.current = e.touches[0].clientY; setDragging(true) }
  const handleTouchEnd = (e) => {
    setDragging(false)
    if (e.changedTouches[0].clientY - startY.current > 100) onClose()
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }} onClick={onClose} />
      <div ref={sheetRef} style={{ position:'relative', background:T.bg, borderRadius:'16px 16px 0 0', maxHeight:'85vh', overflow:'auto', animation:'slideUp 0.3s ease-out', padding:'0 20px 20px' }}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 8px' }}>
          <div style={{ width:36, height:4, borderRadius:2, background:T.textDim }} />
        </div>
        {title && <div style={{ fontSize:18, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {title}
          <span onClick={onClose} style={{ cursor:'pointer', color:T.textSub, fontSize:20, padding:'0 4px' }}>&times;</span>
        </div>}
        {children}
      </div>
    </div>
  )
}

export const NNL_CONFIG = {
  now: { label:'Now', color:T.red, bg:T.redDim, desc:'Active — needs attention this sprint' },
  next: { label:'Next', color:T.amber, bg:T.amberDim, desc:'Queued — starts when capacity opens' },
  later: { label:'Later', color:T.textSub, bg:'rgba(255,255,255,0.06)', desc:'Backlog — not yet scheduled' },
}

export function NNLTag({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const cfg = NNL_CONFIG[value] || NNL_CONFIG.later
  return (
    <div style={{ position:'relative' }}>
      <span onClick={(e) => { e.stopPropagation(); setOpen(!open) }} style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:cfg.color, background:cfg.bg, padding:'3px 8px', borderRadius:3, letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', border:`1px solid ${cfg.color}40`, whiteSpace:'nowrap' }}>
        {cfg.label} ▾
      </span>
      {open && <>
        <div onClick={(e) => { e.stopPropagation(); setOpen(false) }} style={{ position:'fixed', inset:0, zIndex:98 }} />
        <div style={{ position:'absolute', top:'100%', left:0, marginTop:4, background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:6, zIndex:99, minWidth:160, boxShadow:'0 8px 24px rgba(0,0,0,0.5)' }}>
          {Object.entries(NNL_CONFIG).map(([key, c]) => (
            <div key={key} onClick={(e) => { e.stopPropagation(); onChange?.(key); setOpen(false) }} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:5, cursor:'pointer', marginBottom:2 }}>
              <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:c.color, background:c.bg, padding:'2px 7px', borderRadius:3, textTransform:'uppercase' }}>{c.label}</span>
              <span style={{ fontSize:11, color:T.textSub }}>{c.desc}</span>
            </div>
          ))}
        </div>
      </>}
    </div>
  )
}

/* ─── New Components ─── */

export function SeverityBadge({ level }) {
  const config = { watching: { color: T.textSub, label: 'Watching' }, developing: { color: T.amber, label: 'Developing' }, critical: { color: T.red, label: 'Critical' } }
  const c = config[level] || config.watching
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:c.color, textTransform:'uppercase', letterSpacing:'0.06em' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:c.color, flexShrink:0 }} />
      {c.label}
    </span>
  )
}

export function DiScore({ score, trend, context, onClick }) {
  const color = score > 60 ? T.red : score > 30 ? T.amber : T.green
  const arrow = trend === 'diverging' ? '↑' : trend === 'converging' ? '↓' : '→'
  const trendLabel = trend === 'diverging' ? 'Diverging' : trend === 'converging' ? 'Converging' : 'Stable'
  return (
    <div onClick={onClick} style={{ cursor:onClick?'pointer':'default', padding:20, background:T.surface, borderRadius:12, border:`1px solid ${T.border}` }}>
      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Disagreement Index</div>
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:6 }}>
        <span style={{ fontSize:36, fontFamily:'Fraunces, serif', fontWeight:700, color, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:14, fontFamily:"'JetBrains Mono',monospace", color, fontWeight:600 }}>{arrow} {trendLabel}</span>
      </div>
      {context && <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{context}</div>}
    </div>
  )
}

export function BriefingSection({ title, prose }) {
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', letterSpacing:'0.1em', color:T.textDim, marginBottom:10, fontWeight:600 }}>{title}</div>
      <div style={{ fontSize:15, color:T.text, lineHeight:1.75, fontFamily:"'DM Sans', sans-serif" }}>{prose}</div>
    </div>
  )
}

export function TheQuestion({ text }) {
  return (
    <div style={{ padding:'20px 0 20px 20px', borderLeft:`3px solid ${T.violet}`, marginBottom:28 }}>
      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', letterSpacing:'0.1em', color:T.violet, marginBottom:10, fontWeight:600 }}>The Question</div>
      <div style={{ fontSize:18, fontFamily:'Fraunces, serif', fontStyle:'italic', color:T.text, lineHeight:1.6, fontWeight:400 }}>{text}</div>
    </div>
  )
}

export function ContextCard({ date, entity, text }) {
  return (
    <div style={{ minWidth:280, maxWidth:320, padding:14, background:'rgba(0,196,161,0.06)', borderRadius:10, border:`1px solid rgba(0,196,161,0.15)`, flexShrink:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.teal, fontWeight:600 }}>{entity}</span>
        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>{date}</span>
      </div>
      <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{text}</div>
    </div>
  )
}

export function SignalCard({ signal, onClick, selected }) {
  const borderColor = selected ? T.violet : signal.group ? (signal.severity === 'critical' ? T.red : signal.severity === 'developing' ? T.amber : T.border) : T.border
  return (
    <div onClick={onClick} style={{ padding:14, background:selected ? T.surfaceHigh : T.surface, borderRadius:10, border:`1px solid ${T.border}`, borderLeft:`3px solid ${borderColor}`, cursor:'pointer', marginBottom:8, transition:'background 0.15s' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <div style={{ display:'flex', gap:4, alignItems:'center' }}>
          {signal.sources.map(s => <Src key={s} id={s} />)}
          <Tag color={signal.entityType==='person'?T.blue:signal.entityType==='deal'?T.green:T.amber} style={{ marginLeft:4 }}>{signal.entity}</Tag>
        </div>
        <SeverityBadge level={signal.severity} />
      </div>
      <div style={{ fontSize:14, color:T.text, lineHeight:1.6, marginBottom:8 }}>{signal.text}</div>
      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:T.textDim }}>{signal.detected}</div>
    </div>
  )
}

export function EntityRow({ entity, onClick, selected }) {
  const icons = { person:'◎', project:'◈', deal:'◉', agent:'→' }
  return (
    <div onClick={onClick} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:8, cursor:'pointer', background:selected?T.surfaceHigh:'transparent', borderLeft:selected?`3px solid ${T.violet}`:'3px solid transparent', transition:'background 0.15s' }}
      onMouseEnter={e => { if(!selected) e.currentTarget.style.background = T.surfaceHigh }}
      onMouseLeave={e => { if(!selected) e.currentTarget.style.background = 'transparent' }}>
      <span style={{ fontSize:14, color:T.textDim, fontFamily:"'JetBrains Mono',monospace", width:18, textAlign:'center' }}>{icons[entity.type]||'?'}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, color:T.text, fontWeight:selected?600:400, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{entity.name}</div>
      </div>
      <HDot health={entity.health} />
      {entity.diScore != null && <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:entity.diScore>60?T.red:entity.diScore>30?T.amber:T.green, fontWeight:600, minWidth:20, textAlign:'right' }}>{entity.diScore}</span>}
    </div>
  )
}

export function ConnectorCard({ connector, onReconnect, onRemove }) {
  const statusColors = { healthy:T.green, degraded:T.amber, disconnected:T.red }
  const c = statusColors[connector.status] || T.textDim
  return (
    <div style={{ background:T.surface, borderRadius:12, padding:20, border:`1px solid ${T.border}`, borderTop:`3px solid ${c}` }}>
      <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:12 }}>
        <Src id={connector.id} />
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
            <div>
              <span style={{ fontSize:16, fontWeight:600, color:T.text }}>{connector.name}</span>
              <span style={{ fontSize:12, color:T.textDim, marginLeft:8, fontFamily:"'JetBrains Mono',monospace" }}>{connector.account}</span>
            </div>
            <Tag color={c} bg={connector.status==='healthy'?T.greenDim:connector.status==='degraded'?T.amberDim:T.redDim}>{connector.status}</Tag>
          </div>
          <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5, marginBottom:8 }}>{connector.statusText}</div>
          <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:T.textDim, marginBottom:4 }}>Last sync: {connector.sync}</div>
          <div style={{ fontSize:12, color:T.textSub, marginBottom:12 }}>{connector.dataVolume}</div>
        </div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', color:T.textDim, letterSpacing:'0.08em', marginBottom:6, fontWeight:600 }}>Permissions</div>
        {connector.permissions?.map((p, i) => (
          <div key={i} style={{ fontSize:12, color:p.startsWith('Cannot')||p.startsWith('Needs')?T.amber:T.textSub, marginBottom:3, paddingLeft:8 }}>{p}</div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={onReconnect} style={{ padding:'8px 16px', borderRadius:8, background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, color:T.textSub, fontSize:12, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Reconnect</button>
        <button onClick={onRemove} style={{ padding:'8px 16px', borderRadius:8, background:'transparent', border:`1px solid ${T.borderMid}`, color:T.textDim, fontSize:12, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Remove</button>
      </div>
    </div>
  )
}

export function ProgressStep({ step, current, label }) {
  const done = step < current
  const active = step === current
  const color = done || active ? T.violet : T.textDim
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, minWidth:80 }}>
      <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:done?T.violet:active?T.violetDim:'transparent', border:`2px solid ${color}`, color:done?'#fff':color, fontSize:14, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>
        {done ? '✓' : step}
      </div>
      <span style={{ fontSize:11, color:active?T.text:T.textDim, fontFamily:"'JetBrains Mono',monospace", textAlign:'center' }}>{label}</span>
    </div>
  )
}

export function ProseBlock({ text }) {
  return <div style={{ fontSize:14, color:T.text, lineHeight:1.7, fontFamily:"'DM Sans', sans-serif" }}>{text}</div>
}

export function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background:on?T.violet:T.textDim, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:on?23:3, transition:'left 0.2s' }} />
    </div>
  )
}

export function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding:'5px 12px', borderRadius:20, border:`1px solid ${active?T.violet:T.borderMid}`, background:active?T.violetDim:'transparent', color:active?T.violet:T.textSub, fontSize:12, fontFamily:"'DM Sans',sans-serif", cursor:'pointer', whiteSpace:'nowrap', fontWeight:active?600:400, transition:'all 0.15s' }}>
      {label}
    </button>
  )
}
