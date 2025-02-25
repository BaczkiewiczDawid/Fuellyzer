import {useEffect, useRef} from "react";
import {View, StyleSheet, Animated, Easing} from "react-native";

export const Skeleton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.skeletonLong, {opacity}]}></View>
            <View style={[styles.skeletonShort, {opacity}]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "auto",
        flexDirection: "column",
        width: "100%",
        marginTop: 20,
    },
    skeletonLong: {
        width: "100%",
        height: 15,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        marginBottom: 20,
    },
    skeletonShort: {
        width: "40%",
        height: 15,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        marginBottom: 20,
    },
})