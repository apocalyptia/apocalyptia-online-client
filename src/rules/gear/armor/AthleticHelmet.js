import Gear from '../../../classes/Gear.js'

const AthleticHelmet = new Gear({
	name: `Athletic Helmet`,
	sz: 2,
	type: `Armor`
})
AthleticHelmet.dr = 1
AthleticHelmet.loc = `Head`

export default AthleticHelmet
