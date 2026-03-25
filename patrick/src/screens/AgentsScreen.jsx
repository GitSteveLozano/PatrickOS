import { useState } from 'react'
import { T } from '../theme.js'
import { PEOPLE, AGENT_TEMPLATES } from '../data.js'
import { Card, SLabel, Sheet, Tag, Pulse, WorkBar } from '../components/UI.jsx'

const agentIcons = { ag1:'→', ag2:'◈', ag3:'⊡' }
const agentMesh = {
  ag1: 'Kellner Group pricing, Apex Financial scope, Sarah\'s exec summary template',
  ag2: 'Priya workload history, Hartwell SLA terms, Kellner quality incident 2023',
  ag3: 'Role criteria from Sarah, compensation benchmarks, referral network',
}

export default function AgentsScreen({ isMobile }) {
  const [hiring, setHiring] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [newName, setNewName] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const [deployed, setDeployed] = useState(false)

  const agents = PEOPLE.filter(p => p.type === 'agent')

  const resetHire = () => { setHiring(false); setStep(1); setSelectedTemplate(null); setNewName(''); setNewGoal(''); setDeployed(false) }

  if (deployed) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, textAlign:'center', padding:40 }}>
        <div style={{ fontSize:64, marginBottom:24 }}>{selectedTemplate?.icon}</div>
        <div style={{ fontSize:20, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, marginBottom:8 }}>Agent Deployed</div>
        <div style={{ fontSize:14, color:T.textSub, marginBottom:24 }}>{newName || selectedTemplate?.name} is now active and learning from Mesh.</div>
        <button onClick={resetHire} style={{ padding:'10px 24px', borderRadius:8, background:T.violet, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Back to Agents</button>
      </div>
    )
  }

  if (hiring) {
    return (
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h2 style={{ fontSize:20, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:0 }}>
            {step===1?'Choose a Template':step===2?'Configure Agent':'Set Guardrails'}
          </h2>
          <button onClick={resetHire} style={{ background:'none', border:`1px solid ${T.borderMid}`, borderRadius:6, padding:'6px 12px', color:T.textSub, fontSize:12, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Cancel</button>
        </div>

        <div style={{ display:'flex', gap:4, marginBottom:24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex:1, height:3, borderRadius:2, background:s<=step?T.violet:T.border }} />
          ))}
        </div>

        {step === 1 && (
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:12 }}>
            {AGENT_TEMPLATES.map(t => (
              <Card key={t.name} onClick={() => { setSelectedTemplate(t); setNewName(t.name); setStep(2) }}
                style={{ cursor:'pointer', border:`1px solid ${selectedTemplate?.name===t.name?T.violet:T.border}` }}>
                <div style={{ fontSize:24, color:T.violet, marginBottom:8 }}>{t.icon}</div>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:4 }}>{t.name}</div>
                <Tag color={T.violet} bg={T.violetDim} style={{ marginBottom:8 }}>{t.category}</Tag>
                <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{t.desc}</div>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth:480 }}>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace', display:'block', marginBottom:6 }}>AGENT NAME</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} style={{ width:'100%', boxSizing:'border-box', background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'10px 14px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none' }} />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:T.textSub, fontFamily:'JetBrains Mono, monospace', display:'block', marginBottom:6 }}>GOAL</label>
              <textarea value={newGoal} onChange={e => setNewGoal(e.target.value)} rows={4} placeholder="What should this agent accomplish?" style={{ width:'100%', boxSizing:'border-box', background:T.surfaceHigh, border:`1px solid ${T.borderMid}`, borderRadius:8, padding:'10px 14px', color:T.text, fontSize:14, fontFamily:'DM Sans, sans-serif', outline:'none', resize:'vertical' }} />
            </div>
            <div style={{ padding:12, borderRadius:8, background:T.tealDim, borderLeft:`3px solid ${T.teal}`, marginBottom:20 }}>
              <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.teal, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>MESH</div>
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>This agent will have access to Mesh — Meridian's institutional memory. It will ground its work in historical context, pricing precedents, and relationship dynamics.</div>
            </div>
            <button onClick={() => setStep(3)} style={{ padding:'10px 24px', borderRadius:8, background:T.violet, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Define guardrails →</button>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth:480 }}>
            <SLabel style={{ color:T.green }}>✓ Acts Autonomously</SLabel>
            {['Draft documents from templates','Pull data from connected systems','Summarize and analyze information','Flag risks and anomalies'].map(item => (
              <div key={item} style={{ display:'flex', gap:8, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${T.border}` }}>
                <span style={{ color:T.green }}>✓</span>
                <span style={{ fontSize:13, color:T.text }}>{item}</span>
              </div>
            ))}

            <SLabel style={{ color:T.amber, marginTop:20 }}>! Requires Approval</SLabel>
            {['Send external communications','Modify financial data','Create client-facing deliverables','Access restricted Mesh entries'].map(item => (
              <div key={item} style={{ display:'flex', gap:8, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${T.border}` }}>
                <span style={{ color:T.amber }}>!</span>
                <span style={{ fontSize:13, color:T.text }}>{item}</span>
              </div>
            ))}

            <button onClick={() => setDeployed(true)} style={{ marginTop:24, padding:'12px 32px', borderRadius:8, background:T.violet, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', width:'100%' }}>Deploy Agent</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontSize:20, fontFamily:'Fraunces, serif', fontWeight:600, color:T.text, margin:0 }}>Agents</h2>
        <button onClick={() => setHiring(true)} style={{ padding:'8px 16px', borderRadius:8, background:T.violet, color:'#fff', border:'none', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>+ Hire Agent</button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {agents.map(a => (
          <Card key={a.id} onClick={() => setSelectedAgent(a)}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:24, color:T.violet, flexShrink:0, marginTop:2 }}>{agentIcons[a.id]||'⊡'}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <span style={{ fontSize:15, fontWeight:600, color:T.text }}>{a.name}</span>
                  <Pulse status={a.status} />
                </div>
                <div style={{ fontSize:12, color:T.textSub, marginBottom:6 }}>{a.role} · {a.dept}</div>
                <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5, marginBottom:8 }}>{a.bio}</div>
                {a.status==='active' && <WorkBar value={a.workload} />}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={!!selectedAgent} onClose={() => setSelectedAgent(null)} title={selectedAgent?.name}>
        {selectedAgent && <>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
            <Pulse status={selectedAgent.status} />
            <span style={{ fontSize:13, color:T.textSub }}>{selectedAgent.status==='active'?'Active':'Idle'} · {selectedAgent.role}</span>
          </div>
          <div style={{ fontSize:14, color:T.text, lineHeight:1.6, marginBottom:16 }}>{selectedAgent.bio}</div>
          {agentMesh[selectedAgent.id] && (
            <div style={{ padding:12, borderRadius:8, background:T.tealDim, borderLeft:`3px solid ${T.teal}`, marginBottom:20 }}>
              <div style={{ fontSize:10, fontFamily:'JetBrains Mono, monospace', color:T.teal, textTransform:'uppercase', fontWeight:600, marginBottom:4 }}>MESH CONTEXT</div>
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.5 }}>{agentMesh[selectedAgent.id]}</div>
            </div>
          )}
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ flex:1, padding:'10px 16px', borderRadius:8, border:`1px solid ${T.amber}`, background:'transparent', color:T.amber, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              {selectedAgent.status==='active'?'Pause':'Resume'}
            </button>
            <button style={{ flex:1, padding:'10px 16px', borderRadius:8, border:`1px solid ${T.borderMid}`, background:'transparent', color:T.textSub, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Edit Scope</button>
          </div>
        </>}
      </Sheet>
    </div>
  )
}
