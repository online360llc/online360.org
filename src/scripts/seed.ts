import { getDb } from '../lib/db';

const projects = [
  {
    slug: 'dataflow',
    name: 'DataFlow',
    description: 'DataFlow is a Next.js application for uploading data, building charts, assembling dashboards and reports, and sharing results. Integrated with AWS S3 and PostgreSQL.',
    url: 'https://dataflow.online360.org',
    category: 'Data Analytics',
    featured: true,
    icon_name: 'BarChart'
  },
  {
    slug: 'askrank',
    name: 'AskRank',
    description: 'AI visibility score for local businesses. Shows what AI assistants tell customers about your business and provides a step-by-step plan to improve recommendations.',
    url: 'https://askrank.online360.org',
    category: 'Marketing / AI',
    featured: true,
    icon_name: 'Search'
  },
  {
    slug: 'disclosely',
    name: 'Disclosely',
    description: 'EU AI Act Article 50 Compliance SaaS. The one-time-payment compliance kit for the August 2, 2026 AI transparency deadline.',
    url: 'https://disclosely.online360.org',
    category: 'Legal / Compliance',
    featured: true,
    icon_name: 'Shield'
  },
  {
    slug: 'agentready',
    name: 'AgentReady',
    description: 'AI shopping readiness audits for ecommerce stores. Ensure your store is ready for the age of AI agents and automated shopping.',
    url: 'https://agentready.online360.org',
    category: 'E-commerce / AI',
    featured: true,
    icon_name: 'ShoppingCart'
  },
  {
    slug: 'newshook',
    name: 'NewsHook',
    description: 'Automated news aggregation and hook generation for social media and content marketing.',
    url: 'https://newshook.online360.org',
    category: 'Content / Marketing',
    featured: false,
    icon_name: 'Newspaper'
  },
  {
    slug: 'propfly',
    name: 'PropFly',
    description: 'Real estate property management and listing platform with AI-driven insights.',
    url: 'https://propfly.online360.org',
    category: 'Real Estate',
    featured: false,
    icon_name: 'Home'
  },
  {
    slug: 'replypilot',
    name: 'ReplyPilot',
    description: 'AI-powered social media reply assistant. Engage with your audience faster and better with intelligent reply suggestions.',
    url: 'https://replypilot.online360.org',
    category: 'Social Media',
    featured: false,
    icon_name: 'MessageSquare'
  },
  {
    slug: 'trendforge',
    name: 'TrendForge',
    description: 'Trend analysis and forecasting platform. Identify emerging trends before they go viral.',
    url: 'https://trendforge.online360.org',
    category: 'Market Research',
    featured: false,
    icon_name: 'TrendingUp'
  },
  {
    slug: 'pilotledger',
    name: 'PilotLedger',
    description: 'Financial tracking and ledger for small businesses and independent contractors.',
    url: 'https://pilotledger.online360.org',
    category: 'Finance',
    featured: false,
    icon_name: 'Book'
  },
  {
    slug: 'lifemath',
    name: 'LifeMath',
    description: 'The ultimate 30-year financial model for life’s biggest decisions. Compare renting vs buying, model investments, and track long-term wealth growth.',
    url: 'https://lifemath.online360.org',
    category: 'Finance',
    featured: true,
    icon_name: 'Calculator'
  }
];

export function seed() {
  const db = getDb();
  
  const insert = db.prepare(`
    INSERT OR IGNORE INTO projects (slug, name, description, url, category, featured, icon_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const project of projects) {
    insert.run(
      project.slug,
      project.name,
      project.description,
      project.url,
      project.category,
      project.featured ? 1 : 0,
      project.icon_name
    );
  }

  console.log('Seeded projects into database.');
}

if (require.main === module) {
  seed();
}
