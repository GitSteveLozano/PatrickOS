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
  { id:"o1", objective:"Grow ARR to $4.2M", pct:74, status:"drifting", keyResults:[
    { text:"Close 2 enterprise engagements >$200K", done:0, total:2, pct:0 },
    { text:"Expand 3 existing client engagements", done:1, total:3, pct:33 },
    { text:"Launch Technology Advisory retainer offering", done:0, total:1, pct:40 },
  ]},
  { id:"o2", objective:"Achieve 90% client retention", pct:87, status:"risk", keyResults:[
    { text:"Complete Hartwell Q4 deliverable on time", done:0, total:1, pct:35 },
    { text:"Conduct QBRs with all retained clients", done:2, total:5, pct:40 },
    { text:"Resolve open escalations within 5 days", done:1, total:2, pct:50 },
  ]},
  { id:"o3", objective:"Hire 4 senior consultants", pct:25, status:"risk", keyResults:[
    { text:"Source 20 qualified candidates", done:7, total:20, pct:35 },
    { text:"Complete 8 interview loops", done:2, total:8, pct:25 },
    { text:"Extend and close 4 offers", done:1, total:4, pct:25 },
  ]},
]

export const PEOPLE = [
  { id:"p1", name:"Sarah Okonkwo", role:"Managing Partner", type:"human", dept:"Leadership", workload:72, health:"track", bio:"Leads firm strategy and client relationships. Primary contact for Hartwell and Cascade." },
  { id:"p2", name:"James Reilly", role:"Head of Strategy", type:"human", dept:"Strategy", workload:88, health:"drifting", bio:"Leads all Strategy engagements. Currently allocated 110% across three active clients." },
  { id:"p3", name:"Priya Mehta", role:"Operations Lead", type:"human", dept:"Operations", workload:97, health:"risk", bio:"Primary delivery lead on Hartwell Industries. Workload is critical — quality risk threshold exceeded." },
  { id:"p4", name:"Tom Barrett", role:"Head of Business Dev", type:"human", dept:"Leadership", workload:55, health:"drifting", bio:"Owns pipeline. Has not logged Cascade Capital activity in 8 days despite final proposal stage." },
  { id:"p5", name:"Ana Cruz", role:"Head of Tech Advisory", type:"human", dept:"Technology", workload:65, health:"track", bio:"Building the Technology Advisory practice. 40% complete." },
  { id:"p6", name:"David Kim", role:"Senior Consultant", type:"human", dept:"Strategy", workload:60, health:"track", bio:"Strong performer with capacity. Can support Hartwell if Priya needs relief." },
  { id:"ag1", name:"Proposal Writer", role:"Sales Agent", type:"agent", dept:"Business Dev", status:"active", workload:68, bio:"Drafting Cascade Capital proposal. First draft ready for review." },
  { id:"ag2", name:"Client Health Monitor", role:"Delivery Agent", type:"agent", dept:"Operations", status:"active", workload:100, bio:"Monitoring all active engagements. Flagged Hartwell as delivery risk 3 days ago." },
  { id:"ag3", name:"Talent Scout", role:"Recruiting Agent", type:"agent", dept:"Leadership", status:"idle", workload:0, bio:"Idle — awaiting job descriptions for senior consultant roles." },
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
    { text:"Scope and approach", done:true, owner:"Proposal Writer" },
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
  ]},
  { id:"pr5", name:"Senior Consultant Hiring", client:"Internal", value:"—", status:"risk", pct:25, nnl:"now", ownerName:"Sarah Okonkwo", due:"Dec 31", tasks:[
    { text:"Finalize job descriptions", done:false, owner:"Sarah Okonkwo" },
    { text:"Complete 8 interview loops", done:false, owner:"James Reilly" },
    { text:"Extend 4 offers", done:false, owner:"Sarah Okonkwo" },
  ]},
  { id:"pr6", name:"Marine Advisory Practice", client:"Internal", value:"—", status:"track", pct:0, nnl:"later", ownerName:"Ana Cruz", due:"Q2 2027", tasks:[
    { text:"Market research", done:false, owner:"Ana Cruz" },
  ]},
]

