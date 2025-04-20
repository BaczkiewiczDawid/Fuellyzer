import {Wrapper} from "@/components/wrapper";
import {StyleSheet, Text, View} from "react-native"
import {StatCard} from "@/components/statistics/stat-card";

export default function Statistics() {
    const statsData = {
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

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Wrapper>
            <View>
                <Text>Picker</Text>
                <Text>This year</Text>
            </View>
            <View style={styles.statisticsWrapper}>
                <StatCard
                    title="Fuel Consumption"
                    value={statsData.fuelConsumption.value}
                    subtitle={statsData.fuelConsumption.subtitle}
                    //@ts-ignore
                    variant={statsData.fuelConsumption.variant}
                />

                <View style={styles.rightColumn}>
                    <StatCard
                        title="Cost per kilometer"
                        value={statsData.costPerKm.value}
                        //@ts-ignore
                        variant={statsData.costPerKm.variant}
                    />

                    <StatCard
                        title="Total cost"
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
        flexShrink: 2,
    },
    title: {
        color: "#fafafa",
        fontSize: 14,
    },
    statisticsHeader: {
        color: "#fafafa",
        fontWeight: "bold",
        fontSize: 30,
    },
    staticticsDetails: {
        color: "#fafafa",
        fontSize: 14,
    },
    detailsWrapper: {
        marginTop: "50%",
    },
    totalCostContainer: {
        marginTop: 10,
        flex: 1,
    },
    rightColumn: {
        width: "48%",
        justifyContent: "space-between",
    },
    boxSize: {
        height: 170,
    },
})