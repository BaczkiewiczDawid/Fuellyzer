import {StyleSheet, Text} from "react-native";

export const Title = ({children, centered}: { children: React.ReactNode, centered?: boolean }) => {
    return (
        <Text style={[styles.title, centered && styles.centerd]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#101D1E",
        flexWrap: 'wrap',
        width: "100%",
    },
    centerd: {
        textAlign: "center",
    }
})