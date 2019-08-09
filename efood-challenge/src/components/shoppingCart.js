import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default class ShoppingCart extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            path: this.props.location.pathname,
            foodList:[],
            cartSum:0
        }
        this.CheckoutButton = this.CheckoutButton.bind(this);
        this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
        this.populateCart = this.populateCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.deleteFromCartButton = this.deleteFromCartButton.bind(this);
        this.details = this.details.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:5000/cart/")
        .then (response => response.json())
        .then (response => {
        let sum =0;
        response.forEach((item) => {
            sum = sum + item.totalPrice
        })
        this.setState({
            foodList: response,
            cartSum: sum,
            isLoading:false
        })
      })
    }

    componentDidUpdate(){
        let sum =0;
        this.state.foodList.forEach((item) => {
            sum = sum + item.totalPrice
        })
        if (this.state.cartSum !== sum ){
            this.setState({
            cartSum: sum
        })}
    }

    handleCheckoutClick() {
        let path = "/checkout";
        this.props.history.push(path);
      }        

      CheckoutButton(){
        if(!this.state.isLoading){
            if (this.state.path === "/menu") {
                return (
                    <Button type="submit" onClick={ () => {this.handleCheckoutClick()}} > Proceed to Checkout </Button>)
            }
        }
    }  
    deleteFromCartButton(element){
        if (this.state.path === "/menu") {
            return (
                <TableCell align="right"> <button className="float-right" onClick = {e => this.deleteFromCart(element._id)}> x </button> </TableCell>
            )
        }
    }
     
    details(element){
        if (element.length !== 0 ){
            const list = element.map ((item) => {
                return item
            })
            return  <TableRow><TableCell>{"+ "+list.join(", ")}</TableCell></TableRow>
        }
        return null
    }

    populateCart(){
    
    const fList = this.state.foodList.map((element) => {
            return( 
                <div key={element._id}>
                    <ListGroup >
                        <ListGroup.Item >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left" width= {"60%"}> <h5>{element.foodName}</h5> </TableCell>
                                        <TableCell align="right" width= {"20%"}> <h5>€{element.totalPrice}</h5> </TableCell>
                                        {this.deleteFromCartButton(element)}
                                    </TableRow>                                    
                                            {this.details(element.condoments)}
                                            {this.details(element.extras)}                                              
                                </TableBody>
                            </Table>                           
                        </ListGroup.Item>
                    </ListGroup>
                    
                </div>
            )
        })
        return fList
    }

    deleteFromCart(id){
        let fList = this.state.foodList
        fList.forEach((item,index) => {
            if (item._id === id){
                fList.splice(index,1)
            }
        })
        this.setState({
            foodList: fList
        })
        fetch("http://localhost:5000/cart/deleteFromCart/"+id, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
        
        }
        )
        .catch(error => console.error('Error:', error));
    }

    render(){
        if (this.state.isLoading){
            return (<h1>Loading...</h1>)
        }

        if(this.state.foodList.length === 0) {
            return (
                <div id="cart" style={{textAlign: "center"}}>
                    <h2>Shopping Cart</h2>
                    <hr/>
                    <h3>Cart is empty :(</h3>
                </div>
            )
        }
        return(
            <div id="cart" style={{textAlign: "center"}}>
                <h2>Shopping Cart</h2>
                {this.populateCart()}
                <hr/>
                {this.CheckoutButton()}
                <h4 className="float-left">Total Cost:  €{parseFloat(this.state.cartSum.toFixed(2))} </h4>
                <hr/>        
            </div>  
        )
    }
}