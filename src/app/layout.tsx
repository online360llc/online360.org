import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online360 | Building the Future of AI & Data",
  description: "Innovative software solutions for data, AI, and digital transformation.",
};

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
        <footer className="border-t py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">ONLINE360</h3>
                <p className="text-muted-foreground text-sm">
                  We build tools that empower businesses through data visualization, 
                  AI-driven insights, and seamless digital compliance.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="#projects" className="hover:text-primary transition-colors">Our Projects</Link></li>
                  <li><Link href="https://online360.org" className="hover:text-primary transition-colors">Company Page</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: hello@online360.org</li>
                  <li>Twitter: @online360llc</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Online360 LLC. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
