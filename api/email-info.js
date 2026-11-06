
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

        let data = await response.text();

        // Developer name replacement
        data = data.replaceAll("@flirts_x", "@Boss_Hcrr");

        const contentType = response.headers.get("content-type");

        res.status(response.status);

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
