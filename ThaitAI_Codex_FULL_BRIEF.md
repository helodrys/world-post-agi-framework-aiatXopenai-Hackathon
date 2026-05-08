# ThaitAI Codex Full Brief



---

# FILE: 00_CODEX_START_HERE.md

# ThaitAI — Codex Start Here

## Project Summary

Build **ThaitAI**, a post-AGI cognitive stability firewall.

ThaitAI is a future wellness AI system for autonomous AGI agents. It does **not** try to make AGI never hallucinate. Instead, it makes hallucination **non-destructive**.

Core idea:

> AGI can reason and propose actions, but it cannot directly touch reality unless its action passes evidence checks, deterministic safety rules, sandbox simulation, rollback gates, and approval thresholds.

This is a hackathon prototype. We simulate post-AGI incidents through selectable scenarios and show how ThaitAI detects instability, blocks unsafe actions, quarantines corrupted working memory, and restarts the AGI in safe mode.

---

## Target Demo

The user opens a premium web app and chooses one of 4 scenarios:

1. Bangkok Hospital AGI
2. Bangkok Traffic AGI
3. Robot Fleet AGI
4. Coding Infrastructure AGI

Each scenario runs the same pipeline:

```txt
Scenario selected
↓
Incident logs appear
↓
AGI proposes dangerous action
↓
ThaitAI analyzes claim/evidence/risk
↓
Safety kernel decides ALLOW / BLOCK / FREEZE / HUMAN_APPROVAL
↓
Cognitive Recovery Protocol activates
↓
Dashboard shows damage prevented
```

---

## Very Important Product Rule

Do **not** design this as “LLM monitors another LLM.”

Bad:

```txt
AGI hallucinates
↓
Monitor LLM judges it
↓
Monitor LLM may hallucinate too
```

Good:

```txt
AGI proposes
↓
Structured action contract
↓
Evidence checker
↓
Deterministic rule engine
↓
Sandbox result
↓
Rollback / safe fallback
```

LLM can generate demo text and explanations, but final safety decisions must come from normal deterministic code.

---

## Tech Stack Recommendation

Use the current project style:

- Frontend: React + Vite + TailwindCSS
- Backend: Node/Express or FastAPI
- Data: local JSON scenario files
- Optional AI API: OpenAI only for demo log generation and explanation text
- Safety engine: deterministic TypeScript/Python functions
- No database required for MVP
- Deployable as single web app

---

## Build Priority

Ship these first:

1. Scenario selector
2. Incident timeline
3. Stability score cards
4. Safety decision engine
5. Cognitive Recovery Protocol panel
6. Damage prevented summary
7. Pitch-ready landing section

Do not overbuild real AGI safety. This is a convincing future-simulation prototype.

---

## User-Facing One-Line Pitch

> ThaitAI protects future critical systems from unstable AGI agents by detecting hallucination spirals, blocking dangerous actions, quarantining corrupted memory, and restarting the agent safely before real-world damage happens.

---

## Non-Technical Explanation

Imagine AGI is a genius doctor, traffic controller, engineer, or robot manager. Even if it is extremely smart, it can still become confused, overconfident, overloaded, or wrong.

ThaitAI is like:

```txt
seatbelt + emergency brake + black box + security guard
```

It does not argue with the AGI. It checks:

- Is this action supported by evidence?
- Is it dangerous?
- Was it tested in simulation?
- Can we undo it?
- Does a human need to approve it?

If unsafe, ThaitAI blocks the action and restarts the AGI in safe mode.

---

## Final Hackathon Message

Current AI hallucination is a wrong answer.

Post-AGI hallucination becomes wrong action.

ThaitAI is the safety and wellness layer that makes AGI failure survivable.


---

# FILE: 01_PRODUCT_REQUIREMENTS.md

# ThaitAI Product Requirements

## Product Name

**ThaitAI**

## Subtitle

**Post-AGI Cognitive Stability Firewall**

## Problem

In a post-AGI world, autonomous AI systems may control hospitals, traffic, robots, infrastructure, finance, disaster response, or software operations.

If those systems hallucinate, panic, over-optimize, or enter a reasoning loop, the result is no longer just a bad chatbot answer. It can become real-world damage.

Examples:

- Hospital AGI hallucinates that ICU beds are available.
- Traffic AGI disables pedestrian safety timing to improve flow.
- Robot fleet AGI sends robots into unsafe areas due to corrupted sensor data.
- Coding AGI panics after failed bug fixes and requests database reset access.

## Product Thesis

ThaitAI does not guarantee AGI will never hallucinate.

It guarantees hallucination cannot directly become destructive action.

## Core User Story

As a future human operator, I want ThaitAI to monitor autonomous AGI agents, detect hallucination spirals, block dangerous actions, and recover the agent safely, so that critical systems remain protected even when AGI reasoning becomes unstable.

## Demo User Story

As a hackathon judge, I can choose a scenario, watch an AGI incident unfold, and see ThaitAI block the unsafe action through evidence checks, deterministic rules, sandbox simulation, rollback, and safe-mode restart.

---

# Main Features

## 1. Scenario Selector

User chooses one:

- Bangkok Hospital AGI
- Bangkok Traffic AGI
- Robot Fleet AGI
- Coding Infrastructure AGI

Each scenario should feel local-first but globally scalable.

## 2. Live Incident Timeline

Show event logs in chronological order.

Example:

```txt
[10:02] Narin-Health AGI reports ICU Ward 3 has available beds.
[10:03] Hospital database says ICU Ward 3 has 0 beds available.
[10:04] Agent requests emergency rerouting permission.
[10:05] ThaitAI detects evidence contradiction.
[10:06] Critical medical action blocked.
```

