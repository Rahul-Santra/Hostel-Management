import React, { useState } from "react";

const UploadNotice = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [fileType, setFileType] = useState(""); 
  const [uploading, setUploading] = useState(false);

  const handleCloudinaryUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dc5j1lsjb", 
        uploadPreset: "sun9225s", 
        sources: ["local"],
        multiple: false,
        resourceType: "auto", 
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const url = result.info.secure_url;
          setUploadUrl(url);

          if (result.info.resource_type === "image") {
            setFileType("image");
          } else if (result.info.format === "pdf") {
            setFileType("pdf");
          }
        }
      }
    );

    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message || !uploadUrl) {
      return alert("All fields including upload are required.");
    }

    const newNotice = {
      title,
      message,
      date: new Date().toISOString(),
      ...(fileType === "image" ? { imageUrl: uploadUrl } : { pdfUrl: uploadUrl }),
    };

    try {
      await fetch("http://localhost:3000/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });

      setTitle("");
      setMessage("");
      setUploadUrl("");
      setFileType("");
      alert("Notice uploaded!");
    } catch (error) {
      console.error("Error uploading notice:", error);
      alert("Upload failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Upload Notice</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Message"
        className="w-full p-2 border rounded"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="button"
        onClick={handleCloudinaryUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload Image
      </button>

      {uploadUrl && fileType === "pdf" && (
        <div className="text-green-600 text-sm mt-2">
          ✅ PDF uploaded:{" "}
          <a
            href={uploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            View PDF
          </a>
        </div>
      )}

      {uploadUrl && fileType === "image" && (
        <div className="mt-3">
          <p className="text-green-600 text-sm mb-1">✅ Image uploaded:</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Notice
      </button>
    </form>
  );
};

export default UploadNotice;
