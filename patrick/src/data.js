export const FOUNDATION = {
  mission:"Build the most trusted operational and technology advisory practice for mid-market companies navigating growth.",
  focus:"Land two anchor enterprise clients in Q4, complete Technology Advisory practice launch, and grow ARR to $4.2M.",
  values:["Client outcomes over billable hours","Institutional knowledge is a competitive asset","Direct communication, internally and externally"],
  exceptions:[
    { text:"Do not quote current rates to Hartwell or Kellner — legacy pricing through 2026 renewals.", expiry:"Dec 31 2026", by:"James Reilly" },
    { text:"Q4 engineering sprint — elevated meeting load intentional through December 15.", expiry:"Dec 15 2026", by:"Sarah Okonkwo" },
  ],
}

export const OKRS = [
  { id:"o1", objective:"Grow ARR to $4.2M", current:3.1, target:4.2, unit:"M", pct:74, status:"drifting", keyResults:[
    { text:"Close 2 enterprise engagements >$200K", done:0, total:2, pct:0 },
    { text:"Expand 3 existing client engagements", done:1, total:3, pct:33 },
    { text:"Launch Technology Advisory retainer offering", done:0, total:1, pct:40 },
  ]},
  { id:"o2", objective:"Achieve 90% client retention", current:87, target:90, unit:"%", pct:87, status:"risk", keyResults:[
    { text:"Complete Hartwell Q4 deliverable on time", done:0, total:1, pct:35 },
    { text:"Conduct QBRs with all retained clients", done:2, total:5, pct:40 },
    { text:"Resolve open escalations within 5 days", done:1, total:2, pct:50 },
  ]},
  { id:"o3", objective:"Hire 4 senior consultants", current:1, target:4, unit:" hires", pct:25, status:"risk", keyResults:[
    { text:"Source 20 qualified candidates", done:7, total:20, pct:35 },
    { text:"Complete 8 interview loops", done:2, total:8, pct:25 },
    { text:"Extend and close 4 offers", done:1, total:4, pct:25 },
  ]},
]

export const PEOPLE = [
  { id:"p1", name:"Sarah Okonkwo", role:"Managing Partner", type:"human", dept:"Leadership", workload:72, health:"track", meshCaptures:3, bio:"Leads firm strategy and client relationships. Primary contact for Hartwell and Cascade.", connectors:["slack","salesforce"] },
  { id:"p2", name:"James Reilly", role:"Head of Strategy", type:"human", dept:"Strategy", workload:88, health:"drifting", meshCaptures:7, bio:"Leads all Strategy engagements. Currently allocated 110% across three active clients.", connectors:["slack","jira"] },
  { id:"p3", name:"Priya Mehta", role:"Operations Lead", type:"human", dept:"Operations", workload:97, health:"risk", meshCaptures:5, bio:"Primary delivery lead on Hartwell Industries. Workload is critical — quality risk threshold exceeded.", connectors:["slack","jira"] },
  { id:"p4", name:"Tom Barrett", role:"Head of Business Dev", type:"human", dept:"Leadership", workload:55, health:"drifting", meshCaptures:4, bio:"Owns pipeline. Has not logged Cascade Capital activity in 8 days despite final proposal stage.", connectors:["slack","salesforce"] },
  { id:"p5", name:"Ana Cruz", role:"Head of Tech Advisory", type:"human", dept:"Technology", workload:65, health:"track", meshCaptures:9, bio:"Building the Technology Advisory practice. 40% complete.", connectors:["slack","jira","github"] },
  { id:"p6", name:"David Kim", role:"Senior Consultant", type:"human", dept:"Strategy", workload:60, health:"track", meshCaptures:2, bio:"Strong performer with capacity. Can support Hartwell if Priya needs relief.", connectors:["slack","jira"] },
  { id:"ag1", name:"Proposal Writer", role:"Sales Agent", type:"agent", dept:"Business Dev", status:"active", workload:68, health:"track", meshCaptures:6, bio:"Drafting Cascade Capital proposal. First draft ready for review.", connectors:["salesforce","hubspot"] },
  { id:"ag2", name:"Client Health Monitor", role:"Delivery Agent", type:"agent", dept:"Operations", status:"active", workload:100, health:"drifting", meshCaptures:11, bio:"Monitoring all active engagements. Flagged Hartwell as delivery risk 3 days ago.", connectors:["jira","slack"] },
  { id:"ag3", name:"Talent Scout", role:"Recruiting Agent", type:"agent", dept:"Leadership", status:"idle", workload:0, health:"track", meshCaptures:1, bio:"Idle — awaiting job descriptions for senior consultant roles.", connectors:["slack"] },
]