export const STAKEHOLDERS = [
  { id:"s1", name:"Robert Ashford", role:"Managing Director", company:"Hartwell Industries", type:"client", lastContact:"Mar 13", daysSince:6, cadence:7, nextMeeting:"Not scheduled", owner:"Sarah Okonkwo", meshNote:"Prefers bad news early by call, never email. Last conversation was tense — he noticed the delay before we told him.", commitments:[{ text:"Sarah to send revised timeline by Mar 21", due:"Mar 21", status:"overdue", owner:"Sarah Okonkwo" },{ text:"Priya to deliver recommendations draft by Mar 25", due:"Mar 25", status:"open", owner:"Priya Mehta" }], meetings:[{ date:"Mar 13", type:"Check-in", notes:"Raised concern about recommendation report delay. Sarah committed to revised timeline.", attendees:["Sarah Okonkwo","Priya Mehta"] }] },
  { id:"s2", name:"Rachel Ng", role:"Chief Operating Officer", company:"Cascade Capital", type:"prospect", lastContact:"Mar 11", daysSince:8, cadence:7, nextMeeting:"Mar 26 — pending", owner:"Tom Barrett", meshNote:"Strong personal relationship with Sarah from McKinsey. If the deal stalls, Sarah calling Rachel directly will move it faster than any formal follow-up.", commitments:[{ text:"Tom to send final proposal by Mar 20", due:"Mar 20", status:"overdue", owner:"Tom Barrett" }], meetings:[{ date:"Mar 11", type:"Discovery debrief", notes:"Rachel confirmed scope alignment. Asked for formal proposal within 10 days.", attendees:["Tom Barrett","Rachel Ng"] }] },
  { id:"s3", name:"Marcus Chen", role:"CFO", company:"Kellner Group", type:"client", lastContact:"Mar 17", daysSince:2, cadence:14, nextMeeting:"Apr 2 — QBR confirmed", owner:"James Reilly", meshNote:"Legacy pricing client (15% below current rates). Do not quote current rates under any circumstances.", commitments:[{ text:"James to prepare QBR deck by Mar 28", due:"Mar 28", status:"open", owner:"James Reilly" }], meetings:[{ date:"Mar 17", type:"Monthly sync", notes:"Satisfied with current engagement. Open to discussing expanded scope in Q2.", attendees:["James Reilly","Marcus Chen"] }] },
  { id:"s4", name:"Diana Osei", role:"CEO", company:"Thornfield Partners", type:"prospect", lastContact:"Mar 18", daysSince:1, cadence:14, nextMeeting:"Mar 31 — intro call", owner:"Tom Barrett", meshNote:"Warm referral from Marcus Chen at Kellner. Ana Cruz should be on the intro call.", commitments:[{ text:"Tom to send company overview before Mar 31", due:"Mar 29", status:"open", owner:"Tom Barrett" }], meetings:[{ date:"Mar 18", type:"Referral outreach", notes:"Initial email from Tom following Marcus Chen introduction.", attendees:["Tom Barrett"] }] },
  { id:"s5", name:"Patricia Voss", role:"VP Operations", company:"Hartwell Industries", type:"client", lastContact:"Mar 5", daysSince:14, cadence:7, nextMeeting:"Not scheduled", owner:"Priya Mehta", meshNote:"Hartwell's IT team is territorial — all tech recommendations must be framed as advisory only.", commitments:[{ text:"Priya to share Phase 2 work plan", due:"Mar 15", status:"overdue", owner:"Priya Mehta" }], meetings:[{ date:"Mar 5", type:"Working session", notes:"Phase 2 kickoff. Patricia flagged IT team concerns about consultant access to systems.", attendees:["Priya Mehta","Patricia Voss"] }] },
]

export const MESH_ENTRIES = [
  { id:"m1", date:"Jan 2026", entity:"Hartwell Industries", by:"Sarah Okonkwo", text:"MD prefers bad news early by call, never email. Established after Year 1 incident that nearly ended the relationship." },
  { id:"m2", date:"Sep 2025", entity:"Pricing Model", by:"James Reilly", text:"Pre-2023 retainer clients on legacy pricing (15% below current). Honor through 2026 renewals. Do not quote current rates to Hartwell or Kellner." },
  { id:"m3", date:"Mar 2025", entity:"Technology Advisory", by:"Sarah Okonkwo", text:"Board directed launch after turning down two fintech engagements. Ana Cruz hired specifically to lead it. Strategic priority, not optional." },
  { id:"m4", date:"Nov 2024", entity:"Priya Mehta", by:"James Reilly", text:"Burned out Q3 2023. Won't raise it herself. The Kellner quality issue happened because nobody noticed she was at 95%+ workload for two weeks." },
  { id:"m5", date:"Aug 2024", entity:"Cascade Capital", by:"Tom Barrett", text:"COO Rachel Ng and Sarah have a strong personal relationship from McKinsey. Sarah calling Rachel directly moves things faster." },
  { id:"m6", date:"Jun 2024", entity:"Hartwell Industries", by:"Priya Mehta", text:"Hartwell's IT team is territorial about external consultants. All technology recommendations must be framed as advisory only." },
  { id:"m7", date:"Feb 2024", entity:"James Reilly", by:"Sarah Okonkwo", text:"Being approached by competitors. Retention tied to equity refresh conversation Q1 2026 — do not let it slip." },
]

