import {date, doublePrecision, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

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
})