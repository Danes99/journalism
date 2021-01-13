// Import pre-installed modules
import React, { useState } from "react";

// Import downloaded modules
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

// Base URL for containerization (Docker, Kubernetes, etc.)
import { BASE_URL } from '../../config'

const TopNav = () => {

    // Toggle Menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggle = () => setIsMenuOpen(!isMenuOpen)

    // Connected dashboard array
    const [DashboardList, setDashboardList] = useState(
        () => {
            // Get List of Dashboard Layout 
            // from Business Logic Service (BLS)
            fetch(`${BASE_URL}/layoutList`)
                .then(response => response.json())
                .then(data => setDashboardList(data))

            return []
        }
    )


    // Dropdown list for connected dashboards
    const ConnectedDashboards = DashboardList ?
        DashboardList.map(
            item =>
                (
                    <DropdownItem key={item} >
                        {/* <Link to={`/${BASE_URL}/${item}`}>
                                {item}
                            </Link> */}
                        <a href={`${BASE_URL}/dashboard/${item}`}>
                            {item}
                        </a>
                    </DropdownItem>
                )
        )
        :
        <DropdownItem>No dashboard connected</DropdownItem>

    return (
        <Navbar color="dark" dark expand="md">


            {/* Toggle menu */}
            <NavbarToggler onClick={toggle} />

            {/* Home */}
            <NavbarBrand className="Branding" href="/">
                Real Time Dashboard
            </NavbarBrand>

            <Collapse isOpen={isMenuOpen} navbar>
                <Nav className="ml-auto" navbar>

                    {/* Dashboard list dropdown menu */}
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Dashboards
                            </DropdownToggle>
                        <DropdownMenu>
                            {ConnectedDashboards}
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    {/* Home */}
                    <NavItem>
                        <NavLink href="/">
                            <img src="../../svg/house-door.svg" alt="home" />
                        </NavLink>
                    </NavItem>

                    {/* Parameters */}
                    <NavItem>
                        <NavLink href="/parameters">
                            <img src="../../svg/gear-fill.svg" alt="parameters" />
                        </NavLink>
                    </NavItem>

                    {/* About */}
                    <NavItem>
                        <NavLink href="/about">
                            <img src="../../svg/info-circle.svg" alt="about" />
                        </NavLink>
                    </NavItem>

                    {/* Help */}
                    <NavItem>
                        <NavLink href="/help">
                            <img src="../../svg/question-circle.svg" alt="help" />
                        </NavLink>
                    </NavItem>

                </Nav>
            </Collapse>

        </Navbar>
    )
}

export default TopNav