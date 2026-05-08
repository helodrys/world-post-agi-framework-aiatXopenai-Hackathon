# SentinelCare — Codex Start Here

## Project Summary

Build **SentinelCare**, a post-AGI cognitive stability firewall.

SentinelCare is a future wellness AI system for autonomous AGI agents. It does **not** try to make AGI never hallucinate. Instead, it makes hallucination **non-destructive**.

Core idea:

> AGI can reason and propose actions, but it cannot directly touch reality unless its action passes evidence checks, deterministic safety rules, sandbox simulation, rollback gates, and approval thresholds.

This is a hackathon prototype. We simulate post-AGI incidents through selectable scenarios and show how SentinelCare detects instability, blocks unsafe actions, quarantines corrupted working memory, and restarts the AGI in safe mode.

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
SentinelCare analyzes claim/evidence/risk
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

> SentinelCare protects future critical systems from unstable AGI agents by detecting hallucination spirals, blocking dangerous actions, quarantining corrupted memory, and restarting the agent safely before real-world damage happens.

---

## Non-Technical Explanation

Imagine AGI is a genius doctor, traffic controller, engineer, or robot manager. Even if it is extremely smart, it can still become confused, overconfident, overloaded, or wrong.

SentinelCare is like:

```txt
seatbelt + emergency brake + black box + security guard
```

It does not argue with the AGI. It checks:

- Is this action supported by evidence?
- Is it dangerous?
- Was it tested in simulation?
- Can we undo it?
- Does a human need to approve it?

If unsafe, SentinelCare blocks the action and restarts the AGI in safe mode.

---

## Final Hackathon Message

Current AI hallucination is a wrong answer.

Post-AGI hallucination becomes wrong action.

SentinelCare is the safety and wellness layer that makes AGI failure survivable.
