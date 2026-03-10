import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { insightsData } from "../data/insightsData";
import { servicePagesData } from "../data/servicePagesData";
import { serviceHubDetails } from "../data/serviceHubData";

const SITE_URL = "https://talme.in";

const defaultMeta = {
  title: "Talme Technologies Pvt Ltd | Engineering Services",
  description:
    "Talme Technologies provides engineering services, IT consulting, and staffing solutions for global enterprises.",
  keywords:
    "Talme Technologies, engineering services, IT consulting, staffing solutions, automotive engineering, digital transformation",
};

const staticRouteMeta = {
  "/": {
    title: "Talme Technologies Pvt Ltd | Engineering Services",
    description:
      "Talme Technologies provides engineering services, IT consulting, and staffing solutions for global enterprises.",
  },
  "/services": {
    title: "Services | Talme Technologies",
    description:
      "Explore Talme Technologies engineering, staffing, consulting, and digital services designed for measurable business outcomes.",
  },
  "/business-solutions": {
    title: "Business Solutions | Talme Technologies",
    description:
      "Talme Technologies offers business solutions including digital transformation, consulting, and enterprise IT services.",
  },
  "/staff-augmentation": {
    title: "Staff Augmentation Services | Talme Technologies",
    description:
      "Talme Technologies provides staff augmentation services to help organizations hire top engineering and IT talent.",
  },
  "/information-technology-services": {
    title: "Information Technology Services | Talme Technologies",
    description:
      "Talme Technologies provides IT services including software development, cloud solutions, system integration and enterprise consulting.",
  },
  "/engineering-solutions": {
    title: "Engineering Solutions | Talme Technologies",
    description:
      "Talme Technologies delivers engineering solutions across product design, validation, and lifecycle optimization.",
  },
  "/product-manufacturing": {
    title: "Product Manufacturing | Talme Technologies",
    description:
      "Talme Technologies supports product manufacturing with quality-focused execution, traceability, and process optimization.",
  },
  "/oem-data": {
    title: "OEM Data Services | Talme Technologies",
    description:
      "Talme Technologies provides OEM-focused engineering and manufacturing support for better control, quality, and speed.",
  },
  "/health-care-services": {
    title: "Health Care Services | Talme Technologies",
    description:
      "Talme Technologies offers healthcare services focused on process quality, compliance, and operational continuity.",
  },
  "/automotive-data": {
    title: "Automotive Data Services | Talme Technologies",
    description:
      "Talme Technologies provides automotive engineering and data-enabled services to support delivery quality and speed.",
  },
  "/computer-technology": {
    title: "Computer Technology Services | Talme Technologies",
    description:
      "Talme Technologies offers computer technology services including application engineering and digital platform support.",
  },
  "/clients": {
    title: "Our Clients | Talme Technologies",
    description:
      "See how Talme Technologies supports clients with engineering, staffing, and business transformation services.",
  },
  "/legal": {
    title: "Legal | Talme Technologies",
    description:
      "Read legal information, terms, and policy details for Talme Technologies Pvt Ltd.",
  },
  "/about-us": {
    title: "About Us | Talme Technologies",
    description:
      "Talme Technologies Pvt Ltd is a trusted engineering and IT services company providing staffing, consulting and digital transformation solutions.",
  },
  "/managed-services": {
    title: "Managed Services | Talme Technologies",
    description:
      "Talme Technologies managed services improve process reliability, visibility, and scalable business delivery.",
  },
  "/assurance": {
    title: "Assurance Services | Talme Technologies",
    description:
      "Talme Technologies assurance services strengthen governance, controls, and operational confidence.",
  },
  "/business-services": {
    title: "Business Services | Talme Technologies",
    description:
      "Talme Technologies business services optimize operations with control-focused, KPI-driven delivery models.",
  },
  "/people-practice": {
    title: "People Practice | Talme Technologies",
    description:
      "Talme Technologies people practice solutions support hiring, HR operations, and workforce governance.",
  },
  "/about": {
    title: "About TALME | Talme Technologies",
    description:
      "Learn about Talme Technologies, our engineering-led recruitment services, and our global delivery capabilities.",
  },
  "/client-accounting": {
    title: "Client Accounting Services | Talme Technologies",
    description:
      "Talme Technologies client accounting services improve finance controls, reporting speed, and compliance quality.",
  },
  "/careers": {
    title: "Careers | Talme Technologies",
    description:
      "Explore career opportunities at Talme Technologies across engineering, consulting, and digital domains.",
  },
  "/insights": {
    title: "Insights | Talme Technologies",
    description:
      "Read Talme Technologies insights on engineering talent, operations, and digital transformation.",
  },
  "/our-clients": {
    title: "Our Clients | Talme Technologies",
    description:
      "See how Talme Technologies supports client growth through engineering, IT, and business services.",
  },
  "/contact": {
    title: "Contact Us | Talme Technologies",
    description:
      "Contact Talme Technologies for engineering services, IT consulting, and staffing solutions.",
  },
  "/contact-us": {
    title: "Contact Us | Talme Technologies",
    description:
      "Reach Talme Technologies for project inquiries, partnerships, and service consultations.",
  },
};

