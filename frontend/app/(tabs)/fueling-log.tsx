import {StyleSheet, Text, View} from "react-native"
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {useApi} from "@/hooks/useApi";
import {useEffect, useState} from "react";
import {Car} from "@/types/car";

export default function FuelingLog() {
    const [carsDataHistory, setCarsDataHistory] = useState([])
    const [selectedCarDataHistory, setSelectedCarDataHistory] = useState([])
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
    }, [selectedCar]);

    console.log(selectedCarDataHistory)

    return (
        <Wrapper>
            <Title>Fueling history</Title>
            {selectedCarDataHistory.map((car: Car) => {
                return (
                    <View style={styles.historyItemWrapper}>
                        <View style={styles.mainInfoWrapper}>
                            <View>
                                <Text style={styles.bold}>24-01-2025</Text>
                                <Text>$65.43</Text>
                            </View>
                            <View>
                                <Text style={styles.bold}>147 954km</Text>
                                <Text>+412km</Text>
                            </View>
                        </View>
                        <View style={styles.detailsWrapper}>
                            <View style={styles.detailsWrapper}>
                                <Text>PB95 $1.64</Text>
                                <Text>12.5 l/100</Text>
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