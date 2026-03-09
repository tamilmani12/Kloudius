import { Platform } from 'react-native';

import Constants from 'expo-constants';
import { Dimensions, PixelRatio } from 'react-native';

export const statusBarHeight = Constants.statusBarHeight;
export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;
const scale = Width / 375;
const Baseheight= Height / 812;
export function calculatedwidth(size: number) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
 
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
export function hs(size: number) {
  const newSize = size * Baseheight
  if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


