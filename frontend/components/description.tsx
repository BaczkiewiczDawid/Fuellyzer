import {StyleSheet, Text} from "react-native"

export const Description = ({children}: { children: React.ReactNode }) => {
    return (
        <Text style={styles.description}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: "#7B7B7B",
        fontWeight: "light",
    }
})