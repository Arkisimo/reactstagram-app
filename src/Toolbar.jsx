import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Modal, FormControl, Col, Form, FormGroup,Checkbox, ControlLabel,} from 'react-bootstrap';
import aja from 'aja';
import Webcam from 'react-webcam';

class Toolbar extends Component {
    
    constructor(){
        super();
        this.state = {
            pictureModalShown: false,
            modalShown: false,
            username: '',
            password: '',
            imageSrc: ''
        };
    }
    
    setRef = (webcam) => {
        this.webcam = webcam;
    }
     
    capture() {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({imageSrc: imageSrc})
    };
    
    handleCloseAuthModal(){
        this.setState({modalShown: false});
    }
    
    handleOpenAuthModal(){
        this.setState({modalShown: true});
    }
    
    handleSubmitImage(){
        var userID = localStorage.getItem("userID");
        var text = "Super Awesome Picture";
        var image = this.state.imageSrc;
        
        aja()
            .method('post')
            .url('http://localhost:8080/image')
            .body({image: image, text: text, userID: userID})
            .on('success', function(data) {
                
                if (data.status === 200){
                    alert("Sucessfully uploaded image!")
                }
                
            })
            .go();
    }
    
    handleClosePictureModal(){
        this.setState({pictureModalShown: false});
    }
    
    handleOpenPictureModal(){
        this.setState({pictureModalShown: true});
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    
    handleSignup(){
        var username = this.state.username;
        var password = this.state.password;
        
        aja()
            .method('post')
            .url('http://localhost:8080/user/signup')
            .body({username: username, password: password})
            .on( 'success', function(data){
                console.log(data);
                if (data.status === 200){
                    alert("Registration was successful! Click the login button");
                    
                } else {
                    alert("Failed to register")
                }
            }).go();
    }
 
    handleLogin(){
        var username = this.state.username;
        var password = this.state.password;
        
        aja()
            .method('post')
            .url('http://localhost:8080/user/login')
            .body({username: username, password: password})
            .on( 'success', function(data){
                console.log(data);
                if (data.status === 200){
                    localStorage.setItem("session", data.data.session);
                    localStorage.setItem("userID", data.data.userID);
                    alert("Success: " + data.data);
                    
                } else {
                    alert("Error: " + data.data)
                }
            }).go();
    }
    
    
    render(){
        return (
            <div>
                <Navbar style={{backgroundColor: "#cd32cd", boxShadow: "10px 10px grey", height: "70px" }}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Ais Memez</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                   
                   
                    <Modal show={this.state.pictureModalShown} onHide={this.handleClosePictureModal.bind(this)}>
                        <Modal.Header closeButton={true}>
                            <Modal.Title>Take Picture</Modal.Title>
                        </Modal.Header>
                
                        <Modal.Body>
                            <center>
                                <Webcam
                                  audio={false}
                                  height={350}
                                  ref={this.setRef}
                                  screenshotFormat="image/jpeg"
                                  width={350}
                                />
                                
                                <img src={this.state.imageSrc} alt="" />
                            </center>
                        </Modal.Body>
                
                        <Modal.Footer>
                            <Button bsStyle="success" onClick= {this.capture.bind(this)}> Capture </Button>
                            <Button bsStyle="warning" onClick= {this.handleSubmitImage.bind(this)}> Submit </Button>
                        </Modal.Footer>
                        
                    </Modal>
                    
                    <Modal show={this.state.modalShown} onHide={this.handleCloseAuthModal.bind(this)}>
                        <Modal.Header closeButton={true}>
                            <Modal.Title> Login / Sign up </Modal.Title>
                        </Modal.Header>
                    
                        <Modal.Body>
                            <Form horizontal>
                                <FormGroup 
                                    type
                                    controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Email
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl placeholder="Username" type="text"
                                        onChange={this.handleUsernameChange.bind(this)} />
                                    </Col>
                                </FormGroup>
                            
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Password
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl placeholder="Password" type="text"
                                        onChange={this.handlePasswordChange.bind(this)} />
                                    </Col>
                                </FormGroup>
                            
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Checkbox>Remember me</Checkbox>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    
                        <Modal.Footer>
                            <Button onClick={this.handleSignup.bind(this)}> Sign Up</Button>
                            <Button bsStyle="primary" onClick={this.handleLogin.bind(this)}> Login </Button>
                         </Modal.Footer>
                    
                    </Modal>
                    
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Button bsStyle="danger" bsSize="small" onClick={this.handleOpenAuthModal.bind(this)}>Login</Button>
                        </NavItem>
                    </Nav>
                    
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Button bsStyle="success" bsSize="small" onClick={this.handleOpenPictureModal.bind(this)}>Camera</Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Toolbar;