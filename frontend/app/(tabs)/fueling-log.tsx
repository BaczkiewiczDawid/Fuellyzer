import {StyleSheet, Text, View} from "react-native"
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {useApi} from "@/hooks/useApi";
import {useEffect, useState} from "react";
import {Car} from "@/types/car";
import {DataFormatter} from "@/helpers/data-formatter";
import {CarSelector} from "@/components/car-selector";
import { SERVER_URL } from '../../constants/env';

type CostsHistory = {
    createdAt: string;
    carBrand: string;
    carName: string;
    fuelPrice: number;
    mileage: number;
    total: number;
    details: string;
    type: string;
    id: string
    fullRefuel: boolean
    email: string
    date: string;
    currency: string;
}

export default function FuelingLog() {
    const [carsDataHistory, setCarsDataHistory] = useState([])
    const [selectedCarDataHistory, setSelectedCarDataHistory] = useState<CostsHistory[]>([])
    const [selectedCar, setSelectedCar] = useState({
        carBrand: "Volkswagen",
        carName: "Golf VII",
    })
    const [availableCars, setAvailableCars] = useState<Car[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useApi(`${SERVER_URL}/history`, "GET");
                const data = await response;
                setCarsDataHistory(data);
            } catch (error) {
                console.error("Error fetching fueling history:", error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi(`${SERVER_URL}/user-cars-list`, "GET")

            setAvailableCars(response.map((car: Car) => ({
                carBrand: car.carBrand,
                carName: car.carName,
                defaultSelected: car.defaultSelected,
                mileage: car.mileage
            } as Car)));
        }

        fetchData()
    }, [])

    useEffect(() => {
        setSelectedCarDataHistory(carsDataHistory.filter((car: Car) => car.carBrand === selectedCar.carBrand && car.carName === selectedCar.carName))
    }, [selectedCar, carsDataHistory]);

    const calculateAverageFuelConsumption = () => {
        if (selectedCarDataHistory && selectedCarDataHistory.length >= 3) {
            let totalFuelLiters = 0;
            let totalDistance = 0;

            for (let i = 1; i < selectedCarDataHistory.length; i++) {
                const entry = selectedCarDataHistory[i];
                totalFuelLiters += entry.total / entry.fuelPrice;

                const previousEntry = selectedCarDataHistory[i - 1];
                const segmentDistance = entry.mileage - previousEntry.mileage;
                totalDistance += segmentDistance;
            }

            if (totalDistance > 0) {
                return ((totalFuelLiters / totalDistance) * 100).toFixed(2);
            }
        }

        return null;
    }

    const averageFuelConsumption = calculateAverageFuelConsumption();

    return (
        <Wrapper>
            <Title>Fueling history</Title>
            <CarSelector availableCars={availableCars} selectedCar={selectedCar} setSelectedCar={setSelectedCar}/>
            {selectedCarDataHistory.length === 0 && (
                <View style={{marginTop: 20}}>
                    <Text style={{textAlign: "center"}}>No data available</Text>
                </View>
            )}
            {selectedCarDataHistory.map((car: CostsHistory, index) => {
                const mileageOnRefuel = car.mileage - selectedCarDataHistory[index - 1]?.mileage;
                const litersFueled = car.total / car.fuelPrice;
                const fuelConsumption = Number((litersFueled / mileageOnRefuel * 100).toFixed(2));

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
                                <Text>{`${car.details} $${car.fuelPrice}/l`}</Text>
                                {index !== 0 &&
                                    <Text
                                        style={averageFuelConsumption && Number(averageFuelConsumption) > fuelConsumption ? styles.green : styles.red}>{fuelConsumption} l/100</Text>
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
        marginTop: 20,
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
    },
    green: {
        color: "#4CAF50",
    },
    red: {
        color: "#FF0000",
    },
})