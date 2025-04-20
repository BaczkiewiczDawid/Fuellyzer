import {StyleSheet, Text, View} from "react-native";

type Props = {
    title: string;
    value: string;
    subtitle?: string;
    variant?: "blue" | "dark";
    style?: object;
}

export const StatCard = ({
                             title,
                             value,
                             subtitle,
                             variant = "blue",
                             style
                         }: Props) => {
    const backgroundColor = variant === "blue" ? "#0F77F0" : "#121212";

    return (
        <View style={[styles.container, {backgroundColor}, style]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.detailsWrapper}>
                <Text style={styles.statisticsHeader}>{value}</Text>
                {subtitle && <Text style={styles.statisticsDetails}>{subtitle}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statisticsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    container: {
        borderRadius: 16,
        padding: 16,
        color: "#fafafa",
    },
    boxSize: {
        width: "50%",
        height: 170,
    },
    title: {
        color: "#fafafa",
        fontSize: 14,
        marginBottom: 8,
    },
    statisticsHeader: {
        color: "#fafafa",
        fontWeight: "bold",
        fontSize: 28,
    },
    statisticsDetails: {
        color: "#fafafa",
        fontSize: 14,
    },
    detailsWrapper: {
        marginTop: "auto",
    },
    rightColumn: {
        width: "50%",
        justifyContent: "space-between",
    },
    totalCostContainer: {
        marginTop: 10,
        flex: 1,
    },
    mileageContainer: {
        marginTop: 10,
        width: "50%",
    }
});