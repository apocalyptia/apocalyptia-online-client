import Ammo from '/src/classes/gear/Ammo.js'

const Standard45ACP = new Ammo({
	name: `.45ACP Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.01
})
Standard45ACP.cal = `.45ACP`

export default Standard45ACP
