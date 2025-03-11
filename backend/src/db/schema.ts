import {boolean, date, doublePrecision, integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const costsData = pgTable("costsData", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").default(new Date()),
    type: text("type").notNull(),
    details: text("details").notNull(),
    currency: text("currency").notNull(),
    total: doublePrecision("total").notNull(),
    date: date("date").notNull(),
    email: text("email").notNull(),
    carBrand: text("carBrand").notNull(),
    carName: text("carName").notNull(),
    fullRefuel: boolean("fullRefuel").notNull().default(false),
})

export const userCarsList = pgTable("userCarsList", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").default(new Date()),
    email: text("email").notNull(),
    carBrand: text("carBrand").notNull(),
    carName: text("carName").notNull(),
    mileage: integer("mileage").notNull(),
    defaultSelected: boolean("defaultSelected").notNull(),
    mileageMeasure: text("mileageMeasure").notNull(),
    oilChange: integer("oilChange").notNull(),
    insurance: date("insurance").notNull(),
})