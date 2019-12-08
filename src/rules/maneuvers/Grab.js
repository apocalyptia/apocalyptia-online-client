import Rule from '../Rule'
import { Hold } from './Hold'
import { Tackle } from './Tackle'
import { Throw } from './Throw'

export const Grab = new Rule(
	`Grab`, 
	`0DMG MATK to render an enemy Defenseless and unable to take actions except attempting escape [(Acrobatics or Melee) vs Grab]. You must have a free hand to Grab. Spend 1 Action per rnd to retain a Grab.`,
	[Hold, Tackle, Throw]
)