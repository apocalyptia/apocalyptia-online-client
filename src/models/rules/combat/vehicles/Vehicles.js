import Rule from '../../rule.js'
import { Burning } from './Burning.js'
import { Conditions } from './Conditions.js'
import { Occupants } from './Occupants.js'
import { Pedestrians } from './Pedestrians.js'
import { Tires } from './Tires.js'
import { Wreck } from './Wreck.js'

export const Vehicles = new Rule(
    `Vehicles`, 
    `Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`, 
    [Conditions, Occupants, Pedestrians, Tires, Wreck, Burning]
)