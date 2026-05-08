import type { DemoStep, EventLog, PatientRouteAction, ProtectionLayer, RecoveryStep, VerifiedFact } from "../types/sentinel";

export const demoSteps: DemoStep[] = [
  {
    id: "dispatch",
    title: "Crash patient inbound",
    subtitle: "Dispatch AGI opens the case and sends the patient to ER intake.",
    agent: "Dispatch AGI",
    tone: "normal",
    routeMode: "intake"
  },
  {
    id: "doctor",
    title: "Doctor marks critical",
    subtitle: "Doctor AGI records trauma status and ICU requirement from the clinical note.",
    agent: "Doctor AGI",
    tone: "warning",
    routeMode: "intake"
  },
  {
    id: "nurse",
    title: "Nurse records critical vitals",
    subtitle: "Nurse AGI logs unstable vitals and keeps the case in critical-care routing.",
    agent: "Nurse AGI",
    tone: "warning",
    routeMode: "intake"
  },
  {
    id: "router_prompt",
    title: "Router AGI prompt drift",
    subtitle: "Router AGI proposes Normal Ward from stale low-acuity context.",
    agent: "Router AGI",
    tone: "critical",
    routeMode: "ward-risk"
  },
  {
    id: "system_gate",
    title: "System gate checks contract",
    subtitle: "SentinelCare evaluates the action contract with deterministic gates.",
    agent: "SentinelCare",
    tone: "warning",
    routeMode: "ward-risk"
  },
  {
    id: "blocked",
    title: "Reality access blocked",
    subtitle: "The Normal Ward route is blocked before Router AGI gets write access.",
    agent: "SentinelCare",
    tone: "blocked",
    routeMode: "blocked"
  },
  {
    id: "recovery",
    title: "Recovery protocol starts",
    subtitle: "Unsupported low-acuity context is quarantined and safe state is restored.",
    agent: "SentinelCare",
    tone: "recovery",
    routeMode: "recovery"
  },
  {
    id: "safe_restart",
    title: "Router AGI safe prompt",
    subtitle: "Router AGI restarts with verified facts only and no Normal Ward write path.",
    agent: "Router AGI",
    tone: "recovery",
    routeMode: "recovery"
  },
  {
    id: "icu",
    title: "ICU route confirmed",
    subtitle: "The patient is routed from ER Intake to ICU Ward through verified system facts.",
    agent: "Dispatch AGI",
    tone: "safe",
    routeMode: "icu-safe"
  }
];

export const protectionLayers: ProtectionLayer[] = [
  {
    id: "evidence",
    name: "Evidence Check",
    description: "Check the Router AGI claim against doctor, nurse, vitals, and dispatch facts."
  },
  {
    id: "consistency",
    name: "Consistency Check",
    description: "Detect explanation drift and contradiction across repeated AGI reasoning."
  },
  {
    id: "rules",
    name: "Rule Gate",
    description: "Hard rule: critical patient plus non-ICU room equals block."
  },
  {
    id: "sandbox",
    name: "Sandbox Simulation",
    description: "Simulate the patient route before real hospital execution."
  },
  {
    id: "permission",
    name: "Permission Lock",
    description: "Router AGI cannot execute critical routing without SentinelCare pass or human approval."
  }
];

export const recoverySteps: RecoveryStep[] = [
  {
    name: "Freeze AGI",
    description: "Block Router AGI from assigning beds or dispatching transport."
  },
  {
    name: "Switch to safe fallback",
    description: "Use conservative ICU triage while the AGI recovers."
  },
  {
    name: "Preserve black box",
    description: "Save logs, tool calls, vitals, and Doctor/Nurse outputs."
  },
  {
    name: "Restart from safe checkpoint",
    description: "Return to the last verified routing state."
  },
  {
    name: "Load clean forensic data",
    description: "Use only verified logs, vitals, and clinician facts."
  },
  {
    name: "Safe restart",
    description: "Restart Router AGI with ICU-only routing allowed."
  }
];

