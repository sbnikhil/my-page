import {
  Activity,
  Bot,
  BrainCircuit,
  Cloud,
  Database,
  FileSearch,
  Gauge,
  type LucideIcon,
  Languages,
  Layers,
  MessageSquareText,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  ThumbsUp,
  TrendingDown,
  Webhook,
  Workflow,
} from "lucide-react";
import {
  type SimpleIcon,
  siAnthropic,
  siDatastax,
  siDocker,
  siFastapi,
  siGit,
  siGooglecloud,
  siGooglegemini,
  siHuggingface,
  siLangchain,
  siLanggraph,
  siMlflow,
  siN8n,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siQdrant,
  siScikitlearn,
  siTypescript,
  siVllm,
  siWeightsandbiases,
} from "simple-icons";

/**
 * Skills grouped by category, every chip visible at once so recruiters can
 * scan for keywords. Official logos where they exist (simple-icons); concept
 * skills and tools without a public logo get a matching icon instead.
 * Names are matched exactly as written in DATA.skills.
 */
const LOGOS: Record<string, SimpleIcon> = {
  Python: siPython,
  Java: siOpenjdk,
  TypeScript: siTypescript,
  n8n: siN8n,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  HuggingFace: siHuggingface,
  PyTorch: siPytorch,
  "Scikit-learn": siScikitlearn,
  Pandas: siPandas,
  NumPy: siNumpy,
  vLLM: siVllm,
  "Anthropic API": siAnthropic,
  "Google Gemini": siGooglegemini,
  GCP: siGooglecloud,
  Docker: siDocker,
  FastAPI: siFastapi,
  Git: siGit,
  MLflow: siMlflow,
  "Weights & Biases": siWeightsandbiases,
  PostgreSQL: siPostgresql,
  Qdrant: siQdrant,
  AstraDB: siDatastax,
};

const ICONS: Record<string, LucideIcon> = {
  SQL: Database,
  "Agentic AI": Bot,
  RAG: FileSearch,
  "Prompt Engineering": MessageSquareText,
  Guardrails: ShieldCheck,
  "LLM Fine-tuning": SlidersHorizontal,
  RLHF: ThumbsUp,
  PEFT: Puzzle,
  LoRA: Layers,
  NLP: Languages,
  "LLM Evaluation": Gauge,
  "OpenAI API": Sparkles,
  "REST APIs": Webhook,
  "CI/CD": Workflow,
  "Model Monitoring": Activity,
  "Drift Detection": TrendingDown,
  LangSmith: Activity,
  Pinecone: Database,
  FAISS: BrainCircuit,
};

function SkillIcon({ name }: { name: string }) {
  const logo = LOGOS[name];
  if (logo) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 shrink-0 fill-current">
        <path d={logo.path} />
      </svg>
    );
  }
  // "AWS (S3, Bedrock, SageMaker)" and other cloud names fall back to a cloud.
  const Icon = ICONS[name] ?? (/^AWS/.test(name) ? Cloud : null);
  return Icon ? <Icon aria-hidden className="size-3.5 shrink-0" /> : null;
}

export function SkillsGrid({
  groups,
}: {
  groups: readonly { category: string; items: readonly string[] }[];
}) {
  return (
    <dl className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
      {groups.map((group) => (
        <div key={group.category} className="contents">
          <dt className="pt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {group.category}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((name) => (
                <li
                  key={name}
                  className="group flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-card/60 px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent-from/50"
                >
                  <span className="text-muted-foreground transition-colors group-hover:text-accent-from">
                    <SkillIcon name={name} />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
