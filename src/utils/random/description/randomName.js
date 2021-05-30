import FemaleNamesList from '/src/utils/random/lists/FemaleNamesList.js'
import MaleNamesList from '/src/utils/random/lists/MaleNamesList.js'
import NamesList from '/src/utils/random/lists/NamesList.js'
import randomRoll from '/src/utils/random/dice/randomRoll.js'

function randomName(sex) {
	if (sex === `Male`) return randomRoll(MaleNamesList)
	else if (sex === `Female`) return randomRoll(FemaleNamesList)
	else return randomRoll(NamesList)
}

export default randomName
