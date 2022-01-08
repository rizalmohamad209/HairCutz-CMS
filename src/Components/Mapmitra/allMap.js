import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { getAllPartner } from "../../Services/partner-service";
const mapboxToken =
  "pk.eyJ1Ijoicml6YWxtb2hhbWFkIiwiYSI6ImNrd3VyMmxkYzF0NGwycHFvdXNod3hyd3AifQ.RO6Ly-imFs4zMLRJgrOoOA";

const AllMapComponent = () => {
  const [partner, setPartner] = React.useState([]);
  const [viewPort, setViewPort] = React.useState({
    width: "w-auto",
    height: "400px",
    latitude: -3.0285603291926435,
    longitude: 117.06949693115286,
    zoom: 4,
  });
  const mapRef = React.useRef();
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewPort(newViewport),
    []
  );

  React.useEffect(() => {
    getAllPartner().then((data) => {
      setPartner(data.data.data);
    });
  }, []);
  console.log(partner);

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
          onClick={(feature) => console.log("Coords:", feature.lngLat)}
          {...viewPort}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={(nextViewport) => setViewPort(nextViewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {partner.map((itm) => {
            return (
              <Marker latitude={itm.lat} longitude={itm.long}>
                <img
                  className="w-10 h-10"
                  src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1616838931/Group_54_2_qzvqx7.png"
                  alt=""
                />
              </Marker>
            );
          })}

          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={mapboxToken}
            position="top-right"
            placeholder="Search here!"
            countries="id"
          />
        </ReactMapGl>
      </div>
    </div>
  );
};

export default AllMapComponent;
