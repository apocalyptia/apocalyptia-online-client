import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Drive = new Skill({
	id: `19aeb7ad-c940-4c7c-b238-cc77c05d1fc4`,
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		ram: new Stat({
			id: `9483457c-5e90-4225-932f-f010077fecad`,
			name: `Ram`,
			desc: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Stat({
			id: `47a939cf-88ba-4773-bf52-4d383fb38695`,
			name: `Stunt`,
			desc: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
})

export default Drive