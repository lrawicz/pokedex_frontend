import { Component } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import { ClassMove } from '../../../Interface';

type MyProps={
    sendToParent:any,
    dialogOpen:boolean,
    move:ClassMove

  }
type MyState ={
    dialogOpen:boolean,
    move:ClassMove
}
export default class SimpleDialog extends Component<MyProps, MyState> {

    constructor(props:MyProps){
        super(props)
        this.state={
            move:this.props.move,
            dialogOpen:this.props.dialogOpen
        }
        this.dialogClose = this.dialogClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

    }
    dialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    };
    dialogOpen = () => {
        this.setState({
            dialogOpen: true
        })
    };
  
    handleListItemClick = (value: string) => {
      let temp_move = this.state.move
      this.props.sendToParent(value)
      //temp_move[value as keyof typeof this.state.move].enable = !temp_enableOptions[value as keyof typeof this.state.enableOptions].enable;
      //this.setState({enableOptions: temp_move})
    };
    render(){
        //this.state.move[entry as keyof typeof this.state.move].
        return (
          <Dialog maxWidth='xl' onClose={this.dialogClose} open={this.state.dialogOpen}>
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