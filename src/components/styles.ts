import { StyleSheet } from 'react-native';
import { DOT_SIZE } from '../constants';

export const styles = StyleSheet.create({
  padding5: { padding: 5 },
  container: {
    padding: 0,
    paddingBottom: 0,
    paddingEnd: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingStart: 0,
    paddingTop: 0,
    paddingVertical: 0,
    width: '100%',
  },
  pA5: {
    padding: 5,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginHorizontal: DOT_SIZE * 0.15,
  },
  dotContainer: {
    position: 'absolute',
    // bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedDate: {
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  prev: {
    transform: [{ rotate: '180deg' }],
  },
  next: {},
  arrow: {
    width: 15,
    height: 15,
  },
  headerText: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  notCurrentMonthText: {},
  notCurrentMonth: {
    opacity: 0.3,
  },

  date: {},
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width: DATE_WIDTH * WEEKS.length,
  },
  weekText: {},
  week: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    alignItems: 'center',
    width: '100%',
  },
});
