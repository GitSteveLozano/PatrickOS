import { useState, useEffect, useCallback } from 'react'
import { T } from '../theme.js'
import { FOUNDATION, PEOPLE } from '../data.js'
import { SLabel, Card, Toggle, Tag, HDot } from '../components/UI.jsx'

const sections = ['Company Context','Team Roster','Notifications',"Patrick's Voice",'Workspace & Billing','Developers']

const inputStyle = {
  width:'100%', boxSizing:'border-box', background:T.surfaceHigh,
  border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'10px 14px',
  color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none',
}

const textareaStyle = {
  ...inputStyle, minHeight:80, resize:'vertical', lineHeight:1.6,
}

const labelStyle = {
  fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace',
  display:'block', marginBottom:6,
}

const noteStyle = {
  fontSize:12, color:T.textDim, lineHeight:1.5, marginTop:6, fontStyle:'italic',
}

const btnBase = {
  borderRadius:8, fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif',
  fontWeight:600, border:'none', padding:'10px 16px', transition:'all 0.15s',
}

function ChoiceButton({ label, active, onClick, desc }) {
  return (
    <button onClick={onClick} style={{
      ...btnBase, flex:1, textAlign:'left', padding:'14px 16px',
      border:`1px solid ${active ? T.violet : T.border}`,
      background: active ? T.violetDim : 'transparent',
      color: active ? T.violet : T.textSub,
    }}>
      <div style={{ textTransform:'capitalize', marginBottom: desc ? 4 : 0 }}>{label}</div>
      {desc && <div style={{ fontSize:11, fontWeight:400, opacity:0.8 }}>{desc}</div>}
    </button>
  )
}

function FieldGroup({ label, note, children }) {
  return (
    <div style={{ marginBottom:24 }}>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
      {note && <div style={noteStyle}>{note}</div>}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h3 style={{ fontSize:18, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:'0 0 24px 0' }}>
      {children}
    </h3>
  )
}

/* ── Section Components ── */

