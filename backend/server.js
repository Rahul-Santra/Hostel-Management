const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const DB_FILE = path.join(__dirname, "db.json");

app.post("/upload", upload.single("pdf"), (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const notice = {
    title,
    pdfUrl: `http://localhost:${PORT}/uploads/${file.filename}`,
    date: new Date().toISOString(),
  };

  let db = [];
  if (fs.existsSync(DB_FILE)) {
    db = JSON.parse(fs.readFileSync(DB_FILE));
  }

  db.push(notice);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.json({ message: "Notice uploaded", notice });
});

app.get("/notices", (req, res) => {
  if (fs.existsSync(DB_FILE)) {
    const db = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(db);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
