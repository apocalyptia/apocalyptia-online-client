import Electronic from '../../classes/gear/Electronic'


export const Cellphone = new Electronic({
	name: `Cellphone`,
	desc: [
		`1yd light, camera, remote control.`,
	],
	sz: 1,
	hrs: 3
})

export const EmergencyRadio = new Electronic({
	name: `Emergency Radio`,
	desc: [
		`AM/FM/Shortwave.`,
		`1yd light.`,
	],
	sz: 1,
	hrs: 6
})

export const Flashlight = new Electronic({
	name: `Flashlight`,
	desc: [
		`10yd light. -3 Ranged Attack to Blind 1 round.`,
	],
	sz: 1,
	hrs: 3
})

export const GeigerCounter = new Electronic({
	name: `Geiger Counter`,
	desc: [
		`Science 6# to detect Radiation in 1yd.`,
	],
	sz: 2,
	hrs: 24
})

export const HandRadio = new Electronic({
	name: `Hand Radio`,
	desc: [
		`9-channel 2-way radio.`,
		`3 mile range.`,
	],
	sz: 1,
	hrs: 9
})

export const Headlamp = new Electronic({
	name: `Headlamp`,
	desc: [
		`3yd light. Hands free.`,
	],
	sz: 0,
	hrs: 3
})

export const Lantern = new Electronic({
	name: `Lantern`,
	desc: [
		`3yd light radius.`,
	],
	sz: 2,
	hrs: 6
})

export const Megaphone = new Electronic({
	name: `Megaphone`,
	desc: [
		`+1 Leadership when speaking to a crowd.`,
	],
	sz: 2,
	hrs: 12
})

export const Multimeter = new Electronic({
	name: `Multimeter`,
	desc: [
		`+3 Science(Technology).`,
		`Detects voltage, battery life, and closed circuits.`,
	],
	sz: 1,
	hrs: 48
})

export const NightvisionGoggles = new Electronic({
	name: `Nightvision Goggles`,
	desc: [
		`Ignore Visibility penalties in darkness.`,
	],
	sz: 1,
	hrs: 36
})

export const QuadcopterDrone = new Electronic({
	name: `Quadcopter Drone`,
	desc: [
		`Science 6# to use.`,
		`Onboard camera.`,
		`90yd Speed.`,
	],
	sz: 2,
	hrs: .25
})

export const RCCar = new Electronic({
	name: `RC Car`,
	desc: [
		`Science 3# to use.`,
		`45yd Speed.`,
	],
	sz: 3,
	hrs: .5
})

export const SolarLamp = new Electronic({
	name: `Solar Lamp`,
	desc: [
		`1yd light radius.`,
		`1 day charge.`,
	],
	sz: 1,
	hrs: 9
})

export const StunGun = new Electronic({
	name: `Stun Gun`,
	desc: [
		`Melee Attack.`,
		`C9# or Stun next round.`,
	],
	sz: 1,
	hrs: .1
})


export default [
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
	StunGun,
]


// OLD ELECTRONICS
//  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)