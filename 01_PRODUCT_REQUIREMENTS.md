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
