
const API_KEY = "FIGHTER";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const email = req.query.q;

    if (!email) {
        return res.status(400).json({
            error: "Email parameter required"
        });
    }

    try {
        const url = new URL(
            "https://sahilxher.madewith.me/api/email-info"
        );

        url.searchParams.set("key", API_KEY);
        url.searchParams.set("q", email);

        const response = await fetch(url);
        const data = await response.text();

        res.status(response.status);

        const contentType = response.headers.get("content-type");

        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }

        return res.send(data);

    } catch (error) {
        return res.status(502).json({
            error: "API connection failed"
        });
    }
}
