import {View, Text} from "react-native";
import {HistoryNavigation} from "@/components/history/history-navigation";
import {useState} from "react";
import {HistoryItems} from "@/components/history/history-items";

export const HistoryView = () => {
    const [activeView, setActiveView] = useState<"All" | "Refuel" | "Maintance">("All");

    return (
        <View>
            <HistoryNavigation activeView={activeView} setActiveView={setActiveView}/>
            <HistoryItems activeView={activeView}/>
        </View>
    )
}