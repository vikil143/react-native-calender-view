# react-native-calender-view

Calendar UI view for react native apps 

## Installation

```jsx
npm install react-native-calender-view
```

## Usage

```jsx
import CalenderView from 'react-native-calender-view';

// ...

<CalenderView
  onDatePress={(date, events) => console.log('Date Pressed', date, events)}
/>;
```

## Props

| name               | description                                                  |       type | default |
| :----------------- | :----------------------------------------------------------- | ---------: | :------ |
| date               | Initial date showned date                                    |       Date | today   |
| markedDates        | See below for more details                                   |  ReactNode | -       |
| onDatePress        | Date Press function which gives date and events has a params |   Function | -       |
| selectedDateStyle  | Selected date style                                          |  ViewStyle | -       |
| selectedDateColor  | Selected Date Color                                          | ColorValue | -       |
| weekContainerStyle | week contianer styles                                        |  ViewStyle | -       |
| containerStyle     | Container Style                                              |  ViewStyle | -       |
| dateStyle          | Date Style mostly used for coloring the box                  |  ViewStyle | -       |
| weekEndColor       | Used for assign color for weekends dates                     | ColorValue | -       |

## markedDates

object which is accept dates has formatted DD-MM-YYYY dates to show on that date is any event was present or not.

| Type   | Required |
| ------ | -------- |
| object | No       |

```jsx
import CalenderView, { getFormattedDDMMYYYY } from 'react-native-calender-view';


const today = getFormattedDDMMYYYY(new Date()) // this utility function auto format date to required format which accepts "Date" has param
// ...

<CalenderView
  onDatePress={(date, events) => console.log('Date Pressed', date, events)}
  markedDates={{
    ['20-02-2023']: {
      events: [''], // Event array which would be return when "onDatePress"
    },
    [today]: {
        style?: ViewStyle,
        events?: any[],
        dotColors?: ColorValue[]
    }
  }}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
#
