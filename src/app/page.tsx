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
  ExternalLink,
  Cpu,
  Layers,
  Globe,
  Zap
} from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

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

const SERVICES = [
  {
    name: "AI & Intelligence",
    description: "We build and integrate specialized AI models to help businesses automate audits, improve visibility, and generate actionable insights.",
    icon: Cpu
  },
  {
    name: "Data Visualization",
    description: "Turning massive datasets into intuitive, interactive dashboards. We help you see the story behind your data.",
    icon: BarChart
  },
  {
    name: "Compliance Tech",
    description: "Navigating complex regulations like the EU AI Act. Our tools ensure your AI deployments are transparent and legal.",
    icon: Shield
  },
  {
    name: "Custom Software",
    description: "High-performance web applications built with the latest technologies, designed to scale with your business needs.",
    icon: Layers
  }
];

async function getProjects(): Promise<Project[]> {
  const db = getDb();
  return db.prepare("SELECT * FROM projects ORDER BY featured DESC, created_at DESC").all() as Project[];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} /> New: Disclosely EU AI Act Kit Live
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-none">
              Engineering the <span className="text-primary italic">Intelligence</span> of Tomorrow.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Online360 is a software lab dedicated to building high-impact tools 
              in Data Visualization, AI Visibility, and Regulatory Compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="#projects" 
                className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center group text-lg shadow-lg shadow-primary/20"
              >
                Our Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#services" 
                className="bg-secondary text-secondary-foreground px-10 py-5 rounded-full font-bold hover:bg-secondary/80 transition-all text-lg"
              >
                Services
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Services Section */}
      <section id="services" className="bg-muted/30 py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Expertise & Solutions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We specialize in the intersection of data and intelligence. 
              Our labs produce tools that solve real-world problems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.name} className="bg-background border rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 tracking-tight">Digital Transformation, <br /><span className="text-primary italic">Simplified.</span></h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At Online360, we believe that software should be powerful yet accessible. 
              Our suite of applications covers everything from local SEO visibility 
              to enterprise-level data dashboards and legal compliance.
            </p>
            <div className="space-y-6">
              {[
                { title: "AI-Driven Insights", desc: "Automated auditing and visibility scoring." },
                { title: "Scalable Data Pipelines", desc: "Built to handle millions of data points." },
                { title: "Regulatory Tech", desc: "Making compliance easy and transparent." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-56 bg-primary/[0.03] border border-primary/10 rounded-[2.5rem] flex items-center justify-center p-8 text-center flex-col shadow-sm">
              <span className="text-5xl font-bold mb-2 text-primary">9+</span>
              <span className="text-sm text-muted-foreground font-semibold uppercase tracking-widest">Active Projects</span>
            </div>
            <div className="h-56 bg-muted/40 rounded-[2.5rem] flex items-center justify-center p-8 text-center flex-col md:translate-y-12">
              <span className="text-5xl font-bold mb-2">100%</span>
              <span className="text-sm text-muted-foreground font-semibold uppercase tracking-widest">Self-Hosted</span>
            </div>
            <div className="h-56 bg-muted/40 rounded-[2.5rem] flex items-center justify-center p-8 text-center flex-col">
              <span className="text-5xl font-bold mb-2">AI</span>
              <span className="text-sm text-muted-foreground font-semibold uppercase tracking-widest">First Approach</span>
            </div>
            <div className="h-56 bg-primary text-primary-foreground rounded-[2.5rem] flex items-center justify-center p-8 text-center flex-col md:translate-y-12 shadow-xl shadow-primary/20">
              <span className="text-5xl font-bold mb-2">v2.0</span>
              <span className="text-sm font-semibold uppercase tracking-widest opacity-80">Modern Stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 scroll-mt-24">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-foreground">Our Portfolio</h2>
            <p className="text-muted-foreground text-lg italic">A collection of specialized tools built by Online360.</p>
          </div>
          <Link href="https://github.com/online360llc" target="_blank" className="flex items-center gap-2 text-primary font-bold hover:underline">
            Explore Open Source <ExternalLink size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const Icon = iconMap[project.icon_name] || BarChart;
            return (
              <div 
                key={project.id} 
                className={`group border rounded-[2.5rem] p-10 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-2 ${project.featured ? 'bg-primary/[0.02] border-primary/20 shadow-sm' : 'bg-background'}`}
              >
                <div>
                  <div className={`h-16 w-14 rounded-2xl flex items-center justify-center mb-8 transition-all ${project.featured ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <Icon size={32} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    {project.featured && (
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 text-primary rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary font-bold uppercase tracking-widest mb-6 opacity-70">{project.category}</p>
                  <p className="text-muted-foreground leading-relaxed mb-10 text-base">
                    {project.description}
                  </p>
                </div>
                <Link 
                  href={project.url} 
                  target="_blank"
                  className={`inline-flex items-center font-bold text-base transition-all gap-2 ${project.featured ? 'text-primary' : 'text-foreground'}`}
                >
                  Visit Application <ExternalLink size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 scroll-mt-24 pt-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Let&apos;s Build Together</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question about our projects or want to discuss a new idea? 
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
