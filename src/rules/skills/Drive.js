import Rule from '$classes/Rule.js'

const Drive = new Rule({
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	type: `Skill`
})
Drive.parent = `Constitution`
Drive.diff = `varies`
Drive.specs = {
	ram: new Rule({
		id: `9483457c-5e90-4225-932f-f010077fecad`,
		name: `Ram`,
		desc: [
			`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
		]
	}),
	stunt: new Rule({
		id: `47a939cf-88ba-4773-bf52-4d383fb38695`,
		name: `Stunt`,
		desc: [
			`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
		]
	})
}

export default Drive