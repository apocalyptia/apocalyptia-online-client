export default (searchTerm, searchList) => {

	const mappedList = searchList.list.map(r => [...r.list]).flat()

	const sortedRulesList = mappedList.sort((a, b) => a.name > b.name).flat()

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