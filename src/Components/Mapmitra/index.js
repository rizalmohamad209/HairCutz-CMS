import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const mapboxToken =
  "pk.eyJ1Ijoicml6YWxtb2hhbWFkIiwiYSI6ImNrd3VyMmxkYzF0NGwycHFvdXNod3hyd3AifQ.RO6Ly-imFs4zMLRJgrOoOA";

export default function Tambahmitra(props) {
  let newLatLong = [props.dataLong, props.dataLat];
  console.log(props);

  const [viewPort, setViewPort] = React.useState({
    width: "100wh",
    height: "400px",
    latitude: -6.895842571735898,
    longitude: 109.04089772305696,
    zoom: 15,
  });

  const [latlong, setLatLong] = React.useState();

  const mapRef = React.useRef();
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewPort(newViewport),
    []
  );
  props.handleLatLong(latlong);
  const handleGeocoderViewportChange = React.useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div>
      <div className="relative w-full rounded-xl shadow-lg">
        <ReactMapGl
          ref={mapRef}
          onClick={(feature) => setLatLong(feature.lngLat)}
          {...viewPort}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={(nextViewport) => setViewPort(nextViewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={mapboxToken}
            position="top-right"
            placeholder="Search here!"
            countries="id"
          />
          {latlong == undefined ? null : (
            <Marker latitude={latlong[1]} longitude={latlong[0]}>
              <img
                className="w-10 h-10"
                src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1616838931/Group_54_2_qzvqx7.png"
                alt=""
              />
            </Marker>
          )}
        </ReactMapGl>
      </div>
    </div>
  );
}
