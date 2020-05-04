import Alcohol from '../Alcohol'
import Antibiotic from '../Antibiotic'
import Hallucinogen from '../Hallucinogen'
import Painkiller from '../Painkiller'
import Sedative from '../Sedative'
import Stimulant from '../Stimulant'


const DrugList = [
	Alcohol,
	Antibiotic,
	Hallucinogen,
	Painkiller,
	Sedative,
	Stimulant,
]

export default DrugList


// OLD Damage ResistanceUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6 rounds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/round for 5 rounds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Resuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)