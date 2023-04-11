export type TypeMinMax ={
  min: number
  max: number
}
export type TypeStatsNames ="hp"| "attack" | "specialAttack"  | "defense" | "specialDefense" | "speed"
export type TypePokemonType = "water" | "fire"
export type TypeMoveType = "physical" | "special" | "status"
export type TypeCondition = "burned" | "frozen" | "asleep"

export type TypeStats ={
    hp: TypeMinMax
    attack: TypeMinMax
    specialAttack: TypeMinMax
    defense: TypeMinMax
    specialDefense: TypeMinMax
    speed: TypeMinMax
  }

export type TypeAbility ={
    trigger: string[]
    target: string[]
    effect: string[]
  }

export type TypeMove ={
  title?: string
  power?: TypeMinMax
  pokemonType?: TypePokemonType
  moveType?: TypeMoveType
  condition?: string
  accurrency?: number
  priority?: number
  target?: string
  chance?: number
}