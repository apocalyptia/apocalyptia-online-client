import Armor from '/src/classes/gear/Armor.js'

const AthleticHelmet = new Armor({
	name: `Athletic Helmet`,
	sz: 2,
	type: `Armor`
})
AthleticHelmet.dr = 1
AthleticHelmet.loc = `Head`

export default AthleticHelmet
