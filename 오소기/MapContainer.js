// src/components/MapContainer.js
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [places, setPlaces] = useState([]);
  const [toilets, setToilets] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 37.5665, // 서울의 위도 (기본 중심 위치)
    lng: 126.9780 // 서울의 경도
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(newPosition);
          loadNearbyPlaces(newPosition, "convenience_store", setPlaces);
          loadNearbyPlaces(newPosition, "toilet", setToilets);
          console.log("Initial position: ", position.coords);
        },
        (error) => {
          console.error("Error getting location", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000, // 30초 내에 위치를 가져오지 못하면 실패로 처리
          maximumAge: 0 // 항상 최신 위치를 가져오도록 설정
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // 위치 변화 감지하여 업데이트
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentPosition(newPosition);
        loadNearbyPlaces(newPosition, "convenience_store", setPlaces);
        loadNearbyPlaces(newPosition, "toilet", setToilets);
        console.log("Updated position: ", position.coords);
      },
      (error) => {
        console.error("Error watching location", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // 30초 내에 위치를 가져오지 못하면 실패로 처리
        maximumAge: 0 // 항상 최신 위치를 가져오도록 설정
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const loadNearbyPlaces = (position, type, setPlacesCallback) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: position,
      radius: "1000", // 1km 반경으로 변경
      type: [type] // 검색할 장소 유형 (편의점 또는 화장실)
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlacesCallback(results);
      } else {
        console.error(`Places service status (${type}): `, status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={currentPosition || defaultCenter}
      >
        {currentPosition && (
          // 현재 사용자의 위치를 파란색 마커로 표시합니다.
          <Marker
            position={currentPosition}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
          />
        )}
        {places.map((place, index) => (
          // 주변 편의점을 빨간색 마커로 표시합니다.
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
            onClick={() => setSelectedPlace(place)}
          />
        ))}
        {toilets.map((toilet, index) => (
          // 주변 화장실을 초록색 마커로 표시합니다.
          <Marker
            key={index}
            position={{
              lat: toilet.geometry.location.lat(),
              lng: toilet.geometry.location.lng()
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }}
            onClick={() => setSelectedPlace(toilet)}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
              <p>{selectedPlace.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
