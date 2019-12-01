import { Actions } from './actions/Actions.js'
import { Attack } from './attack/Attack.js'
import { Communication } from './communication/Communication.js'
import { Damage } from './damage/Damage.js'
import { Defense } from './defense/Defense.js'
import { Health } from './health/Health.js'
import { Movement } from './movement/Movement.js'
import { Time } from './time/Time.js'
import { Vehicles } from './vehicles/Vehicles.js'

export const Combat = [
    Time,
    Communication,
    Actions,
    Movement,
    Attack,
    Defense,
    Health,
    Damage,
    Vehicles
]