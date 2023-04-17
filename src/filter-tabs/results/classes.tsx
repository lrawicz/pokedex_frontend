
export class Moves{
    name:string = "golpe"
    category:("physical" | "special" | "status") = "physical"
    power:number = 80
    type:string = "dark"
}
export class Stats{
    hp:number = 100
    attack: number = 110
    defense: number = 120
    specialAttack: number = 130
    specialDefense: number = 140
    speed: number = 150
}
export class Pokemon{
    moves:Moves[] = [new Moves()]
    name:string = "umbreon"
    ability:string[] = ["synchronize","inner-focus"]
    id:number = 197
    sprite:string = "https://archives.bulbagarden.net/media/upload/a/a9/Spr_3r_197.png"
    stats:Stats = new Stats()
    types:string[] = ["dark"]
}

 export function getDataV1():Pokemon[]{
  return [new Pokemon(),new Pokemon(),new Pokemon()]
 }
export function getData() {
    let result ={}
    fetch("http://localhost:8000/test")
        .then(response => {return response.json()})
        .then(data => {result = data})
    return result
  }