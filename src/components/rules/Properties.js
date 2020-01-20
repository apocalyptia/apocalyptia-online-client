import Rule from './Rule'

export class Property extends Rule {
	constructor({
		name,
		description,
		formula
	}) {
		super({
			name,
			description
		})
		this.formula = formula
	}
}

export const Block = new Property({
	name: `Block`,
	description: [
		``
	],
	formula: `melee`
})

export const Dodge = new Property({
	name: `Dodge`,
	description: [
		``
	],
	formula: `acrobatics`
})

export const Luck = new Property({
	name: `Luck`,
	description: [
		``
	],
	formula: `d6`
})

export const MentalHealth = new Property({
	name: `Mental Health`,
	description: [
		`[D x 3]. This is a measure of how much Trauma you can withstand. Any number of horrible events can cause Trauma. When Trauma = [D x 3] you lose all hope and seek out death at the earliest opportunity, unless someone can restrain you until you have Recovered from at least 1 Trauma.`
	],
	formula: `demeanor * 3`
})

export const PhysicalHealth = new Property({
	name: `Physical Health`,
	description: [
		`[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding 1 Wound/min when you have Wounds = [C]. The rate of Bleeding increases to 1 Wound/rnd and you fall Unconscious when you have Wounds = [C x 2]. You die when you have Wounds = [C x 3].`
	],
	formula: `constitution * 3`
})

export const Speed = new Property({
	name: `Speed`,
	description: [
		``
	],
	formula: `agility * 3`
})

export const Experience = new Property({
	name: `Experience`,
	description: [
		``
	],
	formula: `brains * 3`
})