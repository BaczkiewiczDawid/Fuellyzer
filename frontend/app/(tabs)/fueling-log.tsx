import {StyleSheet, Text, View} from "react-native"
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {useApi} from "@/hooks/useApi";
import {useEffect, useState} from "react";
import {Car} from "@/types/car";
import {DataFormatter} from "@/helpers/data-formatter";

export default function FuelingLog() {
    const [carsDataHistory, setCarsDataHistory] = useState([])
    const [selectedCarDataHistory, setSelectedCarDataHistory] = useState<Car[]>([])
    const [selectedCar, setSelectedCar] = useState({
        carBrand: "Volkswagen",
        carName: "Golf VII",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useApi("http://localhost:4000/history", "GET");
                const data = await response;
                setCarsDataHistory(data);
            } catch (error) {
                console.error("Error fetching fueling history:", error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        setSelectedCarDataHistory(carsDataHistory.filter((car: Car) => car.carBrand === selectedCar.carBrand && car.carName === selectedCar.carName))
    }, [selectedCar, carsDataHistory]);

    return (
        <Wrapper>
            <Title>Fueling history</Title>
            {selectedCarDataHistory.map((car: any, index) => {
                const mileageOnRefuel = car.mileage - selectedCarDataHistory[index - 1]?.mileage;
                const litersFueled = car.total / car.fuelPrice;
                const fuelConsumption = (litersFueled / mileageOnRefuel * 100).toFixed(2);

                return (
                    <View style={styles.historyItemWrapper}>
                        <View style={styles.mainInfoWrapper}>
                            <View>
                                <Text style={styles.bold}>{car.createdAt.split("T")[0]}</Text>
                                <Text>{DataFormatter(car.total, "moneyRounded")}</Text>
                            </View>
                            <View>
                                <Text style={styles.bold}>{DataFormatter(car.mileage, "kilometers")}</Text>
                                {index !== 0 &&
                                    <Text>+ {mileageOnRefuel}km</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.detailsWrapper}>
                            <View style={styles.detailsWrapper}>
                                <Text>{car.fuelType} {car.price}</Text>
                                {index !== 0 &&
                                    <Text>{fuelConsumption} l/100</Text>
                                }
                            </View>
                        </View>
                    </View>
                )
            })}
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    historyItemWrapper: {
        flexDirection: "column",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: 'white',
    },
    mainInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    detailsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 12,
    },
    bold: {
        fontWeight: "bold",
    }
})