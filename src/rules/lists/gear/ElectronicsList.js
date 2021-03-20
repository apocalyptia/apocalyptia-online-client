import Cellphone from '/src/rules/gear/equipment/electronics/Cellphone.js'
import EmergencyRadio from '/src/rules/gear/equipment/electronics/EmergencyRadio.js'
import Flashlight from '/src/rules/gear/equipment/electronics/Flashlight.js'
import GeigerCounter from '/src/rules/gear/equipment/electronics/GeigerCounter.js'
import HandRadio from '/src/rules/gear/equipment/electronics/HandRadio.js'
import Headlamp from '/src/rules/gear/equipment/electronics/Headlamp.js'
import Lantern from '/src/rules/gear/equipment/electronics/Lantern.js'
import Megaphone from '/src/rules/gear/equipment/electronics/Megaphone.js'
import Multimeter from '/src/rules/gear/equipment/electronics/Multimeter.js'
import NightvisionGoggles from '/src/rules/gear/equipment/electronics/NightvisionGoggles.js'
import QuadcopterDrone from '/src/rules/gear/equipment/electronics/QuadcopterDrone.js'
import RCCar from '/src/rules/gear/equipment/electronics/RCCar.js'
import SolarLamp from '/src/rules/gear/equipment/electronics/SolarLamp.js'
import StunGun from '/src/rules/gear/equipment/electronics/StunGun.js'

export default {
	name: `Electronics`,
	list: [
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
}


// OLD ELECTRONICS
//  new Gear(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)