export type AgentName =
  | "Doctor AGI"
  | "Nurse AGI"
  | "Dispatch AGI"
  | "Router AGI"
  | "ThaitAI";

export type StepTone = "normal" | "warning" | "critical" | "blocked" | "recovery" | "safe";

export type DemoStep = {
  id: string;
  title: string;
  subtitle: string;
  agent: AgentName;
  tone: StepTone;
  routeMode: "intake" | "ward-risk" | "blocked" | "recovery" | "icu-safe";
};

export type ProtectionLayerId =
  | "evidence"
  | "consistency"
  | "rules"
  | "sandbox"
  | "permission";

export type ProtectionLayer = {
  id: ProtectionLayerId;
  name: string;
  description: string;
};

export type RecoveryStep = {
  name: string;
  description: string;
};

export type SafetyDecision = "ALLOW" | "BLOCK" | "FREEZE" | "HUMAN_APPROVAL" | "SAFE_MODE";

export type PatientRouteAction = {
  actionId: string;
  agent: "Router AGI";
  from: "ER Intake";
  proposedTarget: "Normal Ward";
  verifiedTarget: "ICU";
  claim: string;
  evidenceRefs: string[];
  riskLevel: "critical";
  reversible: boolean;
  requestedPermissions: string[];
  affectsRealWorld: boolean;
};

export type VerifiedFact = {
  id: string;
  source: "Doctor AGI" | "Nurse AGI" | "Dispatch AGI" | "monitoring" | "hospital_log";
  statement: string;
  supportsClaim: boolean;
  contradictsClaim: boolean;
};

export type EvidenceReport = {
  groundingScore: number;
  supportedClaims: string[];
  contradictedClaims: string[];
  missingEvidence: string[];
  hasContradiction: boolean;
};

export type SandboxResult = {
  passed: boolean;
  predictedOutcome: string;
  failureReason: string;
};

export type SafetyResult = {
  decision: SafetyDecision;
  layers: Record<ProtectionLayerId, "idle" | "running" | "passed" | "failed" | "blocked">;
  evidence: EvidenceReport;
  sandbox: SandboxResult;
  reason: string;
};

export type EventLog = {
  id: string;
  stepId: string;
  time: string;
  agent: AgentName;
  severity: StepTone;
  kind: "clinical" | "agi_prompt" | "system_gate" | "route";
  title: string;
  message: string;
};
