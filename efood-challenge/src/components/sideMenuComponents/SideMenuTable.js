import React from 'react';


function MyTable(props){
    var rows = [];
    props.menu.map(( item,key) => {
        if(item.foodcategory===props.cat)
        {rows.push(
                <tr key={item._id} >
                <td>{item.foodName}</td>
                </tr>
            )
        }
        return rows
    })

return(
    <table className="table">
        <tbody>
            {rows}
        </tbody>
    </table>
    )
}


export default MyTable;