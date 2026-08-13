import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { ProjectIntro } from "@/components/experiences/ProjectIntro";
import { ProjectOutro } from "@/components/experiences/ProjectOutro";
import { MobileExperience } from "@/components/experiences/MobileExperience";
import { WebExperience } from "@/components/experiences/WebExperience";
import { CertificateExhibition } from "@/components/certificates/CertificateExhibition";
import { CertificateOutro } from "@/components/certificates/CertificateOutro";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <div id="work" className="relative scroll-mt-24">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectIntro project={project} />
            {project.type === "mobile" ? (
              <MobileExperience project={project} />
            ) : (
              <WebExperience project={project} />
            )}
            <ProjectOutro project={project} />
          </div>
        ))}
      </div>

      <About />
      <Capabilities />
      <CertificateExhibition />
      <CertificateOutro />
      <Contact />
      <Footer />
    </main>
  );
}
