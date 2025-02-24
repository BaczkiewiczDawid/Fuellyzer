import {View, Text, StyleSheet} from "react-native";
import {HistoryItem} from "@/components/history/history-item";
import {historyItemsList} from "@/data/history-list-data";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {NoData} from "@/components/no-data";
import {Loader} from "@/components/loader";

type Props = {
    activeView: "All" | "Refuel" | "Maintance",
}

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

export const HistoryItems = ({activeView}: Props) => {
    const [data, setData] = useState<HistoryItem[] | undefined>(undefined)
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

    const filteredHistoryItemsList: HistoryItem[] = data.filter(item => item.type === activeView);

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