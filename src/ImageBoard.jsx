import React, { Component } from 'react';
import {Col, Row, Panel, Grid } from 'react-bootstrap';
import aja from 'aja';


class ImageBoard extends Component {
    componentDidMount() {
        this.getImages();
    }
    
    constructor() {
        super();
        this.state={
            allImages:[]
        };
    }
    
    getImages() {
        var _this = this;
        
        aja()
            .method("get")
            .url("http://localhost:8080/images")
            .on("success", function(data){
                _this.setState({
                    allImages: data
                })
                console.log(data);
            }).go();
            
    }
    
    render() {
        return (
            <Grid>
                <Row>
                    {
                        this.state.allImages.map(function(image) {
                            return (
                                <Col xs={4}>
                                    <Panel>
                                        <img src={"http://localhost:8080/public/" + image._id +".jpg"}
                                            className="img-responsive"
                                            alt="Responsive image"
                                            />
                                    </Panel>  
                                </Col>
                            );
                        })
                    }
                </Row>
            </Grid>
        );
    }
}

export default ImageBoard;
