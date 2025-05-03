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
        <View style={[styles.tile, styles.blueTile]}>
          <Text style={styles.tileLabel}>Fuel Consumption</Text>
          <Text style={styles.tileValue}>10,51</Text>
          <Text style={styles.tileDesc}>Litres per 100km</Text>
        </View>
        <View style={[styles.tile, styles.darkTile]}>
          <Text style={styles.tileLabel}>Cost per kilometer</Text>
          <Text style={styles.tileValue}>0,642zł</Text>
        </View>
        <View style={[styles.tile, styles.darkTile]}>
          <Text style={styles.tileLabel}>Mileage</Text>
          <Text style={styles.tileValue}>147 248</Text>
        </View>
        <View style={[styles.tile, styles.blueTile]}>
          <Text style={styles.tileLabel}>Total cost</Text>
          <Text style={styles.tileValue}>14 654zł</Text>
          <Text style={styles.tileDesc}>In last 365 days</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartText}>
            
          Chart - on click na któryś z górnych kafelków
        </Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tile: {
    width: '48%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    justifyContent: 'center',
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
  tileLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  tileValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tileDesc: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
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
}); 