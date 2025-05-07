import express from "express";
import {db} from "../db";
import {userCarsList} from "../db/schema";
import {and, eq} from "drizzle-orm";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        1
        const response = await db.insert(userCarsList).values({
            email: data.email,
            carBrand: data.carBrand,
            carName: data.carName,
            mileage: data.mileage,
            defaultSelected: false,
            mileageMeasure: "kilometers",
            oilChange: data.oilChange,
            insurance: data.insurance,
            lastOilChange: data.lastOilChange
        });

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
});

router.patch("/", async (req, res) => {
    try {
        const data = req.body;

        const response = await db.update(userCarsList).set({
            carBrand: data.carBrand,
            carName: data.carName,
            mileage: data.miles,
            oilChange: data.oilChange,
            insurance: data.insurance,
        }).where(
            eq(userCarsList.email, data.email),
        );

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
})

router.delete("/", async (req, res) => {
    try {
        const data = req.body;

        const response = await db.delete(userCarsList).where(
            and(
                eq(userCarsList.email, data.email),
                eq(userCarsList.carBrand, data.carBrand),
                eq(userCarsList.carName, data.carName),
            ),
        );

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
})

export default router;