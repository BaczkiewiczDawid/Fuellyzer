import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wrapper } from '@/components/wrapper';
import CustomSelect from '@/components/customSelect';

const carOptions = [
    { label: 'Volkswagen Golf VII', value: 'golf7' },
    { label: 'Toyota Corolla', value: 'corolla' },
];
const yearOptions = [
    { label: 'This year', value: 'this_year' },
    { label: 'Last year', value: 'last_year' },
];

export default function StatisticsScreen() {
    const [selectedCar, setSelectedCar] = useState(carOptions[0].value);
    const [selectedYear, setSelectedYear] = useState(yearOptions[0].value);
    const [activeTile, setActiveTile] = useState('fuel');

    return (
        <Wrapper>
            <View style={styles.headerRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <CustomSelect
                        value={selectedCar}
                        onChange={setSelectedCar}
                        options={carOptions}
                        placeholder="Select car"
                    />
                </View>
                <View style={{ width: 120 }}>
                    <CustomSelect
                        value={selectedYear}
                        onChange={setSelectedYear}
                        options={yearOptions}
                        placeholder="Select year"
                    />
                </View>
            </View>
            <View style={styles.tilesGrid}>
                <View style={styles.column}>
                    <View style={[styles.tile, styles.largeBlueTile]}>
                        <View style={styles.topView}>
                            <Text style={styles.tileLabel}>Fuel Consumption</Text>
                            <Text style={styles.tileValue}>10,51</Text>
                        </View>
                        <Text style={styles.tileDesc}>Litres per 100km</Text>
                    </View>
                    <View style={[styles.tile, styles.smallDarkTile]}>
                        <Text style={styles.tileLabel}>Mileage</Text>
                        <Text style={styles.tileValue}>147 248</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={[styles.tile, styles.smallDarkTile]}>
                        <Text style={styles.tileLabel}>Cost per kilometer</Text>
                        <Text style={styles.tileValue}>0,64zł</Text>
                    </View>
                    <View style={[styles.tile, styles.largeBlueTile]}>
                        <View style={styles.topView}>
                            <Text style={styles.tileLabel}>Total cost</Text>
                            <Text style={styles.tileValue}>14 654zł</Text>
                        </View>
                        <Text style={styles.tileDesc}>In last 365 days</Text>
                    </View>
                </View>
            </View>

            <View style={styles.chartContainer}></View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
    },
    blueTile: {
        backgroundColor: '#0F77F0',
        height: 160,
    },
    darkTile: {
        backgroundColor: '#181F23',
        height: 110,
    },
    activeTile: {
        borderWidth: 2,
        borderColor: '#FFD600',
    },
    chartContainer: {
        backgroundColor: '#181F23',
        borderRadius: 16,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    tilesGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        columnGap: 20,
    },
    column: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 16,
    },
    tile: {
        borderRadius: 24,
        padding: 18,
        justifyContent: 'center',
    },
    largeBlueTile: {
        backgroundColor: '#0F77F0',
        height: 160,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    smallDarkTile: {
        backgroundColor: '#181F23',
        height: 110,
    },
    tileLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    tileValue: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    tileDesc: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
    topView: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
}); 