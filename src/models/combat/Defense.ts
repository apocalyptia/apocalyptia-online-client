import Rule from '../rule'
import { Reflex } from './Reflex'

export const Defense = new Rule(
    `Defense`, 
    `1AP to defend against an ATK with Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`, 
    [Reflex]
)