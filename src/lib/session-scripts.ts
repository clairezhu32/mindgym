import { Category, PersonalizationAnswers } from "@/types";

interface Script {
  calm: string[];
  rehearse: string[];
  anchor: string[];
}

function interpolate(
  template: string,
  answers: PersonalizationAnswers
): string {
  return template
    .replace(/\[EVENT\]/g, answers.eventName || "your event")
    .replace(/\[GOAL\]/g, answers.goal || "perform at your best")
    .replace(/\[DATE\]/g, answers.eventDate || "soon");
}

const SCRIPTS: Record<Category, Script> = {
  interview: {
    calm: [
      "Close your eyes and take a slow breath in through your nose...",
      "Hold for a moment... and release through your mouth.",
      "Let your shoulders drop. Let your jaw unclench.",
      "You are sitting comfortably. You are already exactly where you need to be.",
      "Take another deep breath... in... and out...",
      "Scan your body from head to feet. Wherever you notice tension, breathe into it and let it soften.",
      "You are safe. You are prepared. Your experience is real.",
    ],
    rehearse: [
      "Now, let's step into your [EVENT].",
      "Picture yourself sitting at your desk, camera on, in a quiet space that's yours.",
      "You've tested the link. The lighting is good. You look and feel composed.",
      "The call connects. You see your interviewer appear on screen.",
      "You smile naturally. You say hello. Your voice is steady and warm.",
      "Your [GOAL] — you feel it clearly as the conversation begins.",
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
      "You are prepared. Log on and show them who you are.",
    ],
  },
  presentation: {
    calm: [
      "Close your eyes. Take a slow breath in...",
      "And release. Let any tension flow out with it.",
      "Your voice carries weight. People want to hear what you have to say.",
      "Breathe in again... and out...",
      "Feel your feet on the floor. Feel yourself grounded and present.",
      "Let your body relax. Let your mind become still.",
    ],
    rehearse: [
      "Picture the space where your [EVENT] will happen.",
      "The room, the stage, the seats. Take it all in.",
      "Now see yourself walking up — calm, purposeful, ready.",
      "You scan the audience. You make eye contact. You smile.",
      "Your [GOAL] — you feel it as you open your mouth.",
      "Your opening line lands perfectly. The room settles in.",
      "People are listening. Leaning in. You have them.",
      "You move through your content with clarity and conviction.",
      "An unexpected question from the audience. You welcome it.",
      "You breathe. You think. You respond with calm authority.",
      "You close. The room responds. You feel the energy.",
    ],
    anchor: [
      "Feel this presence. This authority. This connection.",
      "Place your hand on your heart for a moment.",
      "Remember this feeling — it's available to you any time.",
      "Take one more deep breath in... and out.",
      "Open your eyes when you're ready.",
      "You are ready. The room is lucky to have you.",
    ],
  },
  athletic: {
    calm: [
      "Close your eyes. Breathe deeply.",
      "Your body knows what to do. Your training lives in your muscles.",
      "Breathe in... and out...",
      "Feel the energy in your body — alive, ready, coiled.",
      "Let any nervousness transform into fuel.",
      "You've done the work. Now you get to perform.",
    ],
    rehearse: [
      "Picture your competition environment for [EVENT].",
      "The sounds. The smells. The feel of the space.",
      "You arrive. You warm up. Your body moves the way it always does.",
      "Your [GOAL] — feel it as you step into position.",
      "The moment begins. You move. You execute.",
      "Form is perfect. Focus is sharp. You're in flow.",
      "Something unexpected — a stumble, a setback.",
      "You reset immediately. No dwelling. Next play.",
      "You continue. Stronger for having recovered.",
      "The moment you finish — and you feel it. Pride.",
    ],
    anchor: [
      "Breathe in the feeling of executing perfectly.",
      "Make a fist. Hold it for a moment. Release.",
      "That's your signal. Your body knows this state.",
      "When you're ready, open your eyes.",
      "You've trained for this. Trust it. Go.",
    ],
  },
  general: {
    calm: [
      "Close your eyes. Take a slow, deep breath in...",
      "And release. Let your shoulders soften.",
      "You have everything you need for [EVENT].",
      "Breathe in again... hold... and out.",
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
      "The moment passes. You handled it.",
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

export function getScript(
  category: Category,
  answers: PersonalizationAnswers
): Script {
  const raw = SCRIPTS[category];
  return {
    calm: raw.calm.map((line) => interpolate(line, answers)),
    rehearse: raw.rehearse.map((line) => interpolate(line, answers)),
    anchor: raw.anchor.map((line) => interpolate(line, answers)),
  };
}
