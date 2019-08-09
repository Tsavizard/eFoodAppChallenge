import React, { Component } from 'react';
import SpanningTable from './orderTable'


export default class Orders extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            visible: false
        }
    }
    componentDidMount(){
        fetch("http://localhost:5000/orders/")
        .then (response => response.json())
        .then (response => {
            this.setState({
                orders: response,
                isLoading: false
            })
        })
        
    }

    componentDidUpdate(){
        fetch("http://localhost:5000/orders/")
        .then (response => response.json())
        .then (response => {
            if (this.state.orders !== response){
                this.setState({
                    orders: response,
                })
            } 
        }) 
    }  

    render(){
        if (this.state.isLoading){
            return (<h1>Loading...</h1>)
        }
        
        const table = this.state.orders.map((item) =>{
            return <SpanningTable data={item} key ={item._id}/>
        })
        
        return(
            <div>
                {table}
            </div>
        )
    }
}