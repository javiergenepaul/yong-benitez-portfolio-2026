"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: "✉",
    label: "benitezyong@gmail.com",
    sub: "Email me anytime",
  },
  {
    icon: "📍",
    label: "Philippines",
    sub: "Remote worldwide",
  },
  {
    icon: "🟢",
    label: "Open to projects",
    sub: "Available now",
  },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl font-black text-foreground mb-6">
            Ready to <span className="text-primary">collaborate?</span>
          </h2>
          <p className="text-base text-foreground/40 leading-relaxed mb-8">
            Whether you need scroll-stopping video edits, stunning photo content, or a full
            social media strategy — I&apos;m ready. Let&apos;s talk!
          </p>
          <div className="space-y-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-base group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{c.label}</div>
                  <div className="text-xs text-foreground/30">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={200}>
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                Service Needed
              </label>
              <input
                type="text"
                placeholder="e.g. Video Editing, Social Media"
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors resize-y"
              />
            </div>
            <Button
              onClick={() => setSent(true)}
              className={`w-full py-3.5 h-auto rounded-xl font-bold text-sm transition-colors ${
                sent ? "bg-green-600 hover:bg-green-600" : ""
              }`}
              disabled={sent}
            >
              {sent ? "Message Sent ✓" : "Send Message →"}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
