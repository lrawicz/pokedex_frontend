import * as React from 'react';
import {Box} from '@mui/material';
//Own:
import ComboBoxTags from '../../components/combo-box-tags/combo-box-tags'
import { GeneralData } from './interface';
type MyProps={
  sendToParent:any,
  data: GeneralData
  //stats: ClassStats,
}
type MyState ={
    data:GeneralData
  posibleTypes:string[],
  posibleNames:string[],
  posibleEggGroup:string[],

}
export default class StatsTab extends React.Component<MyProps, MyState>{
    constructor(props:MyProps){
        super(props)
        this.state={
            data: props.data,
            posibleTypes:[],
            posibleNames:["Bulbasaur","Charmander"],
            posibleEggGroup:[]
        }
    }

    getData = (key: keyof GeneralData,value:any) => {
        let temp_data:GeneralData = this.state.data
        temp_data[key] = value
        this.setState({
            data: temp_data 
        });
      }
    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/type").then(response => {return response.json()})
        .then(data => {
            let tmp_type: string[] = []
            data.results.forEach((element: any) => {tmp_type.push(element.name)})
            this.setState((prevState) => ({posibleTypes: [...prevState.posibleTypes, ...tmp_type]
        }))
        })
        fetch("https://pokeapi.co/api/v2/egg-group").then(response => {return response.json()})
        .then(data => {
            let tmp_eggGroup: string[] = []
            data.results.forEach((element: any) => {tmp_eggGroup.push(element.name)})
            this.setState((prevState) => ({posibleEggGroup: [...prevState.posibleEggGroup, ...tmp_eggGroup]
        }))
        })
    }

    render() {
            return (
                <Box>
                {/*type 01*/}
                    <ComboBoxTags label='Names' name='names'
                    items={this.state.posibleNames}
                    value={this.state.data.names}
                    sendToParent={this.getData}/>
                
                {/*type 01*/}
                    <ComboBoxTags label='Type 01' name='type01'
                    items={this.state.posibleTypes}
                    value={this.state.data.type01}
                    sendToParent={this.getData}/>
                
                {/*type 02*/}
                    <ComboBoxTags label='Type 02' name='type02'
                    items={this.state.posibleTypes}
                    value={this.state.data.type02}
                    sendToParent={this.getData}/>
                
                {/*Egg Group*/}
                    <ComboBoxTags label='Egg Group' name='eggGroup'
                    items={this.state.posibleEggGroup}
                    value={this.state.data.eggGroup}
                    sendToParent={this.getData}/>
                </Box>
            )}
  
}