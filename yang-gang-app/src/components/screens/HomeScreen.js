import React from 'react';
import { View, Text } from 'react-native';
import { useThemeKit } from 'utils/ThemeUtils';
import { useSelector, useDispatch } from 'react-redux'

const styles = (theme) => {

}

const HomeScreen = () => {
  const {theme, gstyles, styles} = useThemeKit(styles);
  return <View/>;
}

export default HomeScreen;