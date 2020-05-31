import React, {useState, useEffect} from 'react';
import { Popup, Marker } from "react-leaflet";
import { Container, Header, Button, Icon} from 'semantic-ui-react';
import L from 'leaflet';
import { Link } from 'react-router-dom';

const markerIcon = new L.Icon({
    iconUrl: '/crosswalk4.svg',
    iconAnchor: [20, 25],
    popupAnchor: [0, -30],
    iconSize: [40, 40],
    shadowAnchor: [20, 92],
})

export const CrosswalkMarker = ({latitude, longitude, id, state}) => {
    return (
        <Marker key={"crosswalk" + toString(id)} position={[latitude, longitude]} icon={markerIcon}>
            <Popup textAlign='center'>
                <Container fluid>
                <Header as='h3' dividing>Crosswalk</Header>
                <pre>
                    Id: {id} <br/>
                    Latitude: {latitude} <br/>
                    Longitude: {longitude} <br/>
                    State: {state} <br/>
                </pre>
                <Link to={"/crosswalk/" + id}>
                <Button animated='fade' fluid>
                    <Button.Content visible>
                        Details
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='eye' />
                    </Button.Content>
                </Button>
                </Link>
                </Container>
            </Popup>
        </Marker>
    )
}