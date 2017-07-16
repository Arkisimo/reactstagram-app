import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';

class Toolbar extends Component {
    
    render(){
        return (
            
            <div>
                  <Navbar style={{backgroundColor: "#cd32cd", boxShadow: "10px 10px grey", height: "150px" }}>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <a href="#">Ais Memez</a>
                      </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                    <NavItem style={{}}>
                        <center>
                            <img style={{paddingLeft: "47%", height: "125px"}} src="https://img.clipartfest.com/18b4092ffe355606a9e476e79d819ffd_clipart-eyes-images-of-eyes-clipart_571-188.png"/>
                        </center>
                    </NavItem>
                    </Nav>
                    
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Button bsStyle="danger" bsSize="xsmall">Login</Button>
                        </NavItem>
                    </Nav>
                  </Navbar>
            </div>
            
            );
    }
    
}

export default Toolbar;