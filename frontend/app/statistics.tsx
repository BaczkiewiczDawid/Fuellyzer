import {Wrapper} from "@/components/wrapper";
import {StyleSheet, Text, View} from "react-native"
import {StatCard} from "@/components/statistics/stat-card";

type Data = {
    [key: string]: {
        value: string;
        subtitle?: string;
        variant?: "blue" | "dark";
    }
}

export default function Statistics() {
    const statsData: Data = {
        fuelConsumption: {
            value: "10,5l",
            subtitle: "Litres per 100km",
            variant: "blue"
        },
        costPerKm: {
            value: "0,64zł",
            variant: "dark"
        },
        totalCost: {
            value: "14 654zł",
            subtitle: "in last 365 days",
            variant: "blue"
        },
        mileage: {
            value: "147 248",
            variant: "dark"
        }
    };

    return (
        <Wrapper>
            <View>
                <Text>Picker</Text>
                <Text>This year</Text>
            </View>
            <View style={styles.statisticsWrapper}>
                <View style={styles.leftContainer}>
                    <StatCard
                        title="Fuel Consumption"
                        value={statsData.fuelConsumption.value}
                        subtitle={statsData.fuelConsumption.subtitle}
                        //@ts-ignore
                        variant={statsData.variant}
                    />
                    <StatCard
                        title="Fuel Consumption"
                        value={statsData.mileage.value}
                        //@ts-ignore
                        variant={statsData.mileage.variant}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <StatCard
                        title="Fuel Consumption"
                        value={statsData.costPerKm.value}
                        //@ts-ignore
                        variant={statsData.costPerKm.variant}
                    />
                    <StatCard
                        title="Fuel Consumption"
                        value={statsData.totalCost.value}
                        subtitle={statsData.totalCost.subtitle}
                        //@ts-ignore
                        variant={statsData.totalCost.variant}
                    />
                </View>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: "#0F77F0",
        padding: 10,
        color: "#fafafa",
        width: "100%",
    },
    statisticsWrapper: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 10,
    },
    leftContainer: {
        width: "50%",
        rowGap: 10,
    },
    rightContainer: {
        width: "50%",
        rowGap: 10,
    }
})