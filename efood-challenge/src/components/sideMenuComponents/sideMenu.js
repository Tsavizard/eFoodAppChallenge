import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import MyTable from './SideMenuTable'

export default class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            menu: []
        };
    }

    componentDidMount(){
        this.setState({loading:true})
        fetch("http://localhost:5000/foods/")
        .then (response => response.json())
        .then (response => {
            let foods  =  Object.keys(response).map((item, index) => {
            return response[item]
            })
            this.setState({ menu: foods, isLoading:false })
            })
    }
    
    render() {
        if(this.state.isLoading){
            return (<h1 style={{textAlign: "center"}}>Loading...</h1>)
        }
        return (
            <div id="foodMenu" style={{textAlign: "center"}}>
                <h2>Catalogue</h2>
                <ListGroup >
                    <ListGroup.Item><h3 style={{text:"bold"}}>Appetisers</h3></ListGroup.Item>
                    <MyTable menu = {this.state.menu}  cat="Appetisers"/>
                    <ListGroup.Item><h3 style={{text:"bold"}}>Salads</h3></ListGroup.Item>
                    <MyTable menu = {this.state.menu}  cat="Salads"/>
                    <ListGroup.Item><h3 style={{text:"bold"}}>Main Courses</h3></ListGroup.Item>
                    <MyTable menu = {this.state.menu}  cat="Main Courses"/>
                    <ListGroup.Item><h3 style={{text:"bold"}}>Drinks</h3></ListGroup.Item>
                    <MyTable menu = {this.state.menu}  cat="Drinks"/>
                </ListGroup>
            </div>
        );
  }
}