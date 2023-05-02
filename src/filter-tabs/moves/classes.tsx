export class ClassMoveData {
    names:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:true, operator:"or"}
    damageClass:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:true, operator:"or"}
    types:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[] ,enable:true, operator:"or"}
    metaType:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:false, operator:"or"}
    category:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:false, operator:"and"}
    target:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:false, operator:"or"}
    power:{value:number[], enable:boolean, operator:"MinMax"}  
      = {value:[], enable:true,operator:"MinMax"}
    priority:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    accurrency:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    effectChance:{value:number[], enable:boolean, operator:"MinMax"} 
      = {value:[],enable:false,operator:"MinMax"}
    statusEffect:{value:string[], operator:"or" | "and",enable:boolean}
      = {value:[],enable:false, operator:"or"}

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
    ailment: "Status Effect",
    category: "Category",
    metaType: "Meta-Type"
  }
export type TypeMoveDataProp =  keyof ClassMoveData
export type TypeMoveData = keyof ClassMoveData

export class MoveOptions{
  metaType:string[] = []
  name:string[] = []
  target :string[] = []
  damage_class :string[] = []
  type :string[] = []
  ailment :string[] = []
  category :string[] = []
}