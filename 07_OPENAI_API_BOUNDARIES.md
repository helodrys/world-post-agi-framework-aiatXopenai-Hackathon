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
