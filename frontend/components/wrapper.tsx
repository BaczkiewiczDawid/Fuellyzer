import {ScrollView, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export const Wrapper = ({children, footerContent}: { children: React.ReactNode, footerContent?: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {children}
                </ScrollView>
                {footerContent && (
                    <View style={styles.footer}>
                        {footerContent}
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0F77F0",
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
    }
})