export type Category =
  | "interview"
  | "presentation"
  | "athletic"
  | "general";

export type SessionPhase = "calm" | "rehearse" | "anchor" | "complete";

// ── Job-search mindset flow ───────────────────
export type JobBlocker =
  | "not_qualified"
  | "fear_freeze"
  | "imposter"
  | "rejection"
  | "competition"
  | "networking"
  | "confidence"
  | "direction"
  | "custom";

export interface BlockerConfig {
  id: JobBlocker;
  label: string;
  icon: string;
}

export const BLOCKERS: BlockerConfig[] = [
  { id: "not_qualified", icon: "📄", label: "I'm not qualified enough" },
  { id: "fear_freeze",   icon: "🧊", label: "I'll freeze in interviews" },
  { id: "imposter",      icon: "🎭", label: "I feel like a fraud" },
  { id: "rejection",     icon: "💔", label: "I'm afraid of rejection" },
  { id: "competition",   icon: "📊", label: "The market is too competitive" },
  { id: "networking",    icon: "🤝", label: "I don't know how to network" },
  { id: "confidence",    icon: "🪞", label: "I lack confidence" },
  { id: "direction",     icon: "🧭", label: "I don't know where to start" },
];

export interface JobSearchAnswers {
  hasOffer: boolean;
  dreamJob: string;
  blockers: JobBlocker[];
  customBlocker: string;
}

export interface CategoryConfig {
  id: Category;
  label: string;
  icon: string;
  description: string;
  popular?: boolean;
}

export interface PersonalizationAnswers {
  eventName: string;
  eventDate: string;
  goal: string;
}

export interface GeneratedScript {
  calm: string[];
  rehearse: string[];
  anchor: string[];
}

export interface SessionState {
  category: Category | null;
  answers: PersonalizationAnswers | null;
  jobSearchAnswers: JobSearchAnswers | null;
  preMood: number | null;
  postMood: number | null;
  phase: SessionPhase;
  isPlaying: boolean;
  audioProgress: number;
  sessionId: string | null;
  generatedScript: GeneratedScript | null;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "interview",
    label: "Job Interview",
    icon: "💼",
    description: "Log on calm, articulate clearly, handle tough questions with ease.",
    popular: true,
  },
  {
    id: "presentation",
    label: "Presentation & Performance",
    icon: "🎤",
    description: "Command the room, connect with your audience, deliver with authority.",
    popular: true,
  },
  {
    id: "athletic",
    label: "Athletic Event",
    icon: "🏆",
    description: "Trust your training, execute under pressure, compete in flow state.",
  },
  {
    id: "general",
    label: "High-Stakes Moment",
    icon: "⭐",
    description: "Any situation where you need to show up calm, focused, and at your best.",
  },
];

export const PHASE_DURATIONS: Record<Exclude<SessionPhase, "complete">, number> = {
  calm: 90,      // 1.5 min
  rehearse: 210, // 3.5 min
  anchor: 60,    // 1 min
};

export const PHASE_LABELS: Record<Exclude<SessionPhase, "complete">, string> = {
  calm: "CALM",
  rehearse: "REHEARSE",
  anchor: "ANCHOR",
};

export interface SessionRecord {
  id: string;
  user_id: string;
  category: Category;
  event_name: string | null;
  event_date: string | null; // YYYY-MM-DD
  goal: string | null;
  pre_mood: number | null;
  post_mood: number | null;
  completed_at: string; // ISO timestamp
}
