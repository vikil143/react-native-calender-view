import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getFullYear, getMonth } from '../helper';
import { AppImages } from '../assets';
import { FULLMONTHS } from '../constants';

interface HeaderProps {
  date: Date;
  onNextPress: () => void;
  onPrevPress: () => void;
}

export default function Header({
  date,
  onNextPress,
  onPrevPress,
}: HeaderProps) {
  return (
    <View style={[styles.headerContainer]}>
      <TouchableOpacity hitSlop={10} onPress={onPrevPress}>
        <View>
          <Image
            style={[styles.arrow, styles.prev]}
            source={AppImages.rightArrow}
          />
        </View>
      </TouchableOpacity>
      <Text style={[styles.headerText]}>
        {FULLMONTHS[getMonth(date)]} {getFullYear(date)}
      </Text>
      <TouchableOpacity hitSlop={10} onPress={onNextPress}>
        <Image
          style={[styles.arrow, styles.next]}
          source={AppImages.rightArrow}
        />
      </TouchableOpacity>
    </View>
  );
}
