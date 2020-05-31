import React, {useState, useEffect} from 'react';
import { Popup, Marker } from "react-leaflet";
import { Container, Header } from 'semantic-ui-react';

import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: '/vehicle.svg',
    iconAnchor: [20, 25],
    popupAnchor: [0, -30],
    iconSize: [40, 40],
    shadowAnchor: [20, 92],
})

export const VehicleMarker = ({latitude, longitude, id}) => {
    return (
        <Marker key={"vehicle" + toString(id)} position={[latitude, longitude]} icon={markerIcon}>
              <Popup>
              <Container fluid>
                <Header as='h3' dividing>Vehicle</Header>
                <pre>
                    Id: {id} <br/>
                    Latitude: {latitude} <br/>
                    Longitude: {longitude} 
                </pre>
                </Container>
              </Popup>
        </Marker>
    )
}