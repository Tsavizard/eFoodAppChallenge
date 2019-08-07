import React, { Component } from 'react';
import MenuGrid from './MenuGrid'
import FoodDetails from './foodItemDetails'

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
    this.onFoodItemClick = this.onFoodItemClick.bind(this)
  }

  myModalRef = ({handleShow}) => {
    this.showModal = handleShow
  }

  onFoodItemClick = (e) => {    
    this.setState({
      clickedFood: this.state.foods.find( function (food) {return food._id === e.target.id}) 
    })
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
        })
      })
      this.setState({isLoading:false})
  }
  
  componentDidUpdate(){
    if(this.state.clickedFood !== undefined){
      this.showModal();
    }
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
      <div><FoodDetails ref={this.myModalRef}></FoodDetails>
      <h1 style={{textAlign: "center"}}>Menu</h1>
        <div>
            <MenuGrid items={this.state.appetisers} myStyles={myStyles} clickHandler = {this.onFoodItemClick} cat ="Appetisers"/>
        </div>
        <div>
            <MenuGrid items={this.state.salads} myStyles={myStyles} clickHandler = {this.onFoodItemClick} cat ="Salads"/>
        </div>
        <div>
            <MenuGrid items={this.state.mainCourses} myStyles={myStyles} clickHandler = {this.onFoodItemClick} cat ="Main Courses"/>
        </div>
        <div>
            <MenuGrid items={this.state.drinks} myStyles={myStyles} clickHandler = {this.onFoodItemClick} cat ="Drinks"/>
        </div>
      </div>
    )
  }    
}