function SourceCard({ source }) {
  return (
    <div className="source-card">
      <div className="source-icon">
        📄
      </div>
      <div className="source-info">
        <h4>{source.title || "Unknown Document"}</h4>
        <p>Page {source.page || "?"}</p>
      </div>
    </div>
  );
}

export default SourceCard;