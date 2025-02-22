import {View, Text, StyleSheet} from "react-native";
import {HistoryItem} from "@/components/history/history-item";
import {historyItemsList} from "@/data/history-list-data";

type Props = {
    activeView: "All" | "Refuel" | "Maintance",
}

export const HistoryItems = ({activeView}: Props) => {
    const filteredHistoryItemsList = historyItemsList.filter(item => item.type === activeView);

    return (
        <View style={styles.itemsListContainer}>
            {(activeView === "All" ? historyItemsList : filteredHistoryItemsList).map((item, index) => (
                <HistoryItem key={index} item={item}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemsListContainer: {
        marginTop: 20,
    },
})