"use client";

import { JobBlocker } from "@/types";
import Button from "@/components/shared/Button";

interface Resource {
  title: string;
  description: string;
  action: string;
  href: string;
}

const BLOCKER_RESOURCES: Partial<Record<JobBlocker, Resource[]>> = {
  not_qualified: [
    {
      title: "Build the missing skill",
      description: "LinkedIn Learning and Coursera both offer short, certificate-backed courses recognized by hiring managers.",
      action: "Open LinkedIn Learning",
      href: "https://www.linkedin.com/learning/",
    },
    {
      title: "Read the job posting differently",
      description: "Treat job postings as a wish list. If you meet 60–70% of requirements, apply. Hiring managers expect this.",
      action: "Learn the 70% rule",
      href: "https://hbr.org/2014/08/why-women-dont-apply-for-jobs-unless-theyre-100-qualified",
    },
  ],
  fear_freeze: [
    {
      title: "Practice with real mock interviews",
      description: "Pramp pairs you with peers for free, realistic interview practice — technical and behavioral.",
      action: "Try Pramp",
      href: "https://www.pramp.com/",
    },
    {
      title: "Learn the STAR method",
      description: "Structure any behavioral answer in 60 seconds: Situation, Task, Action, Result. Eliminates blanks.",
      action: "Read the STAR guide",
      href: "https://www.themuse.com/advice/star-interview-method",
    },
  ],
  imposter: [
    {
      title: "Track your wins",
      description: "Start a brag document — a running list of things you've done well. Review it before every interview.",
      action: "Start a brag doc",
      href: "https://jvns.ca/blog/brag-documents/",
    },
    {
      title: "Read the research on imposter syndrome",
      description: "Pauline Clance's original research: imposter syndrome is most common in high achievers. Knowing this helps.",
      action: "Read the study",
      href: "https://paulineroseclance.com/pdf/ip_high_achieving_women.pdf",
    },
  ],
  rejection: [
    {
      title: "Reframe the numbers",
      description: "Most job searches require 10–20 applications for one offer. Build a pipeline, not a single bet.",
      action: "See the data",
      href: "https://www.jobscan.co/blog/job-search-statistics/",
    },
    {
      title: "Request feedback after rejection",
      description: "Most companies will share brief feedback if you ask politely. One email can turn a rejection into intelligence.",
      action: "See a template",
      href: "https://www.themuse.com/advice/how-to-ask-for-feedback-after-a-job-rejection",
    },
  ],
  competition: [
    {
      title: "Target the hidden job market",
      description: "Up to 80% of jobs are filled through networking before they're posted. Conversations > applications.",
      action: "Learn the strategy",
      href: "https://hbr.org/2016/04/a-refresher-on-informational-interviews",
    },
    {
      title: "Niche your search",
      description: "A specific target (company type, role, industry) outperforms a wide spray. Be the obvious candidate for fewer roles.",
      action: "Define your niche",
      href: "https://www.linkedin.com/pulse/why-niche-job-search-strategy-works/",
    },
  ],
  networking: [
    {
      title: "Try the informational interview",
      description: "Ask for 20 minutes to learn — not for a job. Most professionals say yes. This is how opportunities form.",
      action: "See an outreach template",
      href: "https://hbr.org/2016/04/a-refresher-on-informational-interviews",
    },
    {
      title: "Use LinkedIn intentionally",
      description: "Comment genuinely on posts by people in your target field. Visibility builds trust before you ever ask for anything.",
      action: "Open LinkedIn",
      href: "https://www.linkedin.com/",
    },
  ],
  confidence: [
    {
      title: "Use power posing before interviews",
      description: "Two minutes of expansive posture before high-stakes situations measurably affects how you feel and present.",
      action: "Watch the TED talk",
      href: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
    },
    {
      title: "Do one scary application today",
      description: "Confidence is built through action, not preparation. Apply for the stretch role. The worst answer is no.",
      action: "Open job boards",
      href: "https://www.levels.fyi/jobs",
    },
  ],
  direction: [
    {
      title: "Take the 80,000 Hours career quiz",
      description: "Data-driven career guidance. Matches your strengths and values to high-impact, fulfilling career paths.",
      action: "Start the quiz",
      href: "https://80000hours.org/career-quiz/",
    },
    {
      title: "Run an informational interview sprint",
      description: "Talk to five people in five different roles over two weeks. Direction comes from data, not introspection alone.",
      action: "Learn the approach",
      href: "https://hbr.org/2016/04/a-refresher-on-informational-interviews",
    },
  ],
  custom: [
    {
      title: "Name it to tame it",
      description: "Writing out a limiting belief in full — and questioning each assumption — is one of the most effective cognitive exercises.",
      action: "Try Byron Katie's The Work",
      href: "https://thework.com/instruction-the-work-byron-katie/",
    },
    {
      title: "Talk to a career coach",
      description: "Many coaches offer a free first session. An outside perspective on your specific blocker is often the unlock.",
      action: "Find a coach on LinkedIn",
      href: "https://www.linkedin.com/search/results/people/?keywords=career+coach",
    },
  ],
};

