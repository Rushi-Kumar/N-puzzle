import React from 'react'
import PropTypes from 'prop-types'

const empty = {backgroundColor:"transparent",width:"50px",height:"50px"}
const box = {display:"flex",alignItems:"center",justifyContent:"center",boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.72)",backgroundColor:"white",width:"50px",height:"50px"}
class Box extends React.Component {

  render () {
    return (
      <div style ={this.props.value == undefined?empty:box}> {this.props.value}</div>
    )
  }
}

export default Box;
