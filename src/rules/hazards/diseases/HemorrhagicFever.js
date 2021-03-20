import Disease from '/src/classes/Disease.js'

const HemorrhagicFever = new Disease({
	name: `Hemorrhagic Fever`,
	transmission: `Body Fluids`,
	virulence: `Constitution 12#`,
	diagnose: `Medicine 12#`,
	onset: `d6x3 days`,
	duration: `d6 weeks`,
	symptoms: [
		`Fever`,
		`Fatigue`,
		`Aches`,
		`Sore throat`,
		`Vomiting`,
		`Diarrhea`,
		`Rash`,
		`Impaired kidney/liver function`,
		`Internal/external bleeding`
	],
	effects: `1 Pain/day. Roll C6# 1/day to avoid 1 Torso DMG. Natural Recovery is halted during infection.`,
	treatment: `Medicine 9# 1/day to grant +1C to resist DMG. Contagion: Luck 6# 1/day.`
})

export default HemorrhagicFever