import { Component } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import { ClassMove, TypeMoveData,ClassMoveData, TypeMoveDataProp } from '../../../Interface';

type MyProps={
    sendToParent:any,
    move:ClassMove

  }
type MyState ={
    move:ClassMove
}
export default class SimpleDialog extends Component<MyProps, MyState> {

    constructor(props:MyProps){
        super(props)
        this.state={
            move:this.props.move,
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
    };

    CategoryClick = (key:string ) => {
      let temp_move = this.state.move
      temp_move.data[key as keyof typeof temp_move.data ].enable = !temp_move.data[key as keyof typeof temp_move.data ].enable
      this.setState({
        move:temp_move
      })
    };
    render(){
        //this.state.move[entry as keyof typeof this.state.move].
        return (
          <Dialog maxWidth='xl' onClose={this.dialogClose} open={this.state.move.dialog}>
            <DialogTitle width={"300px"}>Config</DialogTitle>
              { Object.keys(this.state.move.data).map((key) => (
                        <Chip
                        label={key}
                        onClick={()=>this.CategoryClick(key)}
                        />
              ))}
          </Dialog>
        );
    }
  }

  /*
        <Chip
                label={key}
                onClick={() => this.handleListItemClick(key)}
                clickable
                variant={key? "filled": "outlined"}
                />
                 */