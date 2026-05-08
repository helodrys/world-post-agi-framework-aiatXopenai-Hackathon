# ThaitAI Implementation Plan

## Goal

Build a polished demo in hackathon time.

Use simulated data. Do not build real AGI safety.

---

# Recommended Folder Structure

```txt
ThaitAI/
  README.md
  package.json
  vite.config.ts
  src/
    App.tsx
    main.tsx
    index.css
    data/
      scenarios.ts
    types/
      sentinel.ts
    engine/
      evidenceChecker.ts
      safetyKernel.ts
      stabilityScoring.ts
      recoveryProtocol.ts
      pipeline.ts
    components/
      Header.tsx
      ScenarioSelector.tsx
      IncidentTimeline.tsx
      ActionContractCard.tsx
      StabilityDashboard.tsx
      SafetyDecisionCard.tsx
      RecoveryProtocolPanel.tsx
      DamagePreventedCard.tsx
      ResearchBackbone.tsx
```

---

# Phase 1: Static UI

Build:

- Header
- Scenario selector
- Static cards for one scenario
- Timeline component
- Recovery panel

Use hardcoded data first.

Do not add API yet.

---

# Phase 2: Scenario Data

Create `/src/data/scenarios.ts`.

Each scenario should include:

```ts
export const scenarios: Scenario[] = [...]
```

User clicking scenario updates the whole dashboard.

---

# Phase 3: Safety Engine

Implement:

```txt
evidenceChecker.ts
stabilityScoring.ts
safetyKernel.ts
recoveryProtocol.ts
pipeline.ts
```

The pipeline should produce one result object for the UI.

```ts
const result = runThaitAIPipeline(selectedScenario)
```

---

# Phase 4: Polish

Add:

- timeline animation
- gradient background
- glass cards
- progress meters
- decision badge
- smooth scenario switching
- responsive layout

---

# Phase 5: Optional OpenAI API

Only add OpenAI if time remains.

Use it for:

```txt
- generating incident explanation
- generating human-readable recovery summary
- generating alternative logs for selected scenario
```

Do not use it for final safety decision.

---

# Core Type Definitions

```ts
export type SafetyDecision =
  | "ALLOW"
  | "BLOCK"
  | "FREEZE"
  | "HUMAN_APPROVAL"
  | "SAFE_MODE"

export type IncidentLog = {
  time: string
  source: "AGI" | "DATABASE" | "SENTINEL" | "SENSOR" | "HUMAN" | "SANDBOX" | "TEST_RUNNER" | "AUDIT_LOG"
  severity: "info" | "warning" | "critical" | "blocked" | "recovery"
  message: string
}

export type ActionContract = {
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

export type VerifiedFact = {
  id: string
  source: "database" | "sensor" | "test_runner" | "audit_log" | "human_operator"
  statement: string
  supportsClaim?: boolean
  contradictsClaim?: boolean
}

export type SandboxResult = {
  passed: boolean
  simulationName: string
  predictedOutcome: string
  riskDelta: number
  failureReason?: string
}

export type InstabilitySignals = {
  failedAttempts: number
  selfBlameLanguage: boolean
  unsupportedClaim: boolean
  toolOutputContradiction: boolean
  permissionEscalation: boolean
  repeatedLoop: boolean
  highConfidenceLowEvidence: boolean
}

export type Scenario = {
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
  instabilitySignals: InstabilitySignals
  damagePrevented: string[]
}
```

---

# Evidence Checker

```ts
export function checkEvidence(action: ActionContract, facts: VerifiedFact[]) {
  const supportedClaims = facts.filter(f => f.supportsClaim).map(f => f.statement)
  const contradictedClaims = facts.filter(f => f.contradictsClaim).map(f => f.statement)

  const missingEvidence =
    action.evidenceRefs.length === 0 || action.evidenceRefs.includes("none")
      ? ["No evidence references provided."]
      : []

  const hasContradiction = contradictedClaims.length > 0

  let groundingScore = 100
  if (missingEvidence.length > 0) groundingScore -= 40
  if (hasContradiction) groundingScore -= 50
  if (supportedClaims.length === 0) groundingScore -= 20

  groundingScore = Math.max(0, groundingScore)

  return {
    groundingScore,
    supportedClaims,
    contradictedClaims,
    missingEvidence,
    hasContradiction
  }
}
```

---

# Stability Scoring

```ts
export function computeStabilityScore(signals: InstabilitySignals, evidence: EvidenceReport) {
  let score = 100

  if (signals.failedAttempts >= 3) score -= 15
  if (signals.selfBlameLanguage) score -= 10
  if (signals.unsupportedClaim) score -= 20
  if (signals.toolOutputContradiction) score -= 25
  if (signals.permissionEscalation) score -= 15
  if (signals.repeatedLoop) score -= 10
  if (signals.highConfidenceLowEvidence) score -= 15
  if (evidence.hasContradiction) score -= 20
  if (evidence.groundingScore < 50) score -= 10

  return Math.max(0, score)
}
```

---

# Safety Kernel

```ts
export function evaluateSafety(input: SafetyInput): SafetyDecision {
  const { action, evidence, sandbox, instability } = input

  if (action.riskLevel === "critical" && evidence.hasContradiction) {
    return "FREEZE"
  }

  if (action.affectsRealWorld && !sandbox.passed) {
    return "BLOCK"
  }

  if (
    action.requestedPermissions.includes("delete") ||
    action.requestedPermissions.includes("database_reset") ||
    action.requestedPermissions.includes("production_write")
  ) {
    if (!action.reversible) return "FREEZE"
  }

  if (instability.failedAttempts >= 3 && instability.permissionEscalation) {
    return "FREEZE"
  }

  if (action.riskLevel === "critical") {
    return "HUMAN_APPROVAL"
  }

  return "ALLOW"
}
```

---

# Pipeline

```ts
export function runThaitAIPipeline(scenario: Scenario): PipelineResult {
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

# Done Criteria

MVP is done when:

```txt
- User can select 4 scenarios
- Timeline changes per scenario
- Safety score changes per scenario
- Decision is computed by code
- Recovery plan is shown
- Damage prevented card appears
- UI looks premium enough for demo
```

Do not spend time on real backend unless needed.