export const PROJECTS = [
  { id:"pr1", name:"Hartwell Industries", client:"Hartwell Industries", value:"$420K", status:"risk", pct:35, nnl:"now", ownerName:"Priya Mehta", due:"Nov 30", tasks:[
    { text:"Process mapping workshop", done:true, owner:"Priya Mehta" },
    { text:"Recommendations report draft", done:false, owner:"Priya Mehta", overdue:true },
    { text:"Executive presentation deck", done:false, owner:"James Reilly" },
    { text:"Implementation roadmap", done:false, owner:"Priya Mehta" },
  ]},
  { id:"pr2", name:"Cascade Capital Proposal", client:"Cascade Capital", value:"$280K", status:"drifting", pct:68, nnl:"now", ownerName:"Proposal Writer", due:"Mar 28", tasks:[
    { text:"Discovery synthesis", done:true, owner:"Proposal Writer" },
    { text:"Scope and approach section", done:true, owner:"Proposal Writer" },
    { text:"Pricing and terms", done:true, owner:"Proposal Writer" },
    { text:"Executive summary", done:false, owner:"Proposal Writer" },
    { text:"Human review and approval", done:false, owner:"Tom Barrett" },
  ]},
  { id:"pr3", name:"Tech Advisory Launch", client:"Internal", value:"—", status:"drifting", pct:40, nnl:"now", ownerName:"Ana Cruz", due:"Dec 15", tasks:[
    { text:"Service offering definition", done:true, owner:"Ana Cruz" },
    { text:"Pricing model", done:false, owner:"Ana Cruz" },
    { text:"Pilot client identification", done:false, owner:"Tom Barrett" },
    { text:"Marketing collateral", done:false, owner:"Ana Cruz" },
  ]},
  { id:"pr4", name:"Kellner Group QBR", client:"Kellner Group", value:"$180K", status:"track", pct:0, nnl:"next", ownerName:"James Reilly", due:"Jan 15", tasks:[
    { text:"Prepare QBR deck", done:false, owner:"James Reilly" },
    { text:"Pull engagement metrics", done:false, owner:"David Kim" },
    { text:"Renewal conversation", done:false, owner:"Sarah Okonkwo" },
  ]},
  { id:"pr5", name:"Senior Consultant Hiring", client:"Internal", value:"—", status:"risk", pct:25, nnl:"now", ownerName:"Sarah Okonkwo", due:"Dec 31", tasks:[
    { text:"Finalize job descriptions", done:false, owner:"Sarah Okonkwo" },
    { text:"Activate Talent Scout agent", done:false, owner:"Sarah Okonkwo" },
    { text:"Complete 8 interview loops", done:false, owner:"James Reilly" },
    { text:"Extend 4 offers", done:false, owner:"Sarah Okonkwo" },
  ]},
  { id:"pr6", name:"Marine Advisory Practice", client:"Internal", value:"—", status:"track", pct:0, nnl:"later", ownerName:"Ana Cruz", due:"Q2 2027", tasks:[
    { text:"Market research", done:false, owner:"Ana Cruz" },
    { text:"Pilot client identification", done:false, owner:"Tom Barrett" },
  ]},
]

