import Gear from 'gear/Gear.js'

const Painkiller = new Gear({
	id: `c9be0c61-4165-45eb-5460-995a546e1e6f`,
	name: `Painkiller`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	sz: 0,
	type: `Drug`
})
Painkiller.mix = 9
Painkiller.od = true

export default Painkiller