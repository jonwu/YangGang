import React from 'react';
import { View } from 'react-native';
import { useThemeKit } from 'utils/ThemeUtils';


const Root = () => {
  const {theme, gstyles} = useThemeKit();
  return <View/>;
}
export default Root;