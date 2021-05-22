import FemaleNamesList from '/src/utils/random/lists/FemaleNamesList.js'
import MaleNamesList from '/src/utils/random/lists/MaleNamesList.js'
import NamesList from '/src/utils/random/lists/NamesList.js'
import RandomRoll from '/src/utils/random/dice/RandomRoll.js'

export default (sex) => {
	if (sex === `Male`) return RandomRoll(MaleNamesList)
	else if (sex === `Female`) return RandomRoll(FemaleNamesList)
	else return RandomRoll(NamesList)
}