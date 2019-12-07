import Rule from '../Rule'
import { Reflex } from './Reflex'

export const Defense = new Rule(
    `Defense`, 
    `You get 2 Defense Actions per round that you may spend to roll Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging, or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`, 
    [Reflex]
)