import { useState } from 'react'
import { T } from '../theme.js'
import { BRIEFING, BRIEFING_HISTORY } from '../data.js'
import { BriefingSection, TheQuestion, DiScore, ContextCard, SLabel, Card } from '../components/UI.jsx'

export default function HomeScreen({ onNavigate, isMobile }) {
  const [refreshing, setRefreshing] = useState(false)
  const [expandedIdx, setExpandedIdx] = useState(null)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div style={{
      maxWidth: 720,
      margin: '0 auto',
      padding: isMobile ? '24px 16px' : '48px 24px',
      fontFamily: "'DM Sans', sans-serif",
      color: T.text,
    }}>

      {/* 1. Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
      }}>
        <div>
          <div style={{
            fontSize: 24,
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            color: T.text,
            lineHeight: 1.3,
          }}>
            Good morning, Sarah.
          </div>
          <div style={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            color: T.textSub,
            marginTop: 4,
          }}>
            Wednesday, March 19, 2026
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          style={{
            background: 'transparent',
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            color: T.textSub,
            fontSize: 13,
            padding: '6px 12px',
            cursor: refreshing ? 'default' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            opacity: refreshing ? 0.5 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {refreshing ? 'Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      {/* 2. Briefing Card */}
      <Card style={{
        background: T.surface,
        padding: 24,
        borderRadius: 12,
        marginBottom: 24,
      }}>
        <BriefingSection title="Urgent" prose={BRIEFING.urgent} />
        <BriefingSection title="Developing" prose={BRIEFING.developing} />
        <BriefingSection title="Changed" prose={BRIEFING.changed} />
        <TheQuestion text={BRIEFING.theQuestion} />
      </Card>

      {/* 3. Disagreement Index */}
      <div style={{ marginBottom: 32 }}>
        <DiScore
          score={BRIEFING.diScore}
          trend={BRIEFING.diTrend}
          context={BRIEFING.diContext}
          onClick={() => onNavigate('signals')}
        />
        <div style={{
          fontSize: 11,
          color: T.textDim,
          marginTop: 6,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Click to view signals driving this score
        </div>
      </div>

      {/* 4. Institutional Context Strip */}
      <div style={{ marginBottom: 32 }}>
        <SLabel>Relevant history Patrick is considering</SLabel>
        {BRIEFING.meshContext && BRIEFING.meshContext.length > 0 ? (
          <div style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
          }}>
            {BRIEFING.meshContext.map((c, i) => (
              <ContextCard key={i} date={c.date} entity={c.entity} text={c.text} />
            ))}
          </div>
        ) : (
          <div style={{
            fontSize: 14,
            color: T.textSub,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
            fontStyle: 'italic',
            padding: '12px 0',
          }}>
            Patrick is still building context on your organization. Historical insights will appear here as more decisions are captured.
          </div>
        )}
      </div>

      {/* 5. Briefing History */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Past Briefings</SLabel>
        {BRIEFING_HISTORY.map((b, i) => {
          const color = b.diScore > 60 ? T.red : b.diScore > 30 ? T.amber : T.green
          return (
            <div
              key={i}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              style={{
                padding: '12px 0',
                borderBottom: `1px solid ${T.border}`,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: 13,
                  color: T.textSub,
                }}>
                  {b.date}
                </span>
                <span style={{
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  color,
                  fontWeight: 600,
                }}>
                  DI {b.diScore}
                </span>
              </div>
              {expandedIdx === i && (
                <div style={{
                  fontSize: 14,
                  color: T.text,
                  fontStyle: 'italic',
                  fontFamily: "'Fraunces', serif",
                  lineHeight: 1.6,
                  marginTop: 8,
                }}>
                  "{b.question}"
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
