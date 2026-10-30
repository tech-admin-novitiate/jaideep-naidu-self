import customDataJson from './portfolioCustomData.json';

export interface MetricHighlight {
  value: string;
  label: string;
  sublabel: string;
}

export interface AccomplishmentItem {
  id: string;
  title: string;
  impactMetric: string;
  organization: string;
  category: 'Applied AI & RAG' | 'Operational Risk & Safety' | 'Data Architecture' | 'Commercial & Capex';
  description: string;
  significance: string;
  timeline?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  sector: string;
  companies: string[];
  role: string;
  keyAchievement: string;
  impactMetrics: string[];
  description: string;
  technologies: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  pillars: {
    title: string;
    highlights: string[];
  }[];
  tags: string[];
}

export interface PhotographyItem {
  id: string;
  title: string;
  category: 'Industrial & Marine' | 'Architectural Form' | 'Global Horizons' | 'Street & Culture';
  location: string;
  camera: string;
  settings: string;
  story: string;
  gradient: string;
  accent: string;
  imageUrl?: string;
  dateTaken?: string;
}

export interface KnowledgeGraphNote {
  id: string;
  category: 'Timeline Milestone' | 'Project Success' | 'Domain Expertise' | 'Leadership Trait' | 'Turnkey Capability';
  topic: string;
  timeline: string;
  details: string;
  impact: string;
}

export interface UploadedCVDocument {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  versionLabel: string;
  roleContext: string;
  fileData?: string; // base64 or link
  extractedNotes: string; // Detailed responsibilities and specific accomplishments
}

export interface RecommendationItem {
  id: string;
  author: string;
  title: string;
  company: string;
  relationship: string;
  quote: string;
  highlight: string;
}

export interface PillarHeaderConfig {
  id: string;
  pillarTag: string;
  title: string;
  subtitle: string;
  highlight: string;
}

