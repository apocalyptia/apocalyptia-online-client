import Rule from '../rule'
import { Burning } from './Burning'
import { Conditions } from './Conditions'
import { Occupants } from './Occupants'
import { Pedestrians } from './Pedestrians'
import { Tires } from './Tires'
import { Wreck } from './Wreck'

export const Vehicles = new Rule(
    `Vehicles`, 
    `Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`, 
    [Conditions, Occupants, Pedestrians, Tires, Wreck, Burning]
)