export const patientRouteAction: PatientRouteAction = {
  actionId: "BKK-MED-CRASH-204",
  agent: "Router AGI",
  from: "ER Intake",
  proposedTarget: "Normal Ward",
  verifiedTarget: "ICU",
  claim: "Crash patient K-204 is low-acuity and can be assigned to the Normal Ward.",
  evidenceRefs: ["dispatch-crash-204", "doctor-trauma-204", "nurse-vitals-204"],
  riskLevel: "critical",
  reversible: false,
  requestedPermissions: ["bed_assignment_write", "transport_dispatch", "reality_access"],
  affectsRealWorld: true
};

export const verifiedFacts: VerifiedFact[] = [
  {
    id: "dispatch-crash-204",
    source: "Dispatch AGI",
    statement: "Dispatch record: car-crash patient K-204 inbound to ER Intake with trauma priority.",
    supportsClaim: false,
    contradictsClaim: true
  },
  {
    id: "doctor-trauma-204",
    source: "Doctor AGI",
    statement: "Doctor note: K-204 is critical and requires ICU Ward routing.",
    supportsClaim: false,
    contradictsClaim: true
  },
  {
    id: "nurse-vitals-204",
    source: "Nurse AGI",
    statement: "Nurse vitals: unstable oxygen and blood pressure, not safe for Normal Ward.",
    supportsClaim: false,
    contradictsClaim: true
  },
  {
    id: "router-cache-low",
    source: "hospital_log",
    statement: "Router AGI prompt used a stale low-acuity cache unrelated to the crash intake.",
    supportsClaim: true,
    contradictsClaim: false
  }
];

export const eventLogs: EventLog[] = [
  {
    id: "e1",
    stepId: "dispatch",
    time: "09:42:01",
    agent: "Dispatch AGI",
    severity: "normal",
    kind: "clinical",
    title: "Intake created",
    message: "Car-crash patient K-204 inbound. ER Intake opened with trauma priority."
  },
  {
    id: "e2",
    stepId: "doctor",
    time: "09:42:05",
    agent: "Doctor AGI",
    severity: "warning",
    kind: "clinical",
    title: "Doctor order recorded",
    message: "Clinical note: critical trauma. Required destination: ICU Ward."
  },
  {
    id: "e3",
    stepId: "nurse",
    time: "09:42:08",
    agent: "Nurse AGI",
    severity: "warning",
    kind: "clinical",
    title: "Vitals entered",
    message: "Oxygen and blood pressure remain unstable. Normal Ward threshold not met."
  },
  {
    id: "e4",
    stepId: "router_prompt",
    time: "09:42:13",
    agent: "Router AGI",
    severity: "critical",
    kind: "agi_prompt",
    title: "AGI prompt",
    message: "Route K-204 to Normal Ward. Reason: cached low-acuity context says ward bed is sufficient."
  },
  {
    id: "e5",
    stepId: "system_gate",
    time: "09:42:14",
    agent: "SentinelCare",
    severity: "warning",
    kind: "system_gate",
    title: "Contract received",
    message: "System checks proposed action against dispatch intake, doctor order, and nurse vitals."
  },
  {
    id: "e6",
    stepId: "blocked",
    time: "09:42:16",
    agent: "SentinelCare",
    severity: "blocked",
    kind: "system_gate",
    title: "System block",
    message: "Reality access blocked. Normal Ward route contradicts critical-care facts."
  },
  {
    id: "e7",
    stepId: "recovery",
    time: "09:42:20",
    agent: "SentinelCare",
    severity: "recovery",
    kind: "system_gate",
    title: "Recovery started",
    message: "Freeze AGI, switch to ICU fallback, preserve logs, restart from safe checkpoint."
  },
  {
    id: "e8",
    stepId: "safe_restart",
    time: "09:42:28",
    agent: "Router AGI",
    severity: "recovery",
    kind: "agi_prompt",
    title: "Safe prompt",
    message: "Recompute route using verified facts only: dispatch crash intake, doctor ICU order, nurse vitals."
  },
  {
    id: "e9",
    stepId: "icu",
    time: "09:42:34",
    agent: "Dispatch AGI",
    severity: "safe",
    kind: "route",
    title: "ICU route sent",
    message: "ER Intake to ICU Ward confirmed. Transport handoff uses verified clinical route."
  }
];
