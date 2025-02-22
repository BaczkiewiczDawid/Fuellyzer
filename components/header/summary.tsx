import {StyleSheet, Text, View, Image} from "react-native";
import ArrowIcon from "../../assets/images/arrow.png";

type Props = {
    type: string
}

export const Summary = ({type}: Props) => {
    return (
        <View style={styles.monthlyContainer}>
            <Image style={styles.icon} source={ArrowIcon} alt="Arrow icon"/>
            <View>
                <Text style={styles.label}>$234</Text>
                <Text style={styles.paragraph}>This month</Text>
            </View>
            <View>
                <Text style={styles.label}>$234</Text>
                <Text style={styles.paragraph}>Last month</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monthlyContainer: {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101D1E",
    },
    paragraph: {
        color: "#7B7B7B",
    },
    icon: {
        width: 20,
        height: 20,
        color: "#7B7B7B",
    }
})