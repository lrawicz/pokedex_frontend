import { Component } from 'react';

import {Dialog,Chip, DialogTitle} from '@mui/material';
// Own:
import { ClassMove,ClassMoveData,MovesLabel } from '../../Interface';

type MyProps={
    sendToParent:any,
    move:ClassMove,
    moveIndex:number

  }
type MyState ={
    move:ClassMove
    moveIndex:number
}
export default class SimpleDialog extends Component<MyProps, MyState> {

    constructor(props:MyProps){
        super(props)
        this.state={
            move:this.props.move,
            moveIndex:this.props.moveIndex,
        }

        //functions
        this.dialogClose = this.dialogClose.bind(this);
        this.CategoryClick = this.CategoryClick.bind(this);

    }
    dialogClose = () => {
        let temp_move = this.state.move
        temp_move.dialog = false
        this.setState({
            move: temp_move
        })
        this.props.sendToParent(temp_move,this.state.moveIndex)
    };

    CategoryClick = (key:string ) => {
      let temp_move = this.state.move
      temp_move.data[key as keyof typeof temp_move.data ].enable = !temp_move.data[key as keyof typeof temp_move.data ].enable
      this.setState({
        move:temp_move
      })
      this.props.sendToParent(temp_move,this.state.moveIndex)
    };
    render(){
        //this.state.move[entry as keyof typeof this.state.move].
        let temp_moveData = new ClassMoveData()
        let keys_moveData = Object.keys(temp_moveData)
        let a = this.state.move.data[keys_moveData[0] as keyof typeof this.state.move.data].enable
        return (
          <Dialog maxWidth='xl' onClose={this.dialogClose} open={this.state.move.dialog}>
            <DialogTitle width={"300px"}>Config</DialogTitle>
            {keys_moveData.map((key) => (
                <Chip
                label={MovesLabel[key as keyof typeof MovesLabel ]}
                color={this.state.move.data[key as keyof typeof this.state.move.data].enable? "info":"secondary"}
                //className={this.state.move.data[key as keyof typeof this.state.move.data].enable? "move-prop-active":"move-prop-inactive"}
                onClick={()=>this.CategoryClick(key)}
                />
                ))}
          </Dialog>
        );
      }
    }
