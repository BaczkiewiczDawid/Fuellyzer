import {View, StyleSheet} from "react-native";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import {useUserStore} from "@/context/user";
import {useEffect} from "react";
import {useApi} from "@/hooks/useApi";

export const SelectedCar = () => {
    const carBrand = useUserStore(state => state.carBrand);
    const carName = useUserStore(state => state.carName);
    const setCarBrand = useUserStore(state => state.setCarBrand);
    const setCarName = useUserStore(state => state.setCarName);
    const mileage = useUserStore(state => state.mileage);
    const setMileage = useUserStore(state => state.setMileage);
    const mileageMeasure = useUserStore(state => state.mileageMeasure);
    const setMileageMeasure = useUserStore(state => state.setMileageMeasure);

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            if (response) {
                setCarBrand(response[0].carBrand)
                setCarName(response[0].carName)
                setMileage(response[0].mileage)
                setMileageMeasure(response[0].mileageMeasure)
            }
        }

        fetchData()
    }, [])

    if (!carBrand || !carName || !mileage) {
        return null
    }

    return (
        <View style={styles.infoContainer}>
            <Title>{carBrand} {carName}</Title>
            <Description>{mileage} {mileageMeasure === "kilometers" ? "km" : "miles"}</Description>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        width: "60%",
    },
})