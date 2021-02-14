import Disease from 'classes/Disease.js'

const Cholera = new Disease({
	name: `Cholera`,
	transmission: `Food/Water`,
	virulence: `Constitution 9#`,
	diagnose: `Medicine 9#`,
	onset: `d6 hours`,
	duration: `d6x3 days`,
	symptoms: [
		`Abdominal pain`,
		`Nausea`,
		`Vomiting`,
		`Diarrhea`,
		`Dehydration`
	],
	effects: `Dehydration requires 6 rations of Water/day. 1 Pain/day.`,
	treatment: `Dehydration requires 6 rations of purified Water/day to avoid death. Antibiotics reduces Duration by 1 day per dose.`
})

export default Cholera