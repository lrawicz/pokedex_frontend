//Own
import { ClassStats } from './stats/classes';
import { ClassGeneralData } from './general/classes';
import { ClassAbility } from './abilities/classes';
import { ClassMove} from './moves/classes'


let move01:ClassMove = new ClassMove()
move01.title= "01"
let move02:ClassMove = new ClassMove()
move02.title= "02"

export class ClassFilter{
        general:ClassGeneralData = new ClassGeneralData()
        moves:ClassMove[] = [move01,move02]
        stats:ClassStats =  new ClassStats()
        ability:ClassAbility =  new ClassAbility()
    }
