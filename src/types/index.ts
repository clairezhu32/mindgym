export type Category =
  | "interview"
  | "presentation"
  | "athletic"
  | "general";

export type SessionPhase = "calm" | "rehearse" | "anchor" | "complete";

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
