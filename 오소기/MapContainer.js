// src/components/MapContainer.js
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [places, setPlaces] = useState([]);
  const [toilets, setToilets] = useState([]);
  const [landmarks, setLandmarks] = useState([]); // 주변 유명 랜드마크 추가
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directions, setDirections] = useState(null);

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
          loadNearbyPlaces(newPosition, "tourist_attraction", setLandmarks); // 유명 랜드마크 로드
          console.log("Initial position: ", position.coords);
        },
        (error) => {
          console.error("Error getting location", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 60000, // 60초 내에 위치를 가져오지 못하면 실패로 처리
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
        loadNearbyPlaces(newPosition, "tourist_attraction", setLandmarks); // 유명 랜드마크 로드
        console.log("Updated position: ", position.coords);
      },
      (error) => {
        console.error("Error watching location", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 60000, // 60초 내에 위치를 가져오지 못하면 실패로 처리
        maximumAge: 0 // 항상 최신 위치를 가져오도록 설정
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const loadNearbyPlaces = (position, type, setPlacesCallback) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: position,
      radius: "1000", // 반경 1km
      type: [type], // 장소 유형
      rankBy: window.google.maps.places.RankBy.PROMINENCE // 인기 순 정렬
    };

    service.nearbySearch(request, (results, status) => {
      console.log(`Searching for type: ${type}`); // 로그 추가
      console.log("Request results:", results); // 결과 확인
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlacesCallback(results);
      } else {
        console.error(`Places service status (${type}): `, status); // 상태 확인
      }
    });
  };

  const findNearest = (places) => {
    if (!currentPosition || places.length === 0) return null;
    return places.reduce((nearest, place) => {
      const distanceToPlace = Math.hypot(
        place.geometry.location.lat() - currentPosition.lat,
        place.geometry.location.lng() - currentPosition.lng
      );
      const distanceToNearest = Math.hypot(
        nearest.geometry.location.lat() - currentPosition.lat,
        nearest.geometry.location.lng() - currentPosition.lng
      );
      return distanceToPlace < distanceToNearest ? place : nearest;
    }, places[0]);
  };

  const handleNavigate = (type) => {
    console.log(`Navigating to the nearest ${type}`); // 버튼 클릭 시 로그 확인
    const target = type === "convenience_store" ? findNearest(places) : findNearest(toilets);
    console.log("Current Position:", currentPosition);
    console.log("Target:", target);
    if (target && currentPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,
          destination: {
            lat: target.geometry.location.lat(),
            lng: target.geometry.location.lng()
          },
          travelMode: window.google.maps.TravelMode.WALKING // 도보로 경로 안내
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log("Directions result:", result); // 경로 요청 성공 여부 확인
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };

  const fetchPlaceDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
      } else {
        console.error("Error fetching place details:", status);
        setSelectedPlace(null); // 실패한 경우 초기화
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div>
        <button onClick={() => handleNavigate("convenience_store")}>가장 가까운 편의점 길안내</button>
        <button onClick={() => handleNavigate("toilet")}>가장 가까운 화장실 길안내</button>
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
          {landmarks.map((landmark, index) => (
            // 주변 랜드마크를 노란색 마커로 표시합니다.
            <Marker
              key={index}
              position={{
                lat: landmark.geometry.location.lat(),
                lng: landmark.geometry.location.lng()
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
              }}
              onClick={() => fetchPlaceDetails(landmark.place_id)}
            />
          ))}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry?.location?.lat() || currentPosition?.lat,
                lng: selectedPlace.geometry?.location?.lng() || currentPosition?.lng,
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{selectedPlace.name}</h4>
                <p>{selectedPlace.vicinity}</p>
                {selectedPlace.formatted_address && <p>주소: {selectedPlace.formatted_address}</p>}
                {selectedPlace.formatted_phone_number && <p>전화: {selectedPlace.formatted_phone_number}</p>}
                {selectedPlace.opening_hours?.weekday_text && (
                  <div>
                    <p>운영 시간:</p>
                    <ul>
                      {selectedPlace.opening_hours.weekday_text.map((time, idx) => (
                        <li key={idx}>{time}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedPlace.rating && <p>평점: {selectedPlace.rating} / 5</p>}
                {selectedPlace.website && <p><a href={selectedPlace.website} target="_blank" rel="noopener noreferrer">웹사이트</a></p>}
              </div>
            </InfoWindow>
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapContainer;
