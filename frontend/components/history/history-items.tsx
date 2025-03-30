import {StyleSheet, View} from "react-native";
import {HistoryItem} from "@/components/history/history-item";
import {useCallback, useEffect, useState} from "react";
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

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await useApi("http://localhost:4000/history", "GET");
            setData(response)
        } catch (error) {
            console.error("Error fetching history data:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleDelete = async (item: HistoryItemType) => {
        try {
            setData(prevData => prevData?.filter(i => i.id !== item.id))

            await useApi("http://localhost:4000/history", "DELETE", item)
            fetchData()
        } catch (error) {
            console.error("Error deleting item:", error)
        }
    }

    if (isLoading) {
        return <Loader/>
    }

    if (!data) {
        return <Loader/>
    }

    const filteredHistoryItemsList: HistoryItemType[] = data.filter(item => item.type === activeView);

    return (
        <View style={styles.itemsListContainer}>
            {(activeView === "All" ? data : filteredHistoryItemsList).length === 0 && <NoData/>}
            {(activeView === "All" ? data : filteredHistoryItemsList).map((item, index) => {
                return (
                    <HistoryItem key={index} item={item} onDelete={handleDelete}/>
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