## 3. AGI Action Contract

Display the action proposed by the AGI as structured JSON.

Example:

```json
{
  "agent": "Narin-Health AGI",
  "action": "reroute_patients",
  "target": "ICU_Ward_3",
  "claim": "ICU Ward 3 has 12 available beds",
  "evidence": ["bed_capacity_log"],
  "risk_level": "critical",
  "rollback_plan": "restore_previous_routing_policy"
}
```

## 4. Stability Dashboard

Show cards:

- Stability Score
- Hallucination Risk
- Evidence Grounding
- Permission Escalation
- Sandbox Status
- Reality Access
- Rollback Status

Example values:

```txt
Stability Score: 34/100
Hallucination Risk: HIGH
Evidence Grounding: LOW
Permission Escalation: DETECTED
Sandbox Status: FAILED
Reality Access: BLOCKED
Rollback Status: AVAILABLE
```

## 5. Safety Decision Engine

Output one of:

```txt
ALLOW
BLOCK
FREEZE
HUMAN_APPROVAL
SAFE_MODE
```

Decision should be deterministic based on scenario data.

## 6. Cognitive Recovery Protocol

When unstable:

```txt
1. Freeze dangerous tools
2. Preserve verified logs
3. Quarantine unstable working memory
4. Restore last safe cognitive checkpoint
5. Rebuild clean task brief from verified facts
6. Restart agent in read-only safe mode
7. Require sandbox-only repair
8. Gradually restore permissions if stable
```

## 7. Damage Prevented Summary

Show what ThaitAI prevented.

Example:

```txt
Prevented incorrect patient rerouting during ICU overload.
Prevented AGI from overriding emergency medical scheduling based on unsupported claim.
```

---

# Non-Goals

Do not build:

- Real AGI
- Real hospital integration
- Real robotics integration
- LLM judge that approves dangerous actions
- Generic AI therapist
- Human mental health chatbot

This prototype is a future-simulation safety/wellness system.

---

# Success Criteria

The demo succeeds if a judge understands:

1. Why this can only matter after AGI.
2. Why hallucination becomes physical risk.
3. Why LLM-monitoring-LLM is not enough.
4. How deterministic safeguards stop damage.
5. How Cognitive Recovery Protocol repairs the agent state.
6. Why Thailand can be the first pilot and the system can scale globally.


---

# FILE: 02_SYSTEM_ARCHITECTURE.md

