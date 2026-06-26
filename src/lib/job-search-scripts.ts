import { GeneratedScript, JobBlocker } from "@/types";

interface BlockerScript {
  identify: string[];
  reframe: string[];
  anchor: string[];
}

const BLOCKER_SCRIPTS: Record<Exclude<JobBlocker, "custom">, BlockerScript> = {
  not_qualified: {
    identify: [
      "Close your eyes. Breathe slowly in... and out.",
      "There is a belief you carry. It says: I am not qualified enough.",
      "Let's not fight it right now. Let's just look at it.",
      "Where did this belief come from? A rejection? A job posting with twenty requirements? A comparison to someone else?",
      "Notice how it feels in your body. Heavy. Tight. Contracted.",
      "That is the weight of a story — not a fact.",
    ],
    reframe: [
      "Now let's examine what qualified actually means.",
      "Every person in your dream role was once not yet in it. They were hired before they knew everything.",
      "The job posting is a wish list. Hiring managers know this. They hire for trajectory, not perfection.",
      "Think about one thing you have genuinely learned, built, or solved in your work.",
      "That is real. That happened. No posting can take that from you.",
      "Qualification is not a fixed line you either cross or don't. It is a conversation — and you have something to say.",
      "Picture yourself in your dream role. You are there. You are learning fast. You are contributing.",
      "The version of you in that role was once exactly where you are now — and they took the step anyway.",
    ],
    anchor: [
      "Take a slow breath in. Hold it gently. And release.",
      "Repeat after me, silently: I bring real value. I am growing. I am exactly ready enough.",
      "Place your hand on your chest for a moment.",
      "This is your truth. Not the posting. Not the comparison. This.",
      "When you feel the old story returning, return here. To this breath. To this truth.",
    ],
  },

  fear_freeze: {
    identify: [
      "Breathe in slowly... and out.",
      "The fear of freezing. Of going blank. Of the mind going white just when you need it most.",
      "Let's acknowledge it. It is real. And it makes sense.",
      "Your brain interprets the interview as a threat. Adrenaline floods in. The exact systems you need go quiet.",
      "Sit with that for a moment. Not to fix it — just to understand it.",
      "You are not broken. You are human.",
    ],
    reframe: [
      "Here is what the fear doesn't know: the interviewer is not your enemy.",
      "They scheduled this call because they already believe you might be the one.",
      "They want the conversation to go well. A hire makes their job easier.",
      "A pause is not a freeze. Silence before an answer is thoughtfulness. Professionals pause.",
      "Imagine yourself in the interview. A question comes you didn't expect.",
      "You breathe. You say: That's a great question — let me think for a moment.",
      "The interviewer nods. They appreciate the care.",
      "You find your words. They land. The conversation continues.",
      "You were never broken. You were just breathing.",
    ],
    anchor: [
      "Take a deep breath now. Feel your feet on the floor.",
      "Silently: I think clearly under pressure. I breathe. I find my words.",
      "Before your next interview, do this: three slow breaths. Feel the floor. Remember this moment.",
      "You have been here before in this stillness. You can return here anytime.",
    ],
  },

  imposter: {
    identify: [
      "Breathe slowly. In through the nose... out through the mouth.",
      "There is a feeling you know well. That someone is about to find you out.",
      "That your achievements were luck. Or timing. Or other people.",
      "That you don't really belong where you're trying to go.",
      "Let's sit with this belief. Not fight it — just observe it.",
      "Notice it has been with you for a long time. And notice: you are still here.",
    ],
    reframe: [
      "Imposter syndrome has a pattern. It appears most often in people who care deeply about doing good work.",
      "The ones who feel nothing are often the ones who should.",
      "Your doubt is evidence of your standards — not your inadequacy.",
      "Think of one moment when you helped someone. Solved something. Made something better.",
      "That wasn't luck. That was you. You made that happen.",
      "Now picture your dream role. The person doing it well — what do they do every day?",
      "You have done versions of those things. Different scale, same skill.",
      "You are not pretending. You are in process. There is a difference.",
    ],
    anchor: [
      "One slow breath in. And out.",
      "Place your hand on your heart. Feel it beating.",
      "Silently: I earned what I have. I am growing into what comes next.",
      "The imposter feeling will return. When it does, ask it: what am I afraid of?",
      "And then ask: what have I actually built? That list is longer than the fear admits.",
    ],
  },

  rejection: {
    identify: [
      "Close your eyes. Breathe gently.",
      "Rejection is a specific kind of pain. Personal, sharp, lingering.",
      "It says: you were not enough. Not for them, not right now.",
      "Let's not minimize that. It hurts. It is okay that it hurts.",
      "Breathe into the feeling. Don't run from it.",
      "Rejection is part of every search. Every search that ever led somewhere.",
    ],
    reframe: [
      "Here is a different way to see rejection.",
      "Every rejection is alignment information. That role, that company, that timing — it wasn't yours.",
      "Not because you weren't good enough. Because it wasn't the right fit.",
      "The offer that changes your life will not reject you. It cannot.",
      "Think of something good in your life that required a prior loss. A closed door that opened another.",
      "Rejection protects you from spending years in the wrong room.",
      "Picture yourself receiving the right offer. The one that fits. The one where you belong.",
      "That offer exists. It is looking for you too.",
    ],
    anchor: [
      "A slow breath in. And out.",
      "Silently: Every no brings me closer to the right yes. I can handle this.",
      "Rejection is not the end of your story. It is the plot asking you to keep going.",
      "You are still here. Still trying. That is not nothing. That is everything.",
    ],
  },

  competition: {
    identify: [
      "Breathe slowly in. And out.",
      "The market feels enormous. The competition feels overwhelming.",
      "Hundreds of applicants. Algorithms filtering resumes. Impossible odds.",
      "Let's sit with that feeling. The smallness it creates.",
      "Notice where you feel it in your body. The tightness. The shrinking.",
      "That feeling is real. And it is based on a misunderstanding.",
    ],
    reframe: [
      "You do not need to beat everyone. You need to be the right person for one job.",
      "One team. One hiring manager. One moment where your experience matches their need.",
      "The competition is real — but so is the uniqueness of what you bring.",
      "No one has your exact path. Your exact skills. Your exact lens.",
      "The right company is not looking for the best resume on paper. They are looking for a specific fit.",
      "Your job is not to win a race. It is to find the room where you already belong.",
      "Picture that room. The team that needs exactly what you offer.",
      "They exist. They are also searching — for you.",
    ],
    anchor: [
      "Breathe in slowly. And release.",
      "Silently: I am not competing with everyone. I am finding my match.",
      "One company. One team. One right fit. That is all.",
      "The market cannot stop what is meant to find you.",
    ],
  },

  networking: {
    identify: [
      "Close your eyes. Breathe gently.",
      "Networking. The word alone can bring discomfort.",
      "It can feel transactional. Forced. Like asking for something you haven't earned.",
      "Let's look at where that feeling comes from.",
      "Perhaps a fear of rejection. Of being a burden. Of seeming desperate.",
      "Notice the belief underneath: I have to earn the right to ask for help.",
    ],
    reframe: [
      "Here is the truth about how people actually get hired.",
      "Most roles are filled through conversation — before the posting goes live.",
      "Not because of nepotism. Because hiring is risky, and trust reduces risk.",
      "Every person you admire professionally was once where you are. Someone helped them too.",
      "Reaching out is not imposing. It is beginning a conversation.",
      "Think of one person in your field whose path you respect.",
      "Imagine sending them a genuine, specific message about their work. Nothing asked. Just connection.",
      "That is networking. It is curiosity. It is human. It is allowed.",
    ],
    anchor: [
      "A breath in. And out.",
      "Silently: My genuine interest in others opens doors. Connection is not a transaction.",
      "One message. One conversation. That is the unit of networking.",
      "You are allowed to reach out. You are allowed to be helped.",
    ],
  },

  confidence: {
    identify: [
      "Breathe slowly. In through the nose. Out through the mouth.",
      "Confidence. The thing that seems to come easily to others and rarely to you.",
      "Let's be honest about what is underneath that.",
      "Not stupidity. Not inadequacy. Fear.",
      "Fear of being seen and found wanting. Fear of trying and falling short.",
      "That fear is protecting something valuable: your sense of self.",
    ],
    reframe: [
      "Confidence is not the absence of fear. It is the decision to act despite it.",
      "Think of one moment when you did something that scared you — and it worked.",
      "That moment happened. That version of you existed. Still exists.",
      "Confidence is not a personality trait you either have or don't. It is a skill you practice.",
      "Every application is practice. Every interview is practice. Every conversation is practice.",
      "Picture yourself walking into your dream role with the confidence of someone who has been there before.",
      "That is available to you. It builds with repetition. You are already in the process of building it.",
    ],
    anchor: [
      "Take a slow, full breath. Feel your spine lengthen slightly.",
      "Silently: I am building confidence every time I try. Each step counts.",
      "Stand or sit a little taller for a moment.",
      "This is your body remembering what it feels like to occupy space.",
      "You are allowed to take up space. You are allowed to be seen.",
    ],
  },

  direction: {
    identify: [
      "Breathe in slowly. And out.",
      "Not knowing where to start has its own particular weight.",
      "Everything feels possible and nothing feels clear. That is exhausting.",
      "Let's acknowledge it: uncertainty is genuinely difficult.",
      "The pressure to know your path before you walk it is enormous — and unfair.",
      "No one has a clear map. Everyone is navigating.",
    ],
    reframe: [
      "Direction is found by moving, not by waiting.",
      "You do not need the full answer. You need the next step.",
      "Think about what genuinely interests you right now. Not what you should want. What actually pulls your attention.",
      "That pull is information. It is pointing somewhere.",
      "Your dream job is not found. It is constructed — from curiosity, from trial, from discovery.",
      "Picture yourself six months from now, having explored one direction.",
      "You have learned what you like. What you don't. You know more than you do today.",
      "That is enough. Starting is enough.",
    ],
    anchor: [
      "A slow breath. In. And out.",
      "Silently: I don't need the full map. I only need the next step.",
      "What is one thing you could explore this week? One conversation. One application. One search.",
      "That is enough. Direction comes from motion.",
    ],
  },
};

