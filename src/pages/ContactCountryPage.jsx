import { Link, useParams } from "react-router-dom";
import "./ContactCountryPage.css";

const contactByCountry = {
  india: {
    title: "India Office",
    cityLabel: "India",
    intro: "Better yet, see us in person!",
    address:
      "No.24, Vital Mallya Road, Level 14, Concorde Towers, UB City, Bangalore, Karnataka 560001, India.",
    hours: "Open today 09:00 am - 05:00 pm",
    directions: "https://maps.google.com/?q=UB+City+Bangalore",
    mapSrc:
      "https://maps.google.com/maps?q=UB%20City%20Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  singapore: {
    title: "Singapore Office",
    cityLabel: "Singapore",
    intro: "Better yet, see us in person!",
    address: "8 Marina Blvd, Singapore 018981.",
    hours: "Open today 09:00 am - 05:00 pm",
    directions: "https://maps.google.com/?q=8+Marina+Blvd+Singapore+018981",
    mapSrc:
      "https://maps.google.com/maps?q=8%20Marina%20Blvd%20Singapore%20018981&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
};

function ContactCountryPage() {
  const { country = "" } = useParams();
  const office = contactByCountry[country.toLowerCase()];

  if (!office) {
    return (
      <main className="country-contact-page">
        <section className="country-contact-container not-found">
          <h1>Location Not Found</h1>
          <p>Please choose India or Singapore from GLOBAL.</p>
          <Link to="/contact" className="country-back-link">
            Back to Contact
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="country-contact-page">
      <section className="country-contact-container">
        <header className="country-contact-header">
          <h1>{office.title}</h1>
          <p>Premium contact support for enterprise and growth-stage clients.</p>
        </header>

        <div className="country-contact-card">
          <div className="country-contact-details">
            <h2>Contact Us</h2>
            <h3>{office.cityLabel}</h3>
            <p className="country-intro">{office.intro}</p>
            <p>{office.address}</p>
            <p className="country-hours">{office.hours}</p>
            <a href={office.directions} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </div>

          <div className="country-contact-map-wrap">
            <iframe
              title={`${office.cityLabel} office map`}
              src={office.mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="country-contact-map"
            />
          </div>
        </div>

        <Link to="/contact" className="country-back-link">
          Back to All Locations
        </Link>
      </section>
    </main>
  );
}

export default ContactCountryPage;
