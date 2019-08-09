import React, { Component } from 'react';
import MenuGrid from './MenuGrid'

export default class FoodMenu extends Component {
  
  constructor(){
    super();
    this.state = {
      isLoading: true,
      appetisers: [],
      salads: [],
      mainCourses: [],
      drinks: []
    };
  }
  componentDidMount(){
    let appetisers =[]
    let salads =[]
    let mainCourses=[]  
    let drinks=[]

    // this.setState({isLoading:true})
    fetch("http://localhost:5000/foods/")
    .then (response => response.json())
    .then (response => {
      let foods  =  Object.keys(response).map((item, index) => {
        return response[item]
        })
        foods.forEach((item,index) => { 
          switch(item.foodcategory) {
            case 'Appetisers':
              return  appetisers.push(item)
            case 'Salads':
              return  salads.push(item)
            case 'Main Courses':
              return  mainCourses.push(item)
            default:
              return  drinks.push(item)
          }
        })
        this.setState({ 
          foods: foods,
          appetisers: appetisers,
          salads: salads,
          mainCourses: mainCourses,
          drinks: drinks,
          isLoading:false
        })
      })
  }
  
  render() {
    const myStyles = {
        padding: 0,
        textAlign: 'center',
        backgroundColor: "#ccffcc"
    }
    if(this.state.isLoading){
      return (<h1 style={{textAlign: "center"}}>Loading...</h1>)
    }
    return(
      <div>
        <h1 style={{textAlign: "center"}}>Menu</h1>
        <div>
            <MenuGrid items={this.state.appetisers} myStyles={myStyles}cat ="Appetisers"/>
        </div>
        <div>
            <MenuGrid items={this.state.salads} myStyles={myStyles}cat ="Salads"/>
        </div>
        <div>
            <MenuGrid items={this.state.mainCourses} myStyles={myStyles} cat ="Main Courses"/>
        </div>
        <div>
            <MenuGrid items={this.state.drinks} myStyles={myStyles} cat ="Drinks"/>
        </div>
      </div>
    )
  }    
}