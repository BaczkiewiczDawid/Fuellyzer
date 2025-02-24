import {View, StyleSheet} from "react-native";
import {HistoryItem} from "@/components/history/history-item";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {NoData} from "@/components/no-data";
import {Loader} from "@/components/loader";
import {HistoryItemType} from "@/types/history-item";

type Props = {
    activeView: "All" | "Refuel" | "Maintance",
}

export const HistoryItems = ({activeView}: Props) => {
    const [data, setData] = useState<HistoryItemType[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await useApi("http://localhost:5000/history", "GET");

            setData(response)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    if (!data) {
        return <Loader />
    }

    const filteredHistoryItemsList: HistoryItemType[] = data.filter(item => item.type === activeView);

    return (
        <View style={styles.itemsListContainer}>
            {(activeView === "All" ? data : filteredHistoryItemsList).length === 0 && <NoData/>}
            {(activeView === "All" ? data : filteredHistoryItemsList).map((item, index) => {
                return (
                    <HistoryItem key={index} item={item}/>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    itemsListContainer: {
        marginTop: 20,
    },
})