import React from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import MapPlacemark from './MapPlacemark';
import MapControls from './MapControls';
import { mapPresets, mapControls, defaultMapConfig } from '../../config/mapConfig';

const DeliveryMap = ({ courierLocation, deliveryAddress }) => {
  const mapState = React.useMemo(() => ({
    center: courierLocation || defaultMapConfig.defaultCenter,
    zoom: defaultMapConfig.defaultZoom,
    controls: []
  }), [courierLocation]);

  const mapOptions = React.useMemo(() => ({
    suppressMapOpenBlock: true,
    yandexMapDisablePoiInteractivity: true
  }), []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-[500px]">
        <YMaps query={{ lang: defaultMapConfig.language }}>
          <Map
            state={mapState}
            width="100%"
            height="100%"
            options={mapOptions}
          >
            <MapPlacemark
              geometry={courierLocation}
              {...mapPresets.courier}
            />
            <MapPlacemark
              geometry={deliveryAddress}
              {...mapPresets.destination}
            />
            <MapControls {...mapControls.zoom} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default DeliveryMap;