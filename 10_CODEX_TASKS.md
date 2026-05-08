# Codex Task List

Use this as direct instruction for Codex.

---

# Task 1: Create React App Structure

Build a React + Vite + Tailwind web app for SentinelCare.

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
runSentinelPipeline(selectedScenario)
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
