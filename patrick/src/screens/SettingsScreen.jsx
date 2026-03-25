import { useState } from 'react'
import { T } from '../theme.js'
import { CONNECTORS } from '../data.js'
import { Card, SLabel, Src, Tag } from '../components/UI.jsx'

const settingsTabs = ['Workspace','Connectors','Notifications','Patrick\'s Voice']

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background:on?T.violet:T.textDim, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:on?23:3, transition:'left 0.2s' }} />
    </div>
  )
}

export default function SettingsScreen({ onClose }) {
  const [tab, setTab] = useState(0)
  const [notifs, setNotifs] = useState({ daily:true, critical:true, developing:false, weekly:true })
  const [voice, setVoice] = useState({ directness:'direct', length:'standard' })

  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, background:T.bg, overflow:'auto' }}>
      <div style={{ maxWidth:640, margin:'0 auto', padding:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h2 style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:0 }}>Settings</h2>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'8px 16px', color:T.textSub, fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Close</button>
        </div>

        <div style={{ display:'flex', gap:0, marginBottom:24, borderBottom:`1px solid ${T.border}`, overflow:'auto' }}>
          {settingsTabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ padding:'10px 16px', background:'none', border:'none', borderBottom:tab===i?`2px solid ${T.violet}`:'2px solid transparent', color:tab===i?T.text:T.textSub, fontSize:13, fontFamily:'DM Sans, sans-serif', fontWeight:tab===i?600:400, cursor:'pointer', whiteSpace:'nowrap' }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace', display:'block', marginBottom:6 }}>COMPANY NAME</label>
              <input defaultValue="Meridian Advisory" style={{ width:'100%', boxSizing:'border-box', background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'10px 14px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
            </div>
            <div>
              <label style={{ fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace', display:'block', marginBottom:6 }}>INDUSTRY</label>
              <input defaultValue="Professional Services" style={{ width:'100%', boxSizing:'border-box', background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'10px 14px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:14, color:T.text }}>Team Members</div>
                <div style={{ fontSize:12, color:T.textSub }}>32 people · 3 agents</div>
              </div>
              <button style={{ padding:'8px 16px', borderRadius:8, background:T.violet, color:'#fff', border:'none', fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Invite</button>
            </div>
            <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:16, display:'flex', flexDirection:'column', gap:12 }}>
              {['Export Data','Delete Workspace','Privacy Policy'].map(item => (
                <button key={item} style={{ background:'none', border:'none', color:item==='Delete Workspace'?T.red:T.textSub, fontSize:13, cursor:'pointer', textAlign:'left', padding:'4px 0', fontFamily:'DM Sans, sans-serif' }}>{item}</button>
              ))}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {CONNECTORS.map(c => (
              <Card key={c.id} accent={c.status==='healthy'?T.green:T.amber}>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <Src id={c.id} />
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                      <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{c.name}</span>
                      <Tag color={c.status==='healthy'?T.green:T.amber} bg={c.status==='healthy'?T.greenDim:T.amberDim}>{c.status}</Tag>
                    </div>
                    <div style={{ fontSize:12, color:T.textSub }}>{c.note}</div>
                    <div style={{ fontSize:11, color:T.textDim, marginTop:4, fontFamily:'JetBrains Mono, monospace' }}>Last sync: {c.sync}</div>
                  </div>
                </div>
                {c.status==='degraded' && (
                  <div style={{ marginTop:8, padding:8, borderRadius:6, background:T.amberDim, fontSize:12, color:T.amber }}>⚠ Partial sync — review permissions to restore full connectivity.</div>
                )}
              </Card>
            ))}
            <div style={{ padding:16, borderRadius:10, border:`2px dashed ${T.borderMid}`, textAlign:'center', cursor:'pointer', color:T.textSub, fontSize:13 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.violet}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.borderMid}>
              + Add Connector
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {[
              { key:'daily', label:'Daily Briefing', desc:'Morning summary of priorities and overnight changes' },
              { key:'critical', label:'Critical Alerts', desc:'Immediate notification for risk escalations and urgent decisions' },
              { key:'developing', label:'Developing Situations', desc:'Updates on emerging issues before they become critical' },
              { key:'weekly', label:'Weekly Digest', desc:'End-of-week summary with trend analysis' },
            ].map(n => (
              <div key={n.key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:`1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize:14, color:T.text, marginBottom:2 }}>{n.label}</div>
                  <div style={{ fontSize:12, color:T.textSub }}>{n.desc}</div>
                </div>
                <Toggle on={notifs[n.key]} onToggle={() => setNotifs(prev => ({ ...prev, [n.key]:!prev[n.key] }))} />
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            <div>
              <SLabel>Directness</SLabel>
              <div style={{ display:'flex', gap:8 }}>
                {['direct','diplomatic'].map(v => (
                  <button key={v} onClick={() => setVoice(prev => ({...prev, directness:v}))} style={{ flex:1, padding:'12px 16px', borderRadius:8, border:`1px solid ${voice.directness===v?T.violet:T.border}`, background:voice.directness===v?T.violetDim:'transparent', color:voice.directness===v?T.violet:T.textSub, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', textTransform:'capitalize' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SLabel>Briefing Length</SLabel>
              <div style={{ display:'flex', gap:8 }}>
                {['short','standard','detailed'].map(v => (
                  <button key={v} onClick={() => setVoice(prev => ({...prev, length:v}))} style={{ flex:1, padding:'12px 16px', borderRadius:8, border:`1px solid ${voice.length===v?T.violet:T.border}`, background:voice.length===v?T.violetDim:'transparent', color:voice.length===v?T.violet:T.textSub, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', textTransform:'capitalize' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
