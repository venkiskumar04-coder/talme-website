import { Link } from "react-router-dom";
import { servicePagesData } from "../data/servicePagesData";
import { serviceHubSections } from "../data/serviceHubData";
import { insightsData } from "../data/insightsData";
import "./SiteMapPage.css";

const primaryPages = [
  { label: "Home", to: "/" },
  { label: "About TALME", to: "/about" },
  { label: "News & Events", to: "/news-events" },
  { label: "Insights", to: "/insights" },
  { label: "Our Clients", to: "/our-clients" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

function SiteMapPage() {
  return (
    <main className="site-map-page">
      <section className="site-map-hero">
        <p className="site-map-eyebrow">Search Optimization</p>
        <h1>Site Map</h1>
        <p>
          Browse all core TALME pages, services, insights, and contact routes from
          one crawl-friendly page.
        </p>
      </section>

      <section className="site-map-grid">
        <article className="site-map-card">
          <h2>Company</h2>
          <div className="site-map-links">
            {primaryPages.map((page) => (
              <Link key={page.to} to={page.to}>
                {page.label}
              </Link>
            ))}
          </div>
        </article>

        <article className="site-map-card">
          <h2>Core Services</h2>
          <div className="site-map-links">
            {Object.entries(servicePagesData).map(([slug, service]) => (
              <Link key={slug} to={`/services/${slug}`}>
                {service.title}
              </Link>
            ))}
          </div>
        </article>

        {serviceHubSections.map((section) => (
          <article className="site-map-card" key={section.heading}>
            <h2>{section.heading}</h2>
            <div className="site-map-links">
              {section.items.map((item) => (
                <Link
                  key={item.slug}
                  to={item.path || `/service-hub/${item.slug}`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </article>
        ))}

        <article className="site-map-card">
          <h2>Insights</h2>
          <div className="site-map-links">
            {insightsData.map((insight) => (
              <Link key={insight.slug} to={`/insights/${insight.slug}`}>
                {insight.title}
              </Link>
            ))}
          </div>
        </article>

        <article className="site-map-card">
          <h2>Locations</h2>
          <div className="site-map-links">
            <Link to="/contact/india">India Office</Link>
            <Link to="/contact/singapore">Singapore Office</Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default SiteMapPage;
