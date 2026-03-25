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
