import React, { useEffect } from 'react';

const MapComponent = ({ places }) => {
  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울)
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    if (places.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();

      places.forEach((place) => {
        const markerPosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);
        bounds.extend(markerPosition);
      });

      map.setBounds(bounds);
    }
  }, [places]);

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;
