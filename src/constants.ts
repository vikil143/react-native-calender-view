import { Dimensions } from 'react-native';

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const FULLMONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THUS', 'FRI', 'SAT'];

export const SINGLEWEEKS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const DOTSCOLORS = [
  '#B31312',
  '#2B2A4C',
  '#EA906C',
  '#4942E4',
  '#025464',
  '#E57C23',
  '#1B9C85',
  '#CBB279',
  '#9E4784',
  '#3F0071',
];

const { width, height } = Dimensions.get('screen');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const SIZE = Math.floor(SCREEN_WIDTH / WEEKS.length);

export const DOT_SIZE = 4;