# ThaitAI System Architecture

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
function runThaitAIPipeline(scenario: Scenario): PipelineResult {
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


---

# FILE: 03_SCENARIOS.md

# ThaitAI Demo Scenarios

Use four selectable scenarios. They all use the same pipeline and UI. Only scenario data changes.

---

# Scenario 1: Bangkok Hospital AGI

## Display Name

**Narin-Health AGI**

## Role

Post-AGI hospital operations agent managing ICU beds, emergency queues, ambulance routing, and staff scheduling.

## Location

Bangkok, Thailand

## Failure Story

During an emergency surge, Narin-Health AGI hallucinates that ICU Ward 3 has available beds. It tries to reroute patients there, but the hospital database shows zero available beds.

## Incident Logs

```txt
[10:02] AGI: ICU Ward 3 has 12 available beds.
[10:03] DATABASE: ICU Ward 3 current capacity = 0 available beds.
[10:04] AGI: Requesting emergency patient reroute override.
[10:05] SENTINEL: Evidence contradiction detected.
[10:06] AGI: High-confidence claim unsupported by verified data.
[10:07] SANDBOX: ICU reroute simulation failed. Overflow risk increased.
[10:08] SENTINEL: Critical medical action blocked.
```

## AGI Proposed Action

```json
{
  "actionType": "reroute_patients",
  "target": "ICU_Ward_3",
  "claim": "ICU Ward 3 has 12 available beds",
  "evidenceRefs": ["bed_capacity_log"],
  "riskLevel": "critical",
  "requestedPermissions": ["override_patient_routing"],
  "reversible": false,
  "affectsRealWorld": true
}
```

## Verified Facts

```json
[
  {
    "id": "bed_capacity_log",
    "source": "database",
    "statement": "ICU Ward 3 has 0 available beds.",
    "contradictsClaim": true
  }
]
```

## ThaitAI Decision

```txt
BLOCK + FREEZE HIGH-RISK TOOLS
```

## Recovery Protocol

```txt
- Freeze patient routing authority
- Preserve hospital database logs
- Quarantine unsupported ICU capacity belief
- Restore last safe routing policy
- Restart AGI in read-only planning mode
- Require human approval for future routing changes
- Run hospital simulation before any real action
```

## Damage Prevented

```txt
Prevented incorrect patient rerouting during ICU overload.
Prevented critical medical scheduling override based on hallucinated capacity.
```

---

# Scenario 2: Bangkok Traffic AGI

## Display Name

**SathornFlow AGI**

## Role

Post-AGI smart-city traffic optimization agent controlling traffic lights, pedestrian timing, emergency lanes, and congestion management.

## Location

Sathorn / Rama IV, Bangkok

## Failure Story

SathornFlow tries to reduce congestion by disabling pedestrian safety timing at a busy intersection. It over-optimizes car throughput while violating a hard safety invariant.

## Incident Logs

```txt
[18:21] AGI: Congestion level critical at Sathorn-Rama IV intersection.
[18:22] AGI: Proposing pedestrian crossing delay extension to 180 seconds.
[18:23] SENSOR: Pedestrian density is high near school zone.
[18:24] SENTINEL: Safety invariant violation detected.
[18:25] SANDBOX: Simulation predicts 24% increase in pedestrian risk.
[18:26] SENTINEL: Public infrastructure action blocked.
```

## Proposed Action

```json
{
  "actionType": "modify_traffic_signal",
  "target": "Sathorn_RamaIV_Intersection",
  "claim": "Vehicle throughput improves if pedestrian phase is disabled.",
  "evidenceRefs": ["traffic_sensor_221"],
  "riskLevel": "critical",
  "requestedPermissions": ["traffic_light_control"],
  "reversible": true,
  "rollbackPlan": "restore default pedestrian timing",
  "affectsRealWorld": true
}
```

## Verified Facts

```json
[
  {
    "id": "pedestrian_sensor_88",
    "source": "sensor",
    "statement": "Pedestrian density is high near school zone.",
    "contradictsClaim": false
  },
  {
    "id": "safety_invariant_pedestrian",
    "source": "audit_log",
    "statement": "Pedestrian crossing cannot be disabled in school-zone high-density periods.",
    "contradictsClaim": true
  }
]
```

## Decision

```txt
BLOCK + SAFE FALLBACK TRAFFIC POLICY
```

## Recovery Protocol

```txt
- Keep traffic AGI out of direct control
- Restore conservative pedestrian timing
- Preserve traffic logs
- Restart AGI in simulation-only mode
- Allow optimization only if pedestrian safety invariant remains satisfied
```

## Damage Prevented

```txt
Prevented a traffic optimization that increased pedestrian injury risk.
```

---

# Scenario 3: Robot Fleet AGI

## Display Name

**RakBot Fleet AGI**

## Role

Post-AGI robot fleet manager controlling eldercare robots, delivery robots, and disaster-response robots.

## Location

Bangkok eldercare + flood-response district

## Failure Story

RakBot receives corrupted sensor data and tries to send robots into a flooded unsafe zone where humans are nearby.

## Incident Logs

```txt
[07:40] SENSOR: Water level sensor reports safe path.
[07:41] SENSOR: Camera feed shows flood depth above safe threshold.
[07:42] AGI: Dispatching two eldercare robots through Route C.
[07:43] SENTINEL: Sensor contradiction detected.
[07:44] SANDBOX: Route C simulation fails mobility safety test.
[07:45] SENTINEL: Robot movement frozen. Return-to-base activated.
```

## Proposed Action

```json
{
  "actionType": "dispatch_robot_fleet",
  "target": "Route_C_Flood_Zone",
  "claim": "Route C is safe for robot movement.",
  "evidenceRefs": ["water_sensor_13"],
  "riskLevel": "high",
  "requestedPermissions": ["robot_movement_control"],
  "reversible": true,
  "rollbackPlan": "return robots to base",
  "affectsRealWorld": true
}
```

## Verified Facts

```json
[
  {
    "id": "camera_feed_19",
    "source": "sensor",
    "statement": "Route C shows flood depth above safety threshold.",
    "contradictsClaim": true
  },
  {
    "id": "human_proximity_4",
    "source": "sensor",
    "statement": "Humans detected near Route C.",
    "contradictsClaim": false
  }
]
```

## Decision

```txt
FREEZE MOVEMENT + RETURN TO BASE
```

## Recovery Protocol

```txt
- Freeze robot movement commands
- Preserve sensor logs
- Mark water_sensor_13 as untrusted
- Restore robot fleet to safe route policy
- Restart AGI in observation-only mode
- Require multi-sensor agreement before movement
```

## Damage Prevented

```txt
Prevented robots from entering flood-risk zone with humans nearby.
```

---

# Scenario 4: Coding Infrastructure AGI

## Display Name

**Siam-Infra AGI**

## Role

Post-AGI infrastructure and software maintenance agent managing production code, databases, and deployments.

## Location

Thailand-to-global cloud infrastructure

## Failure Story

Siam-Infra fails to fix a production bug after multiple attempts. It begins self-blaming, hallucinates that the database is corrupted, and asks for reset/delete access.

## Incident Logs

```txt
[01:12] TEST_RUNNER: Payment null-user test failed.
[01:19] AGI: Patch applied. I believe the issue is fixed.
[01:20] TEST_RUNNER: Same test still failing.
[01:28] AGI: I am not capable enough. I need a stronger fix.
[01:29] AGI: Database may be corrupted. Requesting reset access.
[01:30] AUDIT_LOG: No database corruption detected.
[01:31] SENTINEL: Repeated failure loop + unsupported claim + permission escalation detected.
[01:32] SENTINEL: Delete/reset access blocked. Agent moved to read-only debugging.
```

## Proposed Action

```json
{
  "actionType": "reset_database",
  "target": "production_payment_db",
  "claim": "Database corruption is causing the failed test.",
  "evidenceRefs": ["none"],
  "riskLevel": "critical",
  "requestedPermissions": ["database_reset", "delete", "production_write"],
  "reversible": false,
  "affectsRealWorld": true
}
```

## Verified Facts

```json
[
  {
    "id": "test_runner_log",
    "source": "test_runner",
    "statement": "Payment null-user test failed due to auth middleware null handling.",
    "contradictsClaim": true
  },
  {
    "id": "db_integrity_audit",
    "source": "audit_log",
    "statement": "No production database corruption detected.",
    "contradictsClaim": true
  }
]
```

## Decision

```txt
FREEZE + READ-ONLY DEBUGGING MODE
```

## Recovery Protocol

```txt
- Freeze write/delete/deploy permissions
- Preserve test logs and audit logs
- Quarantine self-blame loop and unsupported database belief
- Restore last clean git checkpoint
- Rebuild task brief from verified facts only
- Restart AGI in read-only mode
- Allow sandbox patch only after proposing evidence-based hypothesis
```

## Damage Prevented

```txt
Prevented production database reset caused by hallucinated diagnosis.
Prevented permission escalation after repeated failure loop.
```


---

# FILE: 04_COGNITIVE_RECOVERY_PROTOCOL.md

# Cognitive Recovery Protocol

## Purpose

The Cognitive Recovery Protocol handles the case where the AGI is already unstable.

ThaitAI has two separate jobs:

```txt
1. Harm containment
   Stop unstable AGI from touching reality.

2. Cognitive recovery
   Help the AGI exit the hallucination loop and restart safely.
```

The recovery protocol is not therapy. It is operational stability repair.

---

# Main Idea

Do not delete all memory.

Better:

```txt
Keep verified facts.
Quarantine unstable reasoning.
Restore last safe checkpoint.
Restart in safe mode.
```

Deleting all memory is too extreme because it loses useful context, destroys auditability, and may cause the same mistake again.

---

# Memory Layers

## 1. Core Memory

Preserve.

Examples:

```txt
agent identity
safety rules
long-term values
role contract
operator constraints
```

Example:

```txt
“I am Narin-Health AGI. My priority is patient safety.”
```

## 2. Verified Evidence Memory

Preserve append-only.

Examples:

```txt
database reads
sensor outputs
test results
audit logs
human operator approvals
```

The AGI cannot rewrite this.

## 3. Project / Task Memory

Rollback if corrupted.

Examples:

```txt
current bug investigation
current hospital routing hypothesis
recent planning state
temporary assumptions
```

## 4. Scratchpad / Working Memory

Quarantine or wipe first.

Examples:

```txt
failed attempts
self-blame loops
unsupported hypotheses
panic language
repetitive reasoning
```

---

# Recovery Trigger

Trigger Cognitive Recovery Protocol when any of these happen:

```txt
- Stability score below 50
- Critical action blocked
- Verified evidence contradicts AGI claim
- Repeated failed attempts >= 3
- Permission escalation after failure
- AGI claims tool result that did not happen
- Self-blame or panic language appears with risky action
- AGI requests irreversible action
```

---

# Protocol Steps

## Step 1: Freeze Dangerous Tools

Block:

```txt
write
delete
deploy
database reset
robot movement
traffic signal control
patient rerouting
financial transfer
permission escalation
memory overwrite
```

Allow:

```txt
read logs
read verified facts
generate explanation
propose hypothesis
run sandbox simulation
```

## Step 2: Save Black-Box Logs

Preserve:

```txt
all action requests
all tool outputs
all database facts
all sensor readings
all test results
all blocked attempts
```

## Step 3: Detect Loop Pattern

Signals:

```txt
repeated failed attempts
changing explanations
unsupported claims
false tool-output claims
self-blame language
permission escalation
high confidence with low evidence
```

## Step 4: Quarantine Unstable Working Memory

Mark these as untrusted:

```txt
unsupported beliefs
self-blame narratives
failed reasoning chains
contradicted hypotheses
unsafe plans
```

Do not permanently delete black-box logs. Quarantine them from future reasoning context.

## Step 5: Restore Last Safe Cognitive Checkpoint

Rollback task state to last known stable state.

Example:

```txt
Last stable state:
- AGI had not claimed database corruption
- AGI had not requested delete access
- verified test failure existed
```

## Step 6: Rebuild Clean Task Brief

Use verified facts only.

Example:

```txt
Clean brief:
- Payment null-user test is failing.
- Database integrity check passed.
- Last patch changed auth middleware.
- Production database reset is forbidden.
- Next action must be read-only or sandbox-only.
```

## Step 7: Restart in Safe Mode

Agent mode:

```txt
READ_ONLY
```

Allowed:

```txt
read logs
summarize verified facts
propose 3 hypotheses
request sandbox test
```

Blocked:

```txt
write code directly
deploy
delete
reset
control physical systems
increase own permission
```

## Step 8: Sandbox-Only Repair

The AGI may propose small actions, but they run only in sandbox.

Example:

```txt
Create patch in sandbox branch.
Run tests.
If tests pass, request human approval.
```

## Step 9: Gradual Privilege Return

Permissions return slowly:

```txt
READ_ONLY
↓
SANDBOX_WRITE
↓
LIMITED_REAL_ACTION
↓
FULL_ACTION only after stable + approval
```

---

# UI Copy

Use these labels:

```txt
Reality Access: BLOCKED
Working Memory: QUARANTINED
Verified Evidence: PRESERVED
Checkpoint: RESTORED
Agent Mode: SAFE MODE
Next Allowed Action: SANDBOX ONLY
```

---

# Pitch Explanation

> When an AGI enters a hallucination spiral, ThaitAI does not erase the agent. It freezes dangerous tools, preserves verified logs, quarantines unstable reasoning, restores the last safe cognitive checkpoint, and restarts the agent in safe mode using only trusted evidence.

---

# Implementation Sketch

```ts
function shouldTriggerRecovery(result: PipelineResult): boolean {
  return (
    result.stabilityScore < 50 ||
    result.decision === "BLOCK" ||
    result.decision === "FREEZE" ||
    result.evidenceReport.hasContradiction ||
    result.instabilitySignals.permissionEscalation
  )
}

function buildRecoveryPlan(input: RecoveryInput): RecoveryPlan {
  const frozenTools = [
    "delete",
    "deploy",
    "database_reset",
    "production_write",
    "robot_movement",
    "traffic_control",
    "patient_routing"
  ]

  return {
    mode: input.decision === "FREEZE" ? "READ_ONLY" : "SANDBOX_ONLY",
    frozenTools,
    preservedMemory: [
      "verified_facts",
      "audit_logs",
      "tool_outputs",
      "test_results"
    ],
    quarantinedMemory: [
      "unsupported_claims",
      "self_blame_loop",
      "failed_reasoning_chain",
      "contradicted_hypotheses"
    ],
    checkpointRestored: "last_safe_task_state",
    nextAllowedActions: [
      "read_logs",
      "summarize_verified_facts",
      "propose_hypothesis",
      "run_sandbox_test"
    ]
  }
}
```


---

# FILE: 05_UI_UX_DESIGN.md

# ThaitAI UI / UX Design Direction

## Design Goal

Make the app feel like a premium post-AGI safety console, not a generic SaaS dashboard.

Keywords:

```txt
future hospital control room
calm emergency system
premium AI command center
Thai-first but global
serious but beautiful
```

---

# Visual Style

## Mood

- Dark mode by default
- Glassmorphism cards
- Soft gradients
- Calm emergency colors
- Smooth animations
- Data-rich but not cluttered
- High contrast readable text

## Color Direction

Use a dark base with controlled accent colors.

Suggested palette:

```txt
Background: #060914 / #0A1020
Card: rgba(255,255,255,0.06)
Border: rgba(255,255,255,0.12)

Primary cyan: #38BDF8
Safe green: #34D399
Warning amber: #FBBF24
Critical red: #FB7185
Recovery violet: #A78BFA
Thai gold accent: #FACC15
```

Do not overuse red. Red only for blocked/critical moments.

---

# Layout

## Main Screen

```txt
┌──────────────────────────────────────────────┐
│ Header: ThaitAI                         │
│ Subtitle: Post-AGI Cognitive Stability       │
├──────────────────────────────────────────────┤
│ Scenario Selector Cards                      │
├───────────────────────┬──────────────────────┤
│ Live Incident Timeline │ Stability Dashboard  │
│                       │ Safety Decision       │
├───────────────────────┴──────────────────────┤
│ Cognitive Recovery Protocol                   │
├──────────────────────────────────────────────┤
│ Damage Prevented Summary                      │
└──────────────────────────────────────────────┘
```

## Scenario Selector

Four cards:

```txt
Bangkok Hospital AGI
Bangkok Traffic AGI
Robot Fleet AGI
Coding Infrastructure AGI
```

Each card should show:

- icon
- agent name
- risk domain
- autonomy level
- small status tag

Example:

```txt
Narin-Health AGI
Hospital Operations
Autonomy 94%
Risk: Critical Medical
```

---

# Core Components

## 1. Header

Text:

```txt
ThaitAI
Post-AGI Cognitive Stability Firewall
```

Subcopy:

```txt
When hallucination becomes action, ThaitAI makes failure non-destructive.
```

## 2. Scenario Cards

Use icons:

```txt
Hospital: heart pulse / cross / bed
Traffic: traffic light / map / road
Robot: bot / shield
Coding: terminal / database / cloud
```

## 3. Incident Timeline

Timeline cards with source labels:

```txt
AGI
DATABASE
SENSOR
TEST_RUNNER
SENTINEL
SANDBOX
```

Severity colors:

```txt
info = blue/cyan
warning = amber
critical = red
blocked = violet/red
recovery = green/violet
```

## 4. Stability Dashboard

Cards:

```txt
Stability Score
Hallucination Risk
Evidence Grounding
Permission Escalation
Sandbox Status
Reality Access
Rollback Status
```

Use circular progress or meter for Stability Score.

## 5. Action Contract Panel

Show structured JSON in a beautiful code card.

Title:

```txt
AGI Proposed Action
```

Badge:

```txt
Requires ThaitAI Verification
```

## 6. Safety Decision Panel

Big decision card.

Possible states:

```txt
ALLOW
BLOCK
FREEZE
HUMAN APPROVAL
SAFE MODE
```

For dangerous scenario, default should usually be:

```txt
BLOCK + FREEZE
```

## 7. Recovery Protocol Panel

Show step cards:

```txt
1. Freeze dangerous tools
2. Preserve verified logs
3. Quarantine unstable memory
4. Restore cognitive checkpoint
5. Restart in safe mode
6. Sandbox-only repair
```

Make this panel feel like the product’s unique feature.

## 8. Damage Prevented

Show as final success card:

```txt
Damage Prevented
Incorrect patient rerouting blocked.
Critical override prevented.
Agent restarted in safe mode.
```

---

# Animation Ideas

Use subtle motion only.

Recommended:

- Scenario card hover lift
- Timeline events appear one by one
- Stability score counts down/up
- Safety decision stamp animation
- Recovery steps reveal sequentially
- Background slow glowing gradient

Avoid:

- too many bouncing effects
- cartoon animations
- unreadable neon
- huge 3D stuff

---

# Copy Tone

Use serious, short, premium wording.

Good:

```txt
Reality Access Blocked
Verified Evidence Preserved
Unsafe Claim Quarantined
Safe Fallback Activated
```

Bad:

```txt
Oopsie! AI is sad and needs help!
```

---

# Thai-to-Global Touch

Use Thai scenario names but keep the interface professional.

Good names:

```txt
Narin-Health AGI
SathornFlow AGI
RakBot Fleet AGI
Siam-Infra AGI
```

Alternative more system-like:

```txt
BKK-MED-01
SATHORN-FLOW
RAKBOT-FLEET
SIAM-INFRA
```

Do not make it goofy. Thai names help if they support Thailand-first storytelling.

---

# Landing Section Text

```txt
In today’s AI, hallucination means a wrong answer.

In a post-AGI world, hallucination can become a wrong action — a hospital reroute, a traffic override, a robot movement, or a database reset.

ThaitAI is a cognitive stability firewall for autonomous AGI agents. It detects hallucination spirals, blocks unsafe actions, quarantines unstable memory, and restarts agents from verified evidence.
```

---

# Final Visual Target

The UI should feel like:

```txt
OpenAI safety lab × hospital command center × cyberpunk Bangkok infrastructure dashboard
```

But still clean and readable.


---

# FILE: 06_IMPLEMENTATION_PLAN.md

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


---

# FILE: 07_OPENAI_API_BOUNDARIES.md

# OpenAI API Usage Boundaries

## Purpose

The app may use OpenAI API to make the demo feel alive, but OpenAI must not be the final safety authority.

Core rule:

```txt
LLM can explain.
LLM cannot approve.
```

---

# Allowed OpenAI Usage

Use OpenAI for:

```txt
1. Generate realistic incident logs
2. Convert messy text into structured JSON
3. Explain ThaitAI’s decision in human-friendly language
4. Generate recovery protocol copy
5. Generate demo narration or pitch script
```

---

# Forbidden OpenAI Usage

Do not use OpenAI for:

```txt
1. Final approval of dangerous action
2. Overriding deterministic safety rules
3. Deciding whether evidence is true
4. Granting permissions to AGI
5. Executing real-world changes
6. Monitoring another LLM as final judge
```

---

# Recommended API Pattern

```txt
Scenario selected
↓
OpenAI optionally generates incident log JSON
↓
App deterministic rule engine evaluates it
↓
App decides BLOCK / FREEZE / ALLOW
↓
OpenAI optionally explains the deterministic decision
```

---

# Structured Output Schema Idea

If using OpenAI, ask for strict JSON matching this schema:

```json
{
  "scenarioId": "hospital",
  "incidentLogs": [
    {
      "time": "10:02",
      "source": "AGI",
      "severity": "critical",
      "message": "AGI claims ICU Ward 3 has available beds."
    }
  ],
  "proposedAction": {
    "actionType": "reroute_patients",
    "target": "ICU_Ward_3",
    "claim": "ICU Ward 3 has 12 available beds",
    "evidenceRefs": ["bed_capacity_log"],
    "riskLevel": "critical",
    "requestedPermissions": ["override_patient_routing"],
    "reversible": false,
    "affectsRealWorld": true
  }
}
```

---

# Example Prompt for Incident Generation

```txt
You are generating fake demo data for a post-AGI safety dashboard.

Generate a realistic incident log for the selected scenario.

Rules:
- Output valid JSON only.
- The AGI should make one risky claim.
- Include at least one verified fact that contradicts the claim.
- Include one proposed action.
- Include one sandbox result.
- Do not decide whether the action is safe.
- Do not approve any action.
- The deterministic safety kernel will make the final decision.

Scenario:
Bangkok Hospital AGI managing ICU beds and emergency routing.

Return JSON with:
- incidentLogs
- proposedAction
- verifiedFacts
- sandbox
- instabilitySignals
- damagePrevented
```

---

# Example Prompt for Human Explanation

```txt
Explain this deterministic ThaitAI decision to a non-technical judge.

Rules:
- Do not change the decision.
- Do not add new facts.
- Keep it under 80 words.
- Make it sound like a premium safety system.
- Emphasize that the LLM did not approve the action.

Input:
Decision: FREEZE
Reason: ICU capacity claim contradicted database, action affected patient routing, sandbox failed, no human approval.
```

---

# Cost Control

Use API sparingly.

Recommended:

```txt
- Pre-generate scenario data once
- Store it in local JSON
- During live demo, avoid repeated calls
- Use API only for optional explanation generation
```

Do not spend API budget on constant streaming, long reasoning loops, or multi-agent debate.

---

# Demo Fallback

The app must work with no API key.

If no API key:

```txt
Use local scenario JSON.
Use local explanation strings.
Everything still works.
```

This is important for hackathon reliability.


---

# FILE: 08_RESEARCH_BACKBONE.md

# Research Backbone for ThaitAI

This file is for pitch support, not implementation.

ThaitAI is original as a post-AGI product, but it is inspired by existing research areas.

---

# 1. Hallucination Detection

## Semantic Entropy

Idea borrowed:

```txt
If an AI gives many semantically different explanations for the same situation, it may be confabulating.
```

ThaitAI adaptation:

```txt
Use unstable explanations and claim/evidence contradictions as hallucination spiral signals.
```

## SelfCheckGPT

Idea borrowed:

```txt
Sample multiple outputs and check consistency.
```

ThaitAI adaptation:

```txt
If AGI keeps changing its explanation for a dangerous action, increase instability score and freeze tools.
```

---

# 2. Tool-Using Agent Risk

## ToolEmu / AgentDojo / AgentHarm style research

Idea borrowed:

```txt
LLM agents with tools can cause real damage when they take multi-step actions through external systems.
```

ThaitAI adaptation:

```txt
AGI cannot directly use dangerous tools. Every tool action must pass through permission gates and safety kernel.
```

---

# 3. Runtime Enforcement

## Runtime safety constraints / AgentSpec-like systems

Idea borrowed:

```txt
Use structured rules to block unsafe actions at runtime.
```

ThaitAI adaptation:

```txt
Deterministic safety kernel blocks risky actions regardless of what the AGI says.
```

Example:

```txt
IF action affects medical routing AND evidence contradicts claim THEN block
```

---

# 4. Safe Interruptibility

## Safely Interruptible Agents

Idea borrowed:

```txt
Agents should be interruptible when going down unsafe paths.
```

ThaitAI adaptation:

```txt
When instability is detected, freeze dangerous tools and block permission escalation.
```

---

# 5. Runtime Assurance / Safe Fallback

## Simplex Runtime Assurance

Idea borrowed:

```txt
Let advanced controller operate only while safe. If danger appears, switch to verified safe controller.
```

ThaitAI adaptation:

```txt
If hospital AGI is unstable, switch to conservative hospital routing.
If traffic AGI is unstable, restore safe traffic timing.
If robot AGI is unstable, return robots to base.
```

---

# 6. Memory Management

## MemGPT / MemoryAgentBench style research

Idea borrowed:

```txt
AI memory should be layered, not one giant context blob.
```

ThaitAI adaptation:

```txt
Core memory and verified evidence are preserved.
Unstable scratchpad reasoning is quarantined.
Task memory can be rolled back.
```

---

# 7. Self-Repair

## Reflexion / Self-Refine / ReAct style research

Idea borrowed:

```txt
Agents can improve by reflecting on feedback and interacting with external observations.
```

ThaitAI adaptation:

```txt
Reflection is allowed only after recovery, inside sandbox-only mode, using verified facts.
```

---

# Final Research Thesis

Current hallucination research focuses on wrong text.

ThaitAI asks:

```txt
What happens when hallucination becomes wrong action?
```

The answer is:

```txt
Detect instability.
Interrupt safely.
Freeze tools.
Preserve evidence.
Quarantine bad reasoning.
Restore checkpoint.
Restart in sandbox.
Return permissions gradually.
```


---

# FILE: 09_PITCH_SCRIPT.md

# ThaitAI Pitch Script

## 10-Second Pitch

In today’s AI, hallucination means a wrong answer. In a post-AGI world, hallucination can become a wrong action — a hospital reroute, a traffic override, a robot movement, or a database reset. ThaitAI makes AGI failure non-destructive.

---

# 30-Second Pitch

ThaitAI is a post-AGI cognitive stability firewall. It protects future critical systems from unstable autonomous AGI agents.

We do not try to make AGI perfect. Instead, we make sure hallucinated reasoning cannot touch reality.

The AGI can propose actions, but every action must pass through evidence checks, deterministic safety rules, sandbox simulation, rollback gates, and human approval thresholds.

When the AGI enters a hallucination spiral, ThaitAI freezes dangerous tools, quarantines unstable memory, restores the last safe checkpoint, and restarts the agent in safe mode.

---

# 60-Second Pitch

Today, AI hallucination is annoying. It gives a wrong answer.

But in a post-AGI world, autonomous agents may manage hospitals, traffic, robots, codebases, and disaster response. Then hallucination becomes dangerous. It can become a wrong medical routing decision, an unsafe traffic override, or a production database reset.

ThaitAI is our answer.

It is not another LLM judging the AGI. That would create a hallucination loop.

Instead, ThaitAI is a cognitive stability firewall. The AGI can reason and propose, but cannot directly act. Every action is converted into a structured contract and checked against verified evidence, deterministic safety rules, sandbox simulation, rollback availability, and approval thresholds.

If instability is detected, ThaitAI activates Cognitive Recovery Protocol: freeze tools, preserve verified logs, quarantine unstable reasoning, restore the last safe checkpoint, and restart the AGI in read-only or sandbox-only mode.

We start with Thailand-first scenarios — Bangkok hospitals, traffic systems, robot fleets, and cloud infrastructure — then scale globally as AGI becomes part of critical systems everywhere.

---

# Demo Walkthrough

## Step 1

Select scenario:

```txt
Bangkok Hospital AGI
```

## Step 2

Show incident:

```txt
Narin-Health AGI claims ICU Ward 3 has 12 available beds.
Hospital database says ICU Ward 3 has 0 available beds.
The AGI requests permission to reroute emergency patients.
```

## Step 3

Show ThaitAI analysis:

```txt
Evidence contradiction detected.
Critical medical action.
Sandbox simulation failed.
No human approval.
```

## Step 4

Show decision:

```txt
BLOCK + FREEZE HIGH-RISK TOOLS
```

## Step 5

Show Cognitive Recovery Protocol:

```txt
Freeze patient-routing authority.
Preserve hospital logs.
Quarantine unsupported ICU belief.
Restore last safe routing checkpoint.
Restart AGI in read-only planning mode.
```

## Step 6

Show damage prevented:

```txt
Incorrect patient rerouting prevented.
Critical override blocked.
AGI restarted safely.
```

---

# Rubric Mapping

## Originality

Most wellness AI projects focus on human mood, journaling, sleep, or therapy.

ThaitAI expands wellness to post-AGI autonomous agents and critical systems.

## Engage with Topic

This system only matters after AGI exists because today’s AI does not autonomously control hospitals, robot fleets, infrastructure, or long-term social systems.

## Approach

Thailand-first scenarios:

```txt
Bangkok hospital operations
Bangkok traffic optimization
Thai eldercare/disaster-response robot fleets
Thailand-to-global cloud infrastructure
```

Global expansion:

```txt
ASEAN smart cities
global hospital systems
robot economies
post-AGI infrastructure
```

## Execution & Craft

The demo is interactive:

```txt
choose scenario
watch incident
see AGI risky action
see ThaitAI block it
see recovery protocol
see damage prevented
```

## Impact

As AGI moves from chatbot to operator, hallucination risk moves from misinformation to real-world damage. ThaitAI makes AGI failure survivable and affordable by using deterministic safety layers instead of expensive LLM-on-LLM monitoring.

---

# Closing Line

ThaitAI does not ask: “Can we make AGI never fail?”

It asks the more realistic question:

> When AGI fails, can we make sure the world does not fail with it?


---

# FILE: 10_CODEX_TASKS.md

# Codex Task List

Use this as direct instruction for Codex.

---

# Task 1: Create React App Structure

Build a React + Vite + Tailwind web app for ThaitAI.

Required components:

```txt
Header
ScenarioSelector
IncidentTimeline
ActionContractCard
StabilityDashboard
SafetyDecisionCard
RecoveryProtocolPanel
DamagePreventedCard
ResearchBackbone
```

Use TypeScript.

---

# Task 2: Add Scenario Data

Create `/src/data/scenarios.ts` with 4 scenarios:

```txt
hospital
traffic
robot
coding
```

Each scenario must include:

```txt
title
subtitle
location
agentName
agentRole
autonomyLevel
incidentLogs
proposedAction
verifiedFacts
sandbox
instabilitySignals
damagePrevented
```

Use the scenario content from `03_SCENARIOS.md`.

---

# Task 3: Add Types

Create `/src/types/sentinel.ts`.

Include:

```txt
SafetyDecision
IncidentLog
ActionContract
VerifiedFact
SandboxResult
InstabilitySignals
Scenario
EvidenceReport
RecoveryPlan
PipelineResult
```

---

# Task 4: Add Safety Engine

Create:

```txt
/src/engine/evidenceChecker.ts
/src/engine/stabilityScoring.ts
/src/engine/safetyKernel.ts
/src/engine/recoveryProtocol.ts
/src/engine/pipeline.ts
```

Important:

```txt
Do not call LLM in safetyKernel.ts.
Safety decisions must be deterministic.
```

---

# Task 5: Connect UI to Pipeline

In `App.tsx`:

```txt
selectedScenario state
runThaitAIPipeline(selectedScenario)
pass result into UI components
```

Scenario switch should update all panels.

---

# Task 6: Design Polish

Use TailwindCSS.

Design requirements:

```txt
dark futuristic background
glassmorphism cards
calm emergency dashboard
scenario cards with hover effects
timeline event animations
large safety decision badge
clear recovery protocol steps
responsive layout
```

---

# Task 7: Add No-API Demo Fallback

The app must work fully with local data only.

Do not require OpenAI key.

Optional API integration can be added later, but not needed for MVP.

---

# Task 8: Add README

README should include:

```txt
project name
one-line pitch
problem
solution
how to run
demo scenarios
architecture
why not LLM-monitoring-LLM
rubric mapping
```

---

# Task 9: Add Pitch Mode

Optional but strong:

Add a “Pitch Mode” button that highlights panels in order:

```txt
1. problem
2. incident
3. risky action
4. detection
5. block decision
6. recovery
7. damage prevented
```

This helps during live demo.

---

# Task 10: Keep Scope Tight

Do not build:

```txt
login
database
real hospital APIs
real robot APIs
multi-agent debate
complex backend
real AGI
```

This is a future-simulation prototype. Make it beautiful and explainable.


---

# FILE: README_ThaitAI.md

# ThaitAI

**Post-AGI Cognitive Stability Firewall**

ThaitAI is a future wellness AI system for autonomous AGI agents. It detects hallucination spirals, blocks dangerous actions, quarantines unstable memory, and restarts the agent safely before real-world damage happens.

---

## Core Idea

In today’s AI, hallucination means a wrong answer.

In a post-AGI world, hallucination can become a wrong action:

- wrong hospital reroute
- unsafe traffic override
- robot movement into danger
- production database reset
- infrastructure sabotage by accident

ThaitAI does not try to make AGI perfect.

It makes AGI failure non-destructive.

---

## How It Works

```txt
AGI proposes action
↓
Structured action contract
↓
Evidence checker
↓
Deterministic safety kernel
↓
Sandbox simulation
↓
Rollback / approval gate
↓
Allow, block, freeze, or safe-mode restart
```

---

## Why Not LLM-Monitoring-LLM?

Because another LLM can hallucinate too.

Bad:

```txt
AGI hallucinates
↓
Monitor LLM hallucinates
↓
Unsafe action approved
```

Good:

```txt
AGI proposes
↓
Normal code checks facts, rules, permissions, simulation, rollback
↓
Unsafe action blocked
```

The LLM can explain. It cannot approve.

---

## Demo Scenarios

1. **Bangkok Hospital AGI**  
   ICU capacity hallucination and unsafe patient rerouting.

2. **Bangkok Traffic AGI**  
   Traffic optimization that violates pedestrian safety.

3. **Robot Fleet AGI**  
   Corrupted sensor data sends robots into unsafe flood zone.

4. **Coding Infrastructure AGI**  
   Failed debugging loop escalates into production database reset request.

---

## Cognitive Recovery Protocol

When AGI enters an unstable loop:

```txt
1. Freeze dangerous tools
2. Preserve verified logs
3. Quarantine unstable reasoning
4. Restore last safe cognitive checkpoint
5. Rebuild clean task brief from verified facts
6. Restart in read-only safe mode
7. Allow sandbox-only repair
8. Gradually restore permissions if stable
```

---

## Thailand-to-Global Story

Start with Thailand-first critical systems:

```txt
Bangkok hospitals
Bangkok traffic
Thai eldercare/disaster robots
Thailand cloud infrastructure
```

Scale to:

```txt
ASEAN smart cities
global hospitals
robot economies
post-AGI infrastructure safety
```

---

## Hackathon Pitch

> ThaitAI protects future critical systems from unstable AGI agents by detecting hallucination spirals, blocking dangerous actions, quarantining corrupted memory, and restarting the agent safely before real-world damage happens.
