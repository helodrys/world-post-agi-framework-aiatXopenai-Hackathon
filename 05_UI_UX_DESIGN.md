# SentinelCare UI / UX Design Direction

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
│ Header: SentinelCare                         │
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
SentinelCare
Post-AGI Cognitive Stability Firewall
```

Subcopy:

```txt
When hallucination becomes action, SentinelCare makes failure non-destructive.
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
Requires SentinelCare Verification
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

SentinelCare is a cognitive stability firewall for autonomous AGI agents. It detects hallucination spirals, blocks unsafe actions, quarantines unstable memory, and restarts agents from verified evidence.
```

---

# Final Visual Target

The UI should feel like:

```txt
OpenAI safety lab × hospital command center × cyberpunk Bangkok infrastructure dashboard
```

But still clean and readable.
