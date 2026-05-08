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
