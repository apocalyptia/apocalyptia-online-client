import Rule from '../Rule'
import { DamageReduction } from './DamageReduction'
import { FireDamage } from './FireDamage'
import { Pain } from './Pain'

export const Damage = new Rule(
	`Damage`, 
	`Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`, 
	[DamageReduction, FireDamage, Pain]
)