import Maneuver from '../../../classes/Maneuver'
import melee from '../../skills/Melee'

const Block = new Maneuver({
	cat: `Defensive`,
	name: melee.specs.block.name, 
	desc: melee.specs.block.desc
})

export default Block