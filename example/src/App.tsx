import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import DateView, { getFormattedDDMMYYYY } from 'react-native-calender-view';

export default function App() {
  const [localEvents, setEvents] = React.useState<string[]>([]);
  return (
    <SafeAreaView style={[styles.root]}>
      <View style={styles.container}>
        <View style={[styles.padding20]} />
        <DateView
          onDatePress={(_, events) => setEvents(events ?? [])}
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
              events: [
                'Ram Navami',
                'Hunuman',
                'Shiv Ratri',
                'Krishna ashtami',
              ],
            },
            [getFormattedDDMMYYYY(new Date(2023, 7, 14))]: {
              events: ['1', '2', '54'],
            },
          }}
          weekEndColor="red"
        />
        <View>
          {localEvents.map((item, index) => {
            return (
              <View key={`event_${index}`} style={[styles.eventOnToday]}>
                <Text style={[styles.eText]}>Event on Today</Text>
                <Text style={[styles.eOnDay]}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  padding20: {
    padding: 20,
  },
  eOnDay: {
    fontSize: 20,
  },
  eText: {},
  eventOnToday: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    margin: 5,
    borderRadius: 5,
  },
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    // padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
