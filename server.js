const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public")); // `public` フォルダを公開

const appId = process.env.RAKUTEN_APP_ID;
app.get("/api/coffee", async (req, res) => {
    try {
        const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=コーヒー豆&hits=30&format=json`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "データ取得に失敗しました。" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
