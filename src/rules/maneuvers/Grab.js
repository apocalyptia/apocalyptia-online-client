import Rule from '../Rule'
import { Hold } from './Hold'
import { Tackle } from './Tackle'
import { Throw } from './Throw'

export const Grab = new Rule(
    `Grab`, 
    `0DMG MATK to render an enemy Defenseless. You must have a free hand to Grab. Spend 1AP per rnd to retain Grab. Roll [(Acrobatics or Melee) vs Grab] to escape.`,
    [Hold, Tackle, Throw]
)