import React from "react";
import PropTypes from "prop-types";
import Leaflet from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { locationIcon } from "../../../../helpers/utility";
import { Label } from "reactstrap";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const zoom = 13;

const SimpleMap = (props) => (
  <React.Fragment>
    <Label>Device current location</Label>
    <Map
      center={[props.lat, props.long]}
      zoom={zoom}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[props.lat, props.long]}
        icon={Leaflet.divIcon({
          className: "loc-icon-online",
          html: locationIcon,
        })}
      ></Marker>
    </Map>
  </React.Fragment>
);

SimpleMap.propTypes = {
  lat: PropTypes.string,
  long: PropTypes.string,
  height: PropTypes.number,
};

export default SimpleMap;
