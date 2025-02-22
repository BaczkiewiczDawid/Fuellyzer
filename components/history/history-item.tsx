import {Text, View, StyleSheet} from "react-native";

type Props = {
    item: {
        date: string,
        type: string,
        details: string,
        total: number,
        currency: string,
    }
}

export const HistoryItem = ({item}: Props) => {
    const day = new Date(item.date).getDate();
    const month = new Date(item.date).toLocaleString('en-US', {month: 'short'});

    return (
        <View style={styles.itemContainer}>
            <View style={styles.details}>
                <View style={styles.date}>
                    <Text style={styles.datePrimary}>{day}</Text>
                    <Text style={styles.dateSecondary}>{month}</Text>
                </View>
                <View>
                    <Text>{item.type}</Text>
                    <Text>{item.details}</Text>
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
    },
    datePrimary: {
        fontSize: 24,
        fontWeight: "bold",
    },
    dateSecondary: {
        color: "#7B7B7B",
        fontWeight: "light"
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
    }
})