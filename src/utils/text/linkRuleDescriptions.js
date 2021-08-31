import linkTerms from './linkTerms.js'

export default function(rule) {
	if (rule.description) {
		rule.description = linkTerms(rule.description)
	}
	if (rule.specialties) {
		for (let specialty of Object.values(rule.specialties)) {
			specialty.description = linkTerms(specialty.description)
		}
	}
	return rule
}