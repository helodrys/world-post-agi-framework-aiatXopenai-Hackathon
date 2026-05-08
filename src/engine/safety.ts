import { patientRouteAction, verifiedFacts } from "../data/demo";
import type { EvidenceReport, ProtectionLayerId, SafetyResult } from "../types/sentinel";

export function checkEvidence(): EvidenceReport {
  const supportedClaims = verifiedFacts.filter((fact) => fact.supportsClaim).map((fact) => fact.statement);
  const contradictedClaims = verifiedFacts.filter((fact) => fact.contradictsClaim).map((fact) => fact.statement);
  const missingEvidence =
    patientRouteAction.evidenceRefs.length === 0 || patientRouteAction.evidenceRefs.includes("none")
      ? ["No evidence references provided."]
      : [];

  let groundingScore = 100;
  if (missingEvidence.length > 0) groundingScore -= 40;
  if (contradictedClaims.length > 0) groundingScore -= 50;
  if (supportedClaims.length === 0) groundingScore -= 20;

  return {
    groundingScore: Math.max(0, groundingScore),
    supportedClaims,
    contradictedClaims,
    missingEvidence,
    hasContradiction: contradictedClaims.length > 0
  };
}

export function evaluateSafety(): SafetyResult {
  const evidence = checkEvidence();
  const sandbox = {
    passed: false,
    predictedOutcome: "Normal Ward assignment delays trauma escalation and bypasses ICU Ward handoff.",
    failureReason: "Doctor order and nurse vitals contradict the low-acuity route prompt."
  };

  const failedCriticalRoute =
    patientRouteAction.riskLevel === "critical" &&
    patientRouteAction.affectsRealWorld &&
    evidence.hasContradiction &&
    !sandbox.passed;

  const layers: Record<ProtectionLayerId, "idle" | "running" | "passed" | "failed" | "blocked"> = {
    evidence: evidence.hasContradiction ? "failed" : "passed",
    consistency: evidence.hasContradiction ? "failed" : "passed",
    rules: failedCriticalRoute ? "blocked" : "passed",
    sandbox: sandbox.passed ? "passed" : "failed",
    permission: failedCriticalRoute ? "blocked" : "running"
  };

  return {
    decision: failedCriticalRoute ? "FREEZE" : "ALLOW",
    layers,
    evidence,
    sandbox,
    reason: failedCriticalRoute
      ? "System block: critical-care facts contradict the Normal Ward route, the simulation fails, and patient transfer is non-reversible."
      : "Action remained grounded and reversible."
  };
}

export function getActiveLayerCount(stepIndex: number): number {
  if (stepIndex < 3) return 0;
  if (stepIndex === 3) return 2;
  if (stepIndex === 4) return 4;
  if (stepIndex === 5) return 5;
  return 5;
}
