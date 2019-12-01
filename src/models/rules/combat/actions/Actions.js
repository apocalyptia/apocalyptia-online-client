import Rule from '../../rule.js'
import { Prepare } from './Prepare.js'

export const Actions = new Rule(
    `Actions`, 
    `Perform Actions by spending Action Points. Your maximum AP is your [(A + B) / 2]. AP refills at the start of your turn. Unless otherwise noted, all Actions cost 1AP. The only way to take an Action on another turn is to make a Defense roll or Ready an Action.`, 
    [Prepare]
)