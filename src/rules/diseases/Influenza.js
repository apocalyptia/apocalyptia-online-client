import Disease from '../../classes/Disease.js' 

const Influenza = new Disease({
	name: `Influenza`,
	transmission: `Air, 10yds`,
	virulence: `Constitution 12#`,
	diagnose: `Medicine 3#`,
	onset: `d6x2 days`,
	duration: `d6x3 days`,
	symptoms: [
		`Headache`,
		`Fever`,
		`Fatigue`,
		`Nausea`,
		`Muscle pain`,
		`Lesions in mouth, face, and body`,
		`Vomiting`,
		`Rash`,
		`Blackened skin`
	],
	effects: `Smallpox can live for d6x3 days in infected linens. Roll C9# 1/day to avoid 1 Torso DMG while infection lasts. Natural Recovery is halted during infection.`,
	treatment: `Medicine 6# 1/day to grant +1C to resist DMG. Contagion: Luck 12# 1/day.`
})

export default Influenza