import Rule from '../Rule.js'

class Attribute extends Rule {
	constructor(name, description) {
		super(name, description)
	}
}

// TODO : Figure out rules to specify weapon categories that attributes qualify for.

export const ArmorAttributesList = [
	new Attribute('Camo', '+1 Stealth per Location when in a given Biome.'),
	new Attribute('CR', 'Delay Hypothermia for 1hr per Location.'),
	new Attribute('FR', 'Armor DR reduces FDMG.'),
	new Attribute('Impermeable', 'Automatic Success to resist exposure to Diseases and Toxins.'),
	new Attribute('Mask', 'Obscures identity and protects face. -1 Perception.'),
]

export const WeaponAttributesList = [
	new Attribute('1h', 'Used one-handed. +1 RATK if used with both hands.'),
	new Attribute('2h', 'Used two-handed. Penalty = [Sz] if used one-handed.'),
	new Attribute('Auto', '[+3 RATK vs one target] or 3yd Blast. Uses 10 bullets.'),
	new Attribute('Blast', '[d6 vs Reflex] in radius. [DMG / 2] on a miss (mininum 1).'),
	new Attribute('Blunt', 'Does not cause Bleeding.'),
	new Attribute('Chop', '+1 DMG to Locations with no Armor.'),
	new Attribute('FDMG', 'Fire DMG. FDMG can only be prevented with FR Armor.'),
	new Attribute('Pierce', '+1 DMG to Locations with Armor.'),
	new Attribute('Rapid', '2 ATKS for 1 Action.'),
	new Attribute('Sawn-off', '[RNG / 2] and -1 Size.'),
	new Attribute('Scatter', 'Ignore RNG penalties. -1 DMG per extended RNG.'),
	new Attribute('Slow', 'Penalty to Initiative = Size.'),
]

class AmmoAttribute extends Attribute {
	constructor(name, notes, caliber) {
		super(name, notes)
		this.caliber = caliber
	}
}

export const AmmoAttributesList = [
	new AmmoAttribute('Armor Piercing', 'Pierce.', ['5.56', '.308']),
	new AmmoAttribute('Broadhead', '+1 DMG. Pierce', ['Arrow']),
	new AmmoAttribute('Buckshot', 'Scatter.', ['12g']),
	new AmmoAttribute('Hollow Point', '+1 DMG.', ['.22', '9mm', '.357', '5.56', '.308', '12g']),
	new AmmoAttribute('Match', '+1 RATK.', ['.22', '9mm', '.357', '5.56', '.308']),
	new AmmoAttribute('Slug', 'RNG x2.', ['12g'])
]