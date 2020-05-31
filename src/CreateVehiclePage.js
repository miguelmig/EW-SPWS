import React, { useState } from "react";
import { Map, TileLayer, Popup } from "react-leaflet";
import { createVehicle } from "./api/vehicles";
import { Form, Radio } from 'semantic-ui-react'

const CreateVehiclePage = () => {
  const [vehicleInfo, setVehicleInfo] = useState();
  const [viewport, setViewport] = useState({ center: [41.558435, -8.397978], zoom: 18 });
  const handleMapClick = (event) => {
    setVehicleInfo({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  };

  const onCreateVehicle = (lat, long) => {
    return createVehicle(lat, long).then((vehicle) => {
      console.log("Vehicle created with success:")
      console.log(vehicle);
    }).catch(err => console.log(err.message))
  }

  const handleCreate = (event) => {
    event.preventDefault();

    onCreateVehicle(
        vehicleInfo.latitude,
        vehicleInfo.longitude
    ).then(() => {
        window.location.assign("/");
    });
  };

  return (
    <div>
        <h1>Select where you want to create the vehicle</h1>
    <Map
      className="map"
      viewport={viewport}
      maxZoom={18}
      minZoom={5}
      onclick={handleMapClick}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        maxZoom={18}
        accessToken="pk.eyJ1IjoicnVpLWZvbnNlY2EiLCJhIjoiY2s4YTJpN3R2MDBscDNtbXhqeGM3emdndiJ9.3LJzQcbcLzQP1evTVWItOQ"
      />
      {vehicleInfo && (
        <Popup
          key={`${vehicleInfo.latitude}-${vehicleInfo.longitude}`}
          position={[vehicleInfo.latitude, vehicleInfo.longitude]}
        >
          <Form onSubmit={handleCreate}>
            <label>Create Vehicle</label>
            <button type="submit">Create</button>
          </Form>
        </Popup>
      )}
    </Map>
    </div>
  );
};

export default CreateVehiclePage;