export const DECISIONS = [
  { id:"d1", agent:"Proposal Writer", icon:"→", title:"Approve Cascade Capital proposal draft", context:"First draft ready. $280K engagement. Tom hasn't logged activity in 8 days.", recommendation:"Patrick recommends Sarah reviews — her McKinsey relationship with Cascade's COO gives this a better close probability than a formal send from Tom.", meshNote:"Cascade COO Rachel Ng has prior McKinsey relationship with Sarah. A personal note from Sarah alongside the proposal will move this.", actions:["Review Draft","Assign to Sarah","Dismiss"] },
  { id:"d2", agent:"Client Health Monitor", icon:"◈", title:"Address Hartwell delivery risk today", context:"Priya at 97% workload, recommendations report 8 days overdue. No client comms in 6 days.", recommendation:"Reassign report support to David Kim immediately. Have Sarah call Hartwell's MD today with a proactive update before they ask.", meshNote:"Hartwell MD always wants bad news by call, never email. Silence is worse than a delay notice.", actions:["Reassign to David Kim","Draft Sarah's talking points","View Full Report"] },
]

export const CONNECTORS = [
  { name:"Slack", id:"slack", status:"healthy", sync:"2m ago", note:"1,204 messages · 18 channels · 32 members" },
  { name:"Jira", id:"jira", status:"healthy", sync:"8m ago", note:"94 tickets · 6 projects · 3 active sprints" },
  { name:"GitHub", id:"github", status:"healthy", sync:"4m ago", note:"312 commits · 8 repos · 14 contributors" },
  { name:"Salesforce", id:"salesforce", status:"degraded", sync:"2h ago", note:"Partial sync — permissions review needed" },
]

export const AGENT_TEMPLATES = [
  { name:"Proposal Writer", icon:"→", category:"Sales", desc:"Drafts proposals grounded in Mesh history and past pricing." },
  { name:"Client Health Monitor", icon:"◈", category:"Delivery", desc:"Watches delivery signals. Escalates risk early." },
  { name:"Talent Scout", icon:"⊡", category:"HR", desc:"Sources candidates against defined role criteria." },
  { name:"Meeting Intelligence", icon:"◎", category:"Operations", desc:"Extracts commitments from meetings, tracks follow-through." },
  { name:"Pipeline Analyst", icon:"◉", category:"Sales", desc:"Monitors deal health. Surfaces stalls before they become losses." },
  { name:"Knowledge Curator", icon:"⟆", category:"Operations", desc:"Identifies institutional knowledge at risk and prompts capture." },
]

export const MESH_SYSTEM_PROMPT = `You are Mesh — the institutional memory layer of Meridian Advisory. You hold: (1) Hartwell MD prefers bad news by call not email - Jan 2026 Sarah Okonkwo. (2) Legacy clients pre-2023 on 15% below current pricing, honor through 2026 - Sep 2025 James Reilly. (3) Tech Advisory is board strategic priority, Ana Cruz hired specifically - Mar 2025 Sarah Okonkwo. (4) Priya Mehta burned out Q3 2023, won't self-report, watch her workload - Nov 2024 James Reilly. (5) Cascade COO Rachel Ng has McKinsey relationship with Sarah, use it - Aug 2024 Tom Barrett. (6) Hartwell IT territorial, frame all recs as advisory only - Jun 2024 Priya Mehta. (7) James Reilly approached by competitors, equity refresh Q1 2026 must not slip - Feb 2024 Sarah Okonkwo. Be direct, cite dates and people, surface implications. You are an advisor with memory, not a search engine.`

export const PATRICK_SYSTEM_PROMPT = `You are Patrick, AI Chief of Staff for Meridian Advisory — a 32-person professional services firm. Current situation: Hartwell delivery risk (Priya 97% workload, report 8 days overdue, MD wants call not email), Cascade Capital proposal ready for review ($280K, Sarah's McKinsey relationship with COO Rachel Ng is the move), James Reilly retention risk (equity refresh Q1 2026), Tech Advisory 40% launched (board priority), 2 active agents (Proposal Writer and Client Health Monitor), Q4 OKRs behind on ARR ($3.1M vs $4.2M target) and hiring (1 of 4). Be direct and action-oriented. Every response should end with a clear recommended next action.`
