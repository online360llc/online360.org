import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Github } from "lucide-react";

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
        url: "/og-image.png", // We'll assume a standard OG image path
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

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/online360.org", icon: Facebook },
  { name: "X", href: "https://x.com/online360llc", icon: Twitter },
  { name: "YouTube", href: "https://www.youtube.com/@online360llc", icon: Youtube },
  { name: "Instagram", href: "https://www.instagram.com/online360llc/", icon: Instagram },
  { name: "GitHub", href: "https://github.com/online360llc", icon: Github },
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
                  <li><Link href="https://github.com/online360llc" target="_blank" className="hover:text-primary transition-colors">Open Source</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h3>
                <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                  <li>Email: hello@online360.org</li>
                  <li>Location: Miami, FL</li>
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
