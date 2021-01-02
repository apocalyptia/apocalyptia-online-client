export default (searchTerm, searchList) => {
	const sortedRulesList = searchList.sort((a, b) => a.name > b.name).flat()

	let ruleList = sortedRulesList

	if (searchTerm.length) {
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