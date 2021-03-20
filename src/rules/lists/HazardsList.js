import Alphabetize from '/src/utils/sorting/Alphabetize.js'
import Burning from '/src/rules/hazards/Burning.js'
import DiseasesList from '/src/rules/lists/DiseasesList.js'
import Falling from '/src/rules/hazards/Falling.js'
import FriendlyFire from '/src/rules/hazards/FriendlyFire.js'

export default {
	name: `Hazards`,
	list: Alphabetize([
		Burning,
		...DiseasesList.list,
		Falling,
		FriendlyFire,
	])
}