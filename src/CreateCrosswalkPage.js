import React, { useState } from "react";
import { Map, TileLayer, Popup } from "react-leaflet";
import {createCrosswalk} from "./api/crosswalks.js";
import { Form, Radio } from 'semantic-ui-react'

const CreateCrosswalkPage = () => {
  const [crosswalkInfo, setCrosswalkInfo] = useState();
  const [viewport, setViewport] = useState({ center: [41.558435, -8.397978], zoom: 18 });
  const handleMapClick = (event) => {
    setCrosswalkInfo({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,

      state: ""
    });
  };

  const onCreateCrosswalk = (state, lat, long) => {
    return createCrosswalk(state, lat, long).then((crosswalk) => {
      console.log("Crosswalk created with success:")
      console.log(crosswalk);
    }).catch(err => console.log(err.message))
  }

  const handleStateChange = (event, {value}) => {
    setCrosswalkInfo({ ...crosswalkInfo, state: value });
  };

  const handleCreate = (event) => {
    event.preventDefault();

    onCreateCrosswalk(
        crosswalkInfo.state,
        crosswalkInfo.latitude,
        crosswalkInfo.longitude
    ).then(() => {
        window.location.assign("/");
    });
  };

  return (
    <div>
        <h1>Select where you want to create the Crosswalk</h1>
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
      {crosswalkInfo && (
        <Popup
          key={`${crosswalkInfo.latitude}-${crosswalkInfo.longitude}`}
          position={[crosswalkInfo.latitude, crosswalkInfo.longitude]}
        >
          <Form onSubmit={handleCreate}>
            <label>Crosswalks State</label>
            <Form.Field>
                <Radio
                label='OFF'
                name='radioGroup'
                value='OFF'
                checked={crosswalkInfo.state === 'OFF'}
                onChange={handleStateChange}
            />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='ON'
                    name='radioGroup'
                    value='ON'
                    checked={crosswalkInfo.state === 'ON'}
                    onChange={handleStateChange}
                />
            </Form.Field>
            <button type="submit">Create</button>
          </Form>
        </Popup>
      )}
    </Map>
    </div>
  );
};

export default CreateCrosswalkPage;
