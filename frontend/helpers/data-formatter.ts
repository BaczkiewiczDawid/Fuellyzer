export type Format = "rounded" | "moneyRounded"

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
        default:
            return
    }
}