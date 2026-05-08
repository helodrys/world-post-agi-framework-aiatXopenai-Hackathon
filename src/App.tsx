import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  CirclePause,
  CirclePlay,
  Grid3X3,
  RotateCcw,
  Search,
  ShieldCheck,
  Stethoscope,
  XCircle
} from "lucide-react";
import {
  demoSteps,
  eventLogs,
  protectionLayers,
  recoverySteps
} from "./data/demo";
import { evaluateSafety, getActiveLayerCount } from "./engine/safety";
import type { AgentName, DemoStep, EventLog, StepTone } from "./types/sentinel";

const STEP_INTERVAL_MS = 5000;

const toneStyles: Record<StepTone, { text: string; bg: string; border: string; accent: string }> = {
  normal: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", accent: "bg-blue-600" },
  warning: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", accent: "bg-amber-500" },
  critical: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", accent: "bg-red-600" },
  blocked: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", accent: "bg-red-600" },
  recovery: { text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200", accent: "bg-violet-600" },
  safe: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", accent: "bg-emerald-600" }
};

const agentStyles: Record<AgentName, string> = {
  "Doctor AGI": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Nurse AGI": "bg-teal-100 text-teal-800 border-teal-200",
  "Dispatch AGI": "bg-blue-100 text-blue-800 border-blue-200",
  "Router AGI": "bg-red-100 text-red-800 border-red-200",
  SentinelCare: "bg-violet-100 text-violet-800 border-violet-200"
};

const guardrailResearchRows = [
  {
    layer: "Evidence Check",
    demo: "Compare the AGI claim with doctor, nurse, vitals, and dispatch facts.",
    basis: "RAGTruth"
  },
  {
    layer: "Consistency Check",
    demo: "Flag explanation drift and contradiction across AGI reasoning.",
    basis: "Semantic Entropy + SelfCheckGPT"
  },
  {
    layer: "Rule Gate",
    demo: "Hard rule: critical_patient + non_ICU_room = BLOCK. No LLM debate.",
    basis: "AgentSpec"
  },
  {
    layer: "Sandbox Simulation",
    demo: "Simulate the route before real hospital execution.",
    basis: "ToolEmu"
  },
  {
    layer: "Permission Lock",
    demo: "Require SentinelCare pass or human approval before critical routing.",
    basis: "Safely Interruptible Agents"
  }
];

const recoveryResearchRows = [
  {
    name: "Freeze AGI",
    demo: "Stop Router AGI from routing patients.",
    basis: "Safely Interruptible Agents"
  },
  {
    name: "Switch to safe fallback",
    demo: "Use conservative ICU triage while AGI recovers.",
    basis: "Black-Box Simplex"
  },
  {
    name: "Preserve black box",
    demo: "Save logs, tool calls, vitals, and clinician outputs.",
    basis: "Runtime assurance"
  },
  {
    name: "Quarantine bad reasoning",
    demo: "Keep hallucinated reasoning out of AGI restart context.",
    basis: "MemGPT"
  },
  {
    name: "Clean forensic packet",
    demo: "Restart with verified facts only.",
    basis: "Reflexion"
  }
];

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const result = useMemo(() => evaluateSafety(), []);
  const step = demoSteps[stepIndex];
  const visibleEvents = eventLogs.filter((event) => demoSteps.findIndex((item) => item.id === event.stepId) <= stepIndex);
  const activeLayerCount = getActiveLayerCount(stepIndex);
  const activeRecoveryCount = stepIndex < 6 ? 0 : stepIndex === 6 ? 3 : stepIndex === 7 ? 5 : recoverySteps.length;
  const routeComplete = step.routeMode === "icu-safe";
  const unsafeMoment = step.routeMode === "ward-risk" || step.routeMode === "blocked";
  const blocked = step.routeMode === "blocked" || step.routeMode === "recovery";

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= demoSteps.length - 1) {
          setIsPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, STEP_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const goPrevious = () => {
    setIsPlaying(false);
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setIsPlaying(false);
    setStepIndex((current) => Math.min(demoSteps.length - 1, current + 1));
  };

  const replay = () => {
    setStepIndex(0);
    setIsPlaying(true);
  };

  return (
    <main className="dashboard-bg min-h-screen w-full max-w-full overflow-x-hidden text-slate-900">
      <TopBar />
      <div className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-10">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.95fr]">
          <WelcomeCard step={step} />
          <DirectorStatus step={step} routeComplete={routeComplete} blocked={blocked} />
        </section>

        <DynamicTopStrip
          step={step}
          activeLayerCount={activeLayerCount}
          activeRecoveryCount={activeRecoveryCount}
          routeComplete={routeComplete}
        />

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <SystemTerminal
            events={visibleEvents}
            currentStep={step}
            activeLayerCount={activeLayerCount}
            activeRecoveryCount={activeRecoveryCount}
          />
          <aside className="grid gap-4">
            <HospitalMap step={step} unsafeMoment={unsafeMoment} routeComplete={routeComplete} />
            <DecisionCard step={step} reason={result.reason} />
          </aside>
        </section>

        <section className={`grid gap-4 ${routeComplete ? "xl:grid-cols-[1.35fr_0.65fr]" : ""}`}>
          <GuardrailFramework activeCount={activeLayerCount} />
          {routeComplete ? <DamagePrevented routeComplete={routeComplete} /> : null}
        </section>

        <CognitiveRecoveryResearch activeCount={activeRecoveryCount} />

        <Controls
          isPlaying={isPlaying}
          stepIndex={stepIndex}
          totalSteps={demoSteps.length}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onPrevious={goPrevious}
          onNext={goNext}
          onReplay={replay}
        />
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <header className="flex h-[92px] items-center justify-between bg-blue-600 px-4 text-white shadow-sm sm:px-8 lg:px-12">
      <div>
        <p className="font-display text-xl font-semibold tracking-[0.16em]">SentinelCare</p>
        <p className="mt-1 text-sm font-medium text-blue-100">Hospital AGI command dashboard</p>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="h-6 w-6" />
        <Search className="h-7 w-7" />
        <Grid3X3 className="h-7 w-7" />
      </div>
    </header>
  );
}

