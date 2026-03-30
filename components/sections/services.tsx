import { Reveal } from "@/components/reveal"

const services = [
  {
    emoji: "🎬",
    title: "Video Editing",
    desc: "Color grading, cuts, transitions, captions, and post-production that makes your content pop on any platform.",
    tags: ["Reels", "YouTube", "TikTok"],
    accent: "primary",
    tagCls: "bg-primary/10 text-primary",
    gradientCls: "group-hover:from-primary/5",
    iconBg: "bg-primary/10 border-primary/20",
    iconCls: "text-primary",
  },
  {
    emoji: "📸",
    title: "Photo Editing",
    desc: "Retouching, color correction, and graphic design to create visuals that reflect your brand's identity.",
    tags: ["Canva", "Retouching", "Branding"],
    accent: "purple",
    tagCls: "bg-purple-500/10 text-purple-400",
    gradientCls: "group-hover:from-purple-500/5",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconCls: "text-purple-400",
  },
  {
    emoji: "📱",
    title: "Social Media Marketing",
    desc: "Strategy, content calendars, posting, engagement, and analytics to grow your audience and drive results.",
    tags: ["Instagram", "Facebook", "LinkedIn"],
    accent: "blue",
    tagCls: "bg-blue-500/10 text-blue-400",
    gradientCls: "group-hover:from-blue-500/5",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconCls: "text-blue-400",
  },
  {
    emoji: "🎙️",
    title: "Podcast & VA Support",
    desc: "Episode production, admin tasks, data entry, and operational support to keep your business running smoothly.",
    tags: ["Editing", "Admin", "Publishing"],
    accent: "green",
    tagCls: "bg-green-500/10 text-green-400",
    gradientCls: "group-hover:from-green-500/5",
    iconBg: "bg-green-500/10 border-green-500/20",
    iconCls: "text-green-400",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            What I Offer
          </p>
          <h2 className="text-4xl font-black text-foreground">
            Services that <span className="shimmer-text">convert.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="card-hover bg-card border border-border rounded-2xl p-7 group cursor-default relative overflow-hidden h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${s.gradientCls} transition-all duration-500`}
                />
                <div
                  className={`w-12 h-12 rounded-2xl ${s.iconBg} border flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {s.emoji}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] font-bold ${s.tagCls} px-2 py-0.5 rounded-md`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