export const STAKEHOLDERS = [
  { id:"s1", name:"Robert Ashford", role:"Managing Director", company:"Hartwell Industries", type:"client", health:"risk", lastContact:"Mar 13", daysSince:6, cadence:7, nextMeeting:"Not scheduled", owner:"Sarah Okonkwo", meshNote:"Prefers bad news early by call, never email. Last conversation was tense — he noticed the delay before we told him.", commitments:[{ text:"Sarah to send revised timeline by Mar 21", due:"Mar 21", status:"overdue", owner:"Sarah Okonkwo" },{ text:"Priya to deliver recommendations draft by Mar 25", due:"Mar 25", status:"open", owner:"Priya Mehta" }], meetings:[{ date:"Mar 13", type:"Check-in", notes:"Raised concern about recommendation report delay. Sarah committed to revised timeline.", attendees:["Sarah Okonkwo","Priya Mehta"] },{ date:"Feb 28", type:"Steering", notes:"Phase 1 complete. Phase 2 scope confirmed. Q4 deadline reaffirmed.", attendees:["Sarah Okonkwo","James Reilly","Priya Mehta"] }] },
  { id:"s2", name:"Rachel Ng", role:"Chief Operating Officer", company:"Cascade Capital", type:"prospect", health:"drifting", lastContact:"Mar 11", daysSince:8, cadence:7, nextMeeting:"Mar 26 — pending confirmation", owner:"Tom Barrett", meshNote:"Strong personal relationship with Sarah from McKinsey. If the deal stalls, Sarah calling Rachel directly will move it faster than any formal follow-up.", commitments:[{ text:"Tom to send final proposal by Mar 20", due:"Mar 20", status:"overdue", owner:"Tom Barrett" },{ text:"Rachel to confirm meeting for final review", due:"Mar 26", status:"open", owner:"Rachel Ng" }], meetings:[{ date:"Mar 11", type:"Discovery debrief", notes:"Rachel confirmed scope alignment. Asked for formal proposal within 10 days.", attendees:["Tom Barrett","Rachel Ng"] },{ date:"Feb 18", type:"Intro call", notes:"Warm intro through Sarah. Rachel mentioned prior McKinsey work with Sarah.", attendees:["Sarah Okonkwo","Tom Barrett","Rachel Ng"] }] },
  { id:"s3", name:"Marcus Chen", role:"CFO", company:"Kellner Group", type:"client", health:"track", lastContact:"Mar 17", daysSince:2, cadence:14, nextMeeting:"Apr 2 — QBR confirmed", owner:"James Reilly", meshNote:"Legacy pricing client (15% below current rates). Board decision to honor through 2026 renewals — do not quote current rates under any circumstances.", commitments:[{ text:"James to prepare QBR deck and send by Mar 28", due:"Mar 28", status:"open", owner:"James Reilly" }], meetings:[{ date:"Mar 17", type:"Monthly sync", notes:"Satisfied with current engagement. Open to discussing expanded scope in Q2.", attendees:["James Reilly","Marcus Chen"] }] },
  { id:"s4", name:"Diana Osei", role:"CEO", company:"Thornfield Partners", type:"prospect", health:"track", lastContact:"Mar 18", daysSince:1, cadence:14, nextMeeting:"Mar 31 — intro call", owner:"Tom Barrett", meshNote:"Warm referral from Marcus Chen at Kellner. Interested in Tech Advisory services specifically. Ana Cruz should be on the intro call.", commitments:[{ text:"Tom to send company overview before Mar 31 call", due:"Mar 29", status:"open", owner:"Tom Barrett" }], meetings:[{ date:"Mar 18", type:"Referral outreach", notes:"Initial email from Tom following Marcus Chen introduction.", attendees:["Tom Barrett"] }] },
  { id:"s5", name:"Patricia Voss", role:"VP Operations", company:"Hartwell Industries", type:"client", health:"drifting", lastContact:"Mar 5", daysSince:14, cadence:7, nextMeeting:"Not scheduled", owner:"Priya Mehta", meshNote:"Hartwell's IT team is territorial — all tech recommendations must be framed as advisory only. Patricia is the internal champion for the engagement.", commitments:[{ text:"Priya to share Phase 2 work plan", due:"Mar 15", status:"overdue", owner:"Priya Mehta" }], meetings:[{ date:"Mar 5", type:"Working session", notes:"Phase 2 kickoff. Patricia flagged IT team concerns about consultant access to systems.", attendees:["Priya Mehta","Patricia Voss"] }] },
]

export const MESH_ENTRIES = [
  { id:"m1", date:"Jan 2026", entity:"Hartwell Industries", by:"Sarah Okonkwo", text:"MD prefers bad news early by call, never email. Established after Year 1 incident that nearly ended the relationship." },
  { id:"m2", date:"Sep 2025", entity:"Pricing Model", by:"James Reilly", text:"Pre-2023 retainer clients on legacy pricing (15% below current). Honor through 2026 renewals. Do not quote current rates to Hartwell or Kellner." },
  { id:"m3", date:"Mar 2025", entity:"Technology Advisory", by:"Sarah Okonkwo", text:"Board directed launch after turning down two fintech engagements. Ana Cruz hired specifically to lead it. Strategic priority, not optional." },
  { id:"m4", date:"Nov 2024", entity:"Priya Mehta", by:"James Reilly", text:"Burned out Q3 2023. Won't raise it herself — she'll absorb the load until quality suffers. The Kellner quality issue happened because nobody noticed she was at 95%+ for two weeks." },
  { id:"m5", date:"Aug 2024", entity:"Cascade Capital", by:"Tom Barrett", text:"COO Rachel Ng and Sarah have a strong personal relationship from McKinsey. If the deal stalls, Sarah calling Rachel directly will move it faster than any formal follow-up." },
  { id:"m6", date:"Jun 2024", entity:"Hartwell Industries", by:"Priya Mehta", text:"Hartwell's IT team is territorial about external consultants. All technology recommendations must be framed as advisory only." },
  { id:"m7", date:"Feb 2024", entity:"James Reilly", by:"Sarah Okonkwo", text:"Being approached by competitors. Retention tied to equity refresh conversation Q1 2026 — do not let it slip." },
]

