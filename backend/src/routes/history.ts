import express from "express";
import {db} from "../db";
import {costsData} from "../db/schema";
import {sql} from "drizzle-orm";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const history = await db.select().from(costsData).orderBy(sql`${costsData.date} asc`);
        res.json(history);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;
