import {Pressable, StyleSheet, Text, View} from "react-native";
import {Link, LinkProps} from "expo-router";

type Props = {
    onPress?: () => void
    text: string
    href?: LinkProps["href"]
}

export const Button = ({onPress, text, href}: Props) => {
    return (
        <View>
            {href ? (
                <Link style={styles.button} href={href}>
                    <Pressable onPress={onPress}>
                        <Text style={styles.text}>{text}</Text>
                    </Pressable>
                </Link>
            ) : <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#fafafa",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#0F77F0",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        width: "100%",
        margin: "auto",
        marginTop: 20,
        color: "#fafafa",
        fontWeight: "bold",
        position: "static",
        bottom: 20,
    }
})