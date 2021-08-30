import Rules from '/src/rules/Rules.js'

export default function rulesSearch(searchKey) {
	if (Rules[searchKey] !== undefined) {
		return Rules[searchKey]
	} else {
		for (let firstTier of Object.values(Rules)) {
			if (firstTier[searchKey]?.name?.toLowerCase() === searchKey) {
				return firstTier[searchKey]
			} else {
				for (let secondTier of Object.values(firstTier)) {
					if (secondTier?.subrules?.length) {
						for (let i in secondTier.subrules) {
							if (secondTier.subrules[i].name.toLowerCase() === searchKey) {
								return secondTier
							}
						}
					}
				}
			}
		}
		return null
	}
}