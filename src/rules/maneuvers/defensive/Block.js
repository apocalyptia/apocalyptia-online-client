import Maneuver from '../Maneuver'
import melee from '../../skills/Melee'

const Block = new Maneuver({
	id: `af99f6bc-7db2-41ec-b35e-e709bd29d8a1`,
	cat: `Defensive`,
	name: melee.specs.block.name, 
	desc: melee.specs.block.desc
})

export default Block