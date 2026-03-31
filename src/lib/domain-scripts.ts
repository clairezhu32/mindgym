import { PersonalizationAnswers } from "@/types";

export interface Script {
  calm: string[];
  rehearse: string[];
  anchor: string[];
}

export type Domain =
  | "music"
  | "dance"
  | "public_speaking"
  | "interview"
  | "exam"
  | "sports_running"
  | "sports_team"
  | "sports_combat"
  | "cooking"
  | "general";

interface DomainRule {
  domain: Domain;
  keywords: string[];
}

const DOMAIN_RULES: DomainRule[] = [
  {
    domain: "music",
    keywords: [
      "sing", "singing", "song", "vocal", "choir", "band", "concert",
      "recital", "piano", "guitar", "violin", "cello", "drum", "orchestra",
      "solo", "audition music", "gig", "perform music", "opera", "jazz",
      "open mic", "karaoke", "instrument", "symphony", "ensemble",
    ],
  },
  {
    domain: "dance",
    keywords: [
      "dance", "dancing", "ballet", "choreography", "routine", "salsa",
      "hip hop dance", "contemporary dance", "recital dance", "competition dance",
      "waltz", "tango", "breakdance", "tap dance",
    ],
  },
  {
    domain: "public_speaking",
    keywords: [
      "presentation", "speech", "keynote", "talk", "lecture", "pitch",
      "conference", "ted talk", "panel", "toast", "wedding speech",
      "graduation speech", "commencement", "seminar", "webinar", "demo",
      "slides", "audience",
    ],
  },
  {
    domain: "interview",
    keywords: [
      "interview", "job interview", "hiring", "recruiter", "phone screen",
      "behavioral interview", "technical interview", "panel interview",
      "case interview",
    ],
  },
  {
    domain: "exam",
    keywords: [
      "exam", "test", "quiz", "final", "midterm", "sat", "gre", "mcat",
      "lsat", "bar exam", "board exam", "certification", "licensing",
      "assessment", "evaluation",
    ],
  },
  {
    domain: "sports_running",
    keywords: [
      "run", "running", "marathon", "half marathon", "5k", "10k", "sprint",
      "track", "cross country", "triathlon", "relay", "race", "jogging",
    ],
  },
  {
    domain: "sports_team",
    keywords: [
      "game", "match", "soccer", "football", "basketball", "baseball",
      "volleyball", "hockey", "rugby", "cricket", "lacrosse", "water polo",
      "team", "playoff", "tournament", "championship",
    ],
  },
  {
    domain: "sports_combat",
    keywords: [
      "fight", "bout", "boxing", "mma", "wrestling", "judo", "karate",
      "taekwondo", "fencing", "martial art", "bjj", "muay thai", "sparring",
      "tennis", "badminton", "golf", "swimming", "gymnastics", "climbing",
      "weightlifting", "powerlifting", "crossfit",
    ],
  },
  {
    domain: "cooking",
    keywords: [
      "cook", "cooking", "bake", "baking", "chef", "kitchen", "recipe",
      "culinary", "food competition", "masterchef", "plating",
    ],
  },
];

export function detectDomain(eventName: string, goal: string): Domain {
  const input = `${eventName} ${goal}`.toLowerCase();

  // Score each domain by number of keyword matches
  let bestDomain: Domain = "general";
  let bestScore = 0;

  for (const rule of DOMAIN_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        // Longer keyword matches are worth more (more specific)
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestDomain = rule.domain;
    }
  }

  return bestDomain;
}

function interpolate(template: string, answers: PersonalizationAnswers): string {
  return template
    .replace(/\[EVENT\]/g, answers.eventName || "your event")
    .replace(/\[GOAL\]/g, answers.goal || "perform at your best")
    .replace(/\[DATE\]/g, answers.eventDate || "soon");
}

