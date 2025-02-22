import {View, StyleSheet, TouchableOpacity} from "react-native";

type Props = {
    activeHeader: number;
}

export const HeaderNavigation = ({ activeHeader }: Props) => {
    return (
        <View style={styles.container}>
            {[0, 1, 2].map((index) => {
                return (
                    <TouchableOpacity
                        key={index}
                    >
                        <View style={[styles.navItem, activeHeader === index && styles.activeNavItem]}/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        columnGap: 10,
        padding: 30,
    },
    navItem: {
        width: 24,
        height: 8,
        backgroundColor: "#AFAFAF",
        borderRadius: 100,
    },
    activeNavItem: {
      backgroundColor: "#0F77F0"
    }
})