import express from "express";
import { db } from "../db";
import {costsData} from "../db/schema";

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("GET /history wywołane!");
    console.log(costsData)
    try {
        const history = await db.select().from(costsData);
        console.log("Dane zwrócone z bazy:", history);
        res.json(history);
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

export default router;
