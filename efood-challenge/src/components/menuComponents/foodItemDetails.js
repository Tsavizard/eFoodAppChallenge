import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Paper from '@material-ui/core/Paper';

export default class FoodDetails extends Component{
  constructor(props){
    super(props)
    this.state={
      id:props.data._id,
      foodName: props.data.foodName,
      basePrice: props.data.basePrice,
      condoments: props.data.condoments,
      extras: props.data.extras,

      food:{
        fName: props.data.foodName,
        bPrice: props.data.basePrice,
        conExPrice: 0,
        conds: [],
        exts: [],
        tPrice: props.data.basePrice
      },
      price: props.data.basePrice,
    }
    this.handleToCart = this.handleToCart.bind(this)
    this.formHandler = this.formHandler.bind(this)
  }

  componentDidMount(){
    
    this.setState({
      price: this.state.basePrice
    })
  }

  handleToCart(){
    const {fName, bPrice, conExPrice, conds, exts, tPrice} = this.state.food
    fetch("http://localhost:5000/cart/addToCart", {
      method: 'POST',
      body: JSON.stringify({
        foodName: fName,
        basePrice: bPrice,
        conExPrice: conExPrice,
        condoments: conds,
        extras: exts,
        totalPrice: tPrice,
        qty: 1
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  formHandler(element){
    //for ease of use: temporary Array from this.state.food. Then destructure it and element. 
    let foodArray = this.state.food
    const { condomentName, condomentValue , extraName, extraValue } = element;
    let {fName, bPrice, conds, exts} = foodArray
    let inCondList, inExtList
    //check if condoment is clicked / chosen
    if (conds.length === 0){
      inCondList = false
    }else{
        inCondList = conds.indexOf(condomentName) >= 0 ? true : false  
    }
    //check if extra is clicked / chosen
    if (exts.length === 0){
      inExtList = false
    }else{
      inExtList = exts.indexOf(extraName) >= 0 ? true : false    
    }

    //add or remove condoment
    if (extraName === undefined)
    {
      if (!inCondList){
        conds.push(condomentName)
        this.setState(prevState => ({
          price: parseFloat((prevState.price + condomentValue).toFixed(2))
        }), function (){
          this.setState({
            food:{
              fName: fName,
              bPrice: bPrice,
              conExPrice: parseFloat((this.state.price - bPrice).toFixed(2)),
              conds: conds,
              exts: exts,
              tPrice: this.state.price
            }
          })
        }) 
      }else{
        const cIndex = conds.indexOf(condomentName)
        conds.splice(cIndex, 1);
        this.setState(prevState => ({
          price: parseFloat((prevState.price - condomentValue).toFixed(2))
        }), function (){
          this.setState({
            food:{
              fName: fName,
              bPrice: bPrice,
              conExPrice: parseFloat((this.state.price - bPrice).toFixed(2)),
              conds: conds,
              exts: exts,
              tPrice: this.state.price
            }
          })
        })
      }
    }
    if (condomentName === undefined)
    {
      if (!inExtList){
      //add or remove extra
        exts.push(extraName)
        this.setState(prevState => ({
          price: parseFloat((prevState.price + extraValue).toFixed(2))
        }), function (){
          this.setState({
            food:{
              fName: fName,
              bPrice: bPrice,
              conExPrice: parseFloat((this.state.price - bPrice).toFixed(2)),
              conds: conds,
              exts: exts,
              tPrice: this.state.price
            }
          })
        })
      }else{
        const eIndex = exts.indexOf(extraName)
        exts.splice(eIndex, 1);
        this.setState(prevState => ({
          price: parseFloat((prevState.price - extraValue).toFixed(2))
        }), function (){
          this.setState({
            food:{
              fName: fName,
              bPrice: bPrice,
              conExPrice: parseFloat((this.state.price - bPrice).toFixed(2)),
              conds: conds,
              exts: exts,
              tPrice: this.state.price
            }
          })
        })
      }
    }    
  }

  render(){
  const condChckbox = this.state.condoments.map((element,index) => {
      return(
        <React.Fragment  key = {"modalFormCondList"+index+element._id}>
          <Form.Group controlId="formBasicChecbox" >
          <Paper> 
            {element.condomentName +" (+ "+element.condomentValue+"€)"}<Form.Check type="checkbox" name={element.condomentName} className="float-right" onChange={() => this.formHandler(element)}/>
          </Paper>
          </Form.Group>
        </React.Fragment>
      )      
  });

  const extraChckbox = this.state.extras.map((element,index) => {
    return(
      <React.Fragment  key = {"modalFormExtList"+index+element._id}>
        <Form.Group controlId="formBasicChecbox" >
          <Paper >
          {element.extraName +" (+ "+element.extraValue+"€)"} <Form.Check type="checkbox" name={element.extraName} className="float-right" onChange={() => this.formHandler(element)}/>
          </Paper>
        </Form.Group> 
      </React.Fragment>
    )
  });
    
    return (
      <Form key={this.state.id}>
        {condChckbox.length !==0 && 
          <>
          Pick condoments: 
              {condChckbox} 
          <hr/>
          </>
        }{
          extraChckbox.length !==0 && 
          <>
          Add extra: 
            {extraChckbox}
          <hr/>
          </>
        }   
        <h5 className="float-left">{this.state.price}</h5>  
        <Button variant="primary" type="submit" className="float-right" onClick={this.handleToCart}>
          Send to cart
        </Button>
      </Form>
    )
  }
}