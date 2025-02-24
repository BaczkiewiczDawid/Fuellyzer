import {Text, View, StyleSheet} from "react-native";

type HistoryItem = {
    id: string
    type: string
    date: string
    email: string
    details: string
    currency: string
    carBrand: string
    carName: string
    createdAt: string
    total: number
}

type Props = {
    item: HistoryItem
}

export const HistoryItem = ({item}: Props) => {
    const day = String(new Date(item.date).getDate()).padStart(2, '0');
    const month = new Date(item.date).toLocaleString('en-US', {month: 'short'});

    return (
        <View style={styles.itemContainer}>
            <View style={styles.details}>
                <View style={styles.date}>
                    <Text style={styles.datePrimary}>{day}</Text>
                    <Text style={styles.dateSecondary}>{month}</Text>
                </View>
                <View>
                    <Text style={styles.detailsText}>{item.type}</Text>
                    <Text style={styles.detailsTextSecondary}>{item.details}</Text>
                </View>
            </View>
            <Text style={styles.total}>{item.total}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    date: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
    },
    details: {
        flexDirection: 'row',
        columnGap: 25,
        textAlign: 'center',
        alignItems: 'center',
        color: "#101D1E"
    },
    datePrimary: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#101D1E"
    },
    dateSecondary: {
        fontWeight: "light",
        color: "#101D1E"
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101D1E"
    },
    detailsText: {
        color: "#101D1E",
        fontSize: 16,
    },
    detailsTextSecondary: {
        color: "#AAAAAA",
        fontSize: 12,
        marginTop: 2
    }
})