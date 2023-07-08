import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface LoaderProps {
  show: boolean;
}

export default function Loader({ show }: LoaderProps) {
  return (
    <View
      style={[
        styles.loaderContainer,
        { backgroundColor: '#ddd', opacity: show ? 0.5 : 0 },
      ]}
      pointerEvents="none"
    >
      <ActivityIndicator />
    </View>
  );
}
