import { Icons } from "@/components/icons";
import { FileTextIcon, FolderGit2Icon, HomeIcon } from "lucide-react";

// Personal links come from environment variables (.env.local locally, Vercel
// project settings in production) so they stay out of the repository's code.
// See .env.example. NEXT_PUBLIC_ is needed because client components use them.
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
// The dock's Resume icon opens this; any https:// link opens in a new tab.
// Without one, it scrolls to the work experience section.
const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || "/#work";


/**
 * Every visible word on the site comes from here.
 * Lines marked TODO(nikhil) are placeholders: Nikhil writes the real copy.
 */
export const DATA = {
  name: "Bhaskar Nikhil Sunkara",
  // Shown big in the hero. The full name above stays in the tab title and search results.
  heroName: "Nikhil Sunkara",
  initials: "NS",
  url: "https://nikhilsunkara.vercel.app",
  location: "TODO(nikhil): city",
  locationLink: "",
  // Hero tagline, also used as the Google search description.
  description:
    "I'm an AI/ML engineer who enjoys building AI systems and digging into why they don't always work as expected.",
  // Supporting line under the tagline. **bold** works.
  intro:
    "Most of my work **over the past 3+ years**, across research, internships, and projects, has been around LLMs and Machine Learning, especially retrieval, evaluation, inference, and the engineering needed to turn a model into something that actually works in practice.",
  // About section. Separate paragraphs with a blank line (\n\n).
  summary:
    "I recently graduated with an M.S. in Data Science from the University of Wisconsin–Madison, after completing my bachelor's in Computer Science with a focus on AI and machine learning.\n\nMost of my experience so far has come from research, internships, and projects where I've had the chance to work on different kinds of ML problems. Over time, I've found myself more drawn to the engineering side of AI, especially the work that goes into understanding why something isn't working and figuring out how to improve it.\n\nI'm currently looking for a role in AI/ML Engineering, Data Science and Software Engineering where I can keep building, learn from experienced engineers, and work on problems that have real users.",
  avatarUrl: "/me.jpg",
  resumeUrl: RESUME_URL,
  // "Open to work" line shown under the tagline, with a green dot. **bold** works.
  status:
    "Open to new grad roles in **AI/ML Engineering**, **Data Science** and **Software Engineering**.",
  // Shown on its own line under the status, in capitals.
  availability: "Available to start immediately",
  // "When I'm not working" section, shown just before Contact.
  hobbies: {
    title: "When I'm not working",
    intro:
      "When I'm not working, I like getting out and doing something, whether that's ice skating, hiking, traveling somewhere new, or playing badminton or padel. I grew up playing cricket too, though I haven't gotten to play much lately. Otherwise, I'm usually listening to a podcast, reading a book, or watching a documentary.",
    groups: [
      {
        label: "Getting out",
        items: [
          { emoji: "⛸️", name: "Ice Skating" },
          { emoji: "✈️", name: "Travel" },
          { emoji: "🥾", name: "Hiking" },
          { emoji: "🏸", name: "Badminton" },
          { emoji: "🎾", name: "Padel" },
          { emoji: "🏏", name: "Cricket" },
        ],
      },
      {
        label: "Winding down",
        items: [
          { emoji: "🎙️", name: "Podcasts" },
          { emoji: "📚", name: "Books" },
          { emoji: "🎬", name: "Documentaries" },
        ],
      },
    ],
  },
  // Skills by category, all shown at once. Official logos appear for names
  // listed in src/components/skills-grid.tsx; others get a matching icon.
  skills: [
    { category: "Languages", items: ["Python", "SQL", "Java", "TypeScript"] },
    {
      category: "AI & LLMs",
      items: [
        "Agentic AI",
        "RAG",
        "Prompt Engineering",
        "Guardrails",
        "LLM Fine-tuning",
        "RLHF",
        "PEFT",
        "LoRA",
        "NLP",
        "LLM Evaluation",
      ],
    },
    {
      category: "Frameworks",
      items: [
        "n8n",
        "LangChain",
        "LangGraph",
        "HuggingFace",
        "PyTorch",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "vLLM",
      ],
    },
    {
      category: "LLM APIs",
      items: ["Anthropic API", "OpenAI API", "Google Gemini"],
    },
    {
      category: "Cloud & Infra",
      items: [
        "GCP",
        "AWS (S3, Bedrock, SageMaker)",
        "Docker",
        "FastAPI",
        "REST APIs",
        "CI/CD",
        "Git",
      ],
    },
    {
      category: "MLOps",
      items: [
        "MLflow",
        "LangSmith",
        "Weights & Biases",
        "Model Monitoring",
        "Drift Detection",
      ],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "Pinecone", "Qdrant", "AstraDB", "FAISS"],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#projects", icon: FolderGit2Icon, label: "Projects" },
    { href: RESUME_URL, icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: EMAIL,
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: GITHUB_URL,
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: LINKEDIN_URL,
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: EMAIL ? `mailto:${EMAIL}` : "",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  // Most recent first. Logos live in public/logos/; an empty logoUrl shows
  // the organization's initials instead. "highlights" become bullet points (**bold** works);
  // "description" is an optional paragraph shown above them.
  work: [
    {
      company: "One Community Inc.",
      href: "https://www.onecommunityglobal.org",
      badges: [],
      location: "Remote",
      title: "Volunteer Data Analyst",
      logoUrl: "/logos/one-community.jpg",
      start: "Oct 2026",
      end: "Present",
      description: "",
      highlights: [
        "Tested 40+ construction management dashboards by entering sample data for materials, tools, lessons, and other areas, then checking the charts and calculations against the underlying data. Recorded the results in an 80+ row test log.",
        "Found and documented 19 bugs, including a major issue where a chart was showing data from the wrong project. Traced the issue by adding a single entry from another project and showing that the filtered total changed from 705 to 755. Wrote bug reports with steps to reproduce the issue, expected results, and supporting evidence.",
        "Wrote user guides for the construction analytics dashboards for both users and the organization’s AI chatbot. Created a reusable LLM prompt for drafting the documentation and checked the generated content against the live application for accuracy.",
        "Analyzed X and LinkedIn engagement using metrics such as median impressions per post, reach per follower, and month-over-month trends. Found that LinkedIn was reaching about 3× more followers per post and identified a four-month gap in the organization’s social media reporting data.",
        "Coordinated weekly reporting for a 10-person administration team by reviewing team members’ summaries and work samples, providing feedback, and preparing the team summary and collage for the organization’s weekly blog.",
      ],
    },
    {
      company: "UW School of Medicine and Public Health",
      href: "https://www.med.wisc.edu",
      badges: [],
      location: "Remote",
      title: "Graduate ML Intern",
      logoUrl: "/logos/uw-madison.svg",
      start: "May 2025",
      end: "Dec 2025",
      description: "",
      highlights: [
        "Benchmarked SOTA segmentation models using **nnU-Net** on multi-modal MRI, establishing performance baselines for clinical diagnostic accuracy across multiple network architectures.",
        "Engineered an end-to-end 4D imaging pipeline with biophysically-informed feature extraction, training and evaluating deep neural networks for glioma survival prediction on multi-parametric clinical data.",
      ],
    },
    {
      company: "Vellore Institute of Technology (VIT)",
      href: "https://vit.ac.in",
      badges: [],
      location: "On-site · Part-time",
      title: "Research Assistant",
      logoUrl: "/logos/vit.jpg",
      start: "Dec 2022",
      end: "May 2024",
      description: "",
      highlights: [
        "Led and authored an empirical study on abstractive title generation, comparing BART/SimpleT5 with classical baselines on an arXiv-derived dataset (∼5,000 summary–title pairs); BART achieved the strongest overall performance.",
        "Investigated pragmatics and figurative language in NLP (sarcasm/irony) and designed experiments to test model robustness on noisy, real-world text by comparing baseline families (LSTMs and Logistic Regression/SVM).",
        "Developed and tuned deep learning models for medical image classification (brain tumor) on MRI, improving generalization through pre-processing and augmentation and achieving 99.8%+ accuracy (3% over baseline).",
      ],
    },
    {
      company: "SmartInternz",
      href: "https://smartinternz.com",
      badges: [],
      location: "Remote",
      title: "AI/ML (Extern)",
      logoUrl: "/logos/smartinternz.jpg",
      start: "May 2023",
      end: "Jul 2023",
      description: "",
      highlights: [
        "Led a cross-functional team of four to architect an end-to-end computer vision pipeline for automated vehicle damage assessment. A custom Convolutional Neural Network (CNN) was engineered to estimate repair costs from multi-angle imagery, achieving an 82% AUC. The project included the development of a responsive web interface for seamless image ingestion and real-time model inference.",
      ],
    },
  ],
  education: [
    {
      school: "University of Wisconsin–Madison",
      href: "https://www.wisc.edu",
      degree: "MS in Data Science",
      logoUrl: "/logos/uw-madison.svg",
      start: "Sep 2024",
      end: "May 2026",
      gpa: "3.9/4.0",
      coursework:
        "Advanced Natural Language Processing, Machine Learning, Computer Vision, Big Data Systems, Human-Computer Interaction, Optimization Techniques, Statistical Methods, Statistical Inference, Statistical Models for Data Science",
    },
    {
      school: "Vellore Institute of Technology",
      href: "https://vit.ac.in",
      degree:
        "B.Tech in Computer Science and Engineering (Specialization in AI & ML)",
      logoUrl: "/logos/vit.jpg",
      start: "Sep 2020",
      end: "May 2024",
      gpa: "8.78/10.0",
      coursework:
        "Deep Learning, Artificial Intelligence, Data Analytics, Soft Computing, Database Management Systems, Java Programming, Linear Algebra, Applied Statistics",
    },
  ],
  // Short line under the "My Projects" heading.
  projectsIntro:
    "My projects cover the full ML lifecycle, from processing hundreds of millions of events and training models to evaluating, securing, and deploying them, across e-commerce, search, LLMs, and healthcare.",
  // Featured projects show as large cards; the rest appear under "Show more
  // projects". "technologies" lists tools and platforms, not model names.
  // "github" and "demo" become buttons on the card; leave either empty to
  // hide it. Clicking a card opens its GitHub repo. "image" is the cover
  // (files in public/covers/, sources in docs/image-credits.md); without one,
  // the card shows generated gradient art.
  projects: [
    {
      title: "E-Commerce Recommendation Engine",
      github: "https://github.com/sbnikhil/RecoSys",
      demo: "https://recosys.vercel.app",
      dates: "Mar 2026 – Aug 2026",
      featured: true,
      inProgress: false,
      description:
        "An end-to-end recommendation system that turns 289M e-commerce events into personalized product recommendations and serves them at low latency.",
      technologies: [
        "PySpark",
        "GCP Dataproc",
        "FAISS",
        "FastAPI",
        "Cloud Run",
      ],
      links: [],
      image: "/covers/recosys.jpg",
      video: "",
    },
    {
      title: "Agentic LLM Firewall",
      github: "https://github.com/sbnikhil/agentic-llm-firewall",
      demo: "",
      dates: "Jan 2026 – Present",
      featured: true,
      inProgress: true,
      description:
        "A security gateway for enterprise LLM applications that detects prompt injection, redacts sensitive data, enforces access controls, and audits model interactions.",
      technologies: [
        "LangGraph",
        "Microsoft Presidio",
        "DataStax AstraDB",
        "Ollama",
        "FastAPI",
      ],
      links: [],
      image: "/covers/llm-firewall.jpg",
      video: "",
    },
    {
      title: "Self-Adapting Multilingual LLMs",
      github: "https://github.com/sbnikhil/critic-guided-self-adaptation",
      demo: "",
      dates: "Aug 2026 – Dec 2026",
      featured: true,
      inProgress: false,
      description:
        "A continual-learning system that adapts a multilingual LLM to new languages and tasks while reducing forgetting of previously learned capabilities.",
      technologies: [
        "LLMs",
        "PEFT",
        "LoRA",
        "SFT",
        "LLM-as-Judge",
        "PyTorch",
        "GCP",
      ],
      links: [],
      image: "/covers/multilingual-llms.jpg",
      video: "",
    },
    {
      title: "Search Relevance Engine",
      github: "https://github.com/sbnikhil/search-relevance",
      demo: "",
      dates: "Jan 2026 – Apr 2026",
      featured: true,
      inProgress: false,
      description:
        "A multi-stage product search system that combines lexical retrieval, neural reranking, and learning-to-rank to return more relevant results.",
      technologies: [
        "Airflow",
        "Beam",
        "Vertex AI",
        "BigQuery",
        "FastAPI",
      ],
      links: [],
      image: "/covers/search-relevance.jpg",
      video: "",
    },
    {
      title: "Job Application Tracker",
      github: "https://github.com/sbnikhil/job-application-tracker",
      demo: "",
      dates: "Mar 2026",
      featured: false,
      inProgress: false,
      description:
        "Built a self-hosted AI automation pipeline that monitors Gmail every 2 hours and automatically maintains an Excel sheet with the status of every job application (from confirmation to offer or rejection). The system uses Claude AI to read incoming recruiter emails, extract the company name and role, and update the tracker in real-time without any manual input.",
      technologies: [
        "n8n",
        "Anthropic API",
        "Gmail",
        "Excel",
      ],
      links: [],
      image: "/covers/job-application-tracker.jpg",
      video: "",
    },
    {
      title: "Evaluating User Trust in Multimodal AI Medical Diagnoses",
      github: "",
      demo: "",
      dates: "Jan 2025 – May 2025",
      featured: false,
      inProgress: false,
      description:
        "Designed and executed a user study to evaluate trust in diagnoses generated by LLMs (Gemini 1.5 Pro, BioGPT) with visual grounding from BLIP-2, applying mixed-methods analysis and statistical testing to assess trust dynamics, bias, and model preference.",
      technologies: [],
      links: [],
      image: "/covers/medical-llm-trust.jpg",
      video: "",
    },
    {
      title: "Optimizing Organ Transplant Logistics",
      github: "",
      demo: "",
      dates: "Sep 2024 – Dec 2024",
      featured: false,
      inProgress: false,
      description:
        "Developed a dual-objective optimization framework using UNOS data to improve organ transplant logistics by maximizing donor–recipient compatibility and minimizing transport delays, implementing a Mixed-Integer Programming model in GAMS and conducting sensitivity analyses to balance match quality with logistical efficiency.",
      technologies: [
        "GAMS",
        "Mixed-Integer Programming",
      ],
      links: [],
      image: "/covers/organ-transplant.jpg",
      video: "",
    },
    {
      title: "Diabetic Retinopathy Analysis",
      github: "",
      demo: "",
      dates: "Jan 2024 – May 2024",
      featured: false,
      inProgress: false,
      description:
        "Applied transfer learning to classify diabetic retinopathy severity, achieving 90% accuracy, 94% AUC, and 78% kappa score using XceptionNet, outperforming other deep learning architectures by 7% and evaluated models using accuracy and Cohen’s kappa to identify the most effective approach.",
      technologies: [
        "PyTorch",
        "TensorFlow",
        "Pandas",
        "HPC",
      ],
      links: [],
      image: "/covers/diabetic-retinopathy.jpg",
      video: "",
    },
  ],
} as const;
