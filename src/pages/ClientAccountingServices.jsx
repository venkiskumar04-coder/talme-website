import { useState } from "react";
import "./ClientAccountingServices.css";

function ClientAccountingServices() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="cas-premium-page">
      <section className="cas-premium-header">
        <div>
          <h1>Client Accounting Services</h1>
          <p>
            Modern accounting support built to strengthen control, accelerate
            reporting, and give leadership clear financial visibility.
          </p>
        </div>
      </section>

      <section className="cas-feature-band">
        <img
          src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Client accounting collaboration"
        />
        <article className="cas-feature-panel">
          <p>
            We design finance operations that are accurate, scalable, and ready
            for growth through process discipline and smart automation.
          </p>
        </article>
      </section>

      <section className="cas-content-grid">
        <article className="cas-quote-card">
          <span className="cas-quote-mark">\"</span>
          <p>
            We assess the current finance workflow end to end, identify control
            gaps and reporting bottlenecks, and rebuild the model around
            stronger governance, cleaner data, and measurable performance.
          </p>
        </article>

        <aside className="cas-updates-card">
          <h4>Updates</h4>
          <h5>Finance Operations Reimagined for Better Visibility</h5>
          <p>
            A well-structured accounting function improves turnaround time,
            strengthens compliance readiness, and supports more confident
            decision-making.
          </p>
          {showMore && (
            <div className="cas-updates-more">
              <p>
                Our delivery model aligns people, process, and systems so
                finance teams can operate with consistency and control.
              </p>
              <ul>
                <li>Process standardization across accounting workflows</li>
                <li>Control and compliance monitoring support</li>
                <li>Documentation, review cycles, and policy alignment</li>
              </ul>
            </div>
          )}
          <button
            type="button"
            className="cas-read-more"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </aside>
      </section>

      <section className="cas-sections">
        <article>
          <h2>Our Approach</h2>
          <p>
            We combine accounting expertise, workflow optimization, and digital
            enablement to create finance operations that are transparent,
            reliable, and built to scale.
          </p>
        </article>

        <article>
          <h2>Scope of Engagement</h2>
          <ul>
            <li>Procure to Pay management and vendor accounting</li>
            <li>Order to Cash operations, billing, and collections</li>
            <li>Record to Report, reconciliations, and closing support</li>
            <li>Compliance, audit readiness, and regulatory coordination</li>
          </ul>
        </article>

        <article>
          <h2>Why TALME</h2>
          <ul>
            <li>Control-led delivery with clear accountability</li>
            <li>Scalable support for growing and complex businesses</li>
            <li>Faster reporting cycles with better data discipline</li>
            <li>Practical finance insights that support business decisions</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default ClientAccountingServices;
