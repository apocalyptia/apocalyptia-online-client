function skillSpecialties() {
	return alphabetize(skillsArray.map((s) => Object.values(s.specs)).reduce((a, b) => a.concat(b), []))
}

export default skillSpecialties()
