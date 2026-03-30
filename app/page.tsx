import { Cursor } from "@/components/cursor"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { Ticker } from "@/components/sections/ticker"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Clients } from "@/components/sections/clients"
import { Works } from "@/components/sections/works"
import { Quote } from "@/components/sections/quote"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Clients />
        <Works />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
