import { Actions } from './Actions'
import { Attack } from './Attack'
import { Communication } from './Communication'
import { Damage } from './Damage'
import { Defense } from './Defense'
import { Health } from './Health'
import { Initiative } from './Initiative'
import { Movement } from './Movement'
import { Rounds } from './Rounds'
import { Vehicles } from './Vehicles'

export const Combat = [
	Rounds,
	Initiative,
	Actions,
	Communication,
	Movement,
	Attack,
	Defense,
	Health,
	Damage,
	Vehicles
]