import Equipment from 'gear/equipment/Equipment.js'


const PepperSpray = new Equipment({
	id: `bc0af616-f2b7-46fe-7c40-c248950c436a`,
	name: `Pepper Spray`,
	desc: [
		`+3 Ranged(Shoot) with this weapon.`,
		`Range:1.`,
		`Successful Called Shot: Head causes 6 Pain.`,
		`Takes 1 round for Pain to start.`,
		`Pain lasts for d6x5 minutes.`,
		`3 uses.`,
		`Toxin.`,
	],
	sz: 0
})

export default PepperSpray