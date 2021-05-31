import Misc from '/src/classes/gear/Misc.js'

const PepperSpray = new Misc({
	name: `Pepper Spray`,
	desc: [
		`+3 Projectile(Shoot) with this weapon.`,
		`Range:1.`,
		`Successful Called Shot: Head causes 6 Pain.`,
		`Takes 1 Round for Pain to start.`,
		`Pain lasts for d6x5 minutes.`,
		`3 uses.`,
		`Toxin.`
	],
	sz: 0
})

export default PepperSpray
