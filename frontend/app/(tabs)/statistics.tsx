import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wrapper } from '@/components/wrapper';
import CustomSelect from '@/components/customSelect';
import { useApi } from '@/hooks/useApi';
import { DataFormatter } from '@/helpers/data-formatter';

const yearOptions = [
    { label: 'This year', value: 'this_year' },
    { label: 'Last year', value: 'last_year' },
];

export default function StatisticsScreen() {
    const [carOptions, setCarOptions] = useState<{ label: string, value: string, mileage: number }[]>([]);
    const [selectedCar, setSelectedCar] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState(yearOptions[0].value);
    const [carHistory, setCarHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            const options = response.map((car: any) => ({
                label: `${car.carBrand} ${car.carName}`,
                value: `${car.carBrand}_${car.carName}`,
                mileage: car.mileage
            }));
            setCarOptions(options);
            if (options.length > 0) setSelectedCar(options[0].value);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!selectedCar) return;

            try {
                const historyData = await useApi("http://localhost:4000/history", "GET");
                setCarHistory(historyData);
            } catch (error) {
                console.error("Failed to fetch car history:", error);
                setCarHistory([]);
            }
        };

        fetchHistory();
    }, [selectedCar, selectedYear]);

    const calculateAverageFuelConsumption = () => {
        if (!carHistory || carHistory.length === 0 || !selectedCar) return 0;

        const [selectedBrand, ...selectedNameParts] = selectedCar.split('_');
        const selectedName = selectedNameParts.join(' ');

        const currentYear = new Date().getFullYear();
        const targetYear = selectedYear === 'this_year' ? currentYear : currentYear - 1;

        const fuelEntries = carHistory.filter(entry => {
            const entryDate = new Date(entry.date);
            return (
                entry.carBrand === selectedBrand &&
                entry.carName === selectedName &&
                entryDate.getFullYear() === targetYear &&
                entry.type === 'Refuel' &&
                entry.total && entry.mileage
            );
        });

        if (fuelEntries.length < 2) return 0;

        fuelEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const relevantEntries = fuelEntries.slice(1);
        const totalLiters = relevantEntries.reduce((sum, entry) => sum + (parseFloat(entry.fuelPrice) > 0 ? parseFloat(entry.total) / parseFloat(entry.fuelPrice) : 0), 0);
        const distance = fuelEntries[fuelEntries.length - 1].mileage - fuelEntries[0].mileage;

        return distance > 0 ? (totalLiters / distance) * 100 : 0;
    };

    const calculateAverageCostPerKilometer = () => {
        if (!carHistory || carHistory.length === 0 || !selectedCar) return 0;

        const [selectedBrand, ...selectedNameParts] = selectedCar.split('_');
        const selectedName = selectedNameParts.join(' ');

        const currentYear = new Date().getFullYear();
        const targetYear = selectedYear === 'this_year' ? currentYear : currentYear - 1;

        const costEntries = carHistory.filter(entry => {
            const entryDate = new Date(entry.date);
            return (
                entry.carBrand === selectedBrand &&
                entry.carName === selectedName &&
                entryDate.getFullYear() === targetYear &&
                entry.total && entry.mileage
            );
        });

        if (costEntries.length < 2) return 0;

        costEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const totalCost = costEntries.reduce((sum, entry) => sum + parseFloat(entry.total), 0);
        const distance = costEntries[costEntries.length - 1].mileage - costEntries[0].mileage;

        return distance > 0 ? totalCost / distance : 0;
    };

    const calculateTotalCost = () => {
        if (!carHistory || carHistory.length === 0 || !selectedCar) return 0;

        const [selectedBrand, ...selectedNameParts] = selectedCar.split('_');
        const selectedName = selectedNameParts.join(' ');

        const currentYear = new Date().getFullYear();
        const targetYear = selectedYear === 'this_year' ? currentYear : currentYear - 1;
        const currentDate = new Date();

        const costEntries = carHistory.filter(entry => {
            const entryDate = new Date(entry.date);

            if (selectedYear === 'this_year') {
                const oneYearAgo = new Date();
                oneYearAgo.setDate(oneYearAgo.getDate() - 365);
                return (
                    entry.carBrand === selectedBrand &&
                    entry.carName === selectedName &&
                    entryDate >= oneYearAgo &&
                    entryDate <= currentDate &&
                    entry.total
                );
            } else {
                return (
                    entry.carBrand === selectedBrand &&
                    entry.carName === selectedName &&
                    entryDate.getFullYear() === targetYear &&
                    entry.total
                );
            }
        });

        const totalCost = costEntries.reduce((sum, entry) => sum + parseFloat(entry.total), 0);
        return totalCost;
    };

    const averageFuelConsumption = calculateAverageFuelConsumption()
    const averageCostPerKilometer = calculateAverageCostPerKilometer()
    const totalCost = calculateTotalCost()

    console.log(totalCost)

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
                            <Text style={styles.tileValue}>{averageFuelConsumption.toFixed(2).replace(".", ",")}</Text>
                        </View>
                        <Text style={styles.tileDesc}>Litres per 100km</Text>
                    </View>
                    <View style={[styles.tile, styles.smallDarkTile]}>
                        <Text style={styles.tileLabel}>Mileage</Text>
                        <Text style={styles.tileValue}>{DataFormatter(carOptions.find((car) => car.value === selectedCar)?.mileage, "kilometers")}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={[styles.tile, styles.smallDarkTile]}>
                        <Text style={styles.tileLabel}>Cost per kilometer</Text>
                        <Text style={styles.tileValue}>{DataFormatter(averageCostPerKilometer, "moneyRounded")}</Text>
                    </View>
                    <View style={[styles.tile, styles.largeBlueTile]}>
                        <View style={styles.topView}>
                            <Text style={styles.tileLabel}>Total cost</Text>
                            <Text style={styles.tileValue}>{DataFormatter(totalCost, "moneyRounded")}</Text>
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