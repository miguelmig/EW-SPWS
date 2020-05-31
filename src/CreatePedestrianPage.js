import React, { useState } from "react";
import { Map, TileLayer, Popup } from "react-leaflet";
import { createPedestrian } from "./api/pedestrians";
import { Form, Radio } from 'semantic-ui-react'

const CreatePedestrianPage = () => {
  const [pedestrianInfo, setPedestrianInfo] = useState();
  const [viewport, setViewport] = useState({ center: [41.558435, -8.397978], zoom: 18 });
  const handleMapClick = (event) => {
    setPedestrianInfo({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  };

  const onCreatePedestrian = (lat, long) => {
    return createPedestrian(lat, long).then((pedestrian) => {
      console.log("Pedestrian created with success:")
      console.log(pedestrian);
    }).catch(err => console.log(err.message))
  }

  const handleCreate = (event) => {
    event.preventDefault();

    onCreatePedestrian(
        pedestrianInfo.latitude,
        pedestrianInfo.longitude
    ).then(() => {
        window.location.assign("/");
    });
  };

  return (
    <div>
        <h1>Select where you want to create the Pedestrian</h1>
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
      {pedestrianInfo && (
        <Popup
          key={`${pedestrianInfo.latitude}-${pedestrianInfo.longitude}`}
          position={[pedestrianInfo.latitude, pedestrianInfo.longitude]}
        >
          <Form onSubmit={handleCreate}>
            <label>Create Pedestrian</label>
            <button type="submit">Create</button>
          </Form>
        </Popup>
      )}
    </Map>
    </div>
  );
};

export default CreatePedestrianPage;