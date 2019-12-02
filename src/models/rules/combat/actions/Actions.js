import Rule from '../../rule.js'
import { Prepare } from './Prepare.js'

export const Actions = new Rule(
    `Actions`, 
    `Perform Actions by spending Action Points. Your maximum AP is your [(A + B) / 2]. AP refills at the start of your turn. Unless otherwise noted, all Actions cost 1AP. The only Actions you can take outside of your turn are Prepared Actions or Defense rolls.`, 
    [Prepare]
)