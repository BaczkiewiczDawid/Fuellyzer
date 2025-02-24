import {View, StyleSheet} from "react-native";
import {Description} from "@/components/description";
import {Title} from "@/components/title";

export const NoData = () => {
    return (
        <View style={styles.container}>
            <Title>There's nothing here</Title>
            <Description>Add some expenses now!</Description>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
        margin: "auto"
    },
})