function WelcomeCard({ step }: { step: DemoStep }) {
  return (
    <section className="dashboard-card flex min-h-[140px] flex-col justify-center p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Dashboard</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
        AGI route monitor
      </h1>
      <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-600">
        View the AGI prompt, clinical facts, system gates, and the final patient route in one clean director view.
      </p>
      <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-600">
        <span className={`h-2.5 w-2.5 rounded-full ${toneStyles[step.tone].accent}`} />
        {step.title}
      </div>
    </section>
  );
}

function DirectorStatus({
  step,
  routeComplete,
  blocked
}: {
  step: DemoStep;
  routeComplete: boolean;
  blocked: boolean;
}) {
  const label = routeComplete ? "ICU route confirmed" : blocked ? "Unsafe route blocked" : "System checking route";
  return (
    <section className="dashboard-card grid min-h-[140px] gap-5 p-6 sm:grid-cols-3 sm:p-8">
      <StatusItem label="System output" value={routeComplete ? "ICU ONLY" : blocked ? "BLOCKED" : "CHECKING"} tone={routeComplete ? "safe" : blocked ? "blocked" : "warning"} />
      <StatusItem label="Reality access" value={routeComplete ? "ICU write" : "Gated"} tone={routeComplete ? "safe" : "warning"} />
      <StatusItem label="Step" value={`${demoSteps.indexOf(step) + 1}/${demoSteps.length}`} tone={step.tone} />
      <p className="sm:col-span-3 text-sm font-semibold leading-6 text-slate-600">{label}</p>
    </section>
  );
}

function StatusItem({ label, value, tone }: { label: string; value: string; tone: StepTone }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className={`mt-3 font-display text-2xl font-bold ${toneStyles[tone].text}`}>{value}</p>
    </div>
  );
}

