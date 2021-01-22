import Cellphone from '$rules/gear/equipment/electronics/Cellphone.js'
import EmergencyRadio from '$rules/gear/equipment/electronics/EmergencyRadio.js'
import Flashlight from '$rules/gear/equipment/electronics/Flashlight.js'
import GeigerCounter from '$rules/gear/equipment/electronics/GeigerCounter.js'
import HandRadio from '$rules/gear/equipment/electronics/HandRadio.js'
import Headlamp from '$rules/gear/equipment/electronics/Headlamp.js'
import Lantern from '$rules/gear/equipment/electronics/Lantern.js'
import Megaphone from '$rules/gear/equipment/electronics/Megaphone.js'
import Multimeter from '$rules/gear/equipment/electronics/Multimeter.js'
import NightvisionGoggles from '$rules/gear/equipment/electronics/NightvisionGoggles.js'
import QuadcopterDrone from '$rules/gear/equipment/electronics/QuadcopterDrone.js'
import RCCar from '$rules/gear/equipment/electronics/RCCar.js'
import SolarLamp from '$rules/gear/equipment/electronics/SolarLamp.js'
import StunGun from '$rules/gear/equipment/electronics/StunGun.js'

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