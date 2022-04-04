import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PickerSelectProps } from 'react-native-picker-select';
import { Dropdown } from '../Dropdown';

import { Container, Error } from './styles';

interface Props extends Omit<PickerSelectProps, 'onValueChange'> {
  control: Control;
  name: string;
  error: string | undefined;
}

export function DropdownForm({
  control,
  placeholder,
  items,
  name,
  error,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            items={items}
            placeholder={placeholder}
            onValueChange={onChange}
            useNativeAndroidPickerStyle={false}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
