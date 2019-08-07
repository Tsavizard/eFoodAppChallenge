import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default class FoodDetails extends Component {

  constructor(props){
    super(props)
    this.state={
      isLoading: true,
      show: false,
      food: this.props.details
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }
   
  componentDidMount(){
    this.setState({
      isLoading: false
    })
  }
 
  handleClose() { this.setState({show: false})}
  handleShow() { this.setState({show: true})}
  
  render(){
    if(this.state.isLoading){
      return <h1>Loading...</h1>
    }
    
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.food}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}