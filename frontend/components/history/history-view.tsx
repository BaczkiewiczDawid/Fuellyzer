import {View} from "react-native";
import {useState} from "react";
import {HistoryItems} from "@/components/history/history-items";
import {Navigation} from "@/components/navigation";

type HistoryViewType = "All" | "Refuel" | "Maintance"

export const HistoryView = () => {
    const [activeView, setActiveView] = useState("All");
    const views = ["All", "Refuel", "Maintance"];

    return (
        <View>
            <Navigation activeView={activeView} setActiveView={setActiveView} views={views}/>
            <HistoryItems activeView={activeView as HistoryViewType}/>
        </View>
    )
}