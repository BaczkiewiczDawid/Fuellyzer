import {create} from "zustand";

type MileageMeasure = "kilometers" | "miles"

type State = {
    carBrand: string | undefined,
    setCarBrand: (carBrand: string) => void
    carName: string | undefined,
    setCarName: (carName: string) => void
    mileage: number | undefined,
    setMileage: (mileage: number) => void
    mileageMeasure: MileageMeasure,
    setMileageMeasure: (mileageMeasure: MileageMeasure) => void
}

export const useUserStore = create<State>((set) => ({
    carBrand: undefined,
    setCarBrand: (carBrand: string) => set({carBrand: carBrand}),
    carName: undefined,
    setCarName: (carName: string) => set({carName: carName}),
    mileage: undefined,
    setMileage: (mileage: number) => set({mileage: mileage}),
    mileageMeasure: "kilometers",
    setMileageMeasure: (mileageMeasure: MileageMeasure) => set({mileageMeasure: mileageMeasure}),
}))