import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://online360.org'),
  title: {
    default: "Online360 | Building the Future of AI & Data",
    template: "%s | Online360"
  },
  description: "Innovative software solutions for data visualization, AI visibility, and digital compliance. We build tools that turn complex data into actionable intelligence.",
  keywords: ["Online360", "Software Engineering", "AI Visibility", "Data Visualization", "Compliance SaaS", "Next.js", "AI Tools"],
  authors: [{ name: "Online360 Team" }],
  creator: "Online360 LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://online360.org",
    siteName: "Online360",
    title: "Online360 | Building the Future of AI & Data",
    description: "Innovative software solutions for data visualization, AI visibility, and digital compliance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Online360 - Software Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online360 | Building the Future of AI & Data",
    description: "Innovative software solutions for data visualization, AI visibility, and digital compliance.",
    creator: "@online360llc",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Social Icons as simple SVGs since Lucide removed them
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3.5 1.5a10.8 10.8 0 0 0-5 0C7 2 6 2 6 2c-.28 1.15-.28 2.35 0 3.5-1 1-1.35 2.24-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/online360.org", icon: FacebookIcon },
  { name: "X", href: "https://x.com/online360llc", icon: TwitterIcon },
  { name: "YouTube", href: "https://www.youtube.com/@online360llc", icon: YoutubeIcon },
  { name: "Instagram", href: "https://www.instagram.com/online360llc/", icon: InstagramIcon },
  { name: "GitHub", href: "https://github.com/online360llc", icon: GithubIcon },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tighter">ONLINE360</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="#about" className="hover:text-primary transition-colors">About</Link>
              <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
              <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 mr-2">
                {SOCIAL_LINKS.filter(s => s.name !== "GitHub").map((social) => (
                  <Link key={social.name} href={social.href} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    <social.icon size={18} />
                  </Link>
                ))}
              </div>
              <Link 
                href="https://github.com/online360llc" 
                target="_blank" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <h3 className="font-bold text-xl mb-6 tracking-tighter">ONLINE360</h3>
                <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
                  We build tools that empower businesses through data visualization, 
                  AI-driven insights, and seamless digital compliance. Our focus is 
                  on engineering the intelligence of tomorrow.
                </p>
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <Link key={social.name} href={social.href} target="_blank" className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-all shadow-sm" aria-label={social.name}>
                      <social.icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h3>
                <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                  <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="#projects" className="hover:text-primary transition-colors">Our Portfolio</Link></li>
                  <li><Link href="https://github.com/online360llc" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
                    <GithubIcon size={14} /> Open Source
                  </Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h3>
                <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                  <li className="flex items-center gap-2"><Mail size={14} /> hello@online360.org</li>
                  <li className="flex items-center gap-2"><MapPin size={14} /> Miami, FL</li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Online360 LLC. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