function setMetaAttribute(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setLinkTag(selector, rel, href) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function getDynamicRouteMeta(pathname) {
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "");
    const service = servicePagesData[slug];
    if (service) {
      return {
        title: `${service.title} | Talme Technologies`,
        description: service.intro,
      };
    }
  }

  if (pathname.startsWith("/service-hub/")) {
    const slug = pathname.replace("/service-hub/", "");
    const service = serviceHubDetails[slug];
    if (service) {
      return {
        title: `${service.title} | Talme Technologies`,
        description: service.summary,
      };
    }
  }

  if (pathname.startsWith("/insights/")) {
    const slug = pathname.replace("/insights/", "");
    const insight = insightsData.find((item) => item.slug === slug);
    if (insight) {
      return {
        title: `${insight.title} | Talme Insights`,
        description: insight.description,
      };
    }
  }

  if (pathname.startsWith("/contact/")) {
    return {
      title: "Contact Location | Talme Technologies",
      description:
        "Contact Talme Technologies for location-specific support and service inquiries.",
    };
  }

  return null;
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = normalizePathname(location.pathname);
    const routeMeta =
      staticRouteMeta[pathname] || getDynamicRouteMeta(pathname) || defaultMeta;
    const title = routeMeta.title || defaultMeta.title;
    const description = routeMeta.description || defaultMeta.description;
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    document.title = title;
    setMetaAttribute('meta[name="description"]', "name", "description");
    setMetaAttribute('meta[name="description"]', "content", description);
    setMetaAttribute('meta[name="keywords"]', "name", "keywords");
    setMetaAttribute('meta[name="keywords"]', "content", defaultMeta.keywords);

    setMetaAttribute('meta[property="og:title"]', "property", "og:title");
    setMetaAttribute('meta[property="og:title"]', "content", title);
    setMetaAttribute(
      'meta[property="og:description"]',
      "property",
      "og:description"
    );
    setMetaAttribute('meta[property="og:description"]', "content", description);
    setMetaAttribute('meta[property="og:url"]', "property", "og:url");
    setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
    setMetaAttribute('meta[property="og:site_name"]', "property", "og:site_name");
    setMetaAttribute(
      'meta[property="og:site_name"]',
      "content",
      "Talme Technologies"
    );
    setMetaAttribute('meta[property="og:type"]', "property", "og:type");
    setMetaAttribute('meta[property="og:type"]', "content", "website");

    setMetaAttribute('meta[name="twitter:card"]', "name", "twitter:card");
    setMetaAttribute('meta[name="twitter:card"]', "content", "summary");
    setMetaAttribute('meta[name="twitter:title"]', "name", "twitter:title");
    setMetaAttribute('meta[name="twitter:title"]', "content", title);
    setMetaAttribute(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description"
    );
    setMetaAttribute('meta[name="twitter:description"]', "content", description);

    setLinkTag('link[rel="canonical"]', "canonical", canonicalUrl);
  }, [location.pathname]);

  return null;
}

export default SeoManager;
