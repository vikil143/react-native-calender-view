import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  PixelRatio,
  ColorValue,
} from 'react-native';
import React, { useState, useMemo, useRef } from 'react';
import { DOTSCOLORS, SINGLEWEEKS, SIZE } from '../constants';
import Loader from './Loader';
import {
  getFormattedDDMMYYYY,
  getFullYear,
  getLastDate,
  getMonth,
  getWeek,
  isWeekEnd,
} from '../helper';
import Header from './Header';
import { styles } from './styles';

type WeekEndColor = {
  weekEndColor?: ColorValue;
};

type MarkedDateData = {
  style?: ViewStyle[];
  events?: string[];
  dotColors?: ColorValue[];
};

type MarkedDates = {
  [date: string]: MarkedDateData;
};

type CommonType = {
  boxSize: number;
};

type WeekStyles = {
  weekContainerStyle?: ViewStyle | ViewStyle[];
};

type ContainerStyle = {
  containerStyle?: ViewStyle | ViewStyle[];
};

type DateStyle = {
  dateStyle?: ViewStyle | ViewStyle[];
};

interface WeeksProps extends WeekStyles, CommonType {}

function WeeksComp({ weekContainerStyle, boxSize }: WeeksProps) {
  return (
    <View style={[styles.weekContainer, weekContainerStyle]}>
      {SINGLEWEEKS.map((item, index) => {
        return (
          <View
            key={`${item}-${index}`}
            style={[styles.week, { width: boxSize, minHeight: boxSize * 0.8 }]}
          >
            <Text style={[styles.weekText, { fontSize: (boxSize * 28) / 100 }]}>
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

interface DateProps extends CommonType, DateStyle {
  date: number;
  showDots?: boolean;
  notAnCurrentMonth?: boolean;
  viewStyle?: ViewStyle[];
  textStyle?: TextStyle;
  dateData?: MarkedDateData;
  onPress: () => void;
}

function DateComp({
  date,
  notAnCurrentMonth = false,
  viewStyle,
  textStyle,
  boxSize,
  dateStyle,
  dateData,
  showDots,
  onPress,
}: DateProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.dateContainer,
          viewStyle,
          dateStyle,
          {
            width: boxSize,
            minHeight: boxSize,
          },
          notAnCurrentMonth && styles.notCurrentMonth,
        ]}
      >
        <Text
          style={[
            styles.date,
            {
              fontSize: boxSize * (28 / 100),
            },
            textStyle,
            notAnCurrentMonth && styles.notCurrentMonthText,
          ]}
        >
          {date}
        </Text>
        <View
          style={[
            styles.dotContainer,
            { top: boxSize * 0.5 + (boxSize * (28 / 100)) / 2 + 5 },
          ]}
        >
          {showDots &&
            dateData?.events
              ?.filter((_, index) => index < 4)
              .map((item, index) => {
                let stored = dateData?.dotColors ?? [];
                return (
                  <View
                    key={`${item}-${index}`}
                    style={[
                      // styles.dot,
                      {
                        width: boxSize * (8.5 / 100),
                        height: boxSize * (8.5 / 100),
                        borderRadius: boxSize * (8.5 / 100),
                        marginHorizontal: boxSize * (8.5 / 100) * 0.15,
                      },
                      { backgroundColor: stored[index] ?? DOTSCOLORS[index] },
                    ]}
                  />
                );
              })}
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface OtherMonthsProps extends CommonType, DateStyle {
  dates: number[];
  offset: number;
  onPress: (date: number) => void;
}

function OtherMonthDates({
  dates,
  offset,
  boxSize,
  dateStyle,
  onPress,
}: OtherMonthsProps) {
  return (
    <>
      {dates.map((_, index) => {
        return (
          <DateComp
            key={index}
            boxSize={boxSize}
            date={offset + index}
            notAnCurrentMonth
            onPress={() => onPress(offset + index)}
            dateStyle={dateStyle}
            // onPress={}
            // viewStyle={getCurrentViewStyle()}
          />
        );
      })}
    </>
  );
}

interface CurrentMonthDatesProps extends CommonType, DateStyle, WeekEndColor {
  year: number;
  month: number;
  dates: number[];
  offset: number;
  showDots: boolean;
  selectedDate: Date;
  markedDates: MarkedDates;
  onPress: (date: Date, events?: string[]) => void;
}

function CurMonthDates({
  dates,
  offset,
  boxSize,
  markedDates,
  weekEndColor,
  onPress,
  month,
  year,
  dateStyle,
  showDots,
}: CurrentMonthDatesProps) {
  const getCurrentViewStyle = (style: ViewStyle[]): ViewStyle[] => {
    return style;
  };

  const getCurrentTextStyle = (date: Date): TextStyle => {
    let shouldHight = isWeekEnd(getWeek(date));
    return {
      color: shouldHight ? weekEndColor : '#000',
    };
  };

  return (
    <>
      {dates.map((_, index) => {
        const iterated = new Date(year, month, offset + index);
        const tempStore = markedDates[getFormattedDDMMYYYY(iterated)];
        const selectedDate = tempStore
          ? tempStore
          : { style: [], events: [], dotColors: [] };
        // This was typescript problem need to find some solution
        // const onPressPassingValues: [Date] = [iterated];
        // if (Array.isArray(tempStore?.events)) {
        //   onPressPassingValues.push(selectedDate.events);
        // }

        return (
          <DateComp
            key={index}
            boxSize={boxSize}
            showDots={showDots}
            date={offset + index}
            onPress={() => onPress(iterated, tempStore?.events)}
            dateStyle={dateStyle}
            viewStyle={getCurrentViewStyle(selectedDate.style!)}
            dateData={selectedDate}
            textStyle={getCurrentTextStyle(iterated)}
            // textStyle={
            //     getCurrentTextStyle()
            //     // new Date(year, month, index + offset),
            // }
          />
        );
      })}
    </>
  );
}

interface MonthsProps extends CommonType, DateStyle, WeekEndColor {
  date: Date;
  showDots: boolean;
  selectedDate: Date;
  markedDates: MarkedDates;
  onCurrentDatePress: (date: Date, events?: string[]) => void;
  onPreviousDatePress: (date: number) => void;
  onNextDatePress: (date: number) => void;
}

function Month({
  date,
  boxSize,
  showDots,
  dateStyle,
  markedDates,
  weekEndColor,
  selectedDate,
  onCurrentDatePress,
  onPreviousDatePress,
  onNextDatePress,
}: MonthsProps) {
  const year = getFullYear(date);
  const month = getMonth(date);
  const currentMonthLastDate = getLastDate(date).getDate();
  const lastMonthLastDate = getLastDate(new Date(year, month, 0)).getDate();
  // Below week minus by 1 so its adjust for monday
  // ===============================Ignore below comment========================================
  // Increased by one number so week get match with respective values so increament start with 1
  // ===========================================================================================
  const currentStartWeek = getWeek(new Date(year, month, 1));

  const currentLastWeek = getWeek(new Date(year, month + 1, 0)) + 1;

  return (
    <View style={[styles.monthContainer]}>
      <OtherMonthDates
        offset={lastMonthLastDate - currentStartWeek + 1}
        dates={Array.from({ length: currentStartWeek })}
        boxSize={boxSize}
        dateStyle={dateStyle}
        onPress={onPreviousDatePress}
      />
      <CurMonthDates
        offset={1}
        showDots={showDots}
        dates={Array.from({ length: currentMonthLastDate })}
        selectedDate={selectedDate}
        markedDates={markedDates}
        weekEndColor={weekEndColor}
        onPress={onCurrentDatePress}
        dateStyle={dateStyle}
        {...{ month, year, boxSize }}
      />
      <OtherMonthDates
        offset={1}
        dates={Array.from({ length: SINGLEWEEKS.length - currentLastWeek })}
        boxSize={boxSize}
        dateStyle={dateStyle}
        onPress={onNextDatePress}
      />
    </View>
  );
}

export interface CalenderProps
  extends WeekStyles,
    ContainerStyle,
    DateStyle,
    WeekEndColor {
  date?: Date;
  selectedDateColor?: ColorValue;
  selectedDateStyle?: ViewStyle;
  markedDates?: MarkedDates;
  onDatePress?: (date: Date, events?: string[]) => void;
}

export default function MainView({
  weekContainerStyle,
  selectedDateColor,
  containerStyle,
  weekEndColor = '#000',
  markedDates: mD = {},
  selectedDateStyle,
  dateStyle,
  date,
  onDatePress,
}: CalenderProps) {
  const today = new Date();
  const defaultDate = date ?? today;
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [movingDate, setMovingDate] = useState(defaultDate);
  const selectedYear = getFullYear(movingDate);
  const selectedMonth = getMonth(movingDate);
  const [initLoader, setInitLoader] = useState(true);
  const [loader, _] = useState(false);
  const width = useRef(SINGLEWEEKS.length);
  const boxSize = useMemo(
    () =>
      PixelRatio.roundToNearestPixel(
        Math.floor(width.current / SINGLEWEEKS.length)
      ),
    [initLoader]
  );
  const markedDates: MarkedDates = useMemo(() => {
    const selectedDateMD = mD[getFormattedDDMMYYYY(selectedDate)] ?? {};
    return {
      ...mD,
      [getFormattedDDMMYYYY(selectedDate)]: {
        ...selectedDateMD,
        style: [
          styles.selectedDate,
          {
            ...selectedDateMD.style,
            ...selectedDateStyle,
            backgroundColor: selectedDateColor ?? '#ddd',
          },
        ],
      },
    };
  }, [selectedDate]);

  const preMovingDate = () =>
    setMovingDate(new Date(selectedYear, selectedMonth - 1, 1));

  const nextMovingDate = () =>
    setMovingDate(new Date(selectedYear, selectedMonth + 1, 1));

  const onHandlePrevMonth = (date: number) => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, date));
    preMovingDate();
  };

  const onHandleNextMonth = (date: number) => {
    setSelectedDate(new Date(selectedYear, selectedMonth + 1, date));
    nextMovingDate();
  };

  const onHandleDatePress = (date: Date, events?: string[]) => {
    typeof onDatePress === 'function' && onDatePress(date, events);
    setSelectedDate(date);
  };

  return (
    <View
      style={[
        styles.root,
        { height: initLoader ? SIZE * 5 : undefined },
        containerStyle,
        // To stop force full updates
        {
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
      ]}
      onLayout={(e) => {
        width.current = e.nativeEvent.layout.width;
        setInitLoader(false);
      }}
    >
      <View style={[styles.pA5]} />
      <Header
        onPrevPress={preMovingDate}
        onNextPress={nextMovingDate}
        date={movingDate}
        boxSize={boxSize}
      />
      <View style={{ padding: 5 }} />
      <WeeksComp boxSize={boxSize} weekContainerStyle={weekContainerStyle} />
      <Month
        showDots={!initLoader}
        boxSize={boxSize}
        date={movingDate}
        selectedDate={selectedDate}
        markedDates={markedDates}
        weekEndColor={weekEndColor}
        dateStyle={dateStyle}
        onCurrentDatePress={onHandleDatePress}
        onPreviousDatePress={onHandlePrevMonth}
        onNextDatePress={onHandleNextMonth}
      />
      <Loader show={initLoader || loader} />
    </View>
  );
}
