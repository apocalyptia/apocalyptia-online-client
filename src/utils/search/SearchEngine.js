export default (searchTerm, searchList) => {
	console.log('searchList')
	console.dir(searchList)

	const mappedList = searchList.list.map(r => [...r.list]).flat()
	console.log('mappedList')
	console.dir(mappedList)

	const sortedRulesList = mappedList.sort((a, b) => a.name > b.name).flat()
	console.log('sortedRulesList')
	console.dir(sortedRulesList)

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

	console.log('ruleList')
	console.dir(ruleList)

	return ruleList
}