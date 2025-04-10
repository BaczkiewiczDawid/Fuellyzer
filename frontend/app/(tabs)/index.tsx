import {StyleSheet, View, Image, Dimensions, FlatList} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import carImage from '../../assets/images/car.png';
import {Summary} from "@/components/header/summary";
import {HeaderNavigation} from "@/components/header/header-navigation";
import {useState} from "react";
import {HistoryView} from "@/components/history/history-view";
import {SelectedCar} from "@/components/header/selected-car";

const {width} = Dimensions.get("window");

export default function HomeScreen() {
    const [activeHeader, setActiveHeader] = useState(0);

    const summaryData = ["monthly", "yearly", "reminders"]

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveHeader(index);
    };

    return (
        <Wrapper>
            <View style={styles.headerWrapper}>
                <SelectedCar/>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={carImage}/>
                </View>
            </View>
            <FlatList
                data={summaryData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => (
                    <View style={styles.summaryPage}>
                        <Summary type={item}/>
                    </View>
                )}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={width}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                disableIntervalMomentum={true}
            />
            <HeaderNavigation activeHeader={activeHeader} setActiveHeader={setActiveHeader}/>
            <HistoryView/>
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
