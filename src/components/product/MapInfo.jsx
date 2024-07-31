import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Div } from "../globalStyle";
import styled from "styled-components";

const MapInfo = ({ addressName, buildingName }) => {
  const { kakao } = window;
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 }); // Default to Seoul
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!map) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(addressName, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { y: lat, x: lng } = result[0];
        setPosition({ lat, lng });
        setInfo({ content: buildingName, address: addressName });
      }
    });
  }, [map, addressName, buildingName]);

  const handleMarkerClick = () => {
    window.open(`https://map.kakao.com/link/search/${addressName}`, "_blank");
  };

  return (
    <>
      <Map
        center={{ lat: position.lat, lng: position.lng }}
        level={3}
        style={{ marginTop:"20px" ,width: "567px", height: "115px" }}
        onCreate={setMap}
      >
        {info && (
          <MapMarker
            position={position}
            onClick={handleMarkerClick}
          >
            <div style={{ color: "#000" }}>{info.content}</div>
          </MapMarker>
        )}
      </Map>
    </>
  );
};

export default MapInfo;
