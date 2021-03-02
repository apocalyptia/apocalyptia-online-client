import Alcohol from 'rules/gear/equipment/drugs/Alcohol.js'
import Antibiotic from 'rules/gear/equipment/drugs/Antibiotic.js'
import Hallucinogen from 'rules/gear/equipment/drugs/Hallucinogen.js'
import Painkiller from 'rules/gear/equipment/drugs/Painkiller.js'
import Sedative from 'rules/gear/equipment/drugs/Sedative.js'
import Stimulant from 'rules/gear/equipment/drugs/Stimulant.js'

export default {
	name: `Drugs`,
	list: [
		Alcohol,
		Antibiotic,
		Hallucinogen,
		Painkiller,
		Sedative,
		Stimulant,
	]
}


// OLD AbsorptionUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6 rounds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/round for 5 rounds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Resuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)