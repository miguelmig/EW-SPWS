import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import './App.css';

function Nav() {
    const navStyle = {
        color: 'black'
    }
    const [activeItem, setActiveItem] = useState("home");
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu inverted fixed='top'>
            <Container>
            <Link to="/">
                <Menu.Item
                    name = "home"
                    active={activeItem === "home"}
                    onClick={handleItemClick}>
                    Home
                </Menu.Item>

            </Link>
            <Link style={navStyle} to="/create_crosswalk">
                <Menu.Item 
                    name="create_crosswalk"
                    active={activeItem === "create_crosswalk"}
                    onClick={handleItemClick}>
                        Create Crosswalk
                </Menu.Item>
            </Link>
            <Link style={navStyle} to="/create_pedestrian">
                <Menu.Item 
                    name="create_pedestrian"
                    active={activeItem === "create_pedestrian"}
                    onClick={handleItemClick}>
                        Create Pedestrian
                </Menu.Item>
            </Link>
            <Link style={navStyle} to="/create_vehicle">
                <Menu.Item 
                    name="create_vehicle"
                    active={activeItem === "create_vehicle"}
                    onClick={handleItemClick}>
                        Create Vehicle
                </Menu.Item>
            </Link>
            </Container>
        </Menu>
    )
}

export default Nav;