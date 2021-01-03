import FemaleNamesList from 'rules/lists/names/FemaleNamesList.js'
import MaleNamesList from 'rules/lists/names/MaleNamesList.js'
import NamesList from 'rules/lists/names/NamesList.js'
import RandomRoll from 'rules/random/RandomRoll.js'

export default (c) => {
	if (c.description.sex.value == `Male`) return RandomRoll(MaleNamesList)
	else if (c.description.sex.value == `Female`) return RandomRoll(FemaleNamesList)
	else return RandomRoll(NamesList)
}