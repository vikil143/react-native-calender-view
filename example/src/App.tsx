import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import DateView, { getFormattedDDMMYYYY } from 'react-native-date-view';

export default function App() {
  return (
    <SafeAreaView style={[styles.root]}>
      <View style={styles.container}>
        <View style={{ padding: 10 }} />
        <DateView
          onDatePress={(date, events) =>
            console.log('Date Pressed', date, events)
          }
          markedDates={{
            [getFormattedDDMMYYYY(new Date(2023, 6, 22))]: {
              events: ['Ram Navami', 'Hunuman', 'Shiv Ratri', 'Gandhi'],
            },
            [getFormattedDDMMYYYY(new Date(2023, 6, 10))]: {
              events: ['1', '2', '4'],
            },
            [getFormattedDDMMYYYY(new Date(2023, 6, 3))]: {
              events: ['1', '2', '4'],
              dotColors: ['blue'],
            },
            [getFormattedDDMMYYYY(new Date())]: {
              events: ['1', '2'],
            },
            [getFormattedDDMMYYYY(new Date(2023, 7, 4))]: {
              events: ['1', '2'],
            },
            [getFormattedDDMMYYYY(new Date(2023, 7, 14))]: {
              events: ['1', '2', '54'],
            },
          }}
          weekEndColor="red"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
