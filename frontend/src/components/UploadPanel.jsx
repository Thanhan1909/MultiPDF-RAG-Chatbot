import { useState, useRef } from "react";
import { uploadPDF } from "../services/api";

function UploadPanel({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    setStatus("idle");
    try {
      await uploadPDF(file);
      setStatus("success");
      if (onUploadSuccess) onUploadSuccess(file.name);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = null; // reset
  };

  return (
    <div
      className={`upload-panel ${isDragging ? "drag-active" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="application/pdf"
        className="upload-input"
        ref={fileInputRef}
        onChange={onChange}
      />
      
      {isUploading ? (
        <div className="loading-spinner" />
      ) : (
        <div className="upload-icon">
          {status === "success" ? "✅" : status === "error" ? "❌" : "📄"}
        </div>
      )}
      
      <p style={{ fontWeight: 500, color: "var(--text-main)" }}>
        {isUploading ? "Processing PDF..." : "Click or drag PDF to upload"}
      </p>
      
      {!isUploading && status === "success" && (
        <p style={{ color: "#4ade80", fontSize: "0.75rem", marginTop: "0.5rem" }}>Upload successful!</p>
      )}
      {!isUploading && status === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.5rem" }}>Upload failed.</p>
      )}
    </div>
  );
}

export default UploadPanel;