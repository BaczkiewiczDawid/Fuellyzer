import {StyleSheet, Text, View, Image} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import deleteIcon from "@/assets/images/delete-icon.png";

export default function TabTwoScreen() {
    return (
        <Wrapper>
            <View style={styles.itemContainer}>
                <View>
                    <Title>Volkswagen</Title>
                    <Description>Golf VII</Description>
                </View>
                <Image style={styles.icon} source={deleteIcon} alt={"Trash icon"}/>
            </View>
            <View style={styles.itemContainer}>
                <View>
                    <Title>Volkswagen</Title>
                    <Description>Golf VII</Description>
                </View>
                <Image style={styles.icon} source={deleteIcon} alt={"Trash icon"}/>
            </View>
            <View style={styles.itemContainer}>
                <View>
                    <Title>Volkswagen</Title>
                    <Description>Golf VII</Description>
                </View>
                <Image style={styles.icon} source={deleteIcon} alt={"Trash icon"}/>
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    icon: {
        width: 20,
        height: 20,
        cursor: "pointer",
    }
});
