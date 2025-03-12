import express from "express";
import {db} from "../db";
import {costsData, userCarsList} from "../db/schema";
import {eq, and} from "drizzle-orm";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const response = await db.insert(userCarsList).values({
            email: data.email,
            carBrand: data.carBrand,
            carName: data.carName,
            mileage: data.miles,
            defaultSelected: false,
            mileageMeasure: "kilometers",
            oilChange: data.oilChange,
            insurance: data.insurance,
        });

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;