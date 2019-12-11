import Gear from './Gear.js'

class Drug extends Gear {
	constuctor (name, mix, overdose, description, sz) {
		super(name, description, sz)
		this.mix = mix
		this.overdose = overdose
	}
}

export const DrugsList = [
	new Drug(`Alcohol`,			 9,  true,   `Antibiotic or Fuel. C9# or Unstable.`,				 1),
	new Drug(`Antibiotic`,		  12, false,  `Prevents infection in Recovery for 1 day.`,			0),
	new Drug(`Hallucinogen`,		15, false,  `+1 Perform and Tame. -3 all other rolls. -1 Psyche.`,  0),
	new Drug(`Painkiller`,		  9,  true,   `Ignore 1 Pain penalty.`,							   0),
	new Drug(`Sedative`,			12, true,   `D#6/rnd to take any action.`,						  0),
	new Drug(`Stimulant`,		   9,  true,   `Ignore Exhaustion penalties for 6hrs.`,				0)
]

// OLD
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6rnds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/rnd for 5rnds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Rescuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)