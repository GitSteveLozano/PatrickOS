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
  return (
    <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:active?T.green:T.textDim, boxShadow:active?`0 0 8px ${T.green}`:'none', animation:active?'pulse 2s infinite':'none', flexShrink:0 }} />
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
  now: { label:'NOW', color:T.red, bg:T.redDim },
  next: { label:'NEXT', color:T.amber, bg:T.amberDim },
  later: { label:'LATER', color:T.textSub, bg:'rgba(255,255,255,0.04)' },
}

export function NNLTag({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const cfg = NNL_CONFIG[value] || NNL_CONFIG.later
  return (
    <span style={{ position:'relative', display:'inline-block' }}>
      <span onClick={() => setOpen(!open)} style={{ display:'inline-block', padding:'2px 8px', borderRadius:4, background:cfg.bg, color:cfg.color, fontSize:10, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', fontWeight:600, cursor:'pointer', letterSpacing:'0.5px' }}>
        {cfg.label} ▾
      </span>
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, marginTop:4, background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:6, zIndex:10, overflow:'hidden' }}>
          {Object.entries(NNL_CONFIG).map(([k, v]) => (
            <div key={k} onClick={() => { onChange?.(k); setOpen(false) }}
              style={{ padding:'6px 16px', cursor:'pointer', color:v.color, fontSize:10, fontFamily:'JetBrains Mono, monospace', textTransform:'uppercase', fontWeight:600, background:k===value?v.bg:'transparent' }}
              onMouseEnter={e => e.currentTarget.style.background = v.bg}
              onMouseLeave={e => { if(k!==value) e.currentTarget.style.background = 'transparent' }}>
              {v.label}
            </div>
          ))}
        </div>
      )}
    </span>
  )
}
