const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const DATA_FILE = path.join(__dirname, "submissions.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Serve form page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Save form data and print it
app.post("/submit", (req, res) => {
  const newSubmission = req.body;
  console.log("User submitted:", newSubmission); // ✅ View form input here

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    let submissions = [];
    if (!err && data) {
      submissions = JSON.parse(data);
    }
    submissions.push(newSubmission);

    fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), err => {
      if (err) return res.status(500).send("Error saving submission");
      res.send("Submission saved!");
    });
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
