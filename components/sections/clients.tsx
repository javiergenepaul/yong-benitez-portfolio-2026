import { Reveal } from "@/components/reveal"

const clients = [
  {
    initials: "BN",
    name: "BMP Network",
    sub: "Real Estate Team",
    desc: "Social media management, content creation, and audience engagement for a real estate team leveraging technology.",
    tag: "Real Estate",
    tagCls: "bg-primary/10 text-primary",
    avatarBg: "bg-navy",
  },
  {
    initials: "SS",
    name: "Savage Sales",
    sub: "Online Review & Video Services",
    desc: "Online review management and video editing services to enhance reputation and drive engagement.",
    tag: "Digital Marketing",
    tagCls: "bg-purple-500/10 text-purple-400",
    avatarBg: "bg-purple-700",
  },
  {
    initials: "RM",
    name: "Robin Michael",
    sub: "Realtor – Your Home Sold Guaranteed",
    desc: "Digital marketing, social media presence, strategy development, content creation, and data analysis.",
    tag: "Real Estate",
    tagCls: "bg-teal-500/10 text-teal-400",
    avatarBg: "bg-teal-700",
  },
  {
    initials: "CL",
    name: "Coach Me Laura",
    sub: "Notary Coach – California",
    desc: "Social media platforms management and captivating video content — curation, platform optimization, editing.",
    tag: "Coaching",
    tagCls: "bg-primary/10 text-primary",
    avatarBg: "bg-primary",
  },
  {
    initials: "OC",
    name: "Outcamping UK",
    sub: "Camping Business",
    desc: "Social media presence with engaging content and marketing strategies for the outdoor community.",
    tag: "E-Commerce",
    tagCls: "bg-blue-500/10 text-blue-400",
    avatarBg: "bg-blue-700",
  },
  {
    initials: "TS",
    name: "Talking Shift w/ Craig",
    sub: "Podcast",
    desc: "Podcast production support — episode planning, editing, publishing, and audience engagement.",
    tag: "Podcasting",
    tagCls: "bg-violet-500/10 text-violet-400",
    avatarBg: "bg-violet-700",
  },
  {
    initials: "AH",
    name: "American Air HVAC",
    sub: "HVAC Company",
    desc: "General VA — administrative support, data entry, and inbound/outbound call handling for daily operations.",
    tag: "HVAC / Services",
    tagCls: "bg-red-500/10 text-red-400",
    avatarBg: "bg-red-800",
  },
  {
    initials: "PC",
    name: "Procore Inc",
    sub: "Construction Tech",
    desc: "Admin tasks, data entry, and research to support business operations — organized, efficient, and digitally strong.",
    tag: "Tech / Construction",
    tagCls: "bg-slate-500/10 text-slate-400",
    avatarBg: "bg-slate-600",
  },
]

export function Clients() {
  return (
    <section id="clients" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            Work Experience
          </p>
          <h2 className="text-4xl font-black text-foreground">
            Clients I&apos;ve <span className="text-primary">served.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 30}>
              <div className="card-hover bg-card border border-border rounded-2xl p-6 group h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full ${c.avatarBg} flex items-center justify-center text-white text-sm font-black shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    {c.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{c.name}</div>
                    <div className="text-xs text-foreground/30">{c.sub}</div>
                  </div>
                </div>
                <p className="text-xs text-foreground/40 leading-relaxed">{c.desc}</p>
                <span
                  className={`inline-block mt-3 text-[10px] font-bold ${c.tagCls} px-2.5 py-1 rounded-lg`}
                >
                  {c.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
