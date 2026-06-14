"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    setIsPending(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({ type: "success", text: result.success });
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="bg-background border rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold ml-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-5 py-3 rounded-2xl bg-muted/50 border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold ml-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-5 py-3 rounded-2xl bg-muted/50 border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold ml-1">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-5 py-3 rounded-2xl bg-muted/50 border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          />
        </div>

        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
