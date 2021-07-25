import Disease from '../../classes/Disease.js'

const Smallpox = new Disease({
	name: `Smallpox`,
	transmission: `Air, 3 yards`,
	virulence: `Constitution 15#`,
	diagnose: `Medicine 6#`,
	onset: `d6 weeks`,
	duration: `d6x4 days`,
	symptoms: [`Fever`, `Aches`, `Hydrophobia`, `Low blood pressue`, `Sweating`, `Vomiting`, `Drooling foam`],
	effects: `Take 1 Head DMG every day while infection lasts. Natural Recovery is halted during infection.`,
	treatment: `Amputation of exposed Body Part within d6 minutes prevents infection of the entire body. No further Treatment. Contagion: Luck 3# 1/day.`,
})

export default Smallpox
