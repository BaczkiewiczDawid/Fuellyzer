import {StyleSheet, Text, View, Image} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import carImage from '../../assets/images/car.png';

export default function HomeScreen() {
    return (
        <Wrapper>
            <View style={styles.headerWrapper}>
                <View style={styles.infoContainer}>
                    <Title>Volkswagen Golf VII</Title>
                    <Description>147 635km</Description>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={carImage}/>
                </View>
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
    },
    infoContainer: {
        width: "60%",
    },
    imageContainer: {
        flex: 1,
        width: "20%",
    },
    image: {
        alignItems: 'center',
        margin: "auto",
    }
});
