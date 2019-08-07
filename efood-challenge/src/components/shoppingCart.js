import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default class ShoppingCart extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            path: this.props.location.pathname,
            foodList:[]
        }
        this.createButton = this.createButton.bind(this);
        this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading: false
        })
    }

    handleCheckoutClick() {
        let path = "/checkout";
        this.props.history.push(path);
      }        

    createButton(){
        if(!this.state.isLoading){
            if (this.state.path === "/menu") {
                return (
                    <Button type="submit" onClick={ () => {this.handleCheckoutClick()}} > Submit </Button>)
            }
        }
    }  
      
    render(){
        return(
            <div id="cart" style={{textAlign: "center"}}>
                <h2>Shopping Cart</h2>
                <ListGroup>
                    <ListGroup.Item>{this.state.foodList}</ListGroup.Item>
                </ListGroup>
                {this.createButton()}
            </div>
        )
    }
}