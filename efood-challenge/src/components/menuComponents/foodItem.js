import React, { Component } from 'react';
import FoodDetails from './foodItemDetails'
import Modal from 'react-bootstrap/Modal'
import './modal.css'

export default class FoodItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      show: false,
    };
    this.handleClick = this.handleClick.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  componentDidMount(){
    this.setState({
      food: this.props.food,
      isLoading: false,
    })
  }
  showModal = () => {
    this.setState({ show: true });
  }
  hideModal = () => {
    this.setState({ show: false });
  }
  handleClick = (e) => {  
    this.showModal(); 
   }

  render(){
    if(this.state.isLoading){
      return (<h1 style={{textAlign: "center"}}>Loading...</h1>)
    }
    const food=this.state.food
     return (
      <>
        <Modal show={this.state.show} onHide={this.hideModal} >
        <Modal.Header closeButton>
          <Modal.Title>{food.foodName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodDetails data = {food}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        
      <table  className="table" key ={this.state.food._id} onClick = {this.handleClick} >
        <tbody>
            <tr>
              <td> <h3 id= {this.state.food._id}> {this.state.food.foodName}</h3> </td>
              <td> <h4 style={{textAlign:"right"}}> {this.state.food.basePrice} </h4> </td>
            </tr>
            <Conditional itemlist = {this.state.food.condoments} text="Condoments Available: " cat="condomentName"/>
            <Conditional itemlist = {this.state.food.extras} text="Extras Available: " cat="extraName"/>
        </tbody>
      </table>  
    </>
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