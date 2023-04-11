import { Component } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import { ClassMove } from '../../../Interface';

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
        this.dialogClose = this.dialogClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

    }
    dialogClose = () => {
        let temp_move = this.state.move
        temp_move.dialog.value = false
        this.setState({
            move: temp_move
        })
    };

    handleListItemClick = (value: string) => {
      let temp_move = this.state.move
      //this.props.sendToParent(value)
      //temp_move[value as keyof typeof this.state.move].enable = !temp_enableOptions[value as keyof typeof this.state.enableOptions].enable;
      //this.setState({enableOptions: temp_move})
    };
    render(){
        //this.state.move[entry as keyof typeof this.state.move].
        return (
          <Dialog maxWidth='xl' onClose={this.dialogClose} open={this.state.move.dialog.value}>
            <DialogTitle width={"300px"}>Config</DialogTitle>
              { Object.keys(this.state.move).map((entry:string) => (
                <Chip 
                label={ entry} 
                onClick={() => this.handleListItemClick(entry)} 
                />
              ))}
          </Dialog>
        );
    }
  }