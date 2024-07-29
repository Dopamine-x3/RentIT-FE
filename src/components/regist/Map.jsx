// src/components/Map.jsx

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

const SearchInput = styled.input`
  margin: 10px;
  padding: 5px;
  font-size: 16px;
`;

const InfoDiv = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MarkerIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #1e90ff;
  border-radius: 50%;
  margin-right: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Map = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [buildingInfo, setBuildingInfo] = useState({});
  const mapContainerRef = useRef(null);
  const infowindow = useRef(null);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise((resolve) => {
        if (window.kakao) {
          resolve(window.kakao);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a6d9cc25b43f0d4b02155ba9a5d84cb3&autoload=false';
        script.onload = () => resolve(window.kakao);
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      const kakao = await loadKakaoMapScript();
      kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const mapInstance = new kakao.maps.Map(mapContainerRef.current, mapOption);
        setMap(mapInstance);
      });
    };

    initializeMap();
  }, []);

  const searchPlaces = () => {
    if (!searchInput.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchInput, placesSearchCB);
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places) => {
    removeAllMarkers();
    const bounds = new kakao.maps.LatLngBounds();
    const fragment = document.createDocumentFragment();

    places.forEach((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      const itemEl = getListItem(index, place);

      bounds.extend(placePosition);

      marker.addListener('mouseover', () => {
        displayInfowindow(marker, place.place_name);
      });

      marker.addListener('click', () => {
        addLocationDiv(place);
      });

      marker.addListener('mouseout', () => {
        infowindow.current?.close();
      });

      itemEl.addEventListener('mouseover', () => {
        displayInfowindow(marker, place.place_name);
      });

      itemEl.addEventListener('mouseout', () => {
        infowindow.current?.close();
      });

      fragment.appendChild(itemEl);
    });

    const listEl = document.getElementById('placesList');
    removeAllChildNodes(listEl);
    listEl.appendChild(fragment);

    const menuEl = document.getElementById('menu_wrap');
    menuEl.scrollTop = 0;
    map.setBounds(bounds);
  };

  const getListItem = (index, place) => {
    const el = document.createElement('li');
    el.className = 'item';
    el.innerHTML = `
      <MarkerIcon class="markerbg marker_${index + 1}"></MarkerIcon>
      <div class="info">
        <h5>${place.place_name}</h5>
        ${place.road_address_name ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>` : `<span>${place.address_name}</span>`}
        <span class="tel">${place.phone}</span>
      </div>
    `;
    el.addEventListener('click', () => addLocationDiv(place));
    return el;
  };

  const addLocationDiv = (place) => {
    const locationHtml = `
      <div class="card mt-3">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col-1">
              <i class="bi bi-geo-alt-fill fa-2x"></i>
            </div>
            <div class="col ms-3">
              <div class="font-weight-bold text-success text-uppercase mb-1">
                ${place.place_name}
              </div>
              <div class="text-black-50 font-weight-bold small">
                ${place.road_address_name}
              </div>
            </div>
            <div class="col-auto">
              <button
                class="btn btn-lg btn-transparent"
                onClick={deleteLocation}
              >
                <i class="bi bi-x-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    setBuildingInfo({
      id: place.id,
      placeName: place.place_name,
      roadAddressName: place.road_address_name,
      placeUrl: place.place_url,
      latitude: place.y,
      longitude: place.x,
    });

    const locateDiv = document.getElementById('locateDiv');
    locateDiv.innerHTML = locationHtml;

    const locateOffset = locateDiv.offsetTop;
    window.scrollTo({
      top: locateOffset,
      behavior: 'smooth',
    });

    locateDiv.classList.add('blinking');
    setTimeout(() => {
      locateDiv.classList.remove('blinking');
    }, 1000);

    // Update hidden inputs
    document.getElementById('placeName').value = place.place_name;
    document.getElementById('roadAddressName').value = place.road_address_name;
  };

  const deleteLocation = () => {
    document.getElementById('locateDiv').innerHTML = '';
    setBuildingInfo({});
    document.getElementById('placeName').value = '';
    document.getElementById('roadAddressName').value = '';
  };

  const addMarker = (position, idx) => {
    const kakao = window.kakao;
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
      offset: new kakao.maps.Point(13, 37),
    };

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeAllMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById('pagination');
    removeAllChildNodes(paginationEl);

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = () => pagination.gotoPage(i);
      }

      paginationEl.appendChild(el);
    }
  };

  const displayInfowindow = (marker, title) => {
    if (infowindow.current) {
      infowindow.current.close();
    }

    const kakao = window.kakao;
    const infowindowInstance = new kakao.maps.InfoWindow({
      position: marker.getPosition(),
      content: `<span class="info-title">${title}</span>`,
    });

    infowindowInstance.open(map, marker);
    infowindow.current = infowindowInstance;
  };

  const removeAllChildNodes = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  return (
    <div>
      <SearchInput
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="건물명을 입력하세요"
      />
      <button onClick={searchPlaces}>검색</button>
      <MapContainer ref={mapContainerRef}></MapContainer>
      <InfoDiv id="locateDiv">
        {buildingInfo.placeName && (
          <div className="card mt-3">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col-1">
                  <i className="bi bi-geo-alt-fill fa-2x"></i>
                </div>
                <div className="col ms-3">
                  <div className="font-weight-bold text-success text-uppercase mb-1">
                    {buildingInfo.placeName}
                  </div>
                  <div className="text-black-50 font-weight-bold small">
                    {buildingInfo.roadAddressName}
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-lg btn-transparent"
                    onClick={deleteLocation}
                  >
                    <i className="bi bi-x-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </InfoDiv>
      <HiddenInput type="hidden" id="placeName" name="placeName" />
      <HiddenInput type="hidden" id="roadAddressName" name="roadAddressName" />
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  );
};

export default Map;
