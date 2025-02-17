import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export const Wrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
})