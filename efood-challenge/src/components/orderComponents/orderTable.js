import React from 'react';
import {lighten, makeStyles } from '@material-ui/core/styles';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

// function priceRow(qty, unit) {
//   return qty * unit;
// }

function createRow(id, name, bPrice,conds, extras, conExPrice, total) {
  //const price = priceRow(1, bPrice);
  return {id, name, bPrice, conds, extras, conExPrice, total };
}

function subtotal(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable(props) {
    const classes = useStyles();
    const {_id, address, foods, status} = props.data

    const rows = foods.map((item,index) => {
      const id = index + _id
        return( 
            createRow(id, item.foodName, item.basePrice, item.condoments.join(", "), item.extras.join(", "), item.conExPrice, item.totalPrice)
        )
    })

    const invoiceSubtotal = subtotal(rows);
    const invoiceTotal = invoiceSubtotal;
    return(
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={_id}>
                <Paper style={{width: "30%", marginLeft: "35%"}}>
                    <Table striped= {"true"}>
                        <TableBody >                                    
                            <TableRow hover={true}>
                                <TableCell style={{width: "60%", textAlign: "center"}}><h3>{address}</h3></TableCell>
                                <PendingOrder status = {status}/>
                                <TableCell colSpan={1} style={{textAlign:"center", width: "20%" }}><h4>Total</h4></TableCell>
                                <TableCell align="center"><h4>{ccyFormat(invoiceTotal)}€</h4></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={_id}>
                    <Card.Body>
                        <Paper className={classes.root}>
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
                                <TableRow>
                                    <TableCell colSpan={5} style={{backgroundColor:"#FAF6BF"}}>Total</TableCell>
                                    <TableCell align="right" style={{backgroundColor:"#FAF6BF"}}>{ccyFormat(invoiceTotal)}€</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

function PendingOrder(props){
    if (props.status === "pending"){
        return (
            <TableCell align="center">
                <h3 style={{backgroundColor: "#F54346"}}>{props.status}</h3>
            </TableCell>
        )
    }
  return (
    <TableCell align="center">
        <h3 style={{backgroundColor: "#9DEEC5"}}>{props.status}</h3>
    </TableCell>
  )
}
