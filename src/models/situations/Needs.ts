import Rule from '../rule'
import { Dehydration } from './Dehydration'
import { Exhaustion } from './Exhaustion'
import { Hypothermia } from './Hypothermia'
import { Starvation } from './Starvation'
import { Suffocation } from './Suffocation'

export const Needs = new Rule(
    `Needs`, 
    `1 Pain for each lacking Need over a given period of time:`,
    [Dehydration, Exhaustion, Hypothermia, Starvation, Suffocation]
)