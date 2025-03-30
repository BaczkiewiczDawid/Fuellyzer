import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import {HistoryItemType} from "@/types/history-item";
import {DataFormatter} from "@/helpers/data-formatter";
import {Swipeable} from 'react-native-gesture-handler';
import {useState} from "react";
import FormInput from "@/components/form-input";
import CustomSelect from "@/components/customSelect";
import CheckIcon from "@/assets/images/check.png"

type Props = {
    item: HistoryItemType
    onDelete: (item: HistoryItemType) => void;
    onEdit: (item: HistoryItemType) => void;
}

export const HistoryItem = ({item, onDelete, onEdit}: Props) => {
    const day = String(new Date(item.date).getDate()).padStart(2, '0');
    const month = new Date(item.date).toLocaleString('en-US', {month: 'short'});
    const [isOpen, setIsOpen] = useState(false);
    const [totalValue, setTotalValue] = useState(item.total);
    const [typeValue, setTypeValue] = useState(item.type);

    const handleDelete = () => {
        onDelete(item)
    }

    if (isOpen) {
        return (
            <View style={styles.editContainer}>
                <CustomSelect onChange={setTypeValue} value={typeValue} options={[
                    {label: "Refuel", value: "Refuel"},
                    {label: "Maintenance", value: "Maintenance"},
                    {label: "Tuning", value: "Tuning"},
                ]}/>
                <FormInput title={"Price"} placeholder={String(item.total)} type={"number"} value={totalValue}
                           setValue={setTotalValue} error={false} badge={"$"} hideLabel style={styles.editInput}/>
                <Pressable onPress={() => {
                    setIsOpen(false);
                    item = {...item, total: totalValue, type: typeValue}
                    onEdit(item)
                }}><Image style={styles.icon} source={CheckIcon} /></Pressable>
            </View>
        )
    }

    const renderRightActions = () => {
        return (
            <View style={styles.rightActions}>
                <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => setIsOpen(true)}
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
                <Text style={styles.total}>{DataFormatter(Number(item.total), "moneyRounded")}</Text>
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
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: 'white',
        columnGap: 20,
        marginTop: 20,
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 20,
    },
    editInput: {
        width: 100,
        flex: 0,
    },
});