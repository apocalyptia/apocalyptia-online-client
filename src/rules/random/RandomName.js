import FemaleNamesList from '/src/rules/lists/names/FemaleNamesList.js'
import MaleNamesList from '/src/rules/lists/names/MaleNamesList.js'
import NamesList from '/src/rules/lists/names/NamesList.js'
import RandomRoll from '/src/rules/random/RandomRoll.js'

export default (c) => {
	if (c.description.sex.value == `Male`) return RandomRoll(MaleNamesList)
	else if (c.description.sex.value == `Female`) return RandomRoll(FemaleNamesList)
	else return RandomRoll(NamesList)
}