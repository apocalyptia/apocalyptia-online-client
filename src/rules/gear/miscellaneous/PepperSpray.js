import Gear from '../../../classes/Gear.js' 

const PepperSpray = new Gear({
	name: `Pepper Spray`,
	desc: [
		`+3 Projectile(Shoot) with this weapon.`,
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