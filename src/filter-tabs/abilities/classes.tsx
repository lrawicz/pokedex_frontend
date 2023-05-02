export class ClassAbility{
    trigger: {value: string[], operator:"or" | "and"} = {value:[],operator:"and"}
    target: {value: string[], operator:"or" | "and"} = {value:[],operator:"and"}
    effect: {value: string[], operator:"or" | "and"} = {value:[],operator:"and"}
    name: {value: string[], operator:"or" | "and"} = {value:[],operator:"or"}
  }