import Armor from './Armor'
import FireResistance from '../attributes/armor/FireResistance'
import Mask from '../attributes/armor/Mask'


const MotorcycleHelmet = new Armor({
	name: `Motorcycle Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`,
	attr: [
		FireResistance,
		Mask,
	]
})

export default MotorcycleHelmet