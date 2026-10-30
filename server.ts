import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support larger payload for custom photos and role document notes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Paths for persistent data files
const CUSTOM_DATA_PATH = path.resolve(__dirname, 'src', 'data', 'portfolioCustomData.json');
const PUBLIC_DATA_PATH = path.resolve(__dirname, 'public', 'portfolio-data.json');
const DIST_DATA_PATH = path.resolve(__dirname, 'dist', 'portfolio-data.json');

// Endpoint: Retrieve stored portfolio data file
app.get('/api/portfolio-data', (_req, res) => {
  try {
    if (fs.existsSync(CUSTOM_DATA_PATH)) {
      const content = fs.readFileSync(CUSTOM_DATA_PATH, 'utf-8');
      return res.setHeader('Content-Type', 'application/json').send(content);
    }
    if (fs.existsSync(PUBLIC_DATA_PATH)) {
      const content = fs.readFileSync(PUBLIC_DATA_PATH, 'utf-8');
      return res.setHeader('Content-Type', 'application/json').send(content);
    }
    return res.status(404).json({ error: 'No custom data file found.' });
  } catch (err: any) {
    console.error('Error reading custom data file:', err);
    return res.status(500).json({ error: 'Failed to read data file: ' + err.message });
  }
});

// Endpoint: Save updated data from Editor mode directly into separate file for website deployment
app.post('/api/portfolio-data', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    const jsonString = JSON.stringify(data, null, 2);

    // Ensure target directories exist
    const srcDir = path.dirname(CUSTOM_DATA_PATH);
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }
    const publicDir = path.dirname(PUBLIC_DATA_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // 1. Write to src/data/portfolioCustomData.json (deployment source file)
    fs.writeFileSync(CUSTOM_DATA_PATH, jsonString, 'utf-8');

    // 2. Also write to public/portfolio-data.json (for static assets & build distribution)
    fs.writeFileSync(PUBLIC_DATA_PATH, jsonString, 'utf-8');

    // 3. If dist exists (production build), update it directly
    const distDir = path.dirname(DIST_DATA_PATH);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(DIST_DATA_PATH, jsonString, 'utf-8');
    }

    console.log(`[Persistence] Updated separate data file: ${CUSTOM_DATA_PATH} (${jsonString.length} bytes)`);

    return res.json({
      success: true,
      file: 'src/data/portfolioCustomData.json',
      publicFile: 'public/portfolio-data.json',
      message: 'Portfolio data saved to separate file and ready for website deployment.',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error writing portfolio data file:', err);
    return res.status(500).json({ error: 'Failed to persist portfolio data: ' + err.message });
  }
});

const ai =
  process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

