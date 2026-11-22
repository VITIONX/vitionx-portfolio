import { services, servicesIntro } from "../data/services-data";

/**
 * The "MY SERVICES / What I do" block with all service cards.
 * Rendered by the home page AND the /services page, so the markup and the
 * content (data/services-data.ts) are written only once.
 */
export default function ServicesContent() {
  return (
    <>
      <p className="section-label">{servicesIntro.label}</p>

      <h2>{servicesIntro.heading}</h2>

      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="service-card-content">
              <h3>{service.title}</h3>

              <p>{service.description}</p>
            </div>

            <span className="service-arrow">↗</span>
          </article>
        ))}
      </div>
    </>
  );
}
