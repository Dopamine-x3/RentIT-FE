import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Div } from "../globalStyle";
import styled from "styled-components";


const Maps = ({ onInfoChange }) => {
  const { kakao } = window;
  const [info, setInfo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 }); // Default to Seoul

  useEffect(() => {
    if (!map) return;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.lng, position.lat, displayCenterInfo);
  }, [position, map]);

  function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      let detailAddr = !!result[0].road_address
        ? result[0].road_address.address_name
        : result[0].address.address_name;
      setKeyword(detailAddr);
    }
  }

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${keyword} 건물`, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const markersList = [];

        for (let i = 0; i < data.length; i++) {
          markersList.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address: data[i].address_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markersList);

        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  useEffect(() => {
    if (onInfoChange) {
      onInfoChange(info);
    }
  }, [info, onInfoChange]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") setKeyword(searchInputValue);
  };

  const handleMarkerClick = (marker) => {
    setInfo(marker);
  };

  return (
    <>
      <Map
        center={{ lat: position.lat, lng: position.lng }}
        level={3}
        style={{ width: "100%", height: "200px" }}
        onCreate={(map) => setMap(map)}
        onDragEnd={(map) => {
          setPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          });
        }}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      <SearchContainer>
        <div>
          <input
            type="text"
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            value={searchInputValue}
            placeholder="주소를 입력해주세요 ex) 강남역 or 서울특별시 역삼동"
            style={{ marginRight: "10px", width: '370px' }}

          />

        </div>
        <div>
        <MapBtn type="button" onClick={() => setKeyword(searchInputValue)}>
          검색
        </MapBtn>
        </div>
        {info && (
          <InfoItem>
            <p>Name: {info.content}</p>
            <p>Address: {info.address}</p>
          </InfoItem>
        )}
      </SearchContainer>

    </>
  );
};

export default Maps;

const MapBtn = styled.div`

  border: none;
  background-color: #0249ff;
  transition: 0.2ms;
  padding: 5px;
  width: 100%;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #033bca;
    transition: 0.2ms;
  }
`

const SearchContainer = styled.div`
margin-top: 10px;
margin-bottom: 3px;
  display: flex;
 justify-content: space-between;
 width: 100%;
`
const InfoItem = styled.div`
  
`