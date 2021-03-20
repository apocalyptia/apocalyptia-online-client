import Alphabetize from '/src/utils/sorting/Alphabetize.js'

export default (searchTerm, searchList) => {

	const mappedList = []

	const addSublists = (rule) => {
		if (rule.hasOwnProperty('list')) addSublists(rule.list)
		else mappedList.push(rule)
	}

	addSublists(searchList)

	const sortedRulesList = Alphabetize(mappedList)

	let ruleList = sortedRulesList

	if (searchTerm.length) {
		ruleList = ruleList.filter(r => !r.hasOwnProperty('list'))
		ruleList = sortedRulesList.filter(r => {
			return r.name.toLocaleLowerCase()
						.startsWith(searchTerm.toLocaleLowerCase())
		})
		if (!ruleList.length) {
			ruleList = sortedRulesList.filter(r => {
				return r.name.toLocaleLowerCase()
							.includes(searchTerm.toLocaleLowerCase())
			})
		}
	}

	return ruleList
}