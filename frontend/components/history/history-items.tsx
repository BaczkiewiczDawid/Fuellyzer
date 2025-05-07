import { StyleSheet, View } from "react-native";
import { HistoryItem } from "@/components/history/history-item";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { NoData } from "@/components/no-data";
import { Loader } from "@/components/loader";
import { HistoryItemType } from "@/types/history-item";
import { SERVER_URL } from '../../constants/Config';
import { useHistoryStore } from "@/context/history";

type Props = {
    activeView: "All" | "Refuel" | "Maintance",
}

export const HistoryItems = ({ activeView }: Props) => {
    const [data, setData] = useState<HistoryItemType[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const triggerRefetch = useHistoryStore((state) => state.triggerRefetch)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await useApi(`${SERVER_URL}/history`, "GET");
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
        setData(prevData => prevData?.filter(i => i.id !== item.id))
        triggerRefetch()

        try {
            await useApi(`${SERVER_URL}/history`, "DELETE", item)
        } catch (error) {
            console.error("Error deleting item:", error)
            fetchData()
        }
    }

    const handleEdit = async (item: HistoryItemType) => {
        setData(prevData => prevData?.map(i => i.id === item.id ? item : i))
        triggerRefetch()

        try {
            await useApi(`${SERVER_URL}/history`, "PUT", item)
        } catch (error) {
            console.error("Error editing item:", error)
            fetchData()
        }
    }

    if (isLoading) {
        return <Loader />
    }

    if (!data) {
        return <Loader />
    }

    const filteredHistoryItemsList: HistoryItemType[] = data.filter(item => item.type === activeView);

    return (
        <View style={styles.itemsListContainer}>
            {(activeView === "All" ? data : filteredHistoryItemsList).length === 0 && <NoData />}
            {(activeView === "All" ? data : filteredHistoryItemsList).map((item, index) => {
                return (
                    <HistoryItem key={index} item={item} onDelete={handleDelete} onEdit={handleEdit} />
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