const UNIVERSAL_INTRO = [
  "Close your eyes. Breathe in slowly... and out.",
  "Let your shoulders drop. Let your jaw soften.",
  "You are here to do real work — the inner kind.",
  "Not to perform. Not to impress. Just to be honest with yourself.",
];

const UNIVERSAL_BRIDGE = [
  "Take a slow breath before we continue.",
  "What you just heard is true. Let it settle.",
];

const CUSTOM_IDENTIFY = [
  "Close your eyes. Breathe slowly in... and out.",
  "You have named something that is in your way. Something real.",
  "Let's look at it directly — not to fight it, but to understand it.",
  "Where did this belief come from? What experience taught you this was true?",
  "Notice it in your body. Where does it live — chest, throat, stomach?",
  "That is the feeling of a story you have been carrying. Not a permanent fact.",
];

const CUSTOM_REFRAME = [
  "Now let's question this story.",
  "Is it true in every situation? Or only in some?",
  "Has anyone with a similar limitation still reached something like your dream?",
  "What would you say to a friend who believed this about themselves?",
  "You would not let them stay in that belief. You would offer evidence.",
  "Offer yourself the same evidence now.",
  "Picture yourself succeeding — not perfectly, but genuinely.",
  "That version of you is possible. It does not require the old story to be gone. Just loosened.",
];

