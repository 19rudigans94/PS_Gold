import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';

const MapPlacemark = ({ geometry, preset, iconColor }) => {
  if (!geometry) return null;

  return (
    <Placemark
      geometry={geometry}
      options={{
        preset,
        iconColor
      }}
    />
  );
};

export default MapPlacemark;