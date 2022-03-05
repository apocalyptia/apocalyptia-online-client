import Combat from '$classes/Combat.js'

const Tires = new Combat({
	name: `Tires`,
	description: [
		`Roll [ -3 Attack vs Drive ( Stunt ) ] to destroy a tire.`,
		`If the tire is destroyed, the driver must roll [ Drive 9# ] or Wreck.`,
		`If a front tire gets destroyed, the vehicle Wrecks automatically.`,
	],
})

export default Tires