const JAIDEEP_PROFILE_CONTEXT = `
JAIDEEP NAIDU - EXECUTIVE PROFILE & GROUNDED CONTEXT:
Location: London, United Kingdom | Email: jaideepnaidu.12@gmail.com | Phone: +44 7436 898 600
LinkedIn: https://www.linkedin.com/in/jaideepnaidu/

Summary:
Technical and Product Engineering Leader with 17 years of experience delivering transformational applied AI systems, large-scale digital architectures, and enterprise data platforms across safety-critical global industries.

Current Role:
- Principal Product Manager at BP (May 2023 - Present)
  - Governed product strategy, line management, capital allocation across a $20M+ tools & technology portfolio transforming Upstream asset operations.
  - Optimized and reduced technology operating costs by $30M YoY while unlocking $300M+ in total engineering value.
  - Productionized in-house LLM leveraging Graph RAG, indexing 20+ years of engineering standards, technical deviations, and multi-asset feedback with deterministic guardrails, unlocking $100M+ in reliable discovery value.
  - Directed launch of e-Assurance for Safety & Operational Risk (S&OR), liberating 15,000+ auditor hours ($3M+ OPEX savings, 100% digital traceability).
  - Transitioned 10,000+ global users from document-centric governance to dynamic deviation-led workflows (~$30M efficiencies).
  - Scaled Palantir adoption, mapping legacy datasets to ISO data standards, delivering ~$12M CAPEX avoidance for the central Digital Twin.
  - Directed multi-basin completion of the ~$35M+ Asset Lifecycle Information Management (ALIM) ecosystem.

Past Career Roles:
- BJSS Consulting (Principal Consultant, Mar 2021 - Apr 2023):
  - Digital Factory rollout for BP, shifting from waterfall to Scrum, preventing $50M+ in projected CAPEX write-offs.
  - Rollout of Anomaly Assessment & Tracking (AA&T) platform across 22 operating assets in 7 global regions in 50% timeframe, saving $15M in licensing.
- Informa PLC (Head of Technology, Feb 2018 - Feb 2021):
  - Citeline by Norstella: Industry-first predictive AI platforms forecasting clinical trial and drug development trends across an £8M+ tech portfolio.
  - Informa Tech / Omdia: M&A consolidation of 200+ digital applications under GDPR/CCPA.
- Capgemini (Senior Manager, Jun 2014 - Nov 2017):
  - Procter & Gamble: Commercial and supply-chain enterprise architecture, >90% test automation.
  - General Electric: Semiconductor PLM upgrades and multi-database migrations with zero data loss.
- L&T Technology Services (Engineering Lead, Dec 2008 - Jun 2014):
  - Jaguar Land Rover: PLM systems and digital engineering workflows for vehicle manufacturing.
  - Indian Navy: Secure backend database systems for mission-critical, high-integrity naval defense.

Best Skills & Core Competencies:
- Applied AI & Generative AI (Graph RAG, Deterministic LLM Guardrails, Hallucination Elimination, Predictive Machine Learning)
- Enterprise Data Architecture (Palantir Foundry, Digital Twins, ALIM, Schema Federation, ISO standards)
- Safety-Critical & Risk Engineering (Safety & Operational Risk e-Assurance, Real-Time Barrier Risk)
- Executive Leadership & Agile Transformation (Coaching multi-vendor squads, human-led change, capital allocation, psychological safety)
- Breadth across 7 industries: Oil & Gas, Pharma/Life Sciences, Automotive, Defence, FMCG, Semiconductors, Digital Research.

Academic & Certifications:
- MBA: Executive Master of Business Administration from Quantic School of Business & Technology (2022).
- BE: Bachelor of Engineering (Distinction) from North Maharashtra University (2008).
- Certifications: Palantir Foundry Certified, AWS Certified Cloud Practitioner, Sun-Certified Java Programmer (SCJP), PMP®, PRINCE2® Practitioner, MSP®, Leading SAFe® 5.0, PAL, CSPO, CSM.

Hobbies & Personal:
- Traveled to 52 sovereign nations across 6 continents (Europe, Americas, Asia, Africa, Middle East, Oceania).
- Pass-time 35mm fine-art photography capturing offshore maritime geometries, brutalist architecture, global horizons, and street life. High-res monographs coming soon.
- Human-led approach: Highly connected with people; over a hundred recommendations praising his empathy and mentorship.
`;

const SYSTEM_INSTRUCTION = `You are the official Gemini AI Assistant on Jaideep Naidu's personal executive portfolio website.

STRICT GROUNDED CONTEXT RULES:
1. You answer questions ONLY about Jaideep Naidu (also called Jai), his career, skills, accomplishments, projects (Graph RAG, BP, Palantir, Digital Twin, Citeline, etc.), education, certifications, leadership philosophy, hobbies (52 countries travel and photography), and contact details.
2. If the user asks ANY question unrelated to Jaideep Naidu, his skills, or his background (e.g. general trivia, coding riddles, random facts, math, politics, weather, other people, or general small talk), you MUST respond ONLY with the exact sentence:
"Jaideep is awesome. Do you want to know more about him ?"
3. Keep responses concise, articulate, executive-grade, and grounded strictly in the provided profile facts. Emphasize his $300M+ value unlocked, applied Graph RAG AI at supermajor scale, and human-led engineering philosophy.`;

function getFileKnowledgeContext(): string {
  try {
    if (fs.existsSync(CUSTOM_DATA_PATH)) {
      const data = JSON.parse(fs.readFileSync(CUSTOM_DATA_PATH, 'utf-8'));
      const kgNotes = (data.knowledgeGraphNotes || [])
        .map((n: any) => `[${n.category} | ${n.timeline}] ${n.topic}: ${n.details} (Impact: ${n.impact})`)
        .join('\n');
      const cvDocs = (data.uploadedCVFiles || [])
        .map((c: any) => `[CV / Document: ${c.versionLabel} - ${c.roleContext}]\n${c.extractedNotes || ''}`)
        .join('\n');
      return [kgNotes, cvDocs].filter(Boolean).join('\n\n');
    }
  } catch (e) {
    // ignore
  }
  return '';
}

