import { useState } from "react";
import ChatBox from "./components/ChatBox";
import UploadPanel from "./components/UploadPanel";
import SourceCard from "./components/SourceCard";
import "./App.css";

function App() {
  const [sources, setSources] = useState([]);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Research AI</h1>
        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Powered by Qwen 0.5B & ChromaDB
        </div>
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <div>
            <h3 style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>Knowledge Base</h3>
            <UploadPanel onUploadSuccess={setLastUploadedFile} />
          </div>

          {sources.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>Cited Sources</h3>
              <div className="sources-list">
                {sources.map((s, i) => (
                  <SourceCard key={i} source={s} />
                ))}
              </div>
            </div>
          )}
        </aside>

        <section className="chat-area">
          <ChatBox onSourcesUpdate={setSources} lastUploadedFile={lastUploadedFile} />
        </section>
      </main>
    </div>
  );
}

export default App;