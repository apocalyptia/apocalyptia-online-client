import FemaleNamesList from 'lists/names/FemaleNamesList.js'
import MaleNamesList from 'lists/names/MaleNamesList.js'
import NamesList from 'lists/names/NamesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
	if (c.description.sex.value == `Male`) return RandomRoll(MaleNamesList)
	else if (c.description.sex.value == `Female`) return RandomRoll(FemaleNamesList)
	else return RandomRoll(NamesList)
}