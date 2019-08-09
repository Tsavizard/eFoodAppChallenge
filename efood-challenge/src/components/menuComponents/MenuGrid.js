import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FoodItem from './foodItem'

export default function MenuGrid (props){

  const mTable = props.items.map((item,index) => {
    return (
      <Grid container spacing={2} key={"divKey"+index}>
        <Grid item xs={12} >
          <Paper >
            <FoodItem food ={item}/> 
          </Paper>
        </Grid>
      </Grid> 
    )
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={props.myStyles}>
          <h2 style={{textAlign: "center"}}> {props.cat} </h2>
          <hr/>
        </Paper>
        {mTable}
      </Grid>  
    </Grid> 
  )
}