import { getDb, Project } from "@/lib/db";
import { 
  BarChart, 
  Search, 
  Shield, 
  ShoppingCart, 
  Newspaper, 
  Home as HomeIcon, 
  MessageSquare, 
  TrendingUp, 
  Book,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  BarChart,
  Search,
  Shield,
  ShoppingCart,
  Newspaper,
  Home: HomeIcon,
  MessageSquare,
  TrendingUp,
  Book
};

async function getProjects(): Promise<Project[]> {
  const db = getDb();
  return db.prepare("SELECT * FROM projects ORDER BY featured DESC, created_at DESC").all() as Project[];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Engineering the <span className="text-primary">Intelligence</span> of Tomorrow.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Online360 is a software lab dedicated to building high-impact tools 
              in Data Visualization, AI Visibility, and Regulatory Compliance. 
              We turn complex data into actionable intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#projects" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center group"
              >
                View Our Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#about" 
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold hover:bg-secondary/80 transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -u-translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Digital Transformation, <br />Simplified.</h2>
            <p className="text-muted-foreground mb-6">
              At Online360, we believe that software should be powerful yet accessible. 
              Our suite of applications covers everything from local SEO visibility 
              to enterprise-level data dashboards and legal compliance.
            </p>
            <ul className="space-y-4">
              {[
                "AI-Driven Insights for Local Businesses",
                "Scalable Data Visualization Pipelines",
                "Automated Regulatory Compliance Tools",
                "E-commerce Readiness for AI Agents"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-muted rounded-2xl flex items-center justify-center p-8 text-center flex-col">
              <span className="text-4xl font-bold mb-2">9+</span>
              <span className="text-sm text-muted-foreground font-medium">Active Projects</span>
            </div>
            <div className="h-48 bg-primary/10 rounded-2xl flex items-center justify-center p-8 text-center flex-col text-primary">
              <span className="text-4xl font-bold mb-2">100%</span>
              <span className="text-sm font-medium">Self-Hosted</span>
            </div>
            <div className="h-48 bg-muted rounded-2xl flex items-center justify-center p-8 text-center flex-col md:translate-y-8">
              <span className="text-4xl font-bold mb-2">AI</span>
              <span className="text-sm text-muted-foreground font-medium">First Approach</span>
            </div>
            <div className="h-48 bg-muted rounded-2xl flex items-center justify-center p-8 text-center flex-col md:translate-y-8">
              <span className="text-4xl font-bold mb-2">v2.0</span>
              <span className="text-sm text-muted-foreground font-medium">Modern Stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 scroll-mt-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Ecosystem</h2>
          <p className="text-muted-foreground">A collection of specialized tools built by Online360.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = iconMap[project.icon_name] || BarChart;
            return (
              <div 
                key={project.id} 
                className={`group border rounded-3xl p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 ${project.featured ? 'bg-primary/[0.02] border-primary/20 shadow-sm' : 'bg-background'}`}
              >
                <div>
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${project.featured ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    {project.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-4">{project.category}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>
                <Link 
                  href={project.url} 
                  target="_blank"
                  className="inline-flex items-center font-semibold text-sm hover:gap-2 transition-all gap-1.5"
                >
                  Visit Application <ExternalLink size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let&apos;s build something together.</h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Have questions about our projects or interested in a collaboration? 
              Reach out to our team at Online360.
            </p>
            <Link 
              href="mailto:hello@online360.org" 
              className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-colors inline-block"
            >
              Get in Touch
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
      </section>
    </div>
  );
}
