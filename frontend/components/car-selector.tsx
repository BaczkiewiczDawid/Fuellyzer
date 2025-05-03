import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Car } from "@/types/car";

type Props = {
    availableCars: Car[]
    selectedCar: {
        carBrand: string;
        carName: string;
        mileage?: number | undefined;
    } | undefined
    setSelectedCar: (car: {
        carBrand: string;
        carName: string;
        mileage?: number | undefined;
    }) => void
}

export const CarSelector = ({ availableCars, selectedCar, setSelectedCar }: Props) => {
    return (
        <View style={styles.vehicleContainer}>
            {availableCars.map((car) => (
                <TouchableOpacity
                    key={car.id}
                    style={[styles.carOption, selectedCar?.carName === car.carName && styles.selected]}
                    onPress={() => setSelectedCar({
                        carBrand: car.carBrand,
                        carName: car.carName,
                        mileage: car.mileage
                    })}
                >
                    <View style={styles.carIcon}>
                        <Svg width={20} height={20} viewBox="0 0 24 24" stroke="black" strokeWidth={2}
                            fill="none">
                            <Path
                                d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.4 1 12.3 1 13.2V16c0 .6.4 1 1 1h2" />
                            <Circle cx={7} cy={17} r={2} />
                            <Path d="M9 17h6" />
                            <Circle cx={17} cy={17} r={2} />
                        </Svg>
                    </View>
                    <View style={styles.carDetails}>
                        <Text
                            style={styles.carName}>{car.carBrand} {car.carName}</Text>
                    </View>
                    {selectedCar?.carName === car.carName && (
                        <Svg width={20} height={20} viewBox="0 0 24 24" stroke="black" strokeWidth={2}
                            fill="none">
                            <Path d="M20 6L9 17l-5-5" />
                        </Svg>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    vehicleSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E88E5',
        padding: 14,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 4,
    },
    vehicleSelectorText: {
        color: 'white',
        fontWeight: '500',
    },
    carOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        borderColor: "#0F77F0",
        borderWidth: 1,
    },
    carIcon: {
        marginRight: 10
    },
    carDetails: {
        flex: 1
    },
    carName: {
        fontSize: 16, fontWeight: "bold"
    },
    carInfo: {
        fontSize: 14, color: "gray"
    },
    vehicleContainer: {
        marginTop: 30,
    },
})