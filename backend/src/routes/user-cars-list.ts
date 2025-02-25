import express from "express";
import {db} from "../db";
import {userCarsList} from "../db/schema";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const carsList = await db.select().from(userCarsList);
        res.json(carsList);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;