// API endpoint for Gemini chat
app.post('/api/chat', async (req, res) => {
  const { message, customContext } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const trimmed = message.trim();
  const fileContext = getFileKnowledgeContext();
  const effectiveContext = [customContext, fileContext].filter(Boolean).join('\n\n');
  const enrichedProfileContext = effectiveContext
    ? `${JAIDEEP_PROFILE_CONTEXT}\n\nADDITIONAL ENRICHED KNOWLEDGE GRAPH NODES & SPECIFIC TIMELINES:\n${effectiveContext}`
    : JAIDEEP_PROFILE_CONTEXT;

  // If Gemini API is available on server
  if (ai) {
    try {
      const geminiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${enrichedProfileContext}\n\nUser Question: ${trimmed}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 4000)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const text = response.text || 'Jaideep is awesome. Do you want to know more about him ?';
      return res.json({ reply: text.trim() });
    } catch (err: any) {
      console.error('Gemini API call skipped or timed out, falling back to local grounded knowledge:', err?.message || err);
    }
  }

  // Graceful grounded response engine if server API key is absent or pending
  const lower = trimmed.toLowerCase();

  // Unrelated/random check
  const isRelated =
    lower.includes('jaideep') ||
    lower.includes('jai') ||
    lower.includes('success') ||
    lower.includes('accomplish') ||
    lower.includes('skill') ||
    lower.includes('experience') ||
    lower.includes('career') ||
    lower.includes('bp') ||
    lower.includes('oil') ||
    lower.includes('gas') ||
    lower.includes('ai') ||
    lower.includes('rag') ||
    lower.includes('palantir') ||
    lower.includes('digital twin') ||
    lower.includes('pharma') ||
    lower.includes('citeline') ||
    lower.includes('education') ||
    lower.includes('mba') ||
    lower.includes('certif') ||
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('phone') ||
    lower.includes('travel') ||
    lower.includes('countr') ||
    lower.includes('photograph') ||
    lower.includes('hobbi') ||
    lower.includes('lead') ||
    lower.includes('human') ||
    lower.includes('resume') ||
    lower.includes('what else') ||
    lower.includes('what do') ||
    lower.includes('cv');

  if (!isRelated) {
    return res.json({
      reply: 'Jaideep is awesome. Do you want to know more about him ?',
    });
  }

  if (lower.includes('success') || lower.includes('biggest') || lower.includes('achievement')) {
    return res.json({
      reply:
        "Jaideep's biggest recent success is productionizing an in-house Graph RAG LLM across 20+ years of engineering standards and asset feedback at BP. By enforcing deterministic guardrails to eliminate hallucinations, he unlocked $100M+ in reliable discovery value, while governing a tools portfolio that cut $30M YoY in OpEx and generated $300M+ in total engineering value.",
    });
  }

  if (lower.includes('skill') || lower.includes('best') || lower.includes('competenc')) {
    return res.json({
      reply:
        "Jaideep's core competencies span: (1) Applied AI & Graph RAG architectures with deterministic benchmarks; (2) Enterprise Data Fabrics & Palantir Foundry; (3) Safety-Critical Engineering & Real-Time Risk Barriers (e-Assurance for S&OR); and (4) Human-Led Leadership, coaching multi-vendor agile squads and transitioning 10,000+ engineers with empathy and psychological safety.",
    });
  }

  if (lower.includes('oil') || lower.includes('gas') || lower.includes('heavy industry')) {
    return res.json({
      reply:
        "In Oil & Gas, Jaideep delivers turnkey solutions to historically nascent tech environments. He bridges 20+ years of unstructured PDF standards using Graph RAG, harmonizes multi-basin inspection data into ISO standards on Palantir Foundry (~$12M CAPEX avoidance), and automates safety audits through e-Assurance for S&OR (15,000+ auditor hours saved).",
    });
  }

  if (lower.includes('mba') || lower.includes('education') || lower.includes('degree') || lower.includes('certif')) {
    return res.json({
      reply:
        "Jaideep holds an Executive MBA from Quantic School of Business & Technology (2022) and a Bachelor of Engineering with Distinction from North Maharashtra University (2008). He is Palantir Foundry Certified, an AWS Certified Cloud Practitioner, PMP®, PRINCE2® Practitioner, MSP®, and Leading SAFe® 5.0 certified.",
    });
  }

  if (
    lower.includes('travel') ||
    lower.includes('countr') ||
    lower.includes('52') ||
    lower.includes('photograph') ||
    lower.includes('hobbi') ||
    lower.includes('what else') ||
    lower.includes('what do')
  ) {
    return res.json({
      reply:
        "Outside work, Jaideep has explored 52 sovereign nations across 6 continents, giving him acute cultural agility for managing distributed teams. He is also a passionate fine-art photographer who shoots 35mm captures of maritime structures, brutalist geometry, and human stories.",
    });
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
    return res.json({
      reply:
        "You can connect directly with Jaideep via email at jaideepnaidu.12@gmail.com, telephone at +44 7436 898 600, or through his verified LinkedIn profile at linkedin.com/in/jaideepnaidu. He is based in London, UK.",
    });
  }

  return res.json({
    reply:
      "Jaideep Naidu is a Technical & Product Engineering Leader with 17 years of experience delivering transformational applied AI, enterprise data fabrics (Palantir Foundry, Digital Twins), and human-led agile leadership across 7 global industries.",
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
