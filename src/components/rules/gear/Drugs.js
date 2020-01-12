import { Gear } from '../Gear'


class Drug extends Gear {
	constructor (
		name,
		description,
		sz,
		mix,
		overdose
	) {
		super(
			name,
			description,
			sz
		)
		this.mix = mix
		this.overdose = overdose
	}
}


export const Alcohol = new Drug({
	name: `Alcohol`,
	description: [
		`Antibiotic or Fuel. C9# or Unstable.`
	],
	sz: 1,
	mix: 9,
	overdose: true
})

export const Antibiotic = new Drug({
	name: `Antibiotic`,
	description: [
		`Prevents infection in Recovery for 1 day.`
	],
	sz: 0,
	mix: 12,
	overdose: false
})

export const Hallucinogen = new Drug({
	name: `Hallucinogen`,
	description: [
		`+1 Perform and Tame. -3 all other rolls. -1 Psyche.`
	],
	sz: 0,
	mix: 15,
	overdose: false
})

export const Painkiller = new Drug({
	name: `Painkiller`,
	description: [
		`Ignore 1 Pain penalty.`
	],
	sz: 0,
	mix: 9,
	overdose: true
})

export const Sedative = new Drug({
	name: `Sedative`,
	description: [
		`D#6/rnd to take any action.`
	],
	sz: 0,
	mix: 12,
	overdose: true
})

export const Stimulant = new Drug({
	name: `Stimulant`,
	description: [
		`Ignore Exhaustion penalties for 6hrs.`
	],
	sz: 0,
	mix: 9,
	overdose: true
})


export const DrugsList = [
	Alcohol,
	Antibiotic,
	Hallucinogen,
	Painkiller,
	Sedative,
	Stimulant
]

// OLD DRUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6rnds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/rnd for 5rnds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Rescuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)