const DOMAIN_SCRIPTS: Record<Domain, Script> = {
  music: {
    calm: [
      "Close your eyes and take a slow breath in through your nose.",
      "Hold for a moment… and release through your mouth.",
      "Let your jaw relax. Let your throat soften. Let your shoulders drop.",
      "Feel the tension leave your hands and fingers — they know what to do.",
      "Take another deep breath in… and out.",
      "Your voice, your instrument, your body — they've practiced this. Trust them.",
      "You are calm. You are present. The music is already inside you.",
    ],
    rehearse: [
      "Picture yourself arriving at [EVENT].",
      "You can feel the energy of the space — the stage lights, the quiet hum of anticipation.",
      "You warm up gently. Your voice feels open and resonant. Your body is loose.",
      "You step into position. The room settles. A breath of silence before you begin.",
      "The first note leaves you — clear, sure, alive. It fills the room.",
      "Your [GOAL] — you feel it flowing through every phrase.",
      "The music carries you. You're not thinking about technique — you're inside the sound.",
      "A small imperfection happens. You breathe through it and let the next phrase be even stronger.",
      "The audience is with you. You can feel their attention, their stillness.",
      "You reach the final passage. You pour everything into it.",
      "The last note fades. Silence. Then the warmth of applause washes over you.",
      "You did it. You feel the glow of a performance that was truly yours.",
    ],
    anchor: [
      "Take a deep breath and feel what you feel right now.",
      "This resonance. This flow. This is yours to keep.",
      "Press your thumb and index finger together gently.",
      "This is your anchor. Before [EVENT], use it to return to this feeling.",
      "When you're ready, slowly open your eyes.",
      "Your music is ready. Go share it.",
    ],
  },

  dance: {
    calm: [
      "Close your eyes. Take a slow breath in.",
      "And release. Let your body soften from your neck down to your toes.",
      "Roll your shoulders back gently. Feel your spine lengthen.",
      "Your muscles are warm. Your body remembers every movement.",
      "Breathe in again… and out.",
      "Let any nervousness become energy — fuel for expression.",
      "You are grounded. You are fluid. You are ready to move.",
    ],
    rehearse: [
      "Picture the performance space for [EVENT].",
      "Feel the floor beneath your feet. See the lighting. Hear the quiet before the music starts.",
      "You take your opening position. Your body is aligned, your breath is steady.",
      "The music begins. Your first movement flows naturally — precise and effortless.",
      "Your [GOAL] — you feel it in every extension, every turn.",
      "The rhythm carries you. Your body and the music are one.",
      "You hit the challenging section. Your training takes over — muscle memory is flawless.",
      "A slight wobble. You recover so smoothly no one notices. You're stronger for it.",
      "The energy builds. You feel the audience watching, captivated.",
      "Your final sequence. Every line is clean, every movement intentional.",
      "You land your final pose. The music stops. You feel the rush of having moved beautifully.",
    ],
    anchor: [
      "Feel this lightness. This power in your body.",
      "Place your hand on your heart for a moment.",
      "This feeling — grace, strength, flow — it's yours to recall anytime.",
      "Take one more deep breath in… and out.",
      "Open your eyes when you're ready.",
      "Your body knows the way. Trust it and dance.",
    ],
  },

  public_speaking: {
    calm: [
      "Close your eyes. Take a slow breath in.",
      "And release. Let any tension flow out with it.",
      "Your voice carries weight. People want to hear what you have to say.",
      "Breathe in again… and out.",
      "Feel your feet on the floor. Feel yourself grounded and present.",
      "Let your body relax. Let your mind become still.",
    ],
    rehearse: [
      "Picture the space where [EVENT] will happen.",
      "The room, the stage, the seats. Take it all in.",
      "Now see yourself walking up — calm, purposeful, ready.",
      "You scan the audience. You make eye contact. You smile.",
      "Your [GOAL] — you feel it as you open your mouth.",
      "Your opening line lands perfectly. The room settles in.",
      "People are listening. Leaning in. You have them.",
      "You move through your content with clarity and conviction.",
      "An unexpected question from the audience. You welcome it.",
      "You breathe. You think. You respond with calm authority.",
      "You close with impact. The room responds. You feel the energy.",
    ],
    anchor: [
      "Feel this presence. This authority. This connection.",
      "Place your hand on your heart for a moment.",
      "Remember this feeling — it's available to you anytime.",
      "Take one more deep breath in… and out.",
      "Open your eyes when you're ready.",
      "You are ready. The room is lucky to have you.",
    ],
  },

  interview: {
    calm: [
      "Close your eyes and take a slow breath in through your nose.",
      "Hold for a moment… and release through your mouth.",
      "Let your shoulders drop. Let your jaw unclench.",
      "You are sitting comfortably. You are already exactly where you need to be.",
      "Take another deep breath… in… and out.",
      "Scan your body from head to feet. Wherever you notice tension, breathe into it and let it soften.",
      "You are safe. You are prepared. Your experience is real.",
    ],
    rehearse: [
      "Now, let's step into [EVENT].",
      "Picture yourself in a quiet, comfortable space. Everything is set up and ready.",
      "You've prepared. You look composed. You feel composed.",
      "The conversation begins. You greet them warmly. Your voice is steady.",
      "Your [GOAL] — you feel it clearly as the dialogue starts.",
      "The first question comes. You listen fully before you speak.",
      "Your words come out clearly. Specific. Genuine. You sound like yourself.",
      "A tough question lands. You pause for a moment — that's fine, that's human.",
      "You think, you breathe, and you answer thoughtfully. They appreciate the care.",
      "The conversation flows. You're not just answering questions — you're having a dialogue.",
      "You close warmly. You thank them. You feel settled about how it went.",
    ],
    anchor: [
      "Take a deep breath and feel what you feel right now.",
      "This calm. This clarity. This is yours to keep.",
      "Press your thumb and index finger together gently.",
      "This is your anchor. Before [EVENT], use it to return to this feeling.",
      "When you're ready, slowly open your eyes.",
      "You are prepared. Show them who you are.",
    ],
  },

  exam: {
    calm: [
      "Close your eyes. Take a slow breath in.",
      "And release. Let the weight of preparation settle into quiet confidence.",
      "Your mind has absorbed more than you realize. Trust it.",
      "Breathe in again… and out.",
      "Let your hands relax. Let your forehead smooth.",
      "You've done the work. Now it's time to let it flow.",
      "You are calm. You are sharp. You are ready.",
    ],
    rehearse: [
      "Picture yourself arriving at [EVENT].",
      "You find your seat. The room is quiet. You feel grounded.",
      "You arrange your materials. You take one slow breath.",
      "The exam begins. You read the first question carefully.",
      "Your [GOAL] — you feel it guiding your focus.",
      "The answer forms clearly. You write with steady confidence.",
      "You move through each section with purpose. No rushing, no panic.",
      "A difficult question appears. You skip it calmly and come back later with fresh eyes.",
      "When you return to it, the answer comes. Your mind works best when it's relaxed.",
      "You finish with time to review. You feel thorough and composed.",
      "You put your pen down. You did your best, and your best is enough.",
    ],
    anchor: [
      "Feel this clarity. This focused calm.",
      "Press your thumb and index finger together gently.",
      "This is your anchor. Before [EVENT], use it to return to this state.",
      "Take one more breath in… and out.",
      "Open your eyes when you're ready.",
      "Your mind is ready. Trust what you know.",
    ],
  },

  sports_running: {
    calm: [
      "Close your eyes. Breathe deeply.",
      "Feel the energy in your legs — strong, trained, ready.",
      "Breathe in… and out.",
      "Your body has logged the miles. Your lungs know this rhythm.",
      "Let any pre-race nerves transform into adrenaline — your fuel.",
      "You've done the work. Now you get to run.",
    ],
    rehearse: [
      "Picture yourself at the start line of [EVENT].",
      "The air is crisp. You can hear the crowd, the announcements, the shuffle of runners.",
      "You shake out your legs. You set your watch. You're locked in.",
      "The signal goes. You push off — smooth, controlled, powerful.",
      "Your [GOAL] — you hold it steady as you find your pace.",
      "Your breathing is rhythmic. Your stride is efficient. You're in the zone.",
      "The middle stretch. Your legs feel heavy for a moment. You adjust your cadence and push through.",
      "You pass a marker and you're right on pace. Confidence surges.",
      "The final stretch. You dig deep. Your legs respond. You have more than you thought.",
      "You cross the finish line. Chest heaving, arms up, a wave of pride.",
    ],
    anchor: [
      "Breathe in the feeling of crossing that line.",
      "Make a fist. Hold it for a moment. Release.",
      "That's your signal. Your body knows this strength.",
      "When you're ready, open your eyes.",
      "You've trained for this. Trust your legs. Go.",
    ],
  },

  sports_team: {
    calm: [
      "Close your eyes. Breathe deeply.",
      "Your body knows what to do. Your training lives in your muscles.",
      "Breathe in… and out.",
      "Feel your teammates around you — you're not alone in this.",
      "Let any nervousness become fire. Channel it.",
      "You've practiced. You've prepared. Now it's game time.",
    ],
    rehearse: [
      "Picture the venue for [EVENT].",
      "The sounds of warm-up. The feel of the field, the court, the pitch beneath you.",
      "You and your teammates exchange looks. You're locked in together.",
      "The whistle blows. The game begins. You move with purpose.",
      "Your [GOAL] — you feel it driving every decision.",
      "The ball comes to you. You execute — clean, decisive, instinctive.",
      "The game shifts. The other team pushes hard. You stay composed.",
      "A mistake happens. You reset immediately. Next play. No dwelling.",
      "You communicate with your team. You lift them. They lift you.",
      "The final moments. You give everything. You leave nothing on the field.",
      "The game ends. Win or lose, you know you showed up fully.",
    ],
    anchor: [
      "Feel that fire. That team energy. That focus.",
      "Make a fist. Hold it. Release.",
      "That's your signal. Before [EVENT], use it to return to this state.",
      "When you're ready, open your eyes.",
      "Play hard. Play together. Go.",
    ],
  },

  sports_combat: {
    calm: [
      "Close your eyes. Breathe deeply.",
      "Your body is a machine you've been fine-tuning. It's ready.",
      "Breathe in… and out.",
      "Feel the power coiled in your muscles. Controlled. Patient.",
      "Let any fear become focus. Sharp, quiet focus.",
      "You've drilled this a thousand times. Trust yourself.",
    ],
    rehearse: [
      "Picture yourself stepping into the arena for [EVENT].",
      "The lights. The energy. The quiet center inside you despite it all.",
      "You warm up. Your body moves the way it always does — fluid, precise.",
      "Your [GOAL] — you feel it as you take your position.",
      "The moment begins. You're present. Reading everything. Reacting instantly.",
      "Your technique is sharp. Your timing is on. You execute with control.",
      "Something unexpected — a stumble, a surprise. You adapt without thinking.",
      "You reset. You breathe. You come back stronger.",
      "You find your rhythm again. Every movement is intentional.",
      "The moment ends. You feel it in your chest — pride, relief, power.",
    ],
    anchor: [
      "Breathe in the feeling of performing at your peak.",
      "Make a fist. Hold it for a moment. Release.",
      "That's your anchor. Your body knows this state of readiness.",
      "When you're ready, open your eyes.",
      "You've trained for this. Trust it. Go.",
    ],
  },

  cooking: {
    calm: [
      "Close your eyes. Take a slow breath in.",
      "And release. Let your hands relax. Let your mind clear.",
      "Your palate knows flavors. Your hands know technique.",
      "Breathe in again… and out.",
      "Picture the calm of a clean station. Everything in its place.",
      "You've practiced these dishes. Your instincts are sharp.",
      "You are focused. You are creative. You are ready.",
    ],
    rehearse: [
      "Picture yourself arriving at [EVENT].",
      "Your station is set. Ingredients prepped. Tools laid out.",
      "The clock starts. You take one centering breath and begin.",
      "Your hands move with confidence. Chopping, seasoning, tasting — all in rhythm.",
      "Your [GOAL] — you taste it coming together.",
      "The kitchen is loud. Timers beep. Others scramble. You stay in your zone.",
      "Something doesn't go as planned — a sauce breaks, a timing shifts.",
      "You adjust without panic. You've solved harder problems in the kitchen before.",
      "The flavors come together. You know it before you taste it. Then you taste it — perfect.",
      "You plate with precision. Clean lines, beautiful composition.",
      "Time is called. You step back and look at your dish. You're proud of it.",
    ],
    anchor: [
      "Feel this focus. This creative flow.",
      "Press your palms together for a moment.",
      "This feeling of calm mastery — it's yours before every cook.",
      "Take one more breath in… and out.",
      "Open your eyes when you're ready.",
      "Your skills are sharp. Go create something beautiful.",
    ],
  },

  general: {
    calm: [
      "Close your eyes. Take a slow, deep breath in.",
      "And release. Let your shoulders soften.",
      "You have everything you need for [EVENT].",
      "Breathe in again… hold… and out.",
      "Let each exhale carry away any tension.",
      "You are calm. You are capable. You are ready.",
    ],
    rehearse: [
      "Picture yourself arriving at [EVENT].",
      "You feel grounded and present. Focused.",
      "Your [GOAL] — feel it clearly as you begin.",
      "You move through the moment with intention.",
      "Others see your calm. Your competence. Your presence.",
      "If something doesn't go as planned, you adapt.",
      "You stay composed. You find your footing.",
      "The moment passes. You handled it with grace.",
    ],
    anchor: [
      "Feel what you feel right now — this calm readiness.",
      "Take a slow breath and lock it in.",
      "Touch your fingertips together gently.",
      "This is your anchor for [EVENT].",
      "Open your eyes when you're ready.",
      "You've got this. Go.",
    ],
  },
};

export function getSmartScript(
  eventName: string,
  eventDate: string,
  goal: string
): Script {
  const domain = detectDomain(eventName, goal);
  const raw = DOMAIN_SCRIPTS[domain];
  const answers: PersonalizationAnswers = { eventName, eventDate, goal };

  return {
    calm: raw.calm.map((line) => interpolate(line, answers)),
    rehearse: raw.rehearse.map((line) => interpolate(line, answers)),
    anchor: raw.anchor.map((line) => interpolate(line, answers)),
  };
}