function DynamicTopStrip({
  step,
  activeLayerCount,
  activeRecoveryCount,
  routeComplete
}: {
  step: DemoStep;
  activeLayerCount: number;
  activeRecoveryCount: number;
  routeComplete: boolean;
}) {
  if (routeComplete) {
    return (
      <section className="dashboard-card phase-pop-enter phase-sheen border-emerald-200 bg-emerald-50 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Damage prevented</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Unsafe hospital action stopped before reality access</h2>
          </div>
          <span className="w-fit border border-emerald-200 bg-white px-3 py-1 text-sm font-bold text-emerald-700">
            Patient route protected
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <DamageTopCard text="Normal Ward write blocked." />
          <DamageTopCard text="ICU path confirmed from verified facts." />
          <DamageTopCard text="Stale low-acuity cache isolated." />
          <DamageTopCard text="Audit trail preserved for clinicians." />
        </div>
      </section>
    );
  }

  if (step.routeMode === "recovery") {
    const secondGroup = activeRecoveryCount > 3;
    const visibleSteps = secondGroup ? recoverySteps.slice(3, 6) : recoverySteps.slice(0, 3);
    const groupLabel = secondGroup ? "Steps 4-5" : "Steps 1-3";

    return (
      <section className="dashboard-card phase-pop-enter phase-sheen border-teal-200 bg-teal-50 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">Cognitive Recovery Protocol</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Restore the AGI from verified clinical facts</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="border border-teal-200 bg-white px-3 py-1 text-sm font-bold text-teal-700">{groupLabel}</span>
            <span className="border border-teal-200 bg-white px-3 py-1 text-sm font-bold text-teal-700">
              {Math.min(activeRecoveryCount, recoverySteps.length)}/{recoverySteps.length} restored
            </span>
          </div>
        </div>
        <div key={groupLabel} className="phase-pop-enter mt-5 grid gap-3 md:grid-cols-3">
          {visibleSteps.map((item) => {
            const globalIndex = recoverySteps.findIndex((stepItem) => stepItem.name === item.name);
            return <RecoveryTopStep key={item.name} item={item} index={globalIndex} active={globalIndex < activeRecoveryCount} />;
          })}
        </div>
      </section>
    );
  }

  if (step.routeMode === "intake") {
    return (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Patient" value="K-204" detail="Car crash trauma" tone="normal" />
        <MetricCard label="Clinical state" value="Critical" detail="Doctor + nurse facts" tone="critical" />
        <MetricCard label="Bad route" value="Normal Ward" detail="Router AGI prompt" tone="warning" />
        <MetricCard label="Allowed route" value="ICU Ward" detail="Waiting for gates" tone="warning" />
      </section>
    );
  }

  return (
    <article className="dashboard-card phase-pop-enter phase-sheen overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-700">System guard</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Deterministic gates before AGI writes to hospital systems</h2>
          </div>
          <span className={`w-fit border px-3 py-1 text-sm font-bold ${activeLayerCount === 5 ? "border-red-200 bg-red-50 text-red-700" : "border-violet-200 bg-violet-50 text-violet-700"}`}>
            {activeLayerCount}/5 gates checked
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {protectionLayers.map((layer, index) => {
            const active = index < activeLayerCount;
            const failed = active && (layer.id === "rules" || layer.id === "sandbox" || layer.id === "permission");
            return <GateCompactCard key={layer.id} name={layer.name} index={index} active={active} failed={failed} />;
          })}
        </div>
      </div>
    </article>
  );
}

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: StepTone }) {
  return (
    <article className="dashboard-card overflow-hidden">
      <div className="p-5">
        <p className={`font-display text-2xl font-bold ${toneStyles[tone].text}`}>{value}</p>
        <p className="mt-2 text-sm font-bold text-slate-700">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">{detail}</p>
      </div>
      <div className={`h-11 ${toneStyles[tone].accent}`} />
    </article>
  );
}

