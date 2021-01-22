import Disease from '$classes/Disease.js'

const MRSA = new Disease({
	id: ``,
	name: `MRSA`,
	desc: [],
	transmission: `Touch`,
	virulence: `Constitution 12#`,
	diagnose: `Medicine 18#`,
	onset: `d6 weeks`,
	duration: `d6 days`,
	symptoms: [
		`Small red bumps on skin`,
		`Fever`,
		`Rash`,
		`Puss-filled boils`
	],
	effects: `MRSA can live on surfaces for d6 days after contact. Roll C9# every 12hrs to avoid 1 Torso DMG while infection lasts. Natural Recovery is halted during infection.`,
	treatment: `No effective Treatment. No response to Antibiotics. Contagion: Luck 9# 1/day.`
})

export default MRSA