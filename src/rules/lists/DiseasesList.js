import Cholera from 'rules/diseases/Cholera.js'
import HemorrhagicFever from 'rules/diseases/HemorrhagicFever.js'
import Influenza from 'rules/diseases/Influenza.js'
import MRSA from 'rules/diseases/MRSA.js'
import Rabies from 'rules/diseases/Rabies.js'
import Smallpox from 'rules/diseases/Smallpox.js'

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