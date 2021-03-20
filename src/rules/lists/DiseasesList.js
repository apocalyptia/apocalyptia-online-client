import Cholera from '/src/rules/hazards/diseases/Cholera.js'
import HemorrhagicFever from '/src/rules/hazards/diseases/HemorrhagicFever.js'
import Influenza from '/src/rules/hazards/diseases/Influenza.js'
import MRSA from '/src/rules/hazards/diseases/MRSA.js'
import Rabies from '/src/rules/hazards/diseases/Rabies.js'
import Smallpox from '/src/rules/hazards/diseases/Smallpox.js'

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