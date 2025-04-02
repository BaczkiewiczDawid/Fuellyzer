import express from "express";
import {db} from "../db";
import {costsData, userCarsList} from "../db/schema";
import {and, eq} from "drizzle-orm";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const response = await db.insert(costsData).values({
            type: data.type,
            details: data.details,
            currency: "USD",
            total: data.totalCost,
            date: data.date,
            email: data.email,
            carBrand: data.carBrand,
            carName: data.carName,
            fullRefuel: data.fullRefuel,
            fuelPrice: data.price,
            mileage: data.mileage,
        });

        if (response) {
            if (data.activeView === "Refuel") {
                await db.update(userCarsList)
                    .set({
                        mileage: data.mileage,
                    })
                    .where(
                        and(
                            eq(userCarsList.email, data.email),
                            eq(userCarsList.carBrand, data.carBrand),
                            eq(userCarsList.carName, data.carName)
                        )
                    );
            }
        }

        res.send(response);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;