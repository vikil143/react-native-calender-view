import { View, ActivityIndicator, ViewStyle } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface LoaderProps {
  show: boolean;
}

export default function Loader({ show }: LoaderProps) {
  const style: ViewStyle = {
    backgroundColor: '#ddd',
    opacity: show ? 0.5 : 0,
  };

  return (
    <View style={[styles.loaderContainer, style]} pointerEvents="none">
      <ActivityIndicator />
    </View>
  );
}
