import Rule from '../../../rule.js'
import { Hold } from './Hold.js'
import { Tackle } from './Tackle.js'
import { Throw } from './Throw.js'

export const Grab = new Rule(
    `Grab`, 
    `0DMG MATK to render an enemy Defenseless. You must have a free hand to Grab. Spend 1AP per rnd to retain Grab. Roll [(Acrobatics or Melee) vs Grab] to escape.`,
    [Hold, Tackle, Throw]
)