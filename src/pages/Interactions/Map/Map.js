import React, { useEffect } from "react";
import ProtoType from "prop-types";
import Leaflet from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { locationIcon } from "../../../helpers/utility";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
// Downtown Aachen
const centerLat = 30.010531;
const centerLng = 31.236481;
const zoom = 15;
const mapHeight = 850;

let onCount = 0;
let offCount = 0;

// construct the location icon type and color based on device online/offline state
const icon = (is_online) => {
  if (is_online) {
    onCount++;

    return Leaflet.divIcon({
      className: "loc-icon-online",
      html: locationIcon,
    });
  }

  offCount++;

  return Leaflet.divIcon({
    className: "loc-icon-offline",
    html: locationIcon,
  });
};

const InteractiveMap = (props) => {
  const centerPosition = [centerLat, centerLng];

  useEffect(() => {
    if (onCount + offCount === props.Devices.length) {
      props.setOnCount(onCount);
      props.setOffCount(offCount);
    }
  });

  return (
    <Map center={centerPosition} zoom={zoom} style={{ height: mapHeight }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.Devices.map((device, key) => (
        <Marker
          key={`mar_${key}`}
          position={[device.lat, device.long]}
          icon={icon(device.is_online)}
        >
          <Popup>
            Label: {device.label.length ? device.label : "not found"} <br />{" "}
            Serial: {device.serial}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

InteractiveMap.propTypes = {
  Devices: ProtoType.array,
  setOnCount: ProtoType.func,
  setOffCount: ProtoType.func,
};

export default InteractiveMap;
