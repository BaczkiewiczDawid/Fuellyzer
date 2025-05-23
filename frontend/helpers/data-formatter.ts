export type Format = "rounded" | "moneyRounded" | "kilometers" | "miles" | "consumption"

export const DataFormatter = (value: string | number | undefined, type: Format) => {
    switch (type) {
        case undefined:
            return
        case "rounded":
            if (typeof value !== "number") {
                return value
            }

            return Number(value).toFixed(2)
        case "moneyRounded":
            if (typeof value !== "number") {
                return value
            }

            return `$${Number(value).toFixed(2)}`
        case "kilometers":
            if (typeof value !== "number") {
                return value
            }

            return `${Number(value).toFixed(0)} km`
        case "miles":
            if (typeof value !== "number") {
                return value
            }

            return `${Number(value).toFixed} miles`
            case "consumption": 
             if (typeof value !== "number") {
                return value
             }

             return `${Number(value).toFixed(2)} l/100km`
        default:
            return
    }
}