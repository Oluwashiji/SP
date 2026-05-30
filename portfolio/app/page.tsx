import portfolioData from "@/data/portfolio.json";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <LoadingScreen />
      <Nav />
      <main>
        <Hero />
        <About data={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects as any} />
        <Experience experience={portfolioData.experience} />
        <Research research={portfolioData.research} />
        <Contact personal={portfolioData.personal} />
      </main>
      <Footer />
    </>
  );
}
