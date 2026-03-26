import { useState } from 'react'
import { T } from '../theme.js'
import { SIGNALS, MESH_ENTRIES } from '../data.js'
import { SignalCard, SeverityBadge, FilterPill, SLabel, Src, ContextCard, Card, Tag } from '../components/UI.jsx'

const SEVERITY_ORDER = { critical: 0, developing: 1, watching: 2 }

function groupSignals(signals) {
  const groups = {}
  const ungrouped = []
  signals.forEach(s => {
    if (s.group) {
      if (!groups[s.group]) groups[s.group] = []
      groups[s.group].push(s)
    } else {
      ungrouped.push(s)
    }
  })
  return { groups, ungrouped }
}

function groupLabel(groupId, signals) {
  const labels = {
    'hartwell-risk': 'Hartwell delivery risk',
  }
  return `${signals.length} related signals \u2014 ${labels[groupId] || groupId}`
}

function extractSourceFromEvidence(evidence) {
  const match = evidence.match(/^(\w+):/)
  if (match) return match[1].toLowerCase()
  return null
}

export default function SignalScreen({ isMobile }) {
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ severity: 'all', source: 'all' })
  const [dismissed, setDismissed] = useState([])
  const [captureText, setCaptureText] = useState('')
  const [escalated, setEscalated] = useState(null)
  const [captured, setCaptured] = useState(null)

  const filtered = SIGNALS
    .filter(s => !dismissed.includes(s.id))
    .filter(s => filters.severity === 'all' || s.severity === filters.severity)
    .filter(s => filters.source === 'all' || s.sources.includes(filters.source))
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])

  const selectedSignal = SIGNALS.find(s => s.id === selected)

  const handleDismiss = () => {
    if (selected) {
      setDismissed(prev => [...prev, selected])
      setSelected(null)
    }
  }

  const handleEscalate = () => {
    setEscalated(selected)
    setTimeout(() => setEscalated(null), 2000)
  }

  const handleCapture = () => {
    if (captureText.trim()) {
      setCaptured(selected)
      setCaptureText('')
      setTimeout(() => setCaptured(null), 2000)
    }
  }

  const { groups, ungrouped } = groupSignals(filtered)

  const totalSignals = SIGNALS.filter(s => !dismissed.includes(s.id)).length

  // Build ordered render list: iterate sorted signals, emit group headers once
  const renderedGroups = new Set()
  const renderList = []

  filtered.forEach(signal => {
    if (signal.group && !renderedGroups.has(signal.group)) {
      renderedGroups.add(signal.group)
      const groupSignals = groups[signal.group]
      if (groupSignals && groupSignals.length > 0) {
        const groupColor = groupSignals[0].severity === 'critical' ? T.red : groupSignals[0].severity === 'developing' ? T.amber : T.textSub
        renderList.push({ type: 'group-header', group: signal.group, signals: groupSignals, color: groupColor })
        groupSignals.forEach(gs => {
          renderList.push({ type: 'signal', signal: gs })
        })
      }
    } else if (!signal.group) {
      renderList.push({ type: 'signal', signal })
    }
  })

  const detailPanel = selectedSignal ? (
    <div style={{
      width: isMobile ? '100%' : 380,
      flexShrink: 0,
      borderLeft: isMobile ? 'none' : `1px solid ${T.border}`,
      borderBottom: isMobile ? `1px solid ${T.border}` : 'none',
      padding: 20,
      background: T.bg,
      overflowY: 'auto',
      maxHeight: isMobile ? 'none' : 'calc(100vh - 60px)',
    }}>
      {/* Close button for mobile */}
      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button onClick={() => setSelected(null)} style={{
            background: 'none', border: 'none', color: T.textSub, fontSize: 20, cursor: 'pointer', padding: '0 4px',
          }}>&times;</button>
        </div>
      )}

      {/* Signal header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
          {selectedSignal.sources.map(s => <Src key={s} id={s} />)}
          <Tag color={selectedSignal.entityType === 'person' ? '#4A90D9' : selectedSignal.entityType === 'deal' ? T.green : T.amber} style={{ marginLeft: 4 }}>{selectedSignal.entity}</Tag>
          <div style={{ marginLeft: 'auto' }}><SeverityBadge level={selectedSignal.severity} /></div>
        </div>
        <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>{selectedSignal.text}</div>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: T.textDim, marginTop: 6 }}>{selectedSignal.detected}</div>
      </div>

      {/* 1. Patrick's Assessment */}
      <div style={{ marginBottom: 24 }}>
        <SLabel>Patrick's Assessment</SLabel>
        <div style={{ fontSize: 14, color: T.text, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          {selectedSignal.detail}
        </div>
      </div>

      {/* 2. Evidence */}
      <div style={{ marginBottom: 24 }}>
        <SLabel>Evidence</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {selectedSignal.evidence.map((ev, i) => {
            const src = extractSourceFromEvidence(ev)
            return (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                {src && <div style={{ flexShrink: 0, marginTop: 2 }}><Src id={src} /></div>}
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.5 }}>{ev}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Institutional Context */}
      <div style={{ marginBottom: 24 }}>
        <SLabel>Relevant History</SLabel>
        {selectedSignal.meshContext.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedSignal.meshContext.map(mcId => {
              const entry = MESH_ENTRIES.find(m => m.id === mcId)
              if (!entry) return null
              return <ContextCard key={mcId} date={entry.date} entity={entry.entity} text={entry.text} />
            })}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.5 }}>
            No institutional context captured for this entity yet.
          </div>
        )}
      </div>

      {/* 4. Actions */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <button onClick={handleDismiss} style={{
            padding: '8px 16px', borderRadius: 8, background: T.surfaceHigh,
            border: `1px solid ${T.borderMid}`, color: T.textSub, fontSize: 12,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>Dismiss</button>
          <button onClick={handleEscalate} style={{
            padding: '8px 16px', borderRadius: 8, background: T.redDim,
            border: `1px solid rgba(224,82,82,0.3)`, color: T.red, fontSize: 12,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          }}>{escalated === selected ? 'Escalated' : 'Escalate'}</button>
        </div>

        {/* Capture Context */}
        <div style={{ marginTop: 8 }}>
          <SLabel>Capture Context</SLabel>
          {captured === selected ? (
            <div style={{ fontSize: 13, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>
              Context captured
            </div>
          ) : (
            <>
              <textarea
                value={captureText}
                onChange={e => setCaptureText(e.target.value)}
                placeholder="Add institutional context about this signal..."
                style={{
                  width: '100%', minHeight: 72, padding: 10, borderRadius: 8,
                  background: T.surface, border: `1px solid ${T.borderMid}`,
                  color: T.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                  resize: 'vertical', outline: 'none', lineHeight: 1.5,
                  boxSizing: 'border-box',
                }}
              />
              <button onClick={handleCapture} style={{
                marginTop: 8, padding: '6px 14px', borderRadius: 6,
                background: captureText.trim() ? T.violetDim : T.surfaceHigh,
                border: `1px solid ${captureText.trim() ? 'rgba(139,114,224,0.3)' : T.border}`,
                color: captureText.trim() ? T.violet : T.textDim, fontSize: 12,
                cursor: captureText.trim() ? 'pointer' : 'default',
                fontFamily: "'DM Sans', sans-serif",
              }}>Save Context</button>
            </>
          )}
        </div>
      </div>
    </div>
  ) : null

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: '100%',
      fontFamily: "'DM Sans', sans-serif",
      color: T.text,
    }}>
      {/* Detail panel on mobile appears above the feed */}
      {isMobile && detailPanel}

      {/* Feed Column */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: isMobile ? '24px 16px' : '48px 24px',
        maxWidth: isMobile ? '100%' : 720,
      }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 24, fontFamily: "'Fraunces', serif", fontWeight: 600,
            color: T.text, lineHeight: 1.3, marginBottom: 6,
          }}>
            Signal Feed
          </div>
          <div style={{
            fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: T.textSub,
          }}>
            {totalSignals} signals &middot; last checked 4 minutes ago
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {['all', 'critical', 'developing', 'watching'].map(sev => (
            <FilterPill
              key={sev}
              label={sev === 'all' ? 'All' : sev.charAt(0).toUpperCase() + sev.slice(1)}
              active={filters.severity === sev}
              onClick={() => setFilters(f => ({ ...f, severity: sev }))}
            />
          ))}
          <div style={{ width: 1, height: 24, background: T.border, alignSelf: 'center', margin: '0 4px' }} />
          {['all', 'slack', 'jira', 'github', 'salesforce'].map(src => (
            <FilterPill
              key={src}
              label={src === 'all' ? 'All Sources' : src.charAt(0).toUpperCase() + src.slice(1)}
              active={filters.source === src}
              onClick={() => setFilters(f => ({ ...f, source: src }))}
            />
          ))}
        </div>

        {/* Signal List */}
        {renderList.length === 0 ? (
          <div style={{
            padding: '40px 20px', textAlign: 'center', color: T.textSub, fontSize: 14, lineHeight: 1.6,
          }}>
            No Critical or Developing signals right now. Last reviewed 4 minutes ago.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {renderList.map((item, i) => {
              if (item.type === 'group-header') {
                return (
                  <div key={`gh-${item.group}`} style={{
                    padding: '8px 12px', marginTop: i > 0 ? 12 : 0, marginBottom: 4,
                    borderLeft: `3px solid ${item.color}`, borderRadius: 2,
                    fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                    color: item.color, fontWeight: 600,
                  }}>
                    {groupLabel(item.group, item.signals)}
                  </div>
                )
              }
              return (
                <SignalCard
                  key={item.signal.id}
                  signal={item.signal}
                  selected={selected === item.signal.id}
                  onClick={() => setSelected(selected === item.signal.id ? null : item.signal.id)}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Detail Panel on desktop */}
      {!isMobile && detailPanel}
    </div>
  )
}
