import {Pressable, StyleSheet, Text, View} from "react-native";
import {HistoryItemType} from "@/types/history-item";
import {DataFormatter} from "@/helpers/data-formatter";
import { Swipeable } from 'react-native-gesture-handler';

type Props = {
    item: HistoryItemType
}

export const HistoryItem = ({item}: Props) => {
    const day = String(new Date(item.date).getDate()).padStart(2, '0');
    const month = new Date(item.date).toLocaleString('en-US', {month: 'short'});

    const handleDelete = () => {
        console.log("Delete", item)
    }

    const handleEdit = () => {
        console.log("Edit")
    }

    const renderRightActions = () => {
        return (
            <View style={styles.rightActions}>
                <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={handleEdit}
                >
                    <Text style={styles.actionText}>Edit</Text>
                </Pressable>
                <Pressable
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={styles.actionText}>Delete</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
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
                <Text style={styles.total}>{DataFormatter(item.total, "moneyRounded")}</Text>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: 'white',
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
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
    },
    editButton: {
        backgroundColor: '#4F8EF7',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
    }
});