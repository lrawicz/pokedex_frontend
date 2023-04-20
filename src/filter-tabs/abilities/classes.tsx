export class ClassAbility{
    trigger: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
    target: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
    effect: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
    name: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"OneOf"}
  }