# Research Backbone for SentinelCare

This file is for pitch support, not implementation.

SentinelCare is original as a post-AGI product, but it is inspired by existing research areas.

---

# 1. Hallucination Detection

## Semantic Entropy

Idea borrowed:

```txt
If an AI gives many semantically different explanations for the same situation, it may be confabulating.
```

SentinelCare adaptation:

```txt
Use unstable explanations and claim/evidence contradictions as hallucination spiral signals.
```

## SelfCheckGPT

Idea borrowed:

```txt
Sample multiple outputs and check consistency.
```

SentinelCare adaptation:

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

SentinelCare adaptation:

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

SentinelCare adaptation:

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

SentinelCare adaptation:

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

SentinelCare adaptation:

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

SentinelCare adaptation:

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

SentinelCare adaptation:

```txt
Reflection is allowed only after recovery, inside sandbox-only mode, using verified facts.
```

---

# Final Research Thesis

Current hallucination research focuses on wrong text.

SentinelCare asks:

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
