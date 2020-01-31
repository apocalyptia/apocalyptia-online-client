import Electronic from '../../classes/Electronic'


export const Cellphone = new Electronic({
	name: `Cellphone`,
	description: [
		`1yd light, camera, remote control.`
	],
	sz: 1,
	hours: 3
})

export const EmergencyRadio = new Electronic({
	name: `Emergency Radio`,
	description: [
		`AM/FM/Shortwave. 1yd light.`
	],
	sz: 1,
	hours: 6
})

export const Flashlight = new Electronic({
	name: `Flashlight`,
	description: [
		`10yd light. -3 RATK to Blind 1rnd.`
	],
	sz: 1,
	hours: 3
})

export const GeigerCounter = new Electronic({
	name: `Geiger Counter`,
	description: [
		`Science 6# to detect Radiation in 1yd.`
	],
	sz: 2,
	hours: 24
})

export const HandRadio = new Electronic({
	name: `Hand Radio`,
	description: [
		`9-channel 2-way radio. 3 mile range.`
	],
	sz: 1,
	hours: 9
})

export const Headlamp = new Electronic({
	name: `Headlamp`,
	description: [
		`3yd light. Hands free.`
	],
	sz: 0,
	hours: 3
})

export const Lantern = new Electronic({
	name: `Lantern`,
	description: [
		`3yd light radius.`
	],
	sz: 2,
	hours: 6
})

export const Megaphone = new Electronic({
	name: `Megaphone`,
	description: [
		`+1 Leadership when speaking to a crowd.`
	],
	sz: 2,
	hours: 12
})

export const Multimeter = new Electronic({
	name: `Multimeter`,
	description: [
		`+3 Science(Technology). Detect voltage.`
	],
	sz: 1,
	hours: 48
})

export const NightvisionGoggles = new Electronic({
	name: `Nightvision Goggles`,
	description: [
		`Ignore Visibility penalties in darkness.`
	],
	sz: 1,
	hours: 36
})

export const QuadcopterDrone = new Electronic({
	name: `Quadcopter Drone`,
	description: [
		`Science 6# to use. Camera. 90yd Speed.`
	],
	sz: 2,
	hours: .25
})

export const RCCar = new Electronic({
	name: `RC Car`,
	description: [
		`Science 3# to use. 45yd Speed.`
	],
	sz: 3,
	hours: .5
})

export const SolarLamp = new Electronic({
	name: `Solar Lamp`,
	description: [
		`1yd light radius. 1day charge.`
	],
	sz: 1,
	hours: 9
})

export const StunGun = new Electronic({
	name: `Stun Gun`,
	description: [
		`MATK. C9# or Stun for 1rnd.`
	],
	sz: 1,
	hours: .25
})


const ElectronicsList = [
	Cellphone,
	EmergencyRadio,
	Flashlight,
	GeigerCounter,
	HandRadio,
	Headlamp,
	Lantern,
	Megaphone,
	Multimeter,
	NightvisionGoggles,
	QuadcopterDrone,
	RCCar,
	SolarLamp,
	StunGun
]

export default ElectronicsList


// OLD ELECTRONICS
//  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)