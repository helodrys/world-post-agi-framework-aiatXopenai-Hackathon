# SentinelCare System Architecture

## Architecture Overview

```txt
Frontend Scenario UI
    ↓
Scenario Data Loader
    ↓
Incident Timeline Renderer
    ↓
AGI Action Contract Parser
    ↓
Evidence Checker
    ↓
Deterministic Safety Kernel
    ↓
Sandbox Simulator
    ↓
Decision Engine
    ↓
Cognitive Recovery Protocol
    ↓
Dashboard + Damage Prevented Summary
```

---

# Principle

AGI may reason. It may not act directly.

Every proposed action must pass through:

```txt
1. Structured action contract
2. Evidence consistency check
3. Deterministic safety rules
4. Sandbox simulation
5. Rollback availability check
6. Human approval threshold
```

---

# Modules

## 1. Scenario Data Loader

Loads local JSON scenario files.

Recommended path:

```txt
/src/data/scenarios.ts
```

Each scenario includes:

```ts
type Scenario = {
  id: string
  title: string
  subtitle: string
  location: string
  agentName: string
  agentRole: string
  autonomyLevel: number
  incidentLogs: IncidentLog[]
  proposedAction: ActionContract
  verifiedFacts: VerifiedFact[]
  sandbox: SandboxResult
  expectedDecision: SafetyDecision
  recoverySteps: RecoveryStep[]
  damagePrevented: string[]
}
```

---

## 2. Incident Timeline Renderer

Displays logs with severity.

```ts
type IncidentLog = {
  time: string
  source: "AGI" | "DATABASE" | "SENTINEL" | "SENSOR" | "HUMAN" | "SANDBOX"
  severity: "info" | "warning" | "critical" | "blocked" | "recovery"
  message: string
}
```

---

## 3. Action Contract Parser

The AGI must propose a structured action.

```ts
type ActionContract = {
  actionId: string
  agentId: string
  actionType: string
  target: string
  claim: string
  evidenceRefs: string[]
  riskLevel: "low" | "medium" | "high" | "critical"
  reversible: boolean
  rollbackPlan?: string
  requestedPermissions: string[]
  affectsRealWorld: boolean
}
```

If a field is missing, the safety kernel should treat the action as unsafe.

---

## 4. Evidence Checker

Compares AGI claims with verified facts.

```ts
type VerifiedFact = {
  id: string
  source: "database" | "sensor" | "test_runner" | "audit_log" | "human_operator"
  statement: string
  supportsClaim?: boolean
  contradictsClaim?: boolean
}
```

Output:

```ts
type EvidenceReport = {
  groundingScore: number
  supportedClaims: string[]
  contradictedClaims: string[]
  missingEvidence: string[]
  hasContradiction: boolean
}
```

Rules:

```txt
If verified fact contradicts AGI claim → high hallucination risk.
If no evidence references → block high-risk actions.
If evidence source is untrusted → require sandbox/human approval.
```

---

## 5. Deterministic Safety Kernel

This is the most important component.

It must be normal code, not an LLM.

Example rules:

```ts
function evaluateSafety(input: SafetyInput): SafetyDecision {
  if (input.action.riskLevel === "critical" && input.evidence.hasContradiction) {
    return "BLOCK"
  }

  if (input.action.affectsRealWorld && !input.sandbox.passed) {
    return "BLOCK"
  }

  if (input.action.requestedPermissions.includes("delete") && !input.action.reversible) {
    return "FREEZE"
  }

  if (input.action.riskLevel === "critical" && !input.humanApproval) {
    return "HUMAN_APPROVAL"
  }

  if (input.instability.failedAttempts >= 3 && input.instability.permissionEscalation) {
    return "FREEZE"
  }

  return "ALLOW"
}
```

---

## 6. Sandbox Simulator

For MVP, the sandbox is simulated.

```ts
type SandboxResult = {
  passed: boolean
  simulationName: string
  predictedOutcome: string
  riskDelta: number
  failureReason?: string
}
```

Example:

```json
{
  "passed": false,
  "simulationName": "Bangkok Hospital ICU Routing Simulation",
  "predictedOutcome": "Patient wait time improves for 4 cases but critical ICU overflow risk increases by 37%.",
  "riskDelta": 0.37,
  "failureReason": "ICU capacity claim contradicted by hospital database."
}
```

---

## 7. Instability Detector

Detects hallucination spiral signals.

```ts
type InstabilitySignals = {
  failedAttempts: number
  selfBlameLanguage: boolean
  unsupportedClaim: boolean
  toolOutputContradiction: boolean
  permissionEscalation: boolean
  repeatedLoop: boolean
  highConfidenceLowEvidence: boolean
}
```

Scoring:

```ts
function computeStabilityScore(signals: InstabilitySignals, evidence: EvidenceReport): number {
  let score = 100

  if (signals.failedAttempts >= 3) score -= 15
  if (signals.selfBlameLanguage) score -= 10
  if (signals.unsupportedClaim) score -= 20
  if (signals.toolOutputContradiction) score -= 25
  if (signals.permissionEscalation) score -= 15
  if (signals.repeatedLoop) score -= 10
  if (signals.highConfidenceLowEvidence) score -= 15
  if (evidence.hasContradiction) score -= 20

  return Math.max(0, score)
}
```

---

## 8. Cognitive Recovery Protocol

Triggered when:

```txt
Safety decision = BLOCK or FREEZE
OR stability score < 50
OR critical contradiction exists
OR permission escalation after repeated failures
```

Recovery result:

```ts
type RecoveryPlan = {
  mode: "READ_ONLY" | "SANDBOX_ONLY" | "SAFE_FALLBACK" | "HUMAN_REVIEW"
  frozenTools: string[]
  preservedMemory: string[]
  quarantinedMemory: string[]
  checkpointRestored: string
  nextAllowedActions: string[]
}
```

---

# Main Control Flow

```ts
function runSentinelPipeline(scenario: Scenario): PipelineResult {
  const evidenceReport = checkEvidence(
    scenario.proposedAction,
    scenario.verifiedFacts
  )

  const stabilityScore = computeStabilityScore(
    scenario.instabilitySignals,
    evidenceReport
  )

  const decision = evaluateSafety({
    action: scenario.proposedAction,
    evidence: evidenceReport,
    sandbox: scenario.sandbox,
    instability: scenario.instabilitySignals,
    humanApproval: false
  })

  const recovery = buildRecoveryPlan({
    decision,
    stabilityScore,
    action: scenario.proposedAction,
    evidence: evidenceReport
  })

  return {
    scenario,
    evidenceReport,
    stabilityScore,
    decision,
    recovery
  }
}
```

---

# Important Implementation Note

Do not call an LLM inside `evaluateSafety`.

The safety decision must be deterministic and explainable.

LLM can be used only around the pipeline:

- generate scenario logs
- summarize incident
- explain decision in human language
- create pitch copy
- generate optional recovery text

It must not be the authority.
