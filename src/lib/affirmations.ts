import type { JobBlocker } from "@/types";

export interface Affirmation {
  id: string;
  blocker: JobBlocker;
  text: string;
}

const A = (blocker: JobBlocker, texts: string[]): Affirmation[] =>
  texts.map((text, i) => ({ id: `${blocker}-${i + 1}`, blocker, text }));

export const AFFIRMATIONS: Affirmation[] = [
  // ── not_qualified: "I'm not qualified enough" ──────────────────────────
  ...A("not_qualified", [
    "My experience is broader than any single job description.",
    "I was invited to this conversation because I belong in it.",
    "Qualifications are a starting point; my judgment is the asset.",
    "I have solved hard problems before. I can solve these too.",
    "Every expert was once a beginner who refused to quit.",
    "I bring a perspective this team does not have yet.",
    "My track record speaks louder than a checklist of requirements.",
    "I learn fast, and I have the proof to back it up.",
    "Nobody meets one hundred percent of a job posting. Nobody.",
    "What I lack in years, I make up for in drive and adaptability.",
    "I am allowed to grow into a role. That is how careers work.",
    "My skills transfer. My work ethic compounds.",
  ]),
  // ── fear_freeze: "I'll freeze in interviews" ────────────────────────────
  ...A("fear_freeze", [
    "I have prepared. My body knows what to do. I trust it.",
    "A pause is not a failure. It is me thinking clearly.",
    "I speak slowly, and that makes me sound confident.",
    "Nerves mean I care. I channel that energy into focus.",
    "I have answered harder questions than these.",
    "My breath is my anchor. Inhale, then speak.",
    "I don't need to be perfect. I need to be present.",
    "Freezing is a moment, not a verdict. I recover and continue.",
    "I rehearse so that pressure feels familiar.",
    "The interviewer wants me to succeed. We are on the same side.",
    "I answer one question at a time. That is all this is.",
    "Calm is a skill, and I practice it daily.",
  ]),
  // ── imposter: "I feel like a fraud" ─────────────────────────────────────
  ...A("imposter", [
    "I earned my seat. Doubt does not erase results.",
    "Feeling like an imposter is common among high achievers. I am in good company.",
    "My work has real impact, and I can point to it.",
    "I don't need to know everything to add value today.",
    "Competence is not the absence of doubt. It is action despite doubt.",
    "I was hired for my judgment, not for being flawless.",
    "Asking questions is a strength, not an exposure.",
    "I belong here as much as anyone who walked in confident.",
    "My imposter feeling is a sign I am stretching. Stretching is growth.",
    "I give myself the same credit I give others.",
    "Success did not happen to me by accident. I built it.",
    "I am allowed to be both learning and leading.",
  ]),
  // ── rejection: "I'm afraid of rejection" ────────────────────────────────
  ...A("rejection", [
    "Rejection is data, not a diagnosis of my worth.",
    "Every 'no' moves me closer to the right 'yes'.",
    "I can handle disappointment. I have before.",
    "A rejection of my application is not a rejection of me.",
    "I apply broadly because I respect my own potential.",
    "The cost of not trying is higher than the cost of hearing no.",
    "I separate the outcome from the effort. The effort is mine to control.",
    "Resilience is built one application at a time.",
    "I would rather be rejected for trying than regret never applying.",
    "Each interview makes the next one easier, whatever the result.",
    "I keep going. That is the whole strategy.",
    "My value does not fluctuate with any single decision.",
  ]),
  // ── competition: "The market is too competitive" ───────────────────────
  ...A("competition", [
    "I don't need to beat everyone. I need to be right for one role.",
    "Competition filters out the casual. I am not casual.",
    "My combination of skills is unique. There is no exact substitute for me.",
    "A tough market rewards the prepared. I prepare.",
    "I focus on what I control: my craft, my story, my follow-through.",
    "Someone gets hired for every role. There is no reason it cannot be me.",
    "I stand out by being specific, not by being loud.",
    "The market is competitive for generic candidates. I am not generic.",
    "I turn competition into fuel for sharper preparation.",
    "Scarcity thinking shrinks me. I play to win, not to survive.",
    "My network, my experience, my voice — that is my moat.",
    "I have competed before and won. This is familiar territory.",
  ]),
  // ── networking: "I don't know how to network" ──────────────────────────
  ...A("networking", [
    "Networking is just being genuinely curious about people.",
    "One real conversation beats fifty shallow connections.",
    "I have something to offer in every conversation, even as a listener.",
    "People remember warmth more than credentials.",
    "I follow up. That alone puts me ahead of most.",
    "Asking for advice is a compliment, not an imposition.",
    "I build relationships before I need them.",
    "My story is interesting when I tell it with conviction.",
    "I belong in rooms where my future is being discussed.",
    "A short, honest message outperforms a polished pitch.",
    "I treat every interaction as the start of something, not a transaction.",
    "Confidence in networking is a muscle. I am training it.",
  ]),
  // ── confidence: "I lack confidence" ────────────────────────────────────
  ...A("confidence", [
    "Confidence is built by keeping promises to myself.",
    "I walk in prepared, and preparation looks like confidence.",
    "My voice deserves the same airtime as anyone else's.",
    "I stop shrinking to make others comfortable.",
    "I have handled hard things. I can handle this room.",
    "Confidence is not arrogance. It is clarity about my value.",
    "I speak about my work with pride, not apology.",
    "I trust my preparation and my instincts equally.",
    "Every small win today compounds into tomorrow's confidence.",
    "I am the expert on my own experience.",
    "I choose to be visible. Visibility creates opportunity.",
    "I carry myself like someone who expects good outcomes.",
  ]),
  // ── direction: "I don't know where to start" ────────────────────────────
  ...A("direction", [
    "Clarity comes from action, not from waiting.",
    "I start with the smallest next step. Momentum does the rest.",
    "Not knowing the whole path is normal. I only need the next move.",
    "I explore broadly, then commit deeply.",
    "Every experiment teaches me something, even the ones that fail.",
    "I give myself permission to change direction with new information.",
    "A messy start beats a perfect plan that never launches.",
    "I talk to people doing the work I want to do. That is research.",
    "My career is a portfolio of bets, not a single straight line.",
    "I define progress weekly, not yearly.",
    "Uncertainty is not a stop sign. It is an invitation to explore.",
    "I will figure it out the way I always have: one step at a time.",
  ]),
];

export const AFFIRMATION_COUNT = AFFIRMATIONS.length;

export function getAffirmationsByBlocker(blocker: JobBlocker): Affirmation[] {
  return AFFIRMATIONS.filter((a) => a.blocker === blocker);
}

export function getAffirmationById(id: string): Affirmation | undefined {
  return AFFIRMATIONS.find((a) => a.id === id);
}

/** Deterministic daily pick: same affirmation for everyone on a given date, seeded. */
export function getDailyAffirmation(pool: Affirmation[], seedKey = ""): Affirmation {
  const today = new Date().toISOString().slice(0, 10);
  const seed = `${today}:${seedKey}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}
