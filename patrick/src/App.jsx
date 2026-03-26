import { useState } from 'react'
import { T, useIsMobile } from './theme.js'
import { BRIEFING } from './data.js'
import { HDot } from './components/UI.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import SignalScreen from './screens/SignalScreen.jsx'
import EntitiesScreen from './screens/EntitiesScreen.jsx'
import ConnectorScreen from './screens/ConnectorScreen.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'
import OnboardingScreen from './screens/OnboardingScreen.jsx'
import PatrickChat from './screens/PatrickChat.jsx'

const NAV = [
  { id:'home', icon:'⬡', label:'Home', sub:'Daily briefing' },
  { id:'signals', icon:'◈', label:'Signals', sub:'9 active' },
  { id:'entities', icon:'◎', label:'Entities', sub:'People · Projects · Deals' },
  { id:'connectors', icon:'⟆', label:'Connectors', sub:'3 healthy · 1 degraded' },
  { id:'settings', icon:'⚙', label:'Settings', sub:'Workspace' },
]

export default function App() {
  const isMobile = useIsMobile()
  const [screen, setScreen] = useState('home')
  const [showChat, setShowChat] = useState(false)
  const [onboarded, setOnboarded] = useState(() => !!localStorage.getItem('patrick_onboarded'))

  if (!onboarded) {
    return (
      <OnboardingScreen onComplete={() => {
        localStorage.setItem('patrick_onboarded', 'true')
        setOnboarded(true)
      }} />
    )
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen onNavigate={setScreen} isMobile={isMobile} />
      case 'signals': return <SignalScreen isMobile={isMobile} />
      case 'entities': return <EntitiesScreen isMobile={isMobile} onNavigate={setScreen} />
      case 'connectors': return <ConnectorScreen isMobile={isMobile} />
      case 'settings': return <SettingsScreen isMobile={isMobile} />
      default: return <HomeScreen onNavigate={setScreen} isMobile={isMobile} />
    }
  }

  const mobileNav = NAV.slice(0, 4)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:${T.bg}; color:${T.text}; font-family:'DM Sans', sans-serif; -webkit-font-smoothing:antialiased; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${T.textDim}; border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:${T.textSub}; }
        @keyframes pulse { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
        input:focus, textarea:focus { border-color:${T.violet} !important; }
      `}</style>

      {/* Top Bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:56, background:T.surface, borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', padding:'0 20px', zIndex:100, gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <span style={{ fontSize:20 }}>🦞</span>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:T.text, lineHeight:1.2 }}>Patrick</div>
            {!isMobile && <div style={{ fontSize:10, color:T.textSub, fontFamily:'JetBrains Mono, monospace' }}>Meridian Advisory</div>}
          </div>
        </div>

        {/* DI Score - Desktop */}
        {!isMobile && (
          <div style={{ flex:1, display:'flex', alignItems:'center', padding:'0 16px' }}>
            <span style={{ fontSize:12, fontFamily:'JetBrains Mono, monospace', color:T.red, fontWeight:600 }}>DI {BRIEFING.diScore}↑</span>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0, marginLeft:'auto' }}>
          {isMobile && <span style={{ fontSize:12, fontFamily:'JetBrains Mono, monospace', color:T.red, fontWeight:600 }}>DI {BRIEFING.diScore}↑</span>}
          <button onClick={() => setShowChat(!showChat)} style={{ padding:'6px 14px', borderRadius:8, background:T.violetDim, border:`1px solid ${T.violet}33`, color:T.violet, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap' }}>
            💬 Ask Patrick
          </button>
          {isMobile && (
            <button onClick={() => setScreen('settings')} style={{ background:'none', border:'none', fontSize:18, color:T.textSub, cursor:'pointer', padding:4 }}>⚙</button>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div style={{ position:'fixed', top:56, left:0, bottom:0, width:200, background:T.surface, borderRight:`1px solid ${T.border}`, padding:'16px 0', zIndex:90, overflow:'auto' }}>
          {NAV.map(n => (
            <div key={n.id} onClick={() => setScreen(n.id)}
              style={{ padding:'12px 20px', cursor:'pointer', background:screen===n.id?T.surfaceHigh:'transparent', borderLeft:screen===n.id?`3px solid ${T.violet}`:'3px solid transparent', transition:'background 0.2s' }}
              onMouseEnter={e => { if(screen!==n.id) e.currentTarget.style.background = T.surfaceHigh }}
              onMouseLeave={e => { if(screen!==n.id) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16, color:screen===n.id?T.violet:T.textSub }}>{n.icon}</span>
                <span style={{ fontSize:14, fontWeight:screen===n.id?600:400, color:screen===n.id?T.text:T.textSub }}>{n.label}</span>
              </div>
              <div style={{ fontSize:10, color:T.textDim, marginLeft:24, marginTop:2, fontFamily:'JetBrains Mono, monospace' }}>{n.sub}</div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div style={{
        marginTop: 56,
        marginLeft: isMobile ? 0 : 200,
        marginRight: !isMobile && showChat ? 380 : 0,
        padding: isMobile ? '20px 16px 100px' : '24px 32px',
        transition: 'margin 0.3s',
        minHeight: 'calc(100vh - 56px)',
      }}>
        {renderScreen()}
      </div>

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, height:64, background:T.surface, borderTop:`1px solid ${T.border}`, display:'flex', justifyContent:'space-around', alignItems:'center', zIndex:100 }}>
          {mobileNav.map(n => (
            <div key={n.id} onClick={() => setScreen(n.id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, cursor:'pointer', padding:'8px 0', position:'relative' }}>
              {screen===n.id && <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:24, height:2, borderRadius:1, background:T.violet }} />}
              <span style={{ fontSize:16, color:screen===n.id?T.violet:T.textSub }}>{n.icon}</span>
              <span style={{ fontSize:9, fontFamily:'JetBrains Mono, monospace', color:screen===n.id?T.violet:T.textSub, textTransform:'uppercase' }}>{n.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Patrick Chat */}
      {showChat && <PatrickChat onClose={() => setShowChat(false)} isMobile={isMobile} />}
    </>
  )
}
