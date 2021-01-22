import Cholera from '$rules/hazards/diseases/Cholera.js'
import HemorrhagicFever from '$rules/hazards/diseases/HemorrhagicFever.js'
import Influenza from '$rules/hazards/diseases/Influenza.js'
import MRSA from '$rules/hazards/diseases/MRSA.js'
import Rabies from '$rules/hazards/diseases/Rabies.js'
import Smallpox from '$rules/hazards/diseases/Smallpox.js'

export default {
	name: `Diseases`,
	list: [
		Cholera,
		HemorrhagicFever,
		Influenza,
		MRSA,
		Rabies,
		Smallpox
	]
}