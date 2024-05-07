import React, { useState, useEffect, useRef } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

export default function Map({
  geojsonData,
  storeDetail,
  setStoreDetail,
  hoveredStore,
  setHoveredStore,
  hoveredMarker, setHoveredMarker
}) {
  const [zoom, setZoom] = useState(7)
  const [center, setCenter] = useState({ lat: 23.6978, lng: 120.9605 })
  const [selectedMarker, setSelectedMarker] = useState(null)
  const mapRef = useRef(null)
  const handleStoreHover = (store) => {
    setHoveredStore(store)
  }
  
  const mapStyles = {
    height: '50vh',
    width: '100%',
  }

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    styles: [
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { color: '#ffffff' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          { color: '#cee3e8' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { color: '#a0f3bd' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          { color: '#ffffff' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'water',
        elementType: '',
        stylers: [
          { color: '#8aadf5' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          { color: '#000000' },
          { visibility: 'on' },
          { saturation: 0 },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.province',
        elementType: 'labels.text',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }],
      },
    ],
  }

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
    setStoreDetail(marker.storeDetail)
  }
  const handleMarkerHover = (markerData) => {
    setSelectedMarker(markerData ? {
      position: {
        lat: parseFloat(markerData.lat),
        lng: parseFloat(markerData.lng),
      },
      storeDetail: markerData,
    } : null);
  };
  

  const handleMarkerCloseClick = () => {
    setSelectedMarker(null)
  }

  useEffect(() => {
    if (
      geojsonData &&
      geojsonData.length > 0 &&
      window.google &&
      window.google.maps
    ) {
      let bounds = new window.google.maps.LatLngBounds()

      geojsonData.forEach((data) => {
        bounds.extend(new window.google.maps.LatLng(data.lat, data.lng))
      })

      // Fit map to bounds
      if (mapRef.current) {
        const map = mapRef.current
        map.fitBounds(bounds)

        // Set max zoom to prevent zooming too close
        const maxZoom = 15
        const listener = window.google.maps.event.addListener(
          map,
          'idle',
          () => {
            if (map.getZoom() > maxZoom) map.setZoom(maxZoom)
            window.google.maps.event.removeListener(listener)
          }
        )

        // Set center after fitBounds
        setCenter(bounds.getCenter())
        setZoom(map.getZoom())
      }
    } else {
      // Reset zoom and center to default values
      setZoom(7)
      setCenter({ lat: 23.6978, lng: 120.9605 })
    }
  }, [geojsonData])

  // 当 hoveredStore 更新时，更新地图的中心点
  useEffect(() => {
    if (hoveredStore) {
      setCenter({
        lat: parseFloat(hoveredStore.lat),
        lng: parseFloat(hoveredStore.lng),
      })
    }
  }, [hoveredStore])

  

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD9RHsF4cQD4gMbJ34PM2-81OetxSoOFWY"
      async
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoom}
        center={center}
        options={mapOptions}
        onLoad={(map) => (mapRef.current = map)}
      >
        {geojsonData &&
          geojsonData.length > 0 &&
          geojsonData.map((data) => (
            <Marker
              key={data.id}
              position={{
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lng),
              }}
              title={data.name}
              icon={{
                url: '/images/myService/ink-pen.png',
              }}
              animation={hoveredMarker && hoveredMarker.id === data.id ? window.google.maps.Animation.BOUNCE : null}
              onMouseOver={() => handleMarkerHover(data)}
              onMouseOut={() => handleMarkerHover(null)}
              onClick={() =>
                handleMarkerClick({
                  position: {
                    lat: parseFloat(data.lat),
                    lng: parseFloat(data.lng),
                  },
                  storeDetail: data,
                })
              }
            />
          ))}
        {/* {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleMarkerCloseClick}
            options={{ maxWidth: '100px', closeOnClick: true }}
          >
            <div>
              <h6 className="m-0 text-h6">{selectedMarker.storeDetail.name}</h6>
            </div>
          </InfoWindow>
        )} */}
      </GoogleMap>
    </LoadScript>
  )
}
