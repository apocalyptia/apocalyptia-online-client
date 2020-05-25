import Armor from './Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'


const GhillieSuit = new Armor({
	id: `6ec3af0b-27c8-4dde-b8b5-05a51633241b`,
	name: `Ghillie Suit`,
	sz: 4,
	dr: 1,
	loc: `Full Body`,
	attr: [
		Camo,
		ColdResistance,
	]
})

export default GhillieSuit