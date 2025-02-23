import {ScrollView, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export const Wrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.view}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0F77F0",
        flex: 1,
    },
    view: {
        backgroundColor: "#fff",
        marginTop: 50,
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
    }
})