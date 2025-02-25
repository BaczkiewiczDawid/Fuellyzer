import {ActivityIndicator, View, StyleSheet} from "react-native";

export const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
})