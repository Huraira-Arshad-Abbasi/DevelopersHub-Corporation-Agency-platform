import About from "@/components/user/About";
import Booking from "@/components/user/Booking";
import Contact from "@/components/user/Contact";
import Hero from "@/components/user/Hero";
import Portfolio from "@/components/user/Portfolio";
import Services from "@/components/user/Services";

export default function home() {
  return (
    <div>
      <Hero/>
      
      <About/>
    
      <Services/>
      <hr />
      <Portfolio/>
      <hr />
      <Booking/>
      <hr />
      <Contact/>
    </div>
  )
}
