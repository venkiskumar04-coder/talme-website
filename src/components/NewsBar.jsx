import { Link } from "react-router-dom";
import "./NewsBar.css";

function NewsBar() {
  return (
    <section className="news-bar" aria-label="News and events">
      <div className="news-bar-inner">
        <Link to="/news-events" className="news-bar-label">
          News &amp; Events
        </Link>
      </div>
    </section>
  );
}

export default NewsBar;
