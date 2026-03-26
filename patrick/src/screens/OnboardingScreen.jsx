import { useState, useEffect } from 'react'
import { T } from '../theme.js'
import { ProgressStep, BriefingSection, TheQuestion } from '../components/UI.jsx'

const inputStyle = { width:'100%', boxSizing:'border-box', background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'12px 14px', color:T.text, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:'none', marginBottom:12 }

const roles = [
  { key:'founder', label:'Founder / CEO' },
  { key:'ops', label:'Ops Lead' },
  { key:'cos', label:'Chief of Staff' },
  { key:'other', label:'Other' },
]

const connectorList = [
  { key:'jira', label:'Jira', color:'#0052CC' },
  { key:'github', label:'GitHub', color:'#F0F0F0', textColor:'#000' },
  { key:'salesforce', label:'Salesforce', color:'#00A1E0' },
]

const connectorMessages = {
  slack: 'Patrick is reading your last 30 days of messages',
  jira: 'Patrick is syncing your Jira projects',
  github: 'Patrick is scanning your repositories',
  salesforce: 'Patrick is importing your pipeline data',
}

function AnimatedDots() {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const iv = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400)
    return () => clearInterval(iv)
  }, [])
  return <span>{dots}</span>
}

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ email:'', company:'', role:'founder', password:'' })
  const [connectors, setConnectors] = useState({ slack:false, jira:false, github:false, salesforce:false })
  const [connecting, setConnecting] = useState(null)
  const [context, setContext] = useState({ focus:'', concern:'', teamSize:'' })
  const [generating, setGenerating] = useState(false)

  // Track which optional connector to show next
  const [optionalIndex, setOptionalIndex] = useState(0)
  // Track which optional connectors were skipped or connected
  const [optionalDone, setOptionalDone] = useState({ jira:false, github:false, salesforce:false })

  const handleConnectSlack = () => {
    setConnecting('slack')
    setTimeout(() => {
      setConnectors(prev => ({ ...prev, slack:true }))
      setConnecting(null)
    }, 2000)
  }

  const handleConnectOptional = (key) => {
    setConnecting(key)
    setTimeout(() => {
      setConnectors(prev => ({ ...prev, [key]:true }))
      setOptionalDone(prev => ({ ...prev, [key]:true }))
      setConnecting(null)
      setOptionalIndex(prev => prev + 1)
    }, 2000)
  }

  const handleSkipOptional = (key) => {
    setOptionalDone(prev => ({ ...prev, [key]:true }))
    setOptionalIndex(prev => prev + 1)
  }

  const handleGenerateBriefing = () => {
    setStep(4)
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2500)
  }

  const currentOptional = connectorList[optionalIndex] || null

  const textareaStyle = { ...inputStyle, minHeight:80, resize:'vertical' }

  const buttonBase = { width:'100%', padding:'14px 0', borderRadius:10, border:'none', fontSize:15, fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:'pointer', transition:'opacity 0.15s' }

  const violetButton = { ...buttonBase, background:T.violet, color:'#fff' }

  const disabledButton = { ...buttonBase, background:T.textDim, color:T.textSub, cursor:'not-allowed' }

  return (
    <div style={{ minHeight:'100vh', background:T.bg, display:'flex', justifyContent:'center', alignItems:'flex-start', padding:'40px 20px' }}>
      <div style={{ width:'100%', maxWidth:520 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:24, fontSize:48 }}>
          <span role="img" aria-label="Patrick logo">&#x1F99E;</span>
        </div>

        {/* Progress Steps */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, marginBottom:40 }}>
          {[{s:1,l:'Account'},{s:2,l:'Connect'},{s:3,l:'Context'},{s:4,l:'Briefing'}].map((item,i,arr) => (
            <div key={item.s} style={{ display:'flex', alignItems:'center' }}>
              <ProgressStep step={item.s} current={step} label={item.l} />
              {i < arr.length-1 && <div style={{ width:40, height:2, background:step>item.s?T.violet:T.textDim, margin:'0 4px', marginBottom:20 }} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Account Creation */}
        {step === 1 && (
          <div>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <div style={{ fontFamily:'Fraunces, serif', fontSize:28, fontWeight:600, color:T.text, marginBottom:6 }}>Welcome to Patrick</div>
              <div style={{ fontSize:14, color:T.textSub }}>Your AI Chief of Staff</div>
            </div>

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email:e.target.value }))}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password:e.target.value }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Company name"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company:e.target.value }))}
              style={inputStyle}
            />

            <div style={{ fontSize:13, color:T.textSub, marginBottom:8 }}>Your role</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:24 }}>
              {roles.map(r => (
                <button
                  key={r.key}
                  onClick={() => setForm(f => ({ ...f, role:r.key }))}
                  style={{
                    padding:'10px 0',
                    borderRadius:8,
                    border:`1px solid ${form.role===r.key ? T.violet : T.borderMid}`,
                    background:form.role===r.key ? T.violetDim : 'transparent',
                    color:form.role===r.key ? T.violet : T.textSub,
                    fontSize:13,
                    fontFamily:"'DM Sans',sans-serif",
                    fontWeight:form.role===r.key ? 600 : 400,
                    cursor:'pointer',
                    transition:'all 0.15s',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.email.trim() || !form.company.trim()}
              style={!form.email.trim() || !form.company.trim() ? disabledButton : violetButton}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 — Connect Your First Source */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:'Fraunces, serif', fontSize:22, fontWeight:600, color:T.text, marginBottom:6 }}>Connect your tools</div>
              <div style={{ fontSize:14, color:T.textSub, lineHeight:1.6 }}>Patrick reads your existing tools to understand your organization.</div>
            </div>

            {/* Slack connection */}
            {!connectors.slack && connecting !== 'slack' && (
              <div>
                <button
                  onClick={handleConnectSlack}
                  style={{ ...buttonBase, background:'#E01E5A', color:'#fff', marginBottom:12 }}
                >
                  Connect Slack
                </button>
                <div style={{ fontSize:12, color:T.textDim, textAlign:'center', marginBottom:24 }}>
                  You can add Jira, GitHub, and Salesforce after setup.
                </div>
              </div>
            )}

            {/* Connecting indicator */}
            {connecting && (
              <div style={{ padding:20, background:T.surface, borderRadius:10, border:`1px solid ${T.border}`, marginBottom:16, textAlign:'center' }}>
                <div style={{ fontSize:14, color:T.text, marginBottom:4 }}>
                  {connectorMessages[connecting]}<AnimatedDots />
                </div>
              </div>
            )}

            {/* Slack connected confirmation */}
            {connectors.slack && !connecting && (
              <div style={{ padding:14, background:'rgba(58,175,124,0.08)', borderRadius:10, border:`1px solid rgba(58,175,124,0.2)`, marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color:T.green, fontSize:18 }}>&#x2713;</span>
                <span style={{ fontSize:14, color:T.green, fontWeight:500 }}>Slack connected</span>
              </div>
            )}

            {/* Optional connectors — one at a time after Slack is connected */}
            {connectors.slack && !connecting && currentOptional && (
              <div style={{ padding:16, background:T.surface, borderRadius:10, border:`1px solid ${T.border}`, marginBottom:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:28, height:28, borderRadius:6, background:currentOptional.color, display:'flex', alignItems:'center', justifyContent:'center', color:currentOptional.textColor||'#fff', fontSize:10, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>
                      {currentOptional.label.slice(0,2).toUpperCase()}
                    </div>
                    <span style={{ fontSize:14, color:T.text }}>{currentOptional.label}</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button
                      onClick={() => handleSkipOptional(currentOptional.key)}
                      style={{ padding:'6px 14px', borderRadius:6, border:`1px solid ${T.borderMid}`, background:'transparent', color:T.textSub, fontSize:12, fontFamily:"'DM Sans',sans-serif", cursor:'pointer' }}
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => handleConnectOptional(currentOptional.key)}
                      style={{ padding:'6px 14px', borderRadius:6, border:'none', background:T.violet, color:'#fff', fontSize:12, fontFamily:"'DM Sans',sans-serif", cursor:'pointer', fontWeight:600 }}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Connected optional connectors */}
            {connectorList.filter(c => connectors[c.key]).map(c => (
              <div key={c.key} style={{ padding:10, background:'rgba(58,175,124,0.05)', borderRadius:8, border:`1px solid rgba(58,175,124,0.12)`, marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:T.green, fontSize:14 }}>&#x2713;</span>
                <span style={{ fontSize:13, color:T.green }}>{c.label} connected</span>
              </div>
            ))}

            {/* Continue button */}
            {connectors.slack && !connecting && (
              <button
                onClick={() => setStep(3)}
                style={{ ...violetButton, marginTop:16 }}
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Company Context */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:'Fraunces, serif', fontSize:22, fontWeight:600, color:T.text, marginBottom:6 }}>Tell Patrick about your organization</div>
            </div>

            <div style={{ marginBottom:4 }}>
              <label style={{ fontSize:13, color:T.textSub, display:'block', marginBottom:6 }}>What are you focused on in the next 90 days?</label>
              <textarea
                placeholder="E.g., Close two enterprise deals, launch new service line, hire senior team..."
                value={context.focus}
                onChange={e => setContext(c => ({ ...c, focus:e.target.value }))}
                style={textareaStyle}
              />
            </div>

            <div style={{ marginBottom:4 }}>
              <label style={{ fontSize:13, color:T.textSub, display:'block', marginBottom:6 }}>What is your biggest operational concern right now?</label>
              <textarea
                placeholder="E.g., Key person overloaded, deal at risk, team scaling challenges..."
                value={context.concern}
                onChange={e => setContext(c => ({ ...c, concern:e.target.value }))}
                style={textareaStyle}
              />
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:13, color:T.textSub, display:'block', marginBottom:6 }}>How many people are you responsible for?</label>
              <input
                type="number"
                placeholder="E.g., 32"
                value={context.teamSize}
                onChange={e => setContext(c => ({ ...c, teamSize:e.target.value }))}
                style={inputStyle}
              />
            </div>

            <button onClick={handleGenerateBriefing} style={violetButton}>
              Generate my first briefing
            </button>
          </div>
        )}

        {/* Step 4 — First Briefing */}
        {step === 4 && (
          <div>
            {generating ? (
              <div style={{ textAlign:'center', padding:'60px 0' }}>
                <div style={{ fontSize:48, marginBottom:20 }}>&#x1F99E;</div>
                <div style={{ fontSize:16, color:T.text, fontFamily:"'DM Sans',sans-serif" }}>
                  Patrick is analyzing your organization<AnimatedDots />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ padding:24, background:T.surface, borderRadius:12, border:`1px solid ${T.border}`, marginBottom:24 }}>
                  <BriefingSection
                    title="Urgent"
                    prose="Patrick identified 3 signals in your Slack workspace that suggest a delivery timeline risk on your largest active engagement. Your operations lead has been sending messages after midnight for three consecutive nights — a pattern that historically precedes quality issues."
                  />
                  <BriefingSection
                    title="Developing"
                    prose="Two team members are allocated above 85% capacity simultaneously. If either takes on additional work, the risk of missed commitments increases significantly over the next two weeks."
                  />
                  <TheQuestion
                    text="Your team knows there is a problem they have not told the client about yet — how long can that gap exist before the client notices on their own?"
                  />
                </div>

                <div style={{ fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:24, textAlign:'center' }}>
                  This is a real signal from your connected tools. Patrick will refine its understanding as more data flows in.
                </div>

                <button onClick={onComplete} style={violetButton}>
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
