import React from 'react';
import { ZoomControl } from '@pbe/react-yandex-maps';

const MapControls = ({ position }) => {
  return <ZoomControl options={{ position }} />;
};

export default MapControls;