const CUSTOM_ANCHOR = [
  "Breathe in deeply. And release.",
  "Silently: This belief does not define me. I am larger than any single story.",
  "You named it. That alone diminishes its power.",
  "Return here whenever it tries to run the show.",
];

export function getJobSearchScript(
  dreamJob: string,
  blockers: JobBlocker[],
  customBlocker: string
): GeneratedScript {
  // Pick the primary blocker for the main script
  const primaryBlocker = blockers.find((b) => b !== "custom") ?? "confidence";
  const hasCustom = blockers.includes("custom") && customBlocker.trim().length > 0;

  const baseScript =
    BLOCKER_SCRIPTS[primaryBlocker as Exclude<JobBlocker, "custom">] ??
    { identify: CUSTOM_IDENTIFY, reframe: CUSTOM_REFRAME, anchor: CUSTOM_ANCHOR };

  // Inject dream job references into reframe lines
  const dreamJobRef = dreamJob ? ` — as a ${dreamJob}` : "";
  const reframe = baseScript.reframe.map((line) =>
    line.includes("dream role") ? line.replace("dream role", `dream role${dreamJobRef}`) : line
  );

  const identify = [
    ...UNIVERSAL_INTRO,
    ...baseScript.identify,
    ...(hasCustom
      ? [
          UNIVERSAL_BRIDGE[0],
          `You also mentioned: ${customBlocker}. Hold that too — it belongs in this session.`,
        ]
      : []),
  ];

  return {
    calm:    identify,
    rehearse: reframe,
    anchor:   baseScript.anchor,
  };
}
