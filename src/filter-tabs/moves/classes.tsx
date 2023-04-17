export class ClassMoveData {
    names:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean} 
      = {value:[],enable:true, operator:"OneOf"} 
    damageClass:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean} 
      = {value:[],enable:true, operator:"OneOf"}
    types:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean}  
      = {value:[] ,enable:true, operator:"OneOf"}
    target:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean} 
      = {value:[],enable:false, operator:"OneOf"}
    power:{value:number[], enable:boolean, operator:"MinMax"}  
      = {value:[], enable:true,operator:"MinMax"}
    priority:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    accurrency:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    effectChance:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    statusEffect:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean}  
      = {value:[],enable:false, operator:"OneOf"}
    category:{value:string[], operator:"OneOf" | "ContainsAll",enable:boolean} 
      = {value:[],enable:false, operator:"ContainsAll"}
  }
export class ClassMove {
    data: ClassMoveData = new ClassMoveData()
    title: string = ""
    dialog: boolean= false
}
export let MovesLabel = {
    title: "Title",
    names: "Names",
    damageClass: "Damage Class",
    types: "Types",
    target: "Target",
    power: "Power",
    priority: "Priority",
    accurrency: "Accurrency",
    effectChance: "Effect Chance",
    statusEffect: "Status Effect",
    category: "Category"
  }
export type TypeMoveDataProp =  keyof ClassMoveData
export type TypeMoveData = keyof ClassMoveData
