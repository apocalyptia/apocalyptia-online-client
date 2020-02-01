for (let x = 0; x < DisplayList.length; ++x) {
	for (let y = 0; y < MasterAbilityList.length; ++y) {
		if (DisplayList[x].name == MasterAbilityList[y].name) {
			DisplayList[x].id = MasterAbilityList[y].id
		}
	}
}

const spentXPTotal = () => {
	spentXP = $character.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
	remaining = $character.properties.experience.score = spentXP
}

const syncLists = () => {
	// resetMaster()
	for (let a = 0; a < ModelList.length; ++a) {
		for (let d = 0; d < DisplayList.length; ++d) {
			DisplayList[d].taken = parseInt(DisplayList[d].taken)
			if (a == DisplayList[d].id) {
				ModelList[a].taken = DisplayList[d].taken
			}
		}
	}
}

const resetMaster = () => {
	for (let a = 0; a < MasterAbilityList.length; ++a) {
		MasterAbilityList[a].taken = 0
	}
}

const modifyAbilities = () => {
	$character.abilities = []
	aloop: for (let a = 0; a < MasterAbilityList.length; ++a) {
		for (let d = 0; d < DisplayList.length; ++d) {
			DisplayList[d].taken = parseInt(DisplayList[d].taken)
			if (DisplayList[d].name == MasterAbilityList[a].name) {
				if (DisplayList[d].options.length == 1) {
					MasterAbilityList[a].taken = DisplayList[d].taken
					if (DisplayList[d].taken) $character.abilities.push(DisplayList[d])
					continue aloop
				}
				else if (DisplayList[d].options.length > 1) {
					if (MasterAbilityList[a].options[0].name == DisplayList[d].options[DisplayList[d].selection].name) {
						MasterAbilityList[a].taken = DisplayList[d].taken
						if (DisplayList[d].taken) {
							$character.abilities.push(MasterAbilityList[a])
							let abilityOptions = DisplayList[d].options
							let remainingOptions = DisplayList[d].options.filter(f => f.name != MasterAbilityList[a].options[0].name)
							DisplayList.splice(
								d, 1,
								new Ability(
									MasterAbilityList[a].name,
									MasterAbilityList[a].description,
									MasterAbilityList[a].max,
									MasterAbilityList[a].xp,
									MasterAbilityList[a].taken,
									MasterAbilityList[a].options
								)
							)
							let incrementer = 0
							for (let o = 0; o < remainingOptions.length; ++o) {
								if (MasterAbilityList[a+o+1].name == DisplayList[d].name) {
									if (MasterAbilityList[a+o+1].taken) {
										$character.abilities.push(MasterAbilityList[a+o])
										DisplayList.splice(
											d+o+1, 0,
											new Ability(
												MasterAbilityList[a].name,
												MasterAbilityList[a].description,
												MasterAbilityList[a].max,
												MasterAbilityList[a].xp,
												MasterAbilityList[a+o+1].taken,
												MasterAbilityList[a+o+1].options
											)
										)
										remainingOptions.filter(r => r.name != MasterAbilityList[a+o+1].options[0].name)
										incrementer = o
									}
									else {
										DisplayList.splice(d+o+1, 1)
									}
								}
							}
							if (remainingOptions.length) {
								DisplayList.splice(
									d+incrementer, 0,
									new Ability(
										MasterAbilityList[a].name,
										MasterAbilityList[a].description,
										MasterAbilityList[a].max,
										MasterAbilityList[a].xp,
										0,
										remainingOptions
									)
								)
							}
							a += abilityOptions.length
							continue aloop
						}
					}
				}
			}
		}
	}
}