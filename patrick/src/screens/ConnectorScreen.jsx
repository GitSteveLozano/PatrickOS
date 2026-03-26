import { useState } from 'react'
import { T } from '../theme.js'
import { CONNECTORS } from '../data.js'
import { ConnectorCard, SLabel, Src, Tag } from '../components/UI.jsx'

export default function ConnectorScreen({ isMobile }) {
  const statusCounts = CONNECTORS.reduce(
    (acc, c) => {
      if (c.status === 'healthy') acc.healthy++
      else if (c.status === 'degraded') acc.degraded++
      else acc.disconnected++
      return acc
    },
    { healthy: 0, degraded: 0, disconnected: 0 }
  )

  // Enrich connectors with new-format fields if they only have the old format
  const enriched = CONNECTORS.map(c => {
    if (c.statusText) return c
    // Fallback for old data format
    const defaults = {
      slack: {
        statusText: 'Patrick is reading your workspace normally.',
        account: 'meridian-advisory.slack.com',
        dataVolume: '1,204 messages indexed in last 30 days across 18 channels',
        permissions: [
          'Read: all public channels',
          'Read: direct messages (opted in)',
          'Cannot: post messages or read private channels',
        ],
        failedSyncs: 0,
        signalCount: 8,
      },
      jira: {
        statusText: 'All projects syncing normally.',
        account: 'meridian.atlassian.net',
        dataVolume: '94 tickets tracked across 6 projects in last 30 days',
        permissions: [
          'Read: all project boards',
          'Read: ticket comments and attachments',
          'Cannot: create or modify tickets',
        ],
        failedSyncs: 0,
        signalCount: 4,
      },
      github: {
        statusText: 'Repository activity syncing normally.',
        account: 'github.com/meridian-advisory',
        dataVolume: '312 commits across 8 repositories in last 30 days',
        permissions: [
          'Read: all organization repositories',
          'Read: pull requests and issues',
          'Cannot: push code or manage settings',
        ],
        failedSyncs: 0,
        signalCount: 2,
      },
      salesforce: {
        statusText:
          'Patrick has not received complete Salesforce data for 3 days. Signals dependent on CRM data may be incomplete.',
        account: 'meridian.my.salesforce.com',
        dataVolume: 'Last complete sync: 47 opportunities, 156 contacts',
        permissions: [
          'Read: opportunities and contacts',
          'Read: activity history',
          'Needs: expanded object access for full pipeline visibility',
        ],
        failedSyncs: 3,
        signalCount: 1,
      },
    }
    const fallback = defaults[c.id] || {}
    return {
      ...c,
      statusText: fallback.statusText || c.note || '',
      account: fallback.account || '',
      dataVolume: fallback.dataVolume || c.note || '',
      permissions: fallback.permissions || [],
      failedSyncs: fallback.failedSyncs ?? 0,
      signalCount: fallback.signalCount ?? 0,
    }
  })

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: isMobile ? '24px 16px' : '48px 24px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 24,
            fontWeight: 600,
            color: T.text,
            margin: 0,
            marginBottom: 8,
          }}
        >
          Connector Hub
        </h1>
        <p
          style={{
            fontSize: 13,
            color: T.textSub,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Patrick is only as credible as the data flowing into it.
        </p>
      </div>

      {/* Overall Health Summary */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '12px 16px',
          borderRadius: 10,
          background: T.surface,
          border: `1px solid ${T.border}`,
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: T.green,
            }}
          />
          <span style={{ fontSize: 13, color: T.textSub }}>
            {statusCounts.healthy} Healthy
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: T.amber,
            }}
          />
          <span style={{ fontSize: 13, color: T.textSub }}>
            {statusCounts.degraded} Degraded
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: T.red,
            }}
          />
          <span style={{ fontSize: 13, color: T.textSub }}>
            {statusCounts.disconnected} Disconnected
          </span>
        </div>
      </div>

      {/* Connected Connector Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {enriched.map(c => (
          <div key={c.id}>
            <ConnectorCard
              connector={c}
              onReconnect={() => {}}
              onRemove={() => {}}
            />

            {/* Degraded warning box */}
            {c.status === 'degraded' && (
              <div
                style={{
                  padding: 12,
                  borderRadius: 8,
                  background: T.amberDim,
                  border: '1px solid rgba(232,160,32,0.2)',
                  fontSize: 13,
                  color: T.amber,
                  marginTop: -4,
                  marginBottom: 16,
                }}
              >
                Patrick has lost full visibility into {c.name}. Signals
                dependent on this data source may be incomplete or misleading.
              </div>
            )}

            {/* Permission Expansion Prompt for Salesforce */}
            {c.id === 'salesforce' && c.status === 'degraded' && (
              <div
                style={{
                  padding: 16,
                  background: T.surfaceHigh,
                  borderRadius: 10,
                  border: `1px solid ${T.borderMid}`,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: T.text,
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  Expanded permissions available
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: T.textSub,
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  Granting Patrick access to additional Salesforce objects would
                  enable full pipeline visibility and more accurate deal health
                  signals. This includes opportunity stages, forecast
                  categories, and custom fields.
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      background: T.violet,
                      color: '#fff',
                      border: 'none',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Expand Access
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      background: 'transparent',
                      border: `1px solid ${T.borderMid}`,
                      color: T.textSub,
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Keep Current Scope
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Unconnected Connectors */}
      <div
        style={{
          padding: 20,
          borderRadius: 10,
          border: `2px dashed ${T.borderMid}`,
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        <div style={{ fontSize: 14, color: T.textDim, marginBottom: 4 }}>
          All core connectors active
        </div>
        <div style={{ fontSize: 12, color: T.textDim }}>
          Additional connectors coming soon: Linear, Notion, HubSpot
        </div>
      </div>
    </div>
  )
}
