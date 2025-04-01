import {StyleSheet, Text, View} from "react-native"
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";

export default function FuelingLog() {
    return (
        <Wrapper>
            <Title>Fueling history</Title>
            <View style={styles.historyItemWrapper}>
                <View style={styles.mainInfoWrapper}>
                    <View>
                        <Text style={styles.bold}>24-01-2025</Text>
                        <Text>$65.43</Text>
                    </View>
                    <View>
                        <Text style={styles.bold}>147 954km</Text>
                        <Text>+412km</Text>
                    </View>
                </View>
                <View style={styles.detailsWrapper}>
                    <View style={styles.detailsWrapper}>
                        <Text>PB95 $1.64</Text>
                        <Text>12.5 l/100</Text>
                    </View>
                </View>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    historyItemWrapper: {
        flexDirection: "column",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: 'white',
    },
    mainInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    detailsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 12,
    },
    bold: {
        fontWeight: "bold",
    }
})