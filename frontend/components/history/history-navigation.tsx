import {View, Text, Pressable, StyleSheet} from "react-native";

type Props = {
    activeView: "All" | "Refuel" | "Maintance",
    setActiveView: (index: "All" | "Refuel" | "Maintance") => void,
}

export const HistoryNavigation = ({activeView, setActiveView}: Props) => {
    const views = ["All", "Refuel", "Maintance"];

    return (
        <View style={styles.itemsContainer}>
            {views.map((view, index) => {
                return (
                    <Pressable
                        key={index}
                        style={[styles.button, activeView === view && styles.activeButton]}
                        onPress={() => {
                            switch (view) {
                                case "All":
                                    setActiveView("All");
                                    break;
                                case "Refuel":
                                    setActiveView("Refuel");
                                    break;
                                case "Maintance":
                                    setActiveView("Maintance");
                                    break;
                            }
                        }}
                    >
                        <Text style={[styles.buttonText, activeView === view && styles.activeButtonText]}>{view}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        columnGap: 20,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "transparent",
        fontSize: 16,
    },
    buttonText: {
        color: "#AAAAAA",
        textAlign: "center",
    },
    activeButtonText: {
        color: "#fafafa",
        fontWeight: "bold"
    },
    activeButton: {
        backgroundColor: "#0F77F0",
    }
})