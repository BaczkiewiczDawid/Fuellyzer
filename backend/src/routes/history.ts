import express from "express";
import {db} from "../db";
import {costsData} from "../db/schema";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const history = await db.select().from(costsData);
        res.json(history);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;