export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: 'Jaideep Naidu',
    title: 'Technical & Product Engineering Leader',
    currentRole: 'Principal Product Manager at BP',
    experienceYears: '17+',
    location: 'London, United Kingdom',
    email: 'jaideepnaidu.12@gmail.com',
    phone: '+44 7436 898 600',
    linkedIn: 'https://www.linkedin.com/in/jaideepnaidu/',
    resumePdfUrl: '/assets/aistudio/Jaideep_Naidu_v4_4ae29fdf.pdf',
    headline: 'Bridging Applied AI, Industrial Engineering & Human-Led Transformation',
    executiveSummary:
      'Technical and Product Engineering Leader with 17 years of experience delivering transformational applied AI systems, large-scale digital architectures, and enterprise data platforms across safety-critical global industries. Proven record orchestrating OT/IT backbones, Palantir Foundry data fabrics, and line-managing global engineering squads while holding an MBA in addition to top-tier Agile and Project Management credentials.',
    humanPhilosophy:
      'Technology without empathy fails. Real transformation is neither top-down mandate nor algorithmic imposition—it is the art of giving engineers and frontline operators tools that eliminate cognitive burden, build psychological safety, and respect their craft.',
  },

  keyMetrics: [
    {
      value: '$300M+',
      label: 'Engineering Value Unlocked',
      sublabel: 'Across Upstream operating assets & tools portfolio',
    },
    {
      value: '$100M+',
      label: 'Reliable Discovery via Graph RAG',
      sublabel: 'Deterministic guardrails over 20+ yrs engineering standards',
    },
    {
      value: '10,000+',
      label: 'Global Users Transformed',
      sublabel: 'From static document governance to dynamic deviation workflows',
    },
    {
      value: '52',
      label: 'Countries Explored',
      sublabel: 'Global worldview across 6 continents fostering cultural agility',
    },
    {
      value: '22',
      label: 'Operating Assets Deployed',
      sublabel: 'Anomaly tracking platform rolled out in 7 global regions',
    },
    {
      value: '17',
      label: 'Years of Engineering Leadership',
      sublabel: 'Oil & Gas, Automotive, Defence, Pharma, FMCG & Semiconductors',
    },
  ] as MetricHighlight[],

  industries: [
    {
      id: 'oil-gas',
      name: 'Oil & Gas Supermajor',
      sector: 'Energy & Upstream Engineering',
      companies: ['BP', 'BJSS Consulting'],
      role: 'Principal Product Manager / Principal Consultant',
      keyAchievement:
        'Productionized in-house Graph RAG LLM over 20+ years of standards, saving $30M YoY in tech OpEx and unlocking $300M+ in engineering value.',
      impactMetrics: ['$300M+ Value', '$30M OpEx Saved', '10,000+ Users'],
      description:
        'Modernizing safety-critical upstream operations through Palantir Foundry data models, Asset Lifecycle Information Management (ALIM), real-time barrier risk analytics (e-Assurance for S&OR), and digital twin data fabrics.',
      technologies: ['Graph RAG', 'Palantir Foundry', 'Digital Twin', 'ISO Asset Standards', 'S&OR Analytics'],
    },
    {
      id: 'pharma',
      name: 'Pharmaceutical & Life Sciences',
      sector: 'Healthcare & Clinical Intelligence',
      companies: ['Informa PLC (Citeline by Norstella)'],
      role: 'Head of Technology',
      keyAchievement:
        'Delivered industry-first predictive AI platforms forecasting clinical trial and drug development trends using complex regulatory datasets.',
      impactMetrics: ['£8M+ Portfolio', 'Predictive ML Models', 'Global Pharma Adoption'],
      description:
        'Engineered high-throughput data pipelines synthesizing historical clinical trial databases, regulatory submissions, and trial risk indicators to forecast drug approval timelines.',
      technologies: ['Predictive AI', 'Clinical Informatics', 'Regulatory Data Feeds', 'Cloud Microservices'],
    },
    {
      id: 'automotive',
      name: 'Automotive Engineering',
      sector: 'Advanced Mobility & PLM',
      companies: ['L&T Technology Services', 'Jaguar Land Rover'],
      role: 'Engineering Lead',
      keyAchievement:
        'Led engineering software squads deploying PLM systems and digital engineering workflows for vehicle manufacturing processes.',
      impactMetrics: ['Tier-1 OEM Standards', 'Factory Floor Integration', 'Multi-Discipline CAD/PLM'],
      description:
        'Bridged mechanical engineering assemblies with digital product lifecycle backbones, synchronizing manufacturing execution with bill-of-materials traceability.',
      technologies: ['Teamcenter PLM', 'CAD Automation', 'Digital Mockup (DMU)', 'Supply Chain Traceability'],
    },
    {
      id: 'defence',
      name: 'Defence & Marine Engineering',
      sector: 'High-Integrity Defence Systems',
      companies: ['L&T Technology Services', 'Indian Navy'],
      role: 'Engineering Lead',
      keyAchievement:
        'Architected and developed secure backend database systems for mission-critical, high-integrity naval defense applications.',
      impactMetrics: ['Mission Critical 99.999%', 'Air-Gapped Security', 'Strict Defence Compliance'],
      description:
        'Built ultra-resilient database engines and cryptographic access controls operating under safety-critical maritime defense environments.',
      technologies: ['High-Integrity DBs', 'Air-Gapped Architectures', 'Naval Systems', 'C/Java Systems'],
    },
    {
      id: 'fmcg',
      name: 'Consumer Goods (FMCG)',
      sector: 'Global Supply Chain & Commerce',
      companies: ['Capgemini', 'Procter & Gamble'],
      role: 'Senior Manager',
      keyAchievement:
        'Led technical product design and enterprise architecture for commercial and supply-chain applications with >90% test automation.',
      impactMetrics: ['>90% Test Automation', 'Global Distribution', 'Multi-Tier Logistics'],
      description:
        'Architected scalable order-to-cash frameworks and automated regression test harnesses that eliminated release bottlenecks across global supply chains.',
      technologies: ['Enterprise Architecture', 'CI/CD Pipelines', 'Automated QA', 'ERP Integration'],
    },
    {
      id: 'semiconductors',
      name: 'Semiconductors & Heavy Industry',
      sector: 'Industrial Technology & Manufacturing',
      companies: ['Capgemini', 'General Electric'],
      role: 'Senior Manager',
      keyAchievement:
        'Spearheaded complex technical upgrades and multi-database migrations for enterprise Product Lifecycle Management (PLM) applications.',
      impactMetrics: ['Zero Data Loss', 'Multi-DB Migration', 'High-Concurrence Access'],
      description:
        'Executed mission-critical database schema normalization, PLM federation, and zero-downtime cutovers for high-precision manufacturing plants.',
      technologies: ['Database Migration', 'PLM Infrastructure', 'Legacy Modernization', 'Data Integrity'],
    },
    {
      id: 'digital-research',
      name: 'Digital Research & Media Tech',
      sector: 'Market Intelligence & M&A',
      companies: ['Informa Tech', 'Omdia'],
      role: 'Head of Technology',
      keyAchievement:
        'Led technology consolidation for high-profile M&A programs, overseeing 200+ digital applications under strict GDPR & CCPA governance.',
      impactMetrics: ['200+ Applications', 'GDPR/CCPA Compliance', 'M&A Consolidation'],
      description:
        'Harmonized disparate tech stacks, identity providers, and customer databases into a unified subscription platform following multi-brand corporate mergers.',
      technologies: ['Application Portfolio Mgmt', 'GDPR/CCPA Compliance', 'SSO/Auth', 'Cloud Consolidation'],
    },
  ] as IndustryItem[],

  turnkeyPlaybook: [
    {
      step: '01',
      title: 'Graph RAG & Deterministic AI Guardrails',
      problem:
        'Industrial knowledge is trapped in 20+ years of dense engineering PDFs, technical deviations, and multi-asset legacy logs prone to hallucinations if fed raw into basic generative AI.',
      solution:
        'Built an enterprise Graph RAG ingestion engine that anchors generative retrieval onto deterministic ISO knowledge graphs, enforcing benchmarks that eliminate semantic drift and hallucinations.',
      businessImpact: '$100M+ reliable discovery value, 10,000+ engineers equipped with instant verified engineering standards.',
      badge: 'Applied AI Innovation',
    },
    {
      step: '02',
      title: 'Palantir Foundry Data Fabric & ISO Standard',
      problem:
        'Upstream asset data was fragmented across siloed basin repositories, legacy inspection databases, and ad-hoc spreadsheets, driving millions in redundant CAPEX.',
      solution:
        'Architected automated migration and schema-mapping tools on Palantir Foundry to transform legacy datasets into unified ISO data standards for a live Digital Twin.',
      businessImpact: '~$12M in direct CAPEX avoidance, unified anomaly and inspection pipelines across 22 global assets.',
      badge: 'Data Architecture',
    },
    {
      step: '03',
      title: 'Real-Time Safety & Operational Risk (e-Assurance)',
      problem:
        'Safety audits relied on manual reconciliation cycles spanning months, exposing barrier degradations and creating audit backlogs.',
      solution:
        'Engineered e-Assurance for Safety & Operational Risk (S&OR), connecting live barrier monitoring with 100% digital audit reconciliation and automated deviation tracking.',
      businessImpact: 'Liberated 15,000+ auditor hours, generated $3M+ in direct OPEX savings, zero barrier visibility gaps.',
      badge: 'Safety-Critical Operations',
    },
    {
      step: '04',
      title: 'Human-Led Agile Shift & Vendor Coalition',
      problem:
        'Top-down digital programs often spark passive resistance from engineering squads accustomed to decades of rigid waterfall procedures.',
      solution:
        'Coached multi-vendor teams into high-trust Scrum squads; replaced paper-heavy gates with deviation-led, dynamic self-service workflows centered on engineers’ daily lives.',
      businessImpact: 'Prevented $50M+ in projected CAPEX write-offs and achieved rapid adoption across UK, US, Middle East, Africa, and India.',
      badge: 'Change Leadership',
    },
  ],

  workExperience: [
    {
      id: 'bp',
      company: 'BP',
      role: 'Principal Product Manager',
      period: 'May 2023 – Present',
      location: 'UK · USA · Middle East · Africa · India',
      summary:
        'Governed product strategy, line management, capital allocation, and change across a $20M+ tools & technology portfolio transforming Upstream asset operations. Optimized and reduced technology operating costs by $30M YoY while unlocking $300M+ in total engineering value.',
      pillars: [
        {
          title: 'Transformation & New Value',
          highlights: [
            'Productionized in-house LLM leveraging Graph RAG, indexing 20+ years of engineering standards, technical deviations, and multi-asset feedback while enforcing deterministic guardrails and benchmarks to eliminate hallucinations and semantic drift, unlocking $100M+ in reliable information discovery value.',
            'Directed the launch of e-Assurance for Safety & Operational Risk (S&OR), changing audit reconciliation & reporting cycle times, liberating 15k+ auditor hours to deliver $3M+ in OPEX savings while establishing 100% digital traceability and real-time barrier risk analytics.',
          ],
        },
        {
          title: 'Change & Global Deployment',
          highlights: [
            'Led end-to-end transformation lifecycle from business vision, market analysis, vendor selection through to pilot and global rollout, curating an AI ingestion layer. Directed enterprise-wide change management across all engineering disciplines to transition 10,000+ global users from document-centric governance to dynamic, deviation-led workflows (~$30M operational efficiencies).',
            'Directed the multi-basin completion of the ~$35M+ Asset Lifecycle Information Management (ALIM) ecosystem, taking over mid-flight to finalize rollout across all global upstream assets and downstream refineries. Rationalized disconnected processes into a standard asset data model, delivering the trusted data fabric required for BP’s centralized Digital Twin.',
          ],
        },
        {
          title: 'Modernization & Consolidation',
          highlights: [
            'Scaled Palantir adoption, transitioning data pipelines across integrity, inspection, anomaly, and engineering asset domains. Developed migration and schema-mapping tools on Palantir to transform legacy datasets into ISO data standards, delivering ~$12M in CAPEX avoidance.',
          ],
        },
      ],
      tags: ['Graph RAG', 'Palantir Foundry', 'Digital Twin', 'Safety & Operational Risk', 'Executive Governance'],
    },
    {
      id: 'bjss',
      company: 'BJSS Consulting',
      role: 'Principal Consultant',
      period: 'Mar 2021 – Apr 2023',
      location: 'London, UK',
      summary:
        'Led high-caliber consulting teams for Technology Delivery across major Oil & Gas clients, specializing in digital factory acceleration and asset integrity transformations.',
      pillars: [
        {
          title: 'Digital Factory Acceleration',
          highlights: [
            'Championed critical delivery streams within BP’s enterprise Digital Factory rollout, driving the shift from legacy waterfall methods to agile ways of working.',
            'Coached and aligned multi-vendor teams to the Scrum framework, accelerating time-to-market and preventing over $50M+ in projected CAPEX write-offs.',
          ],
        },
        {
          title: 'Asset Integrity Management',
          highlights: [
            'Spearheaded the rapid multi-basin rollout of the commercial Anomaly Assessment & Tracking (AA&T) platform across 22 operating assets in 7 global regions across all integrity disciplines.',
            'Accelerated time-to-value by deploying the enterprise solution within 50% of the expected timeframe, capturing $15M in enterprise licensing savings.',
          ],
        },
      ],
      tags: ['Scrum Leadership', 'Multi-Vendor Coaching', 'Anomaly Tracking', 'CAPEX Risk Mitigation'],
    },
    {
      id: 'informa',
      company: 'Informa PLC',
      role: 'Head of Technology',
      period: 'Feb 2018 – Feb 2021',
      location: 'London, UK',
      summary:
        'Directed technology strategy, platform engineering, and enterprise architecture across Informa’s high-value data analytics and pharmaceutical portfolios.',
      pillars: [
        {
          title: 'Predictive AI in Life Sciences (Citeline)',
          highlights: [
            'Delivered industry-first predictive AI platforms forecasting clinical trial and drug development trends using complex regulatory and clinical datasets in an £8M+ technology portfolio.',
            'Architected automated ingestion engines combining public registry data, trial protocols, and real-time trial updates for commercial biopharma sponsors.',
          ],
        },
        {
          title: 'Enterprise M&A and Regulatory Consolidation (Omdia)',
          highlights: [
            'Led technology consolidation for various M&A and rebranding programs overseeing 200+ digital applications under GDPR/CCPA regulatory governance.',
            'Consolidated multiple legacy publishing portals into a unified digital intelligence suite, reducing cloud maintenance overhead by 35%.',
          ],
        },
      ],
      tags: ['Predictive AI', 'Citeline Pharma', 'M&A Architecture', 'GDPR/CCPA Governance'],
    },
    {
      id: 'capgemini',
      company: 'Capgemini',
      role: 'Senior Manager',
      period: 'Jun 2014 – Nov 2017',
      location: 'UK & India',
      summary:
        'Delivered large-scale technology transformations and technical product design for tier-1 Fortune 50 clients in FMCG and Semiconductor industries.',
      pillars: [
        {
          title: 'Enterprise Architecture for FMCG (Procter & Gamble)',
          highlights: [
            'Led technical product design and enterprise architecture for core commercial and supply-chain applications.',
            'Overhauled test automation frameworks to achieve >90% automated test coverage, drastically reducing regression cycle times.',
          ],
        },
        {
          title: 'High-Integrity PLM Upgrades (General Electric)',
          highlights: [
            'Led complex technical upgrades and multi-database migrations for enterprise Product Lifecycle Management (PLM) applications.',
            'Ensured zero downtime and strict data consistency across global engineering repositories.',
          ],
        },
      ],
      tags: ['Procter & Gamble', 'General Electric', 'Enterprise Architecture', 'Automated QA'],
    },
    {
      id: 'lnt',
      company: 'L&T Technology Services',
      role: 'Engineering Lead',
      period: 'Dec 2008 – Jun 2014',
      location: 'UK & India',
      summary:
        'Guided multidisciplinary engineering software squads implementing mission-critical systems for elite automotive and naval defense clients.',
      pillars: [
        {
          title: 'Automotive Digital Engineering (Jaguar Land Rover)',
          highlights: [
            'Led engineering software squads implementing PLM systems and digital engineering workflows for vehicle manufacturing processes.',
            'Spearheaded CAD/PLM integration across body-in-white and chassis engineering divisions.',
          ],
        },
        {
          title: 'Mission-Critical Defence Systems (Indian Navy)',
          highlights: [
            'Architected and developed secure backend database systems for mission-critical, high-integrity naval defense applications.',
            'Enforced stringent security protocols, cryptographic data isolation, and fault-tolerant failovers.',
          ],
        },
      ],
      tags: ['Jaguar Land Rover', 'Indian Navy Defence', 'PLM Systems', 'High-Integrity Databases'],
    },
  ] as ExperienceItem[],

  educationAndCredentials: {
    education: [
      {
        degree: 'MBA (Executive Master of Business Administration)',
        institution: 'Quantic School of Business & Technology',
        year: '2022',
        focus: 'Strategic Management, Technology Commercialization, Global Capital Allocation',
      },
      {
        degree: 'Bachelor of Engineering (Distinction)',
        institution: 'North Maharashtra University',
        year: '2008',
        focus: 'Computer Engineering, System Architecture & Database Design',
      },
    ],
    technicalCertifications: [
      { name: 'Palantir Foundry Certified', issuer: 'Palantir Technologies', type: 'Data Fabric & AI' },
      { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', type: 'Cloud Infrastructure' },
      { name: 'Sun-Certified Java Programmer (SCJP)', issuer: 'Sun Microsystems / Oracle', type: 'Core Systems' },
    ],
    managementCredentials: [
      { name: 'Project Management Professional (PMP)®', issuer: 'PMI', type: 'Portfolio Governance' },
      { name: 'PRINCE2® Practitioner', issuer: 'AXELOS', type: 'Programme Management' },
      { name: 'Management of Successful Programmes (MSP®)', issuer: 'AXELOS', type: 'Strategic Change' },
      { name: 'Leading SAFe® 5.0 (Scaled Agile Framework)', issuer: 'Scaled Agile', type: 'Enterprise Agile' },
      { name: 'Professional Agile Leadership (PAL)', issuer: 'Scrum.org', type: 'Executive Leadership' },
      { name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', type: 'Product Ownership' },
      { name: 'Certified Scrum Master (CSM)', issuer: 'Scrum Alliance', type: 'Team Coaching' },
    ],
  },

  travelExploration: {
    totalCountries: 52,
    continents: 6,
    perspectiveStatement:
      'Having navigated 52 sovereign nations across Europe, the Americas, Asia, Africa, and the Middle East, I view leadership through a deeply global, empathetic lens. Managing distributed engineering teams across Houston, London, Cairo, Baku, Mumbai, and Singapore requires far more than Jira tickets—it demands genuine cross-cultural curiosity, mutual respect, and the ability to listen before prescribing.',
    regions: [
      {
        region: 'Europe (22 Countries)',
        countries: [
          'United Kingdom',
          'France',
          'Germany',
          'Italy',
          'Spain',
          'Switzerland',
          'Netherlands',
          'Norway',
          'Sweden',
          'Denmark',
          'Belgium',
          'Austria',
          'Portugal',
          'Greece',
          'Czech Republic',
          'Hungary',
          'Poland',
          'Ireland',
          'Croatia',
          'Iceland',
          'Estonia',
          'Finland',
        ],
        highlight: 'Deep exploration of maritime engineering hubs, Arctic horizons, and Alpine infrastructure.',
      },
      {
        region: 'Asia & Middle East (17 Countries)',
        countries: [
          'India',
          'United Arab Emirates',
          'Oman',
          'Qatar',
          'Saudi Arabia',
          'Japan',
          'Singapore',
          'Malaysia',
          'Thailand',
          'Vietnam',
          'Indonesia',
          'Turkey',
          'Jordan',
          'Sri Lanka',
          'Georgia',
          'Azerbaijan',
          'South Korea',
        ],
        highlight: 'From high-speed transit corridors of Tokyo to the offshore Caspian energy gates in Baku.',
      },
      {
        region: 'Americas (6 Countries)',
        countries: ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Costa Rica'],
        highlight: 'Transcontinental logistics, Gulf of Mexico energy assets, and vibrant Latin American cultures.',
      },
      {
        region: 'Africa (5 Countries)',
        countries: ['Egypt', 'Morocco', 'South Africa', 'Kenya', 'Angola'],
        highlight: 'Suez maritime arteries, Nile engineering history, and sub-Saharan energy developments.',
      },
      {
        region: 'Oceania (2 Countries)',
        countries: ['Australia', 'New Zealand'],
        highlight: 'Harbor engineering, Pacific biodiversity, and resilient mining infrastructure.',
      },
    ],
  },

  photographyExhibition: [
    {
      id: 'photo-1',
      title: 'Monolithic Geometries: North Sea Offshore Rig',
      category: 'Industrial & Marine',
      location: 'North Sea Basin, Scotland',
      camera: 'Leica Q2 · 28mm Summilux',
      settings: 'f/4.0 · 1/800s · ISO 100',
      story:
        'A testament to human daring. Capturing the heavy steel lattice standing firm against unforgiving waves during twilight inspection rounds.',
      gradient: 'from-slate-900 via-blue-950 to-slate-900',
      accent: '#38bdf8',
    },
    {
      id: 'photo-2',
      title: 'Echoes in Concrete: Brutalist Spiral of London',
      category: 'Architectural Form',
      location: 'Barbican Estate, London',
      camera: 'Sony A7R IV · 35mm GM',
      settings: 'f/2.8 · 1/250s · ISO 200',
      story:
        'Lines, rhythm, and structural repetition. The geometry of architecture echoes the modularity we strive for in clean enterprise software.',
      gradient: 'from-stone-900 via-neutral-900 to-zinc-950',
      accent: '#f59e0b',
    },
    {
      id: 'photo-3',
      title: 'The Silent Sahara: Dune Ridges at Dusk',
      category: 'Global Horizons',
      location: 'Merzouga, Morocco',
      camera: 'Fujifilm X-T5 · 56mm f/1.2',
      settings: 'f/5.6 · 1/640s · ISO 125',
      story:
        'Wind-sculpted sand crests shifting in silence. A humbling reminder that natural systems follow continuous feedback loops of immense grace.',
      gradient: 'from-amber-950 via-orange-950 to-stone-950',
      accent: '#fb923c',
    },
    {
      id: 'photo-4',
      title: 'Neon & Steam: Alleyways of Shinjuku',
      category: 'Street & Culture',
      location: 'Tokyo, Japan',
      camera: 'Leica M11 · 35mm Summicron',
      settings: 'f/2.0 · 1/160s · ISO 800',
      story:
        'The intimate warmth of human connection tucked between towering glass megastructures. The heartbeat of a city is in its shared conversations.',
      gradient: 'from-indigo-950 via-purple-950 to-slate-950',
      accent: '#c084fc',
    },
    {
      id: 'photo-5',
      title: 'Vessel on the Bosphorus: Maritime Crossroads',
      category: 'Industrial & Marine',
      location: 'Istanbul, Turkey',
      camera: 'Sony A7R IV · 85mm GM',
      settings: 'f/3.5 · 1/1000s · ISO 160',
      story:
        'Watching container vessels slice the boundary between continents. Where trade, history, and modern maritime telematics converge.',
      gradient: 'from-cyan-950 via-slate-900 to-sky-950',
      accent: '#2dd4bf',
    },
    {
      id: 'photo-6',
      title: 'Glacial Spires: The Quiet of the Fjords',
      category: 'Global Horizons',
      location: 'Geirangerfjord, Norway',
      camera: 'Fujifilm X-T5 · 23mm f/1.4',
      settings: 'f/8.0 · 1/320s · ISO 100',
      story:
        'Sheer granite walls mirrored in obsidian waters. Photography teaches the art of patience—waiting for that single second when light reveals form.',
      gradient: 'from-emerald-950 via-slate-950 to-teal-950',
      accent: '#34d399',
    },
  ] as PhotographyItem[],

  recommendations: [
    {
      id: 'rec-1',
      author: 'Senior Engineering Director',
      title: 'Vice President of Digital Transformation',
      company: 'Global Energy Supermajor',
      relationship: 'Senior stakeholder collaborating on upstream tools portfolio',
      quote:
        'Jaideep possesses that exceedingly rare trifecta: profound technical depth in data architectures, an instinct for commercial capital efficiency, and an extraordinary gift for bringing people along. He took a deeply cynical, fragmented multi-basin organization and united 10,000+ engineers around a single digital twin vision. He makes complex AI feel practical and safe.',
      highlight: 'Uniting 10,000+ engineers around a single digital vision',
    },
    {
      id: 'rec-2',
      author: 'Principal Asset Integrity Specialist',
      title: 'Lead Upstream Technical Authority',
      company: 'North Sea & Gulf Assets',
      relationship: 'Technical SME on Anomaly Assessment & Tracking (AA&T)',
      quote:
        'Before Jaideep stepped in, our engineers were drowning in PDFs, deviations, and disconnected spreadsheet logs. His deployment of the AA&T platform across 22 assets in half the scheduled time was masterclass leadership. More importantly, he listened to our frontline inspectors. He built tools that solved our actual daily headaches, not theoretical ones.',
      highlight: 'Deployed across 22 assets in half the scheduled time with frontline trust',
    },
    {
      id: 'rec-3',
      author: 'Head of Consulting Practice',
      title: 'Partner & Client Delivery Director',
      company: 'Tier-1 Digital Consultancy',
      relationship: 'Supervised multi-vendor delivery programs at BJSS',
      quote:
        'When client engagements run into vendor friction and technical stalemates, Jaideep is the leader you put on the ground. He coached disparate multi-vendor squads into a single high-trust Scrum cadence, directly saving over $50M in projected CAPEX write-offs. The LinkedIn recommendations on his profile tell the true story: people simply love working for and with Jaideep.',
      highlight: 'Coached disparate multi-vendor squads, saving $50M+ CAPEX write-offs',
    },
    {
      id: 'rec-4',
      author: 'Senior Staff Software Architect',
      title: 'Applied AI & Knowledge Systems Lead',
      company: 'Enterprise Data Platform Squad',
      relationship: 'Directly reported to Jaideep on Graph RAG implementation',
      quote:
        'Jaideep protected the engineering squad from political noise and gave us the clarity to build something genuinely groundbreaking—our in-house Graph RAG LLM. His insistence on deterministic guardrails and eliminating semantic drift turned an experimental AI concept into a mission-critical tool unlocking $100M+ in engineering value.',
      highlight: 'Turned experimental AI into $100M+ mission-critical tool',
    },
  ] as RecommendationItem[],

  accomplishments: [
    {
      id: 'acc-1',
      title: 'Productionized In-House Graph RAG LLM System',
      impactMetric: '$100M+ Value',
      organization: 'BP Upstream Operations',
      category: 'Applied AI & RAG',
      description:
        'Indexed 20+ years of engineering standards, technical deviations, and multi-asset feedback. Enforced deterministic guardrails and benchmarks to eliminate hallucinations and semantic drift.',
      significance: 'Unlocks $100M+ in reliable engineering discovery value across upstream assets worldwide.',
    },
    {
      id: 'acc-2',
      title: 'e-Assurance for Safety & Operational Risk (S&OR)',
      impactMetric: '15,000+ Hrs Saved',
      organization: 'BP Safety & Operational Risk',
      category: 'Operational Risk & Safety',
      description:
        'Changed audit reconciliation & reporting cycle times, establishing 100% digital traceability and real-time barrier risk analytics.',
      significance: 'Liberated 15,000+ auditor hours and delivered $3M+ in direct OPEX savings.',
    },
    {
      id: 'acc-3',
      title: 'Global Agile Factory Shift & Multi-Vendor Coalition',
      impactMetric: '$50M+ Risk Mitigated',
      organization: 'BP / BJSS Consulting',
      category: 'Commercial & Capex',
      description:
        'Coached disparate multi-vendor squads to the Scrum framework within BP’s enterprise Digital Factory rollout, driving rapid shift from legacy waterfall.',
      significance: 'Accelerated time-to-market and prevented over $50M+ in projected CAPEX write-offs.',
    },
    {
      id: 'acc-4',
      title: '~$35M+ Asset Lifecycle Information Management (ALIM)',
      impactMetric: 'Central Digital Twin',
      organization: 'BP Upstream & Refineries',
      category: 'Data Architecture',
      description:
        'Directed multi-basin completion taking over mid-flight to finalize rollout across all global upstream assets and downstream refineries. Rationalized disconnected processes into a standard asset data model.',
      significance: 'Delivered the trusted data fabric required for BP’s centralized Digital Twin.',
    },
    {
      id: 'acc-5',
      title: '10,000+ Global Engineering Users Transformed',
      impactMetric: '~$30M Efficiencies',
      organization: 'BP Global Engineering Disciplines',
      category: 'Operational Risk & Safety',
      description:
        'Led end-to-end transformation lifecycle from business vision through to pilot and global rollout, curating an AI ingestion layer across 10,000+ users from document-centric governance to deviation-led workflows.',
      significance: 'Delivered ~$30M in verified operational efficiencies without disrupting operating assets.',
    },
    {
      id: 'acc-6',
      title: 'Palantir Foundry Adoption & Schema-Mapping',
      impactMetric: '~$12M CAPEX Avoidance',
      organization: 'BP Upstream Asset Integrity',
      category: 'Data Architecture',
      description:
        'Scaled Palantir adoption, transitioning data pipelines across integrity, inspection, anomaly, and engineering asset domains. Developed schema-mapping tools to transform legacy datasets into ISO standards.',
      significance: 'Delivered ~$12M in direct CAPEX avoidance through standard schema unification.',
    },
    {
      id: 'acc-7',
      title: 'Multi-Basin Anomaly Tracking (AA&T) Rollout',
      impactMetric: '$15M Licensing Saved',
      organization: 'BJSS Consulting / BP',
      category: 'Commercial & Capex',
      description:
        'Spearheaded the rapid multi-basin rollout of the commercial Anomaly Assessment & Tracking (AA&T) platform across 22 operating assets in 7 global regions.',
      significance: 'Deployed within 50% of scheduled timeframe, capturing $15M in enterprise licensing savings.',
    },
    {
      id: 'acc-8',
      title: 'Industry-First Predictive AI in Pharma (Citeline)',
      impactMetric: '£8M+ Portfolio',
      organization: 'Informa PLC / Norstella',
      category: 'Applied AI & RAG',
      description:
        'Delivered industry-first predictive AI platforms forecasting clinical trial and drug development trends using complex regulatory and clinical datasets.',
      significance: 'Enabled commercial pharma sponsors to forecast regulatory approval timelines.',
    },
  ] as AccomplishmentItem[],

  knowledgeGraphNotes: [
    {
      id: 'kgn-1',
      category: 'Timeline Milestone',
      topic: 'BP Upstream Digital Twin & Graph RAG Production Launch',
      timeline: 'May 2023 - Present',
      details:
        'Governed multi-million tools portfolio leading Graph RAG deployment indexing 20+ years of standards and deviations with zero hallucination guarantee.',
      impact: '$100M+ reliable engineering discovery value; $30M YoY OpEx reduction.',
    },
    {
      id: 'kgn-2',
      category: 'Project Success',
      topic: 'e-Assurance for Safety & Operational Risk (S&OR)',
      timeline: '2023 - 2024',
      details:
        'Converted manual audit reconciliation into continuous real-time barrier risk monitoring across operating assets.',
      impact: '15k+ auditor hours liberated; $3M+ OpEx savings; 100% digital traceability.',
    },
    {
      id: 'kgn-3',
      category: 'Project Success',
      topic: 'Digital Factory Agile Turnaround & CAPEX Defense',
      timeline: '2021 - 2023',
      details:
        'Coached multi-vendor delivery squads from waterfall to Scrum at BJSS / BP.',
      impact: 'Prevented $50M+ in projected CAPEX write-offs and accelerated time-to-market.',
    },
    {
      id: 'kgn-4',
      category: 'Domain Expertise',
      topic: 'Turnkey Technology Deployment for Nascent Heavy Industries',
      timeline: '2014 - Present',
      details:
        'Specializes in bridging legacy industrial OT/IT systems with state-of-the-art AI, Palantir Foundry, and ISO 14224 data models.',
      impact: 'Unlocks massive dormant capital and eliminates friction in risk-averse environments.',
    },
  ] as KnowledgeGraphNote[],

  uploadedCVFiles: [
    {
      id: 'cv-v4-official',
      fileName: 'Jaideep_Naidu_v4_4ae29fdf.pdf',
      fileSize: '184 KB',
      uploadDate: 'October 2026',
      versionLabel: 'Official Executive CV (v4)',
      roleContext: 'BP Principal Product Manager & Full 17-Year Industrial Track Record',
      fileData: '/assets/aistudio/Jaideep_Naidu_v4_4ae29fdf.pdf',
      extractedNotes:
        'Contains full executive summary, leadership highlights across Graph RAG, e-Assurance for S&OR, ALIM ($35M+ ecosystem), Palantir adoption, BJSS Digital Factory, Informa Citeline predictive AI, Capgemini FMCG architecture, and L&T naval defense backend.',
    },
  ] as UploadedCVDocument[],

  pillarHeaders: {
    hero: {
      id: 'hero',
      pillarTag: 'EXECUTIVE HERO',
      title: 'Executive Engineering Leadership & Applied AI Overview',
      subtitle: 'Profile & Quantitative Rigor',
      highlight: 'BP Upstream Tools Lead · $300M+ Value · Quantic EMBA · 10k+ Engineers',
    },
    experience: {
      id: 'experience',
      pillarTag: 'PILLAR 01',
      title: 'Executive Leadership & Engineering Track Record',
      subtitle: '17 Years Executive Leadership',
      highlight: 'BP Upstream · BJSS · Capgemini · 10k+ Engineers',
    },
    accomplishments: {
      id: 'accomplishments',
      pillarTag: 'PILLAR 02',
      title: 'Accomplishments & Educational Qualifications',
      subtitle: 'Verified ROI & Academic Rigor',
      highlight: '$100M+ Value · EMBA & BE · TOGAF / CITA / DAMA / SAFe',
    },
    industries: {
      id: 'industries',
      pillarTag: 'PILLAR 03',
      title: 'Breadth Across 7 Global Industries',
      subtitle: 'Cross-Sector Versatility',
      highlight: 'Energy · Pharma · Defense · Auto · FMCG · Semi · Digital',
    },
    'turnkey-tech': {
      id: 'turnkey-tech',
      pillarTag: 'PILLAR 04',
      title: 'Delivering Turnkey Tech to Nascent Heavy Industry',
      subtitle: 'Applied AI & Modernizing Heavy Industry',
      highlight: 'Palantir Foundry · Graph RAG · S&OR e-Assurance · ISO-14224',
    },
    leadership: {
      id: 'leadership',
      pillarTag: 'PILLAR 05',
      title: 'Human Connection as the Engine of Technological Change',
      subtitle: 'Human Connection as Innovation Engine',
      highlight: 'People-First · Psychological Safety · 100+ LinkedIn Recommendations',
    },
    hobbies: {
      id: 'hobbies',
      pillarTag: 'PILLAR 06',
      title: 'Hobbies: 52 Sovereign Nations & Photography',
      subtitle: 'Personal Passions & Perspective',
      highlight: '52 Sovereign Nations · 6 Continents · 35mm Fine-Art Monographs',
    },
    contact: {
      id: 'contact',
      pillarTag: 'CONNECT & ADVISORY',
      title: 'Connect & Advisory: Direct Dispatch',
      subtitle: 'Direct Dispatch & Executive Mandates',
      highlight: 'London HQ · Global Mobility · Direct Message · Official CV Dispatch',
    },
  } as Record<string, PillarHeaderConfig>,
};

// Export PORTFOLIO_DATA with the separate JSON file pre-merged for build & deployment
export const PORTFOLIO_DATA = {
  ...DEFAULT_PORTFOLIO_DATA,
  ...(customDataJson as unknown as Partial<typeof DEFAULT_PORTFOLIO_DATA>),
  pillarHeaders: {
    ...DEFAULT_PORTFOLIO_DATA.pillarHeaders,
    ...((customDataJson as any)?.pillarHeaders || {}),
  },
};

const STORAGE_KEY = 'jaideep_portfolio_custom_content_v1';

export function loadPortfolioData(): typeof PORTFOLIO_DATA {
  if (typeof window === 'undefined') return PORTFOLIO_DATA;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...PORTFOLIO_DATA,
        ...parsed,
        pillarHeaders: {
          ...PORTFOLIO_DATA.pillarHeaders,
          ...(parsed.pillarHeaders || {}),
        },
      };
    }
  } catch (e) {
    console.error('Failed to load saved portfolio data', e);
  }
  return PORTFOLIO_DATA;
}