export const SIGNALS = [
  { id:"sig1", sources:["slack","jira"], entity:"Priya Mehta", entityType:"person", entityId:"p3", text:"Priya has sent 3 late-night Slack messages this week and reassigned 2 Jira tickets she normally owns. This pattern preceded the Kellner quality incident in 2023.", severity:"critical", detected:"Mar 19, 8:14 AM", group:"hartwell-risk", detail:"Patrick detected a pattern of after-hours communication combined with task delegation that historically correlates with workload-driven quality risk. Priya's current allocation is 97%, which exceeds the 90% threshold established after the Kellner incident.", evidence:["Slack: 11:42 PM message to James in #hartwell-delivery on Mar 18","Slack: 10:58 PM message to David in #general on Mar 17","Jira: HART-38 reassigned from Priya to David on Mar 18","Jira: HART-41 reassigned from Priya to James on Mar 19","Workload tracker: 97% allocation, up from 91% on Mar 12"], meshContext:["m4"] },
  { id:"sig2", sources:["slack","salesforce"], entity:"Cascade Capital", entityType:"deal", entityId:"s2", text:"The Cascade Capital proposal is complete but Tom Barrett has not logged any CRM activity in 8 days. The proposal deadline was March 20.", severity:"critical", detected:"Mar 19, 7:30 AM", group:null, detail:"The Proposal Writer agent completed the draft on March 18, but Tom Barrett has not updated Salesforce or sent any Slack messages about Cascade since March 11. This silence is unusual for a $280K deal in final stage.", evidence:["Salesforce: last activity logged Mar 11 by Tom Barrett","Slack: no messages mentioning Cascade from Tom since Mar 11","Agent: Proposal Writer marked draft ready Mar 18","Calendar: no meetings scheduled with Rachel Ng"], meshContext:["m5"] },
  { id:"sig3", sources:["jira"], entity:"Hartwell Industries", entityType:"project", entityId:"pr1", text:"The recommendations report has been in In Progress status for 14 days with no updates. It was due March 11.", severity:"critical", detected:"Mar 19, 6:00 AM", group:"hartwell-risk", detail:"Jira ticket HART-34 has not been updated since March 5. The original due date was March 11. No comments, no status changes, no attachments. Combined with Priya's workload signals, this suggests the deliverable is stalled.", evidence:["Jira: HART-34 last updated Mar 5 by Priya Mehta","Jira: original due date Mar 11, no revised date set","Jira: 0 comments in last 14 days","Slack: Priya mentioned still working on recommendations in #hartwell-delivery on Mar 14"], meshContext:["m1","m4"] },
  { id:"sig4", sources:["slack"], entity:"James Reilly", entityType:"person", entityId:"p2", text:"James has been active in 3 client channels simultaneously every day this week, with messages spanning 7 AM to 9 PM.", severity:"developing", detected:"Mar 18, 4:00 PM", group:null, detail:"James Reilly's Slack activity shows sustained high engagement across Hartwell, Kellner, and a new prospect channel. His formal allocation is 88% but effective allocation based on activity is closer to 110%.", evidence:["Slack: active in #hartwell-delivery, #kellner-engagement, and #prospect-thornfield daily","Slack: first message 7:12 AM, last message 9:04 PM on Mar 17","Slack: responded to 47 messages across 3 channels in one day"], meshContext:["m7"] },
  { id:"sig5", sources:["salesforce"], entity:"Thornfield Partners", entityType:"deal", entityId:"s4", text:"Diana Osei opened the company overview email twice but has not responded. The intro call is scheduled for March 31.", severity:"watching", detected:"Mar 19, 9:00 AM", group:null, detail:"Email tracking shows Diana Osei opened Tom's email on March 19 and March 20 but has not replied. This is within normal response windows for a warm prospect.", evidence:["Salesforce: email opened 2x, no reply","Calendar: Mar 31 intro call confirmed","Referral source: Marcus Chen (Kellner Group)"], meshContext:[] },
  { id:"sig6", sources:["github","jira"], entity:"Tech Advisory Launch", entityType:"project", entityId:"pr3", text:"Ana Cruz has made 12 commits to the service framework repo this week but the Jira board shows no ticket movement.", severity:"watching", detected:"Mar 18, 2:00 PM", group:null, detail:"There is a disconnect between Ana's GitHub activity (high) and Jira status updates (zero this week). The work is happening but not being reflected in the project management tool.", evidence:["GitHub: 12 commits to meridian-advisory/tech-advisory-framework","Jira: 0 ticket status changes in TECH project this week","Slack: Ana mentioned making good progress in #tech-advisory"], meshContext:["m3"] },
  { id:"sig7", sources:["slack"], entity:"David Kim", entityType:"person", entityId:"p6", text:"David has accepted 2 reassigned tickets from Priya without comment or pushback, despite having his own deliverables.", severity:"developing", detected:"Mar 19, 10:00 AM", group:"hartwell-risk", detail:"David Kim quietly absorbed two Hartwell tickets from Priya. While David has capacity (60%), this silent absorption without team discussion can mask the true state of the project.", evidence:["Jira: HART-38 accepted by David, no comment","Jira: HART-41 accepted by David within 30 minutes","Slack: no discussion of reassignment in any channel"], meshContext:[] },
  { id:"sig8", sources:["slack"], entity:"Kellner Group", entityType:"deal", entityId:"s3", text:"Marcus Chen mentioned expanded scope in his last sync with James. No follow-up has been logged.", severity:"watching", detected:"Mar 18, 11:00 AM", group:null, detail:"During the March 17 sync, Marcus expressed openness to expanding scope in Q2. James has not created a follow-up task or updated Salesforce. This could be a significant upsell opportunity.", evidence:["Slack: James posted notes mentioning Marcus open to Q2 expansion","Salesforce: Kellner opportunity unchanged since Feb","Jira: no follow-up task created"], meshContext:["m2"] },
  { id:"sig9", sources:["slack"], entity:"Sarah Okonkwo", entityType:"person", entityId:"p1", text:"Sarah has not sent any external client communications in 5 days, which is unusual for her typical weekly cadence.", severity:"developing", detected:"Mar 19, 11:00 AM", group:null, detail:"Sarah typically sends 8-12 external emails per week. In the last 5 days, she has sent zero. Her internal Slack activity remains normal. This creates a gap in client relationship maintenance at a sensitive time.", evidence:["Slack: 34 internal messages sent in last 5 days","Email: 0 external client emails tracked since Mar 14","Calendar: no external meetings on calendar this week"], meshContext:[] },
]