function CompanyContextSection({ onSave }) {
  return (
    <div>
      <SectionTitle>Company Context</SectionTitle>

      <FieldGroup label="STRATEGIC PRIORITIES" note="Your 90-day focus. Patrick uses this to calibrate what matters.">
        <textarea
          defaultValue={FOUNDATION.focus}
          onChange={onSave}
          style={textareaStyle}
        />
      </FieldGroup>

      <FieldGroup label="ORGANIZATIONAL CONTEXT" note="Company stage, industry, team structure, known constraints.">
        <textarea
          defaultValue="32-person professional services firm. Mid-market advisory. Growth stage."
          onChange={onSave}
          style={textareaStyle}
        />
      </FieldGroup>

      <FieldGroup label="KNOWN EXCEPTIONS">
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FOUNDATION.exceptions.map((ex, i) => (
            <div key={i} style={{ padding:14, background:T.surfaceHigh, borderRadius:8, border:`1px solid ${T.border}` }}>
              <div style={{ fontSize:14, color:T.text, lineHeight:1.6, marginBottom:8 }}>{ex.text}</div>
              <div style={{ display:'flex', gap:16, fontSize:11, fontFamily:'JetBrains Mono, monospace', color:T.textDim }}>
                <span>Expires {ex.expiry}</span>
                <span>by {ex.by}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={noteStyle}>
          Each exception requires an expiry date. Expired exceptions are removed and noted in the next briefing.
        </div>
      </FieldGroup>
    </div>
  )
}

function TeamRosterSection({ onSave }) {
  const humans = PEOPLE.filter(p => p.type === 'human')
  const [excluded, setExcluded] = useState({})
  const [reasons, setReasons] = useState({})

  const toggleExclude = (id) => {
    setExcluded(prev => {
      const next = { ...prev, [id]: !prev[id] }
      onSave()
      return next
    })
  }

  return (
    <div>
      <SectionTitle>Team Roster</SectionTitle>

      <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
        {humans.map(p => (
          <div key={p.id}>
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'14px 0', borderBottom:`1px solid ${T.border}`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <HDot health={p.health} />
                <div>
                  <div style={{ fontSize:14, color:T.text, fontWeight:500 }}>{p.name}</div>
                  <div style={{ fontSize:12, color:T.textSub }}>{p.role}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', color: excluded[p.id] ? T.red : T.green }}>
                  {excluded[p.id] ? 'Excluded' : 'Active'}
                </span>
                <Toggle on={!excluded[p.id]} onToggle={() => toggleExclude(p.id)} />
              </div>
            </div>

            {excluded[p.id] && (
              <div style={{ padding:'10px 0 14px 18px' }}>
                <input
                  placeholder="Why? (e.g., Left the company, On leave, Other)"
                  value={reasons[p.id] || ''}
                  onChange={e => { setReasons(prev => ({ ...prev, [p.id]: e.target.value })); onSave() }}
                  style={{ ...inputStyle, fontSize:12, padding:'8px 12px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={noteStyle}>
        Excluded stops signal generation but retains historical data.
      </div>

      <button style={{
        ...btnBase, marginTop:24, background:T.violet, color:'#fff', width:'100%',
        padding:'12px 16px',
      }}>
        Invite Team Members
      </button>
      <div style={{ fontSize:12, color:T.textDim, marginTop:8 }}>
        Two roles available: <strong style={{ color:T.textSub }}>Admin</strong> (full access) and <strong style={{ color:T.textSub }}>Viewer</strong> (read access).
      </div>
    </div>
  )
}

function NotificationsSection({ notifs, setNotifs, briefingTime, setBriefingTime, briefingChannel, setBriefingChannel, silenceStart, setSilenceStart, silenceEnd, setSilenceEnd, onSave }) {
  const channels = ['in-app','email','slack']

  return (
    <div>
      <SectionTitle>Notifications</SectionTitle>

      <FieldGroup label="DAILY BRIEFING DELIVERY">
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <input
            type="time"
            value={briefingTime}
            onChange={e => { setBriefingTime(e.target.value); onSave() }}
            style={{ ...inputStyle, width:130 }}
          />
          <div style={{ display:'flex', gap:8 }}>
            {channels.map(ch => (
              <button
                key={ch}
                onClick={() => { setBriefingChannel(ch); onSave() }}
                style={{
                  ...btnBase, padding:'8px 14px', fontWeight:500,
                  border:`1px solid ${briefingChannel === ch ? T.violet : T.border}`,
                  background: briefingChannel === ch ? T.violetDim : 'transparent',
                  color: briefingChannel === ch ? T.violet : T.textSub,
                  textTransform:'capitalize',
                  position:'relative',
                }}
              >
                {ch === 'slack' ? 'Slack DM' : ch === 'in-app' ? 'In-app' : 'Email'}
                {ch === 'slack' && (
                  <Tag color={T.green} style={{ marginLeft:6, fontSize:8, padding:'1px 5px' }}>recommended</Tag>
                )}
              </button>
            ))}
          </div>
        </div>
      </FieldGroup>

      <FieldGroup label="ALERT THRESHOLDS">
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[
            { key:'critical', label:'Critical', desc:'Immediate notification' },
            { key:'developing', label:'Developing', desc:'Included in briefing' },
          ].map(n => (
            <div key={n.key} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'14px 0', borderBottom:`1px solid ${T.border}`,
            }}>
              <div>
                <div style={{ fontSize:14, color:T.text, marginBottom:2 }}>{n.label}</div>
                <div style={{ fontSize:12, color:T.textSub }}>{n.desc}</div>
              </div>
              <Toggle on={notifs[n.key]} onToggle={() => { setNotifs(prev => ({ ...prev, [n.key]:!prev[n.key] })); onSave() }} />
            </div>
          ))}
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'14px 0', borderBottom:`1px solid ${T.border}`,
          }}>
            <div>
              <div style={{ fontSize:14, color:T.text, marginBottom:2 }}>Watching</div>
              <div style={{ fontSize:12, color:T.textSub }}>Feed only</div>
            </div>
            <span style={{ fontSize:12, color:T.textDim, fontFamily:'JetBrains Mono, monospace' }}>Always on</span>
          </div>
        </div>
      </FieldGroup>

      <FieldGroup label="WEEKLY DIGEST">
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'14px 0',
        }}>
          <div>
            <div style={{ fontSize:14, color:T.text, marginBottom:2 }}>Friday Afternoon Summary</div>
            <div style={{ fontSize:12, color:T.textSub }}>
              Friday afternoon summary of the week's highest Disagreement Index moments.
            </div>
          </div>
          <Toggle on={notifs.weekly} onToggle={() => { setNotifs(prev => ({ ...prev, weekly:!prev.weekly })); onSave() }} />
        </div>
      </FieldGroup>

      <FieldGroup label="SILENCE WINDOW">
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <input
            type="time"
            value={silenceStart}
            onChange={e => { setSilenceStart(e.target.value); onSave() }}
            style={{ ...inputStyle, width:130 }}
          />
          <span style={{ color:T.textDim, fontSize:13 }}>to</span>
          <input
            type="time"
            value={silenceEnd}
            onChange={e => { setSilenceEnd(e.target.value); onSave() }}
            style={{ ...inputStyle, width:130 }}
          />
        </div>
        <div style={noteStyle}>
          No notifications during this window. The "Wake Patrick up" override on the Home screen bypasses silence.
        </div>
      </FieldGroup>
    </div>
  )
}

function VoiceSection({ voice, setVoice, onSave }) {
  return (
    <div>
      <SectionTitle>Patrick's Voice</SectionTitle>

      <FieldGroup label="DIRECTNESS">
        <div style={{ display:'flex', gap:8 }}>
          <ChoiceButton
            label="Direct"
            desc="Patrick states assessments plainly."
            active={voice.directness === 'direct'}
            onClick={() => { setVoice(prev => ({ ...prev, directness:'direct' })); onSave() }}
          />
          <ChoiceButton
            label="Diplomatic"
            desc="Patrick frames assessments more carefully."
            active={voice.directness === 'diplomatic'}
            onClick={() => { setVoice(prev => ({ ...prev, directness:'diplomatic' })); onSave() }}
          />
        </div>
      </FieldGroup>

      <FieldGroup label="BRIEFING LENGTH">
        <div style={{ display:'flex', gap:8 }}>
          <ChoiceButton
            label="Short"
            desc="4-6 sentences"
            active={voice.length === 'short'}
            onClick={() => { setVoice(prev => ({ ...prev, length:'short' })); onSave() }}
          />
          <ChoiceButton
            label="Standard"
            desc="Default length"
            active={voice.length === 'standard'}
            onClick={() => { setVoice(prev => ({ ...prev, length:'standard' })); onSave() }}
          />
          <ChoiceButton
            label="Detailed"
            desc="Expanded with evidence"
            active={voice.length === 'detailed'}
            onClick={() => { setVoice(prev => ({ ...prev, length:'detailed' })); onSave() }}
          />
        </div>
      </FieldGroup>

      <FieldGroup label="INDUSTRY CONTEXT" note="Anything Patrick should know about your industry that affects how it interprets signals.">
        <textarea
          placeholder="e.g., Professional services firms have seasonal client cycles..."
          onChange={onSave}
          style={textareaStyle}
        />
      </FieldGroup>
    </div>
  )
}

function WorkspaceBillingSection({ onSave }) {
  return (
    <div>
      <SectionTitle>Workspace & Billing</SectionTitle>

      <FieldGroup label="COMPANY NAME">
        <input defaultValue="Meridian Advisory" onChange={onSave} style={inputStyle} />
      </FieldGroup>

      <FieldGroup label="TIMEZONE">
        <select
          defaultValue="America/New_York"
          onChange={onSave}
          style={{ ...inputStyle, appearance:'auto' }}
        >
          {['America/New_York','America/Chicago','America/Denver','America/Los_Angeles','Europe/London','Europe/Berlin','Asia/Tokyo','Asia/Shanghai','Australia/Sydney'].map(tz => (
            <option key={tz} value={tz}>{tz.replace(/_/g,' ')}</option>
          ))}
        </select>
      </FieldGroup>

      <FieldGroup label="CURRENT PLAN">
        <div style={{ padding:16, background:T.surfaceHigh, borderRadius:8, border:`1px solid ${T.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:16, fontWeight:600, color:T.text }}>Patrick Pro</span>
            <span style={{ fontSize:12, fontFamily:'JetBrains Mono, monospace', color:T.textDim }}>
              Renews April 15, 2026
            </span>
          </div>
        </div>
      </FieldGroup>

      <FieldGroup label="USAGE">
        <div style={{ fontSize:13, color:T.textSub, lineHeight:1.8 }}>
          247 institutional captures &middot; 9 active signals &middot; 4 connectors
        </div>
      </FieldGroup>

      <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:24, marginTop:8 }}>
        <SLabel>Data & Privacy</SLabel>

        <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:12 }}>
          <div>
            <button style={{
              ...btnBase, background:T.surfaceHigh, color:T.textSub,
              border:`1px solid ${T.borderMid}`, padding:'10px 18px',
            }}>
              Export your data
            </button>
            <div style={{ fontSize:11, color:T.textDim, marginTop:4, paddingLeft:2 }}>
              Full JSON and CSV export including all institutional context captures.
            </div>
          </div>

          <div>
            <button style={{
              ...btnBase, background:'transparent', color:T.red,
              border:`1px solid ${T.borderMid}`, padding:'10px 18px',
            }}>
              Delete your workspace
            </button>
            <div style={{ fontSize:11, color:T.textDim, marginTop:4, paddingLeft:2 }}>
              Permanent after 30-day recovery window.
            </div>
          </div>

          <button style={{
            ...btnBase, background:'none', color:T.textSub, padding:'4px 0',
            textAlign:'left', border:'none', textDecoration:'underline',
            textUnderlineOffset:3, fontWeight:400, fontSize:12,
          }}>
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  )
}

function DevelopersSection({ onSave }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText('pk_live_xxxxxxxxxxxxxxxx').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <SectionTitle>Developers</SectionTitle>

      <FieldGroup label="API KEY">
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <input
            readOnly
            value="pk_live_••••••••••••••••"
            style={{ ...inputStyle, flex:1, fontFamily:'JetBrains Mono, monospace', fontSize:13, color:T.textDim }}
          />
          <button onClick={handleCopy} style={{
            ...btnBase, background:T.surfaceHigh, color: copied ? T.green : T.textSub,
            border:`1px solid ${T.borderMid}`, padding:'10px 14px', flexShrink:0,
          }}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </FieldGroup>

      <FieldGroup label="WEBHOOK ENDPOINT">
        <input
          placeholder="https://your-server.com/webhook"
          onChange={onSave}
          style={inputStyle}
        />
      </FieldGroup>

      <div style={{ fontSize:12, color:T.textDim, marginTop:8 }}>
        Documentation at{' '}
        <span style={{ color:T.textSub, textDecoration:'underline', textUnderlineOffset:3 }}>
          docs.patrick.ai/api
        </span>
      </div>
    </div>
  )
}

/* ── Main Component ── */

export default function SettingsScreen({ isMobile }) {
  const [section, setSection] = useState(0)
  const [notifs, setNotifs] = useState({ daily:true, critical:true, developing:false, weekly:true })
  const [voice, setVoice] = useState({ directness:'direct', length:'standard' })
  const [briefingTime, setBriefingTime] = useState('06:00')
  const [briefingChannel, setBriefingChannel] = useState('slack')
  const [silenceStart, setSilenceStart] = useState('22:00')
  const [silenceEnd, setSilenceEnd] = useState('07:00')
  const [saved, setSaved] = useState(false)

  const saveTimerRef = { current: null }

  const triggerSave = useCallback(() => {
    setSaved(true)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => setSaved(false), 1500)
  }, [])

  const sidebarItem = (label, i) => {
    const active = section === i
    return (
      <button
        key={label}
        onClick={() => setSection(i)}
        style={{
          display:'block', width:'100%', textAlign:'left',
          padding:'10px 14px', borderRadius:6, border:'none',
          background: active ? T.surfaceHigh : 'transparent',
          color: active ? T.text : T.textSub,
          fontSize:13, fontFamily:'DM Sans, sans-serif',
          fontWeight: active ? 600 : 400,
          cursor:'pointer', transition:'all 0.15s',
          borderLeft: active ? `2px solid ${T.violet}` : '2px solid transparent',
          marginBottom:2,
        }}
      >
        {label}
      </button>
    )
  }

  const renderSection = () => {
    switch (section) {
      case 0: return <CompanyContextSection onSave={triggerSave} />
      case 1: return <TeamRosterSection onSave={triggerSave} />
      case 2: return (
        <NotificationsSection
          notifs={notifs} setNotifs={setNotifs}
          briefingTime={briefingTime} setBriefingTime={setBriefingTime}
          briefingChannel={briefingChannel} setBriefingChannel={setBriefingChannel}
          silenceStart={silenceStart} setSilenceStart={setSilenceStart}
          silenceEnd={silenceEnd} setSilenceEnd={setSilenceEnd}
          onSave={triggerSave}
        />
      )
      case 3: return <VoiceSection voice={voice} setVoice={setVoice} onSave={triggerSave} />
      case 4: return <WorkspaceBillingSection onSave={triggerSave} />
      case 5: return <DevelopersSection onSave={triggerSave} />
      default: return null
    }
  }

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <div style={{ background:T.bg, minHeight:'100vh', overflow:'auto' }}>
        <div style={{ padding:'20px 16px 12px' }}>
          <h2 style={{ fontSize:22, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:0 }}>
            Settings
          </h2>
        </div>

        {/* Horizontal scrolling section selector */}
        <div style={{
          display:'flex', gap:6, overflowX:'auto', padding:'0 16px 16px',
          WebkitOverflowScrolling:'touch', scrollbarWidth:'none',
        }}>
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => setSection(i)}
              style={{
                padding:'8px 14px', borderRadius:20, border:`1px solid ${section === i ? T.violet : T.borderMid}`,
                background: section === i ? T.violetDim : 'transparent',
                color: section === i ? T.violet : T.textSub,
                fontSize:12, fontFamily:'DM Sans, sans-serif', fontWeight: section === i ? 600 : 400,
                cursor:'pointer', whiteSpace:'nowrap', flexShrink:0,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Saved indicator */}
        {saved && (
          <div style={{
            position:'fixed', top:16, right:16, zIndex:100,
            padding:'6px 14px', borderRadius:6, background:T.surfaceHigh,
            border:`1px solid ${T.green}`, color:T.green,
            fontSize:12, fontFamily:'JetBrains Mono, monospace', fontWeight:600,
          }}>
            Saved
          </div>
        )}

        <div style={{ padding:'0 16px 40px' }}>
          {renderSection()}
        </div>
      </div>
    )
  }

  /* ── Desktop layout ── */
  return (
    <div style={{ display:'flex', background:T.bg, minHeight:'100vh', overflow:'hidden' }}>
      {/* Sidebar */}
      <div style={{
        width:180, flexShrink:0, padding:'32px 12px',
        borderRight:`1px solid ${T.border}`, overflow:'auto',
      }}>
        <h2 style={{
          fontSize:18, fontFamily:'Fraunces, serif', fontWeight:600,
          color:T.text, margin:'0 0 24px 14px',
        }}>
          Settings
        </h2>
        {sections.map((s, i) => sidebarItem(s, i))}
      </div>

      {/* Working area */}
      <div style={{ flex:1, overflow:'auto', position:'relative' }}>
        {/* Saved indicator */}
        {saved && (
          <div style={{
            position:'absolute', top:32, right:32, zIndex:10,
            padding:'6px 14px', borderRadius:6, background:T.surfaceHigh,
            border:`1px solid ${T.green}`, color:T.green,
            fontSize:12, fontFamily:'JetBrains Mono, monospace', fontWeight:600,
            transition:'opacity 0.3s',
          }}>
            Saved
          </div>
        )}

        <div style={{ maxWidth:600, padding:'32px 40px 60px' }}>
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
