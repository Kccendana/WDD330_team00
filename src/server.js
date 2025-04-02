const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const COMMENTS_FILE = "src/public/json/comments.json";

// Get comments for a product
app.get("/comments/:productId", (req, res) => {
    const productId = req.params.productId;
    fs.readFile(COMMENTS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read comments" });
        }
        const comments = JSON.parse(data);
        res.json(comments[productId] || []);
    });
});

// Add a new comment
app.post("/comments/:productId", (req, res) => {
    const productId = req.params.productId;
    const newComment = req.body;

    fs.readFile(COMMENTS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read comments" });
        }
        const comments = JSON.parse(data);
        if (!comments[productId]) comments[productId] = [];
        comments[productId].push(newComment);

        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to save comment" });
            }
            res.status(201).json({ message: "Comment added successfully" });
        });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
