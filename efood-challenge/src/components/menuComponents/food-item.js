import React, { Component } from 'react';


export default class FoodItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      food: []
    };
  }

  componentDidMount(){
    this.setState({
      food: this.props.food,
      isLoading: false,
      clickHandler: this.props.clickHandler
    })
  }

  render(){
    if(this.state.isLoading){
      return (<h1 style={{textAlign: "center"}}>Loading...</h1>)
    }
     return (
        <table  className="table">
          <tbody>
              <tr key ={this.state.food._id}>
                <td> <h3 onClick = {this.state.clickHandler} id= {this.state.food._id}>{this.state.food.foodName}</h3> </td>
                <td> <h4 style={{textAlign:"right"}}>{this.state.food.basePrice}</h4> </td>
              </tr>
              <Conditional itemlist = {this.state.food.condoments} text="Condoments Available: " cat="condomentName"/>
              <Conditional itemlist = {this.state.food.extras} text="Extras Available: " cat="extraName"/>
          </tbody>
      </table>  
    
    )
  }
  
}

function Conditional(props){
 
  if (props.itemlist.length !==0){
    const cat = props.cat
    const list = props.itemlist.map((item, index) =>{
      const items = item[cat]
      return items
    })
    return (
      <tr>
        <td><b>{props.text}</b> {list.join(", ")}</td>
        <td></td>
      </tr>
    )
  }
    return (null)
}
