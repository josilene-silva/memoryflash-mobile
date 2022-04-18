/* eslint-disable global-require */
import React from 'react';
import { Image, View } from 'react-native';

import { Text } from 'src/components/Text';

export function Profile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{
          maxHeight: 400,
          maxWidth: 300,
          resizeMode: 'contain',
        }}
        source={require('src/assets/images/building.png')}
      />
      <Text
        variant={{
          fontFamily: 'poppins_medium',
          fontSize: 20,
          color: 'primary',
        }}
      >
        {'<'} Em construção {'/>'}
      </Text>
    </View>
  );
}
