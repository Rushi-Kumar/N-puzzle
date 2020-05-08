import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from './box.jsx';
import ArrowKeysReact from 'arrow-keys-react';

const bg ={display: "flex",  flexWrap: "wrap",flexDirection:"row",margin:"50px",backgroundColor:"red",width:"200px",height:"200px"}

function randint(l, u){ // Returns an integer uniformly distributed over l..u. {
    return l + Math.floor(Math.random() * (u + 1 - l));
}




class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      boxes : this.generateJumbledNumbers() // contains array of numbers.
    }
  }

  // check if completed
  checkCompleted(){
    for(let i=0;i<this.state.boxes.length;i++){
      if(this.state.boxes[i] != i+1) return false;
    }
    return true;
  }

  // this generates an array of jumbled numbers
  generateJumbledNumbers(){
    let boxes = [];
    for(let i=1;i<16;i++) { boxes.push(i) }
    for(let i=0;i<16;i++){
      let a = boxes[i]
      let j = randint(0,14);
      boxes[i] = boxes[j]
      boxes[j]=a
    }
    console.log(boxes)
    return boxes
  }

  getIndexOfEmptyBox(){
    for(let i=0;i<this.state.boxes.length;i++){
      if(this.state.boxes[i]== undefined) return i;
    }
  }
  swap(lIndex,rIndex,boxes){
    let a = boxes[lIndex];
    boxes[lIndex] = boxes[rIndex];
    boxes[rIndex] = a
    return boxes;
  }
  canSwap(emptyIndex){
    let indexes = [0,4,8,12,3,7,11,15]
    if(indexes.findIndex(function(e){return e == emptyIndex}) == -1)return true;
    else return false;
  }
  move(direction){
    let emptyIndex = this.getIndexOfEmptyBox();
    let diff = {up:-4,down:4,right:1,left:-1}
    let gotoIndex = emptyIndex + diff[direction];
    if(!this.canSwap(emptyIndex)) return;
    let boxes = this.swap(emptyIndex,gotoIndex,this.state.boxes);
    this.setState({boxes})
    if(this.checkCompleted())alert("completed")
  }

  componentDidMount() {
    ArrowKeysReact.config({
        left: () => {
          this.move("left")
        },
        right: () => {
          this.move("right")
        },
        up: () => {
          this.move("up")
        },
        down: () => {
          this.move("down")
        }
      });
  }

  render () {
    return (
      <div className="App" {...ArrowKeysReact.events} tabIndex="1">
        <div style={bg} >
          {
            this.state.boxes.map(function(d,j){
              return <Box value = {d}/>
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
