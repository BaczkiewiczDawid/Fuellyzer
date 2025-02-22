import {StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import carImage from '../../assets/images/car.png';
import {MonthlySummary} from "@/components/header/monthly-summary";
import {HeaderNavigation} from "@/components/header/header-navigation";
import {useState} from "react";

const {width, height} = Dimensions.get("window");

export default function HomeScreen() {
    const [activeHeader, setActiveHeader] = useState(0);

    const summaryData = [
        {id: "0", type: "monthly"},
        {id: "1", type: "yearly"},
        {id: "2", type: "reminders"},
    ];

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveHeader(index);
    };

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
            <FlatList
                data={summaryData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.summaryPage}>
                        <MonthlySummary/>
                    </View>
                )}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={width}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                disableIntervalMomentum={true}
            />
            <HeaderNavigation activeHeader={activeHeader}/>
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
    },
    summaryPage: {
        width,
        height: "auto",
    },
});
