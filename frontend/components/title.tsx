import {StyleSheet, Text} from "react-native";

export const Title = ({children}: { children: React.ReactNode }) => {
    return (
        <Text style={styles.title}>{children}</Text>
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
    }
})