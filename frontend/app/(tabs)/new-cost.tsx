import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import {Navigation} from "@/components/navigation";
import {useEffect, useState} from "react";
import {View, StyleSheet, Pressable, Text} from "react-native";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {FormLabel} from "@/components/form-label";

export default function NewCost() {
    const [activeView, setActiveView] = useState("Refuel");
    const views = ["Refuel", "Maintance", "Tuning"];
    const [availableCars, setAvailableCars] = useState<Car[]>([])
    const [mileage, setMileage] = useState<number | undefined>(undefined)
    const [fuelAmount, setFuelAmount] = useState<number | undefined>(undefined)
    const [fuelType, setFuelType] = useState<string | undefined>(undefined)
    const [price, setPrice] = useState<number | undefined>(undefined)
    const [cost, setCost] = useState<number | undefined>(undefined)
    const [fullRefuel, setFullRefuel] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            setAvailableCars(response.map((car: Car) => ({
                carBrand: car.carBrand,
                carName: car.carName,
                defaultSelected: car.defaultSelected,
                mileage: car.mileage
            } as Car)));
        }

        fetchData()
    }, [])

    const defaultSelectedCar = availableCars.find((car: Car) => car.defaultSelected)

    const handleNewCost = () => {
        if (!mileage || !fuelAmount || !price || !cost) {
            setError(true)
            return
        }
    }

    return (
        <Wrapper>
            <Title>New cost</Title>
            <Description>Fill in the form below to add a new cost</Description>
            <View style={styles.formWrapper}>
                <Navigation activeView={activeView} setActiveView={setActiveView} views={views}/>
                <select style={styles.select}
                        defaultValue={defaultSelectedCar ? defaultSelectedCar?.carBrand + defaultSelectedCar?.carName : ""}>
                    {availableCars.map((car: Car, index: number) => {
                        return (
                            <option key={index} value={car.carBrand + car.carName}>{car.carBrand} {car.carName}</option>
                        )
                    })}
                </select>
                <form style={styles.form}>
                    <FormLabel title={"Mileage"} placeholder={"Mileage..."} type={"number"} value={mileage}
                               setValue={setMileage} error={error}/>
                    <FormLabel title={"Fuel amount"} placeholder={"Fuel amount..."} type={"number"} value={fuelAmount}
                               setValue={setFuelAmount} error={error}/>
                    <FormLabel title={"Price per litre"} placeholder={"Price per litre..."} type={"number"}
                               value={price}
                               setValue={setPrice} error={error}/>
                    <FormLabel title={"Total cost"} placeholder={"Total cost..."} type={"number"} value={cost}
                               setValue={setCost} error={error}/>
                    <Pressable onPress={() => handleNewCost()} style={styles.button}><Text
                        style={styles.buttonText}>Save</Text></Pressable>
                </form>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    formWrapper: {
        marginTop: 20,
    },
    select: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        color: "#101D1E",
        borderWidth: 2,
    },
    form: {
        marginTop: 30,
        width: "100%",
        flexDirection: "column",
        rowGap: 20,
    },
    button: {
        backgroundColor: "#0F77F0",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 30
    },
    buttonText: {
        color: "#fafafa",
        textAlign: "center",
    }
})