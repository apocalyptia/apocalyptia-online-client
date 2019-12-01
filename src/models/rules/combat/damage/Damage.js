import Rule from '../../rule.js'
import { DamageReduction } from './DamageReduction.js'
import { FireDamage } from './FireDamage.js'
import { Pain } from './Pain.js'

export const Damage = new Rule(
    `Damage`, 
    `Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`, 
    [DamageReduction, FireDamage, Pain]
)