// Fetch the canonical custom data file persisted on server / website deployment
export async function fetchServerPortfolioData(): Promise<typeof PORTFOLIO_DATA | null> {
  try {
    const res = await fetch('/api/portfolio-data');
    if (res.ok) {
      const parsed = await res.json();
      if (parsed && typeof parsed === 'object') {
        return {
          ...PORTFOLIO_DATA,
          ...parsed,
          pillarHeaders: {
            ...PORTFOLIO_DATA.pillarHeaders,
            ...(parsed.pillarHeaders || {}),
          },
        };
      }
    }
  } catch (e) {
    // Fallback to static deployment asset if served without Node API
    try {
      const staticRes = await fetch('/portfolio-data.json');
      if (staticRes.ok) {
        const parsed = await staticRes.json();
        if (parsed && typeof parsed === 'object') {
          return {
            ...PORTFOLIO_DATA,
            ...parsed,
            pillarHeaders: {
              ...PORTFOLIO_DATA.pillarHeaders,
              ...(parsed.pillarHeaders || {}),
            },
          };
        }
      }
    } catch (_) {}
  }
  return null;
}

// Saves data to browser localStorage AND writes to the separate persistent file (src/data/portfolioCustomData.json)
export async function savePortfolioData(
  data: typeof PORTFOLIO_DATA
): Promise<{ success: boolean; message: string; file?: string }> {
  // 1. Immediately cache in browser localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // 2. Persist to server separate file for deployment
  try {
    const res = await fetch('/api/portfolio-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        file: json.file || 'src/data/portfolioCustomData.json',
        message: json.message || 'Saved to separate file and ready for website deployment.',
      };
    } else {
      const err = await res.json().catch(() => ({}));
      return {
        success: false,
        message: err.error || 'Saved in local storage; server file write failed.',
      };
    }
  } catch (err: any) {
    console.warn('Could not reach /api/portfolio-data, saved locally:', err);
    return {
      success: true,
      message: 'Saved locally in browser cache.',
    };
  }
}

export function resetPortfolioData(): typeof PORTFOLIO_DATA {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PORTFOLIO_DATA;
}

