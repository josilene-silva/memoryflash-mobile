import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import theme from '../../../global/styles/theme';

type Props = PickerSelectProps;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: theme.colors.text_dark,
    backgroundColor: theme.colors.background_input,
    fontFamily: theme.fonts.poppins_regular,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    color: theme.colors.text_dark,
    backgroundColor: theme.colors.background_input,
    fontFamily: theme.fonts.poppins_regular,
  },
});

export function Dropdown({ ...rest }: Props) {
  return <RNPickerSelect style={pickerSelectStyles} {...rest} />;
}
