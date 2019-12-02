import Rule from '../../rule.js'
import { Dehydration } from './Dehydration.js'
import { Exhaustion } from './Exhaustion.js'
import { Hypothermia } from './Hypothermia.js'
import { Starvation } from './Starvation.js'
import { Suffocation } from './Suffocation.js'

export const Needs = new Rule(
    `Needs`, 
    `1 Pain for each lacking Need over a given period of time:`,
    [Dehydration, Exhaustion, Hypothermia, Starvation, Suffocation]
)