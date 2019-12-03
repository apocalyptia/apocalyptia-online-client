import Rule from '../rule'
import { Bleeding } from '../situations/Bleeding'
import { Recovery } from './Recovery'

export const Health = new Rule(
    `Health`, 
    `[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding when you take Wounds = [Health / 2] and you die when you take Wounds = Health.`, 
    [Bleeding, Recovery]
)