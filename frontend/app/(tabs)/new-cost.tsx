import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import {Navigation} from "@/components/navigation";
import {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {FormLabel} from "@/components/form-label";

export default function NewCost() {
    const [activeView, setActiveView] = useState("Refuel");
    const views = ["Refuel", "Maintance", "Tuning"];
    const [availableCars, setAvailableCars] = useState<Car[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            setAvailableCars(response.map((car: Car) => ({
                carBrand: car.carBrand,
                carName: car.carName,
                defaultSelected: car.defaultSelected
            } as Car)));
        }

        fetchData()
    }, [])

    const defaultSelectedCar = availableCars.find((car: Car) => car.defaultSelected)

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
                <View style={styles.form}>
                    <FormLabel title={"Mileage"} placeholder={"Mileage..."} type={"number"}/>
                </View>
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
    }
})