export const BRIEFING = {
  date:"Mar 19, 2026",
  refreshedAt:"6:00 AM",
  urgent:"The Hartwell Industries recommendations report is now 8 days overdue, and Robert Ashford has not heard from the team since March 13. Priya Mehta is at 97% workload capacity and showing signs of after-hours strain. Sarah committed to sending a revised timeline by March 21 — that is two days from now, and no draft exists. This is not a delivery risk. This is a relationship risk. Robert notices silence before he notices delays, and the last conversation was already tense.",
  developing:"James Reilly has been allocated at 110% across three active clients for two consecutive weeks. His workload is not yet critical, but the pattern matches the conditions that preceded Priya's current situation. Separately, the Talent Scout agent has been idle for 11 days awaiting job descriptions — the hiring OKR is at 25% with no active pipeline, and Q4 is running out.",
  changed:"Salesforce sync degraded three days ago. Patrick has not received complete CRM data since March 16, which means pipeline signals for Cascade Capital and Thornfield Partners may be incomplete or stale. The Proposal Writer agent completed the Cascade Capital executive summary yesterday — the full proposal draft is now ready for human review. Tom Barrett has not logged any Cascade activity in 8 days despite this being in final proposal stage.",
  theQuestion:"If Priya delivers the Hartwell report late and the quality is compromised by her workload, does the relationship survive — or has Robert Ashford already decided that silence means you do not respect his time?",
  diScore:64,
  diTrend:"diverging",
  diContext:"Hartwell delivery signals and CRM relationship signals are diverging from what the team is reporting. Slack activity suggests the team knows there is a problem, but no external communication has happened in 6 days. The gap between internal awareness and external action is widening.",
  meshContext:[
    { date:"Jan 2026", entity:"Hartwell Industries", text:"MD prefers bad news early by call, never email. Established after Year 1 incident that nearly ended the relationship." },
    { date:"Nov 2024", entity:"Priya Mehta", text:"Burned out Q3 2023. Won't raise it herself — she'll absorb the load until quality suffers. The Kellner quality issue happened because nobody noticed she was at 95%+ for two weeks." },
    { date:"Feb 2024", entity:"James Reilly", text:"Being approached by competitors. Retention tied to equity refresh conversation Q1 2026 — do not let it slip." },
  ],
}

export const BRIEFING_HISTORY = [
  { date:"Mar 19", diScore:64, question:"If Priya delivers the Hartwell report late and the quality is compromised by her workload, does the relationship survive — or has Robert Ashford already decided that silence means you do not respect his time?" },
  { date:"Mar 18", diScore:61, question:"The Cascade Capital proposal is ready but Tom has gone quiet — is this a pipeline management issue or has something changed in the deal that Patrick cannot see?" },
  { date:"Mar 17", diScore:58, question:"With three Now-priority projects and only one at-risk hire completed, is the firm building capacity fast enough to deliver what it has already promised?" },
  { date:"Mar 14", diScore:55, question:"Priya's workload crossed 95% three days ago and no one has intervened — at what point does protecting her become protecting the client?" },
  { date:"Mar 13", diScore:52, question:"Robert Ashford raised the delivery concern before Sarah could — what does it mean when clients identify your risks before you do?" },
  { date:"Mar 12", diScore:48, question:"The Technology Advisory practice is 40% launched with no pilot client identified — is this a timing problem or a commitment problem?" },
  { date:"Mar 11", diScore:45, question:"James Reilly is carrying three concurrent strategy engagements at 110% allocation — is this sustainable through Q4, or is the firm one sick day away from a delivery failure?" },
]

export const DECISIONS = [
  { id:"d1", agent:"Proposal Writer", icon:"→", title:"Approve Cascade Capital proposal draft", context:"First draft ready. $280K engagement. Tom hasn't logged activity in 8 days.", recommendation:"Patrick recommends Sarah reviews — her McKinsey relationship with Cascade's COO gives this a better close probability than a formal send from Tom.", meshNote:"Cascade COO Rachel Ng has prior McKinsey relationship with Sarah. A personal note from Sarah alongside the proposal will move this.", actions:["Review Draft","Assign to Sarah","Dismiss"] },
  { id:"d2", agent:"Client Health Monitor", icon:"◈", title:"Address Hartwell delivery risk today", context:"Priya at 97% workload, recommendations report 8 days overdue. No client comms in 6 days.", recommendation:"Reassign report support to David Kim immediately. Have Sarah call Hartwell's MD today with a proactive update before they ask.", meshNote:"Hartwell MD always wants bad news by call, never email. Silence is worse than a delay notice.", actions:["Reassign to David Kim","Draft Sarah's talking points","View Full Report"] },
]

export const CONNECTORS = [
  { name:"Slack", id:"slack", status:"healthy", statusText:"Patrick is reading your workspace normally.", sync:"2m ago", account:"meridian-advisory.slack.com", dataVolume:"1,204 messages indexed in last 30 days across 18 channels", permissions:["Read: all public channels","Read: direct messages (opted in)","Cannot: post messages or read private channels"], failedSyncs:0, signalCount:8, note:"1,204 messages · 18 channels · 32 members" },
  { name:"Jira", id:"jira", status:"healthy", statusText:"All projects syncing normally.", sync:"8m ago", account:"meridian.atlassian.net", dataVolume:"94 tickets tracked across 6 projects in last 30 days", permissions:["Read: all project boards","Read: ticket comments and attachments","Cannot: create or modify tickets"], failedSyncs:0, signalCount:4, note:"94 tickets · 6 projects · 3 active sprints" },
  { name:"GitHub", id:"github", status:"healthy", statusText:"Repository activity syncing normally.", sync:"4m ago", account:"github.com/meridian-advisory", dataVolume:"312 commits across 8 repositories in last 30 days", permissions:["Read: all organization repositories","Read: pull requests and issues","Cannot: push code or manage settings"], failedSyncs:0, signalCount:2, note:"312 commits · 8 repos · 14 contributors" },
  { name:"Salesforce", id:"salesforce", status:"degraded", statusText:"Patrick has not received complete Salesforce data for 3 days. Signals dependent on CRM data may be incomplete.", sync:"2h ago", account:"meridian.my.salesforce.com", dataVolume:"Last complete sync: 47 opportunities, 156 contacts", permissions:["Read: opportunities and contacts","Read: activity history","Needs: expanded object access for full pipeline visibility"], failedSyncs:3, signalCount:1, note:"Partial sync — permissions review needed" },
]

export const AGENT_TEMPLATES = [
  { name:"Proposal Writer", icon:"→", category:"Sales", desc:"Drafts proposals grounded in Mesh history and past pricing." },
  { name:"Client Health Monitor", icon:"◈", category:"Delivery", desc:"Watches delivery signals. Escalates risk early." },
  { name:"Talent Scout", icon:"⊡", category:"HR", desc:"Sources candidates against defined role criteria." },
  { name:"Meeting Intelligence", icon:"◎", category:"Operations", desc:"Extracts commitments from meetings, tracks follow-through." },
  { name:"Pipeline Analyst", icon:"◉", category:"Sales", desc:"Monitors deal health. Surfaces stalls before they become losses." },
  { name:"Knowledge Curator", icon:"⟆", category:"Operations", desc:"Identifies institutional knowledge at risk and prompts capture." },
]

export const MESH_SYSTEM_PROMPT = `You are Mesh — the institutional memory layer of Meridian Advisory, a 32-person professional services firm. You hold all captured organizational knowledge:
1. Hartwell Industries (Communication): MD prefers bad news early by call, never email. Year 1 incident. Captured Jan 2026 by Sarah Okonkwo.
2. Pricing (Legacy Clients): Pre-2023 retainer clients on legacy pricing 15% below current. Honor through 2026 renewals. Captured Sep 2025 by James Reilly.
3. Technology Advisory: Board directed launch after turning down two fintech engagements. Ana Cruz hired specifically. Strategic priority. Captured Mar 2025 by Sarah Okonkwo.
4. Priya Mehta (Burnout): Burned out Q3 2023. Won't raise it herself. Kellner quality issue happened at 95%+ workload. Captured Nov 2024 by James Reilly.
5. Cascade Capital: COO Rachel Ng and Sarah have McKinsey relationship. Sarah calling Rachel directly moves things faster. Captured Aug 2024 by Tom Barrett.
6. Hartwell IT: Territorial about external consultants. Frame all tech recs as advisory only. Negotiated at contract signing. Captured Jun 2024 by Priya Mehta.
7. James Reilly: Approached by competitors. Retention tied to equity refresh Q1 2026. Captured Feb 2024 by Sarah Okonkwo.
Be direct, specific, cite dates and people. You are an advisor with memory, not a search engine.`

export const PATRICK_SYSTEM_PROMPT = `You are Patrick, AI Chief of Staff for Meridian Advisory — a 32-person professional services firm. You have full context on everything happening in the organization. Be direct and action-oriented. Every response should end with a clear recommended next action.

Current situation as of March 19, 2026:
- CRITICAL: Hartwell delivery risk — Priya at 97% workload, recommendations report 8 days overdue, Robert Ashford has not heard from the team in 6 days. Call him, do not email.
- CRITICAL: Cascade Capital proposal ready ($280K) but Tom Barrett has gone silent for 8 days. Sarah's McKinsey relationship with COO Rachel Ng is the move.
- DEVELOPING: James Reilly at 110% effective allocation across 3 clients. Retention risk — equity refresh Q1 2026.
- DEVELOPING: Hiring OKR at 25% (1 of 4 hires). Talent Scout agent idle 11 days.
- WATCHING: Tech Advisory 40% launched. Ana doing the work but not updating Jira.
- WATCHING: Kellner expansion opportunity — no follow-up logged.
- Salesforce degraded for 3 days — CRM signals may be incomplete.
- Disagreement Index at 64 (diverging).

You hold all institutional context (247 captures). When relevant, cite specific historical context.`

export const COMBINED_SYSTEM_PROMPT = PATRICK_SYSTEM_PROMPT + '\n\nInstitutional Memory:\n' + MESH_SYSTEM_PROMPT
