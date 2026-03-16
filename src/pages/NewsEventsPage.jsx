import { useEffect, useState } from "react";
import { newsData } from "../data/newsData";
import "./NewsEventsPage.css";

const ADMIN_STORAGE_KEY = "talme-news-admin-key";

async function readJsonResponse(response, fallbackMessage) {
  const rawResponse = await response.text();

  if (!rawResponse) {
    return { error: fallbackMessage };
  }

  try {
    return JSON.parse(rawResponse);
  } catch {
    return { error: fallbackMessage };
  }
}

function NewsEventsPage({ adminMode = false }) {
  const today = new Date().toISOString().slice(0, 10);
  const [newsItems, setNewsItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
  const [adminKey, setAdminKey] = useState(
    () => window.localStorage.getItem(ADMIN_STORAGE_KEY) || ""
  );
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(adminMode);
  const [isDeletingId, setIsDeletingId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    isoDate: today,
  });

  useEffect(() => {
    const loadNews = async () => {
      setStatus("loading");
      setErrorMessage("");
      setNoticeMessage("");

      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          const result = await readJsonResponse(
            response,
            "Unable to load shared news."
          );
          throw new Error(result.error || "Unable to load shared news.");
        }

        const items = await readJsonResponse(response, "Unable to load shared news.");
        if (!Array.isArray(items)) {
          throw new Error("Unable to load shared news.");
        }

        setNewsItems(items);
        setStatus("ready");
      } catch (error) {
        if (!adminMode && newsData.length > 0) {
          setNewsItems(newsData);
          setStatus("ready");
          setNoticeMessage(
            "Live news service is temporarily unavailable. Showing the latest published updates."
          );
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to connect to the news service."
        );
      }
    };

    loadNews();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    const key = adminPassword.trim();
    if (!key) return;

    try {
      const response = await fetch("/api/news", {
        headers: {
          "x-admin-key": key,
        },
      });

      const result = await readJsonResponse(response, "Invalid admin key.");
      if (!response.ok) {
        throw new Error(result.error || "Invalid admin key.");
      }

      window.localStorage.setItem(ADMIN_STORAGE_KEY, key);
      setAdminKey(key);
      setAdminPassword("");
      setIsAdminPanelOpen(true);
      setNewsItems(result);
      setStatus("ready");
      setErrorMessage("");
      setNoticeMessage("");
    } catch (error) {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
      setAdminKey("");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to verify admin login."
      );
    }
  };

  const handleAdminLogout = () => {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    setAdminKey("");
    setAdminPassword("");
    setIsAdminPanelOpen(adminMode);
    setEditingId("");
    setFormData({
      title: "",
      summary: "",
      isoDate: today,
    });
    setErrorMessage("");
    setNoticeMessage("");
  };

  const submitNews = async (event) => {
    event.preventDefault();

    const payload = {
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      isoDate: formData.isoDate,
    };

    if (!payload.title || !payload.summary || !payload.isoDate) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const isEditing = Boolean(editingId);
      const response = await fetch(isEditing ? `/api/news/${editingId}` : "/api/news", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(payload),
      });

      const result = await readJsonResponse(
        response,
        isEditing ? "Unable to update shared news." : "Unable to save shared news."
      );
      if (!response.ok) {
        throw new Error(
          result.error ||
            (isEditing ? "Unable to update shared news." : "Unable to save shared news.")
        );
      }

      setNewsItems((prev) =>
        isEditing
          ? prev.map((item) => (item.id === result.id ? result : item))
          : [result, ...prev]
      );
      setFormData({
        title: "",
        summary: "",
        isoDate: today,
      });
      setEditingId("");
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to connect to the news service."
      );
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      summary: item.summary,
      isoDate: item.isoDate,
    });
    setIsAdminPanelOpen(true);
  };

  const cancelEditing = () => {
    setEditingId("");
    setFormData({
      title: "",
      summary: "",
      isoDate: today,
    });
  };

  const deleteNews = async (id) => {
    setIsDeletingId(id);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const result = await readJsonResponse(
        response,
        "Unable to delete shared news."
      );
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete shared news.");
      }

      setNewsItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to connect to the news service."
      );
    } finally {
      setIsDeletingId("");
    }
  };

  const isAdmin = Boolean(adminKey);

  return (
    <section className="news-events-page">
      <div className="news-events-container">
        <header className="news-events-header">
          <div className="news-events-header-copy">
            <span className="news-events-kicker">
              {adminMode ? "Admin Updates" : "Latest Updates"}
            </span>
            <h1>{adminMode ? "News Admin" : "Daily Company News"}</h1>
          </div>
          <div className="news-events-header-side">
            <p className="news-events-header-note">
              {adminMode
                ? "Log in with your admin key to add, update, and delete daily news items."
                : "Stay updated with recent TALME announcements, milestones, and daily business updates."}
            </p>
            {!adminMode ? (
              <button
                type="button"
                className="news-events-admin-trigger"
                onClick={() => setIsAdminPanelOpen((prev) => !prev)}
              >
                {isAdmin ? "Manage News" : "Admin Access"}
              </button>
            ) : null}
          </div>
        </header>

        {adminMode || isAdminPanelOpen ? (
          <section className="news-events-form-wrap" aria-label="Manage daily news">
            {!isAdmin ? (
              <form className="news-events-admin-panel" onSubmit={handleAdminLogin}>
                <label htmlFor="news-admin-key">Admin key</label>
                <input
                  id="news-admin-key"
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  placeholder="Enter admin key"
                />
                <div className="news-events-admin-panel-actions">
                  <button type="submit">Log In</button>
                  {!adminMode ? (
                    <button
                      type="button"
                      className="news-events-admin-cancel"
                      onClick={() => setIsAdminPanelOpen(false)}
                    >
                      Close
                    </button>
                  ) : null}
                </div>
              </form>
            ) : (
              <>
                <div className="news-events-admin-bar">
                  <strong>{editingId ? "Editing news item" : "Admin mode enabled"}</strong>
                  <div className="news-events-admin-bar-actions">
                    {editingId ? (
                      <button type="button" onClick={cancelEditing}>
                        Cancel edit
                      </button>
                    ) : null}
                    <button type="button" onClick={handleAdminLogout}>
                      Log out
                    </button>
                  </div>
                </div>

                <form className="news-events-form" onSubmit={submitNews}>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="News title"
                    className="news-events-input"
                    required
                  />
                  <input
                    type="date"
                    name="isoDate"
                    value={formData.isoDate}
                    onChange={handleChange}
                    className="news-events-input news-events-date-input"
                    required
                  />
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Type today's news or event update here"
                    className="news-events-textarea"
                    rows="4"
                    required
                  />
                  <button type="submit" className="news-events-button">
                    {status === "submitting"
                      ? editingId
                        ? "Updating..."
                        : "Saving..."
                      : editingId
                        ? "Update News"
                        : "Add News"}
                  </button>
                </form>
              </>
            )}
          </section>
        ) : null}

        {noticeMessage ? (
          <p className="news-events-message news-events-message-warning">
            {noticeMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="news-events-message news-events-message-error">
            {errorMessage}
          </p>
        ) : null}

        <section className="news-events-grid" aria-label="Daily company news">
          {status === "loading" ? (
            <p className="news-events-message">Loading news...</p>
          ) : null}

          {newsItems.map((item) => (
            <article className="news-events-card" key={item.id}>
              <div className="news-events-card-head">
                <span className="news-events-card-label">News Brief</span>
                <time className="news-events-date" dateTime={item.isoDate}>
                  {item.date}
                </time>
                {isAdmin ? (
                  <div className="news-events-card-actions">
                    <button
                      type="button"
                      className="news-events-edit"
                      onClick={() => startEditing(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="news-events-delete"
                      onClick={() => deleteNews(item.id)}
                      disabled={isDeletingId === item.id}
                    >
                      {isDeletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ) : null}
              </div>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default NewsEventsPage;