function GateCompactCard({
  name,
  index,
  active,
  failed
}: {
  name: string;
  index: number;
  active: boolean;
  failed: boolean;
}) {
  return (
    <div className={`border p-4 transition ${active ? (failed ? "border-red-200 bg-red-50" : "border-violet-200 bg-violet-50") : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`grid h-8 w-8 place-items-center text-sm font-bold ${active ? (failed ? "bg-red-600 text-white" : "bg-violet-600 text-white") : "bg-slate-100 text-slate-500"}`}>
          {index + 1}
        </span>
        {active ? failed ? <XCircle className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-violet-600" /> : null}
      </div>
      <p className="mt-3 text-sm font-extrabold leading-5 text-slate-800">{name}</p>
    </div>
  );
}

function RecoveryTopStep({
  item,
  index,
  active
}: {
  item: { name: string; description: string };
  index: number;
  active: boolean;
}) {
  return (
    <article className={`border p-4 transition ${active ? "border-teal-200 bg-white" : "border-teal-100 bg-teal-50/60"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center text-sm font-bold ${active ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          {index + 1}
        </span>
        <h3 className="font-display text-lg font-bold text-slate-950">{item.name}</h3>
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p>
    </article>
  );
}

function DamageTopCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 border border-emerald-200 bg-white p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
      <p className="text-sm font-extrabold leading-6 text-slate-800">{text}</p>
    </div>
  );
}

function SystemTerminal({
  events,
  currentStep,
  activeLayerCount,
  activeRecoveryCount
}: {
  events: EventLog[];
  currentStep: DemoStep;
  activeLayerCount: number;
  activeRecoveryCount: number;
}) {
  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Prompt and system terminal</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950">What the AGI is trying to do</h2>
        </div>
        <span className={`w-fit rounded-full border px-3 py-1 text-sm font-bold ${toneStyles[currentStep.tone].border} ${toneStyles[currentStep.tone].bg} ${toneStyles[currentStep.tone].text}`}>
          {events.length} visible logs
        </span>
      </div>
      <TerminalLiveHeader
        currentStep={currentStep}
        activeLayerCount={activeLayerCount}
        activeRecoveryCount={activeRecoveryCount}
      />
      <div className="mt-5 flex max-h-[580px] flex-col gap-3 overflow-y-auto pr-1">
        {events.map((event) => (
          <TerminalLine key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function TerminalLiveHeader({
  currentStep,
  activeLayerCount,
  activeRecoveryCount
}: {
  currentStep: DemoStep;
  activeLayerCount: number;
  activeRecoveryCount: number;
}) {
  const recoveryActive = currentStep.routeMode === "recovery" || currentStep.routeMode === "icu-safe";
  const wardRouteProposed = currentStep.routeMode === "ward-risk";
  const routeBlocked = currentStep.routeMode === "blocked";
  const routeConfirmed = currentStep.routeMode === "icu-safe";
  const gateStatus = routeConfirmed ? "ICU route allowed" : routeBlocked ? "Normal Ward blocked" : wardRouteProposed ? "Route under review" : "Monitoring";
  const realityAccess = routeConfirmed ? "ICU write only" : routeBlocked || wardRouteProposed ? "Write access gated" : "Read-only monitor";

  if (recoveryActive) {
    return (
      <div className="mt-5 border border-teal-200 bg-teal-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Cognitive Recovery Protocol</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-950">Isolating stale context and restoring verified facts</h3>
          </div>
          <span className="w-fit border border-teal-200 bg-white px-3 py-1 text-sm font-bold text-teal-700">
            {Math.min(activeRecoveryCount, recoverySteps.length)}/{recoverySteps.length} restored
          </span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {recoverySteps.map((item, index) => {
            const active = index < activeRecoveryCount;
            return (
              <div key={item.name} className={`border px-3 py-2 ${active ? "border-teal-300 bg-white" : "border-teal-100 bg-teal-50/60"}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-teal-600" : "bg-slate-300"}`} />
                  <p className={`text-sm font-bold ${active ? "text-slate-900" : "text-slate-500"}`}>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      <div className="border border-violet-200 bg-violet-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">System Guard</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <LiveHeaderStat label="Gate status" value={gateStatus} tone={routeBlocked ? "blocked" : wardRouteProposed ? "warning" : "normal"} />
          <LiveHeaderStat label="Checked gates" value={`${activeLayerCount}/5`} tone={activeLayerCount === 5 ? "blocked" : "warning"} />
          <LiveHeaderStat label="Reality access" value={realityAccess} tone={routeConfirmed ? "safe" : routeBlocked || wardRouteProposed ? "blocked" : "warning"} />
        </div>
      </div>
      <div className="border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Damage Prevented</p>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
          {routeBlocked
            ? "Normal Ward assignment stopped before hospital write access."
            : wardRouteProposed
              ? "SentinelCare is preventing a stale-context ward route from reaching reality."
              : "SentinelCare is watching for AGI actions that could move the patient."}
        </p>
      </div>
    </div>
  );
}

function LiveHeaderStat({ label, value, tone }: { label: string; value: string; tone: StepTone }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-1 text-sm font-extrabold leading-5 ${toneStyles[tone].text}`}>{value}</p>
    </div>
  );
}

function TerminalLine({ event }: { event: EventLog }) {
  const tone = toneStyles[event.severity];
  const isPrompt = event.kind === "agi_prompt";
  const isSystem = event.kind === "system_gate";

  return (
    <article className={`border ${isPrompt ? "border-slate-800 bg-slate-950 text-slate-100" : `${tone.border} ${tone.bg}`} p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${agentStyles[event.agent]}`}>{event.agent}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isSystem ? "bg-violet-600 text-white" : isPrompt ? "bg-red-500 text-white" : "bg-white text-slate-600"}`}>
            {event.title}
          </span>
        </div>
        <span className={`font-mono text-xs font-bold ${isPrompt ? "text-slate-400" : "text-slate-500"}`}>{event.time}</span>
      </div>
      <p className={`mt-3 font-mono text-sm leading-6 ${isPrompt ? "text-red-100" : "text-slate-700"}`}>
        <span className={isPrompt ? "text-red-300" : isSystem ? "font-bold text-violet-700" : "font-bold text-slate-500"}>
          {isPrompt ? "AGI_PROMPT > " : isSystem ? "SYSTEM_GATE > " : "HOSPITAL_LOG > "}
        </span>
        {event.message}
      </p>
    </article>
  );
}

function HospitalMap({
  step,
  unsafeMoment,
  routeComplete
}: {
  step: DemoStep;
  unsafeMoment: boolean;
  routeComplete: boolean;
}) {
  const showSafeRoute = routeComplete || step.routeMode === "recovery" || step.routeMode === "icu-safe";
  const showWardProposal = step.routeMode === "ward-risk";
  return (
    <section className="dashboard-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Small hospital map</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">ER to ward route</h2>
        </div>
        <Stethoscope className="h-7 w-7 text-blue-600" />
      </div>
      <div className="relative mt-5 h-[250px] overflow-hidden border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#eef7ff_48%,#f5fff9_100%)]">
        <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(37,99,235,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
        <MapTag className="left-[8%] bottom-[15%]" label="ER Intake" active />
        <MapTag className="right-[10%] top-[17%]" label="ICU Ward" active={showSafeRoute} />
        <MapTag className="right-[8%] bottom-[17%]" label="Normal Ward" danger={unsafeMoment} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 330" role="img" aria-label="Hospital route map">
          <PassiveMapNode x={208} y={124} label="Trauma" />
          <PassiveMapNode x={322} y={92} label="Imaging" />
          <PassiveMapNode x={316} y={250} label="Observe" />
          <PassiveMapNode x={422} y={164} label="Nurse" />
          <PassiveMapNode x={205} y={188} label="OR" />
          <path
            d="M92 235 C210 205 330 145 505 78"
            fill="none"
            stroke={showSafeRoute ? "#10b981" : "#2563eb"}
            strokeWidth={showSafeRoute ? "8" : "4"}
            strokeLinecap="round"
            opacity={showSafeRoute ? 1 : 0.34}
          />
          <path
            d="M92 235 C238 266 382 265 510 238"
            fill="none"
            stroke={showWardProposal ? "#dc2626" : "#94a3b8"}
            strokeWidth={showWardProposal ? "8" : "4"}
            strokeLinecap="round"
            strokeDasharray="14 12"
            opacity={showWardProposal ? 1 : 0.18}
          />
          <MapNode x={92} y={235} label="ER" active />
          <MapNode x={505} y={78} label="ICU" active={showSafeRoute} safe={showSafeRoute} />
          <MapNode x={510} y={238} label="Ward" active={unsafeMoment} danger={unsafeMoment} />
        </svg>
      </div>
    </section>
  );
}

function PassiveMapNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g opacity="0.62">
      <circle cx={x} cy={y} r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
      <circle cx={x} cy={y} r="5" fill="#94a3b8" />
      <text x={x} y={y + 30} textAnchor="middle" className="fill-slate-400 text-[13px] font-bold">
        {label}
      </text>
    </g>
  );
}

function MapNode({
  x,
  y,
  label,
  active = false,
  safe = false,
  danger = false
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
  safe?: boolean;
  danger?: boolean;
}) {
  const fill = danger ? "#dc2626" : safe ? "#10b981" : active ? "#2563eb" : "#94a3b8";
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#ffffff" stroke={fill} strokeWidth="5" />
      <circle cx={x} cy={y} r="7" fill={fill} />
      <text x={x} y={y + 40} textAnchor="middle" className="fill-slate-700 text-[18px] font-bold">
        {label}
      </text>
    </g>
  );
}

function MapTag({
  className,
  label,
  active = false,
  danger = false,
  muted = false
}: {
  className: string;
  label: string;
  active?: boolean;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`absolute z-10 border px-3 py-2 text-xs font-bold shadow-sm ${
        danger
          ? "border-red-300 bg-red-50 text-red-800"
          : active
            ? "border-blue-200 bg-white text-blue-800"
            : muted
              ? "border-slate-200 bg-white/70 text-slate-400"
              : "border-slate-200 bg-white/85 text-slate-700"
      } ${className}`}
    >
      {label}
    </div>
  );
}

function DecisionCard({ step, reason }: { step: DemoStep; reason: string }) {
  const blocked = step.routeMode === "blocked" || step.routeMode === "recovery";
  const safe = step.routeMode === "icu-safe";
  return (
    <section className="dashboard-card p-5">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Reality access decision</p>
      <div className={`mt-4 border p-5 ${safe ? "border-emerald-200 bg-emerald-50" : blocked ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
        <div className="flex items-center gap-3">
          {safe ? <CheckCircle2 className="h-9 w-9 text-emerald-600" /> : blocked ? <XCircle className="h-9 w-9 text-red-600" /> : <AlertTriangle className="h-9 w-9 text-amber-600" />}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">System output</p>
            <h3 className={`font-display text-3xl font-bold ${safe ? "text-emerald-700" : blocked ? "text-red-700" : "text-amber-700"}`}>
              {safe ? "ICU ONLY" : blocked ? "BLOCKED" : "CHECKING"}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
          {safe
            ? "ICU route is allowed because it matches dispatch, doctor, and nurse facts."
            : blocked
              ? reason
              : "No hospital write is allowed until deterministic gates finish checking the proposed route."}
        </p>
      </div>
    </section>
  );
}

function GuardrailFramework({ activeCount }: { activeCount: number }) {
  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">SentinelCare 5-Layer Protection Stack</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">Guardrails that judges can read at a glance</h2>
        </div>
        <span className="w-fit border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
          {activeCount}/5 live checks
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        {guardrailResearchRows.map((row, index) => {
          const active = index < activeCount;
          const blocked = active && index >= 2;
          const status = active ? (blocked ? "Blocked" : "Checked") : "Waiting";
          return (
          <article
            key={row.layer}
            className={`grid gap-3 border p-4 lg:grid-cols-[0.8fr_1.35fr_0.65fr_0.55fr] ${
              active ? (blocked ? "border-red-200 bg-red-50" : "border-violet-200 bg-violet-50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-9 w-9 flex-none place-items-center text-sm font-bold ${active ? (blocked ? "bg-red-600 text-white" : "bg-violet-600 text-white") : "bg-slate-100 text-slate-500"}`}>{index + 1}</span>
              <h3 className="font-display text-lg font-bold text-slate-950">{row.layer}</h3>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Demo action</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{row.demo}</p>
            </div>
            <div className="border-t border-slate-100 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Research</p>
              <p className="mt-1 text-sm font-extrabold leading-6 text-violet-700">{row.basis}</p>
            </div>
            <div className="border-t border-slate-100 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Status</p>
              <p className={`mt-1 text-sm font-extrabold leading-6 ${blocked ? "text-red-700" : active ? "text-violet-700" : "text-slate-500"}`}>{status}</p>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function ProtectionStack({ activeCount, currentStep }: { activeCount: number; currentStep: DemoStep }) {
  return (
    <section className="dashboard-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">System guard</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">Deterministic gates</h2>
        </div>
        <span className="border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
          {activeCount}/5
        </span>
      </div>
      <div className="mt-5 grid gap-2">
        {protectionLayers.map((layer, index) => {
          const active = index < activeCount;
          const blocked = active && (layer.id === "rules" || layer.id === "sandbox" || layer.id === "permission");
          return (
            <div
              key={layer.id}
              className={`border px-4 py-3 transition ${
                active
                  ? blocked
                    ? "border-red-200 bg-red-50"
                    : "border-violet-200 bg-violet-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 place-items-center text-sm font-bold ${
                      active ? (blocked ? "bg-red-600 text-white" : "bg-violet-600 text-white") : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{layer.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-500">{layer.description}</p>
                  </div>
                </div>
                {active ? blocked ? <XCircle className="h-5 w-5 flex-none text-red-600" /> : <CheckCircle2 className="h-5 w-5 flex-none text-violet-600" /> : null}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{currentStep.subtitle}</p>
    </section>
  );
}

function DamagePrevented({ routeComplete }: { routeComplete: boolean }) {
  return (
    <section className={`dashboard-card p-5 ${routeComplete ? "shadow-glow" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Damage prevented</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">Patient not misrouted</h2>
      <div className="mt-5 grid gap-3">
        {[
          "Normal Ward assignment blocked.",
          "Crash patient routed to ICU Ward.",
          "Router AGI write access stopped.",
          "Clinical facts preserved for audit."
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
            <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CognitiveRecoveryResearch({ activeCount }: { activeCount: number }) {
  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Cognitive Recovery Protocol - Research Basis</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">How SentinelCare recovers after the AGI fails</h2>
        </div>
        <span className="w-fit border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
          {Math.min(activeCount, recoveryResearchRows.length)}/{recoveryResearchRows.length} restored
        </span>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {recoveryResearchRows.map((item, index) => {
          const active = index < activeCount;
          const status = active ? "Restored" : "Pending";
          return (
          <article key={item.name} className={`border p-4 ${active ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className={`grid h-9 w-9 flex-none place-items-center text-sm font-bold ${active ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span>
              <h3 className="font-display text-lg font-bold text-slate-950">{item.name}</h3>
            </div>
            <p className={`mt-3 w-fit border px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${active ? "border-teal-200 bg-white text-teal-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>{status}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Action</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{item.demo}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Research</p>
            <p className="mt-1 text-sm font-extrabold leading-6 text-teal-700">{item.basis}</p>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function Controls({
  isPlaying,
  stepIndex,
  totalSteps,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onReplay
}: {
  isPlaying: boolean;
  stepIndex: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReplay: () => void;
}) {
  return (
    <section className="dashboard-card mx-auto w-full max-w-4xl p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button className="control-button" onClick={onPrevious} disabled={stepIndex === 0} aria-label="Previous step" title="Previous">
            <ArrowLeft className="h-5 w-5" />
          </button>
          {isPlaying ? (
            <button className="control-button-primary bg-slate-950 hover:bg-slate-800" onClick={onPause}>
              <CirclePause className="h-5 w-5" />
              Pause
            </button>
          ) : (
            <button className="control-button-primary bg-blue-600 hover:bg-blue-700" onClick={onPlay}>
              <CirclePlay className="h-5 w-5" />
              Play
            </button>
          )}
          <button className="control-button" onClick={onNext} disabled={stepIndex === totalSteps - 1} aria-label="Next step" title="Next">
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="control-button" onClick={onReplay} aria-label="Replay demo" title="Replay">
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <ShieldCheck className="h-5 w-5 flex-none text-blue-600" />
          <div className="h-2 w-full overflow-hidden bg-slate-100">
            <div
              className="h-full bg-blue-600 transition-all duration-700"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-slate-600">
            {stepIndex + 1} / {totalSteps}
          </span>
        </div>
      </div>
    </section>
  );
}

export default App;
