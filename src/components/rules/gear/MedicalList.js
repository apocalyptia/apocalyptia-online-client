import Medical from '../../classes/gear/Medical'


export const Bandage = new Medical({
	name: `Bandage`,
	description: [
		`+1 Medicine(First-Aid).`,
		`1 use.`,
	],
	sz: 0
})

export const Crutch = new Medical({
	name: `Crutch`,
	description: [
		`Halves Leg Damage Pain penalty to Speed.`,
	],
	sz: 3
})

export const EMTBag = new Medical({
	name: `EMT Bag`,
	description: [
		`+3 Medicine(First-Aid).`,
		`30 uses.`,
	],
	sz: 5
})

export const FirstAidKit = new Medical({
	name: `First-Aid Kit`,
	description: [
		`+1 Medicine(First-Aid).`,
		`5 uses.`,
	],
	sz: 1
})

export const PressureCuff = new Medical({
	name: `Pressure Cuff`,
	description: [
		`+1 Medicine.`,
	],
	sz: 1
})

export const Stethoscope = new Medical({
	name: `Stethoscope`,
	description: [
		`+1 Medicine.`,
		`Perception(Hear) 6# through doors.`,
	],
	sz: 1
})

export const SurgeryKit = new Medical({
	name: `Surgery Kit`,
	description: [
		`+3 Medicine(Surgery).`,
	],
	sz: 3
})

export const Thermometer = new Medical({
	name: `Thermometer`,
	description: [
		`+1 Medicine.`,
		`Accurately reads temperature.`,
	],
	sz: 0
})

export const TransfusionKit = new Medical({
	name: `Transfusion Kit`,
	description: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`,
	],
	sz: 1
})


export default [
	Bandage,
	Crutch,
	EMTBag,
	FirstAidKit,
	PressureCuff,
	Stethoscope,
	SurgeryKit,
	Thermometer,
	TransfusionKit,
]