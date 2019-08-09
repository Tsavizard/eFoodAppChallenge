import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { TableFooter } from '@material-ui/core';


const styles = {
    root: {
      width: '100%',
      marginTop: "3",
      overflowX: 'auto',
    },
    table: {
      minWidth: 700
    }
  }


  export default class SpanningTable extends Component {
    constructor(props){
        super(props)
        this.state={
            data: props.data,
            status: props.data.status
        }
        this.ccyFormat = this.ccyFormat.bind(this)
        this.createRow = this.createRow.bind(this)
        this.subtotal = this.subtotal.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    changeStatus(id, e){
        //console.log(id, e)
        fetch("http://localhost:5000/orders/updateInOrders/"+id, {
            method: 'PATCH',
            body: JSON.stringify({
            status: this.state.status === "Pending"? "Completed" : "Pending"
        }),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
        })
        .catch(error => console.error('Error:', error));
        this.setState (prevState => ({
            status: prevState.status === "Pending"? "Completed" : "Pending"
          }))
    }


    ccyFormat(num) {
    return `${num.toFixed(2)}`;
    }
    
    createRow(id, name, bPrice,conds, extras, conExPrice, total) {
    return {id, name, bPrice, conds, extras, conExPrice, total };
    }
    
    subtotal(items) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
    }

    render(){
        const classes = styles;
        const {_id, address, foods} = this.state.data
    
        const rows = foods.map((item,index) => {
          const id = index + _id
            return( 
                this.createRow(id, item.foodName, item.basePrice, item.condoments.join(", "), item.extras.join(", "), item.conExPrice, item.totalPrice)
            )
        })
    
        const invoiceSubtotal = this.subtotal(rows);
        const invoiceTotal = invoiceSubtotal;

        return(
            <Accordion defaultActiveKey="0" style={{marginLeft: "20%", marginRight: "20%"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={_id}>
                    <Paper >
                        <Table striped= {"true"}>
                            <TableBody >                                    
                                <TableRow hover={true}>
                                    <TableCell style={{width: "40", textAlign: "center"}}><h3>{address}</h3></TableCell>
                                    <PendingOrder status= {this.state.status}/>
                                    <TableCell style={{textAlign:"center", width: "30%" }}><h4>Total: {this.ccyFormat(invoiceTotal)}€</h4></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={_id}>
                        <Card.Body>
                            <Paper className={"classes.root"}>
                                <Table className={classes.table} striped= {"true"} bordered={"true"}> 
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Food</TableCell>
                                        <TableCell align="right">Base Price</TableCell>
                                        <TableCell align="right">Condoments</TableCell>
                                        <TableCell align="right">Extras </TableCell>
                                        <TableCell align="right">Price of Condoments + Extras </TableCell>
                                        <TableCell align="right">Food Final Price</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.id} hover={true}>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="right">{row.bPrice}</TableCell>
                                            <TableCell align="right">{row.conds}</TableCell>
                                            <TableCell align="right">{row.extras}</TableCell>
                                            <TableCell align="right">{row.conExPrice}€</TableCell>
                                            <TableCell align="right">{row.total}€</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                    <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={5} style={{backgroundColor:"#FAF6BF"}}>Total</TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#FAF6BF"}}>{this.ccyFormat(invoiceTotal)}€</TableCell>
                                        <TableCell style={{textAlign:"center", backgroundColor:"#FAF6BF" }}>
                                            <Button disabled={this.state.status === "Completed" ? true : false} className="float-right" onClick={(e) => this.changeStatus(_id, e)}><h5>Click if order completed</h5> </Button>
                                        </TableCell>
                                    </TableRow>
                                    </TableFooter>
                                </Table>
                            </Paper>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

function PendingOrder(props){
    if (props.status === "Pending"){
        return (
            <>
                <TableCell style={{textAlign:"center", width: "30%" }}>
                    <h3 style={{backgroundColor: "#F54346"}}>{props.status}</h3>
                </TableCell>
            </>
        )
    }
  return (
    <TableCell style={{textAlign:"center", width: "30%" }}>
        <h3 style={{backgroundColor: "#9DEEC5"}}>{props.status}</h3>
    </TableCell>
  )
}