import express from "express";
import {db} from "../db";
import {costsData, userCarsList} from "../db/schema";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body

        const response = await db.insert(costsData).values({
            type: data.type,
            details: data.fuelType,
            currency: "USD",
            total: data.totalCost,
            date: data.date,
            email: data.email,
            carBrand: data.carBrand,
            carName: data.carName,
            fullRefuel: data.fullRefuel,
        })

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;