const UNIVERSAL_RESOURCES: Resource[] = [
  {
    title: "Track your search in a spreadsheet",
    description: "A simple tracker (company, role, date, status, contact) turns a chaotic search into a managed pipeline.",
    action: "Get a template",
    href: "https://docs.google.com/spreadsheets/u/0/?tgif=d",
  },
  {
    title: "Optimize your LinkedIn profile",
    description: "Recruiters filter by keywords. A fully optimized profile gets found. One afternoon of work, ongoing returns.",
    action: "Open LinkedIn",
    href: "https://www.linkedin.com/",
  },
];

interface Props {
  blockers: JobBlocker[];
  dreamJob: string;
  onStartNew: () => void;
}

export default function ResourcesPage({ blockers, dreamJob, onStartNew }: Props) {
  const blockerResources = blockers
    .flatMap((b) => BLOCKER_RESOURCES[b] ?? [])
    .slice(0, 4);

  const allResources = [...blockerResources, ...UNIVERSAL_RESOURCES].slice(0, 5);

  return (
    <div className="animate-fade-up max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2b7a78] to-[#4a9a97] flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-[#2b7a78]/30">
          🔓
        </div>
        <h1 className="text-2xl font-bold mb-2">New belief planted.</h1>
        <p className="text-[#8fb5b3] text-sm">
          Now give it roots. Here&apos;s what to do next on your path to{" "}
          <span className="text-[#eef2f1]">{dreamJob || "your dream job"}</span>.
        </p>
      </div>

      {/* New belief summary */}
      <div className="p-4 rounded-xl bg-[#2b7a78]/10 border border-[#2b7a78]/30 mb-8 text-center">
        <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase mb-1">
          Your new belief
        </p>
        <p className="text-[#eef2f1] text-sm leading-relaxed italic">
          {getBeliefSummary(blockers)}
        </p>
      </div>

      {/* Resources */}
      <div className="space-y-3 mb-8">
        <p className="text-xs text-[#8fb5b3] font-semibold tracking-widest uppercase">
          Resources to keep going
        </p>
        {allResources.map((r, i) => (
          <a
            key={i}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl border border-white/10 bg-[#1a3330] hover:border-[#2b7a78]/50 hover:bg-[#2b7a78]/5 transition-all duration-150 group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sm text-[#eef2f1] mb-1 group-hover:text-[#4a9a97] transition-colors">
                  {r.title}
                </p>
                <p className="text-xs text-[#8fb5b3] leading-relaxed">{r.description}</p>
              </div>
              <span className="text-[#2b7a78] text-lg flex-shrink-0 mt-0.5">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <Button variant="primary" onClick={onStartNew} className="w-full">
          Start another session
        </Button>
        <p className="text-xs text-[#8fb5b3]">
          Come back tomorrow. Consistent practice builds the belief.
        </p>
      </div>
    </div>
  );
}

function getBeliefSummary(blockers: JobBlocker[]): string {
  const summaries: Partial<Record<JobBlocker, string>> = {
    not_qualified: "I bring real value. I am growing. I am exactly ready enough.",
    fear_freeze: "I think clearly under pressure. I breathe. I find my words.",
    imposter: "I earned what I have. I am growing into what comes next.",
    rejection: "Every no brings me closer to the right yes. I can handle this.",
    competition: "I am not competing with everyone. I am finding my match.",
    networking: "My genuine interest in others opens doors. Connection is not a transaction.",
    confidence: "I am building confidence every time I try. Each step counts.",
    direction: "I don't need the full map. I only need the next step.",
    custom: "This belief does not define me. I am larger than any single story.",
  };
  const primary = blockers.find((b) => b !== "custom") ?? blockers[0] ?? "confidence";
  return summaries[primary] ?? "I am capable. I am growing. I am on my way.";
}
