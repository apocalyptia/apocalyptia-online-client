import Rule from './Rule'

export class Trait extends Rule {
	constructor(name, description) {
		super(name, description)
	}
}

export const startingTraitPoints = 14

export const TraitExplanation = `The four Traits range from 1 to 6. You get ${startingTraitPoints} points for Traits. Trait rolls are [d6 + Trait]. Trait scores set the upper limit for their Skills. The average person would have a 3 in each Trait.`

export const TraitFlowExplanation = 'Once per year (in-game), you may choose to move 1 point from one Trait to another for 30XP. Traits can only be changed by ±1 in this way. Recalculate any associated Properties.'


export const Agility = new Trait(
	`Agility`,
	[`Agility is a Character’s talent for physical coordination. High Agility indicates balance, flexibility, and fine motor skill. This Trait determines Initiative and Speed. Agility is the parent Trait for Acrobatics, Larceny, Ranged, and Stealth.`]
)

export const Brains = new Trait(
	`Brains`,
	[`Brains is a Character’s talent for cognitive performance and abstract thought. High Brains indicates sharp memory, keen awareness, and studiousness. This Trait determines Experience. Brains is the parent Trait for Build, Medicine, Perception, Science.`]
)

export const Constitution = new Trait(
	`Constitution`,
	[`Constitution is a Character’s talent for physical strength and durability. High Constitution indicates good health and powerful muscles. This Trait determines Health, Pain, and Speed. Constitution is the parent Trait for Athletics, Drive, Melee, and Survival.`]
)

export const Demeanor = new Trait(
	`Demeanor`,
	[`Demeanor is a Character’s talent for social exchanges and sheer force of will. High Demeanor indicates charisma, self-motivation, and confidence. This Trait determines Psyche and Luck. Demeanor is also the parent Trait for Leadership, Perform, Socialize, and Tame.`]
)

export const TraitList = [
		Agility,
		Brains,
		Constitution,
		Demeanor
]