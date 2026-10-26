import { projects } from "@/content/portfolio";
import { ProjectCard } from "../project-card";
import { StarLink } from "../star-link";
export function ProjectShowcase({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section id="selected-work" className="portfolio-space project-showcase">
      <div className="experience-container">
        <div className="section-index">
          <span>02 / SELECTED WORK</span>
          <span>THREE DISTINCT DIGITAL EXPERIENCES</span>
        </div>
        {!standalone && (
          <div className="section-title-row">
            <h2 className="experience-h2">
              Distinct brands. Thoughtful builds.
            </h2>
            <p>Property, fashion and commerce. Explore the work.</p>
          </div>
        )}
        <div className="project-showcase-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="portfolio-space-footer">
          <span>Explore each website and its interface.</span>
          <StarLink href="/contact" variant="quiet">
            Let’s talk about your project ↗
          </StarLink>
        </div>
      </div>
    </section>
  );
}
