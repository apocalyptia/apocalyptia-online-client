import Disease from 'classes/Disease.js'

const Rabies = new Disease({
	name: `Rabies`,
	transmission: `Body fluids`,
	virulence: `Constitution 15#`,
	diagnose: `Medicine 6#`,
	onset: `d6 weeks`,
	duration: `d6x4 days`,
	symptoms: [
		`Fever`,
		`Aches`,
		`Hydrophobia`,
		`Low blood pressue`,
		`Sweating`,
		`Vomiting`,
		`Drooling foam`,
		`Convulsions`,
		`Photophobia`,
		`Pupil dilation`,
		`Agitation`,
		`Dehydration`,
		`Fatigue`,
		`Delirium`,
		`Paralysis`,
		`Stupor`,
		`Coma`
	],
	effects: `Take 1 Head DMG every day while infection lasts. Natural Recovery is halted during infection.`,
	treatment: `Amputation of exposed Body Part within d6 minutes prevents infection of the entire body. No further Treatment. Contagion: Luck 3# 1/day.`
})

export default Rabies