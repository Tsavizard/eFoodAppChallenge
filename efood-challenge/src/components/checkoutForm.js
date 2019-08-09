import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            cart: [],
            address: ""
        };
        this.handleFinalize = this.handleFinalize.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
    }

    handleAddress(event){
        this.setState({
            address: event.target.value
        })
    }
    componentDidMount(){
        fetch("http://localhost:5000/cart/")
        .then (response => response.json())
        .then (response => {        
        this.setState({
            cart: response,
            isLoading:false
        })
      })
    }

    handleFinalize(){
        let sum = 0
        this.state.cart.forEach((item)=>
            sum = sum + item.totalPrice
        )

        const order = {
            address: this.state.address,
            cart: this.state.cart,
            orderSum: sum,
            status: "pending"
        }
        this.setState({
            order: order
        })
        fetch("http://localhost:5000/orders/addToOrders", {
            method: 'POST',
            body: JSON.stringify({
                address: this.state.address,
                cart: this.state.cart,
                orderSum: this.state.orderSum,
                status: this.state.status
            }),
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => 
            console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    }

    render() {
        if (this.state.isLoading){
            return (<h1>Loading...</h1>)
        }

        return (
            <div>
                <div className="container">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" onChange={this.handleAddress} value={this.state.address}/>
                            <Form.Text style={{color:"red"}}>
                                *required
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleFinalize}>
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