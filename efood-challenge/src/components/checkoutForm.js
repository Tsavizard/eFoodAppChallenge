import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            menu: []
        };
        console.log("hi")
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" />
                            <Form.Text style={{color:"red"}}>
                                *required
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Finalize
                        </Button>
                    </Form>
                    <br/>
                    <h4>We are sorry. Cash is currently the only payment option</h4>
                </div>
            </div >
        )
    }
}