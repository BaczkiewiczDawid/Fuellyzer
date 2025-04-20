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
                         }: Props) => {
    const backgroundColor = variant === "blue" ? "#0F77F0" : "#121212";

    return (
        <View style={[styles.container, {backgroundColor}, variant === "blue" ? styles.boxLarge : styles.boxSmall]}>
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
    boxLarge: {
        height: 170,
    },
    boxSmall: {
        height: 100,
    }
});