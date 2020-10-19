import { S as Skill, a as Specialty } from './Specialty.adf26afb.js';

const Acrobatics = new Skill({
	id: `f19c07a2-1371-48db-b0bc-a88e5bc4e53b`,
	name: `Acrobatics`,
	desc: [
		`Gymnastic prowess.`,
	],
	parent: `Agility`,
	diff: 6,
	specs: {
		dodge: new Specialty({
			id: `a7451f3a-9970-431a-8304-f36ae046e85b`,
			name: `Dodge`,
			desc: [
				`Roll Acrobatics(Dodge) vs [Melee or Ranged].`,
				`As part of a Dodge, you may drop Prone for free if you wish.`,
				`Reflexive Dodge is your Dodge score with no roll.`,
			]
		}),
		jump: new Specialty({
			id: `7a5e0273-8d72-43c3-a826-0a927e2ee0e9`,
			name: `Jump`,
			desc: [
				`Running Jump distance is yards = [Agility].`,
				`Vertical Jump distance is [Agility x 6] inches.`,
			]
		})
	}
});

const Larceny = new Skill({
	id: `f8725bd3-a40a-43b6-9b1b-4a9bcd1c957e`,
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	diff: `varies`,
	specs: {
		mechanical: new Specialty({
			id: `44d2e074-3316-41f1-a3f9-5252e8e2c0c4`,
			name: `Mechanical`,
			desc: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
			]
		}),
		trick: new Specialty({
			id: `959c5f50-d590-4064-bf23-65737cdafc61`,
			name: `Trick`,
			desc: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
});

const Ranged = new Skill({
	id: `da193540-c5fc-408d-bf3a-a69aa046fa84`,
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	diff: `Defense`,
	specs: {
		shoot: new Specialty({
			id: `f6a049f5-bc9e-48d2-b0d3-2df479cc7c6e`,
			name: `Shoot`,
			desc: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Specialty({
			id: `c3e75b6f-c686-4c4f-91a8-ee10dfe66b07`,
			name: `Throw`,
			desc: [
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
});

const Stealth = new Skill({
	id: `8acb7f56-c5c5-4918-97b9-15260024fb15`,
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	parent: `Agility`,
	diff: `Perception`,
	specs: {
		hide: new Specialty({
			id: `bcec6762-9716-497d-894a-626f8e0d77d7`,
			name: `Hide`,
			desc: [`Stay motionless and Concealed`,
				`+3 if Prone.`,]
		}),
		sneak: new Specialty({
			id: `7d49df11-ede2-4a18-bb20-711e44f2445b`,
			name: `Sneak`,
			desc: [
				`Move Walk Speed while Concealed.`,
			]
		})
	}
});

const AgilitySkills = [
	Acrobatics,
	Larceny,
	Ranged,
	Stealth,
];

const Medicine = new Skill({
	id: `8ebabc07-057f-4568-b6ed-cdb6941d14a6`,
	name: `Medicine`,
	desc: [
		`Diagnosing and treating wounds and Diseases.`,
	],
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Specialty({
			id: `d99dcfd7-e192-463f-941f-1487ec141793`,
			name: `First-Aid`,
			desc: [
				`Stop a person from Bleeding for a number of hours equal to your roll.`,
				`Inflict an additional 1 Damage on a Botch.`,
				`Takes 1 round per Damage.`,
			]
		}),
		surgery: new Specialty({
			id: `84136a49-7dd1-4462-af4d-a9c8e2390f80`,
			name: `Surgery`,
			desc: [
				`Stop a person from Bleeding as long as they do not take any more Damage.`,
				`Inflict an additional d6 Damage on a Botch.`,
				`Takes [Damage x 20] minutes.`,
			]
		})
	}
});

const Perception = new Skill({
	id: `1dd3402d-a974-49d1-ae43-bcc63c4925bc`,
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Specialty({
			id: `68ea4f9c-12dd-4bcd-b2a3-a6d70b48a16e`,
			name: `Search`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Specialty({
			id: `61372444-6825-4ad5-967e-a2b4ce991960`,
			name: `Intuition`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
});

const Science = new Skill({
	id: `5da150b7-8643-4f9d-b9ad-470fa37510ae`,
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Specialty({
			id: `4f241948-5289-43e5-bc1f-77a04420b6bf`,
			name: `Chemistry`,
			desc: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Specialty({
			id: `bb45ae73-369d-420d-b949-aac209c9abc7`,
			name: `Technology`,
			desc: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
});

const Survival = new Skill({
	id: `2d2322ff-8376-4e04-a00b-be803a9b9f02`,
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Specialty({
			id: `cdb225a5-e82f-4be6-855c-bc78ef6f44fc`,
			name: `Forage`,
			desc: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Specialty({
			id: `9c1f6a61-bc28-4dde-b89f-0c9a34555f50`,
			name: `Navigate`,
			desc: [
				`(1min) Plot course`,
				`Roll vs [Perception] if tracked.`,
			]
		})
	}
});

const BrainsSkills = [
	Medicine,
	Perception,
	Science,
	Survival,
];

const Athletics = new Skill({
	id: `b13484a3-9340-47a2-9fe4-079a886beb56`,
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Specialty({
			id: `fda9b21e-5ee1-448f-a7f5-3d358e9ad062`,
			name: `Climb`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Specialty({
			id: `f35bb291-4130-4cba-9841-dcc156eba70c`,
			name: `Swim`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
});

const Build = new Skill({
	id: `20af75d7-79ef-4b7d-b408-1721a7ae11c6`,
	name: `Build`,
	desc: [
		`Make an item from [d6 + #] Parts.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		customize: new Specialty({
			id: `4d055bd5-9413-482f-aeef-ec64ced8d7a0`,
			name: `Customize`,
			desc: [
				`(#hrs) 3 per item`,
				`Each must be unique`,
				`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Attribute`,
				`Armor: +1 Damage Resistance or a new Attribute.`,
			]
		}),
		repair: new Specialty({
			id: `5dcd9938-820f-40b6-b1db-051c99295997`,
			name: `Repair`,
			desc: [
				`(#hrs) Fix broken item`,
				`+1 with same Parts.`,
			]
		})
	}
});

const Drive = new Skill({
	id: `19aeb7ad-c940-4c7c-b238-cc77c05d1fc4`,
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		ram: new Specialty({
			id: `9483457c-5e90-4225-932f-f010077fecad`,
			name: `Ram`,
			desc: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Specialty({
			id: `47a939cf-88ba-4773-bf52-4d383fb38695`,
			name: `Stunt`,
			desc: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
});

const Melee = new Skill({
	id: `1f84042e-c02b-477f-8662-41d3a0ccc4d5`,
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	parent: `Constitution`,
	diff: `Attack or Defense`,
	specs: {
		block: new Specialty({
			id: `ad9c0c5a-f399-4f81-ba33-6242b17fc5e6`,
			name: `Block`,
			desc: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
				`Reflexive Block is your Block score with no roll.`,
			]
		}),
		strike: new Specialty({
			id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
			name: `Strike`,
			desc: [
				`Roll vs [Defense].`,
				`Damage = [weapon Damage + Success].`,
			]
		})
	}
});

const ConstitutionSkills = [
	Athletics,
	Build,
	Drive,
	Melee,
];

export { AgilitySkills as A, BrainsSkills as B, ConstitutionSkills as C };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RpdHV0aW9uU2tpbGxzLjU2ZTA5M2VlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvQWNyb2JhdGljcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3NraWxscy9MYXJjZW55LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc2tpbGxzL1JhbmdlZC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3NraWxscy9TdGVhbHRoLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc2tpbGxzL0FnaWxpdHlTa2lsbHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvTWVkaWNpbmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvUGVyY2VwdGlvbi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3NraWxscy9TY2llbmNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc2tpbGxzL1N1cnZpdmFsLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc2tpbGxzL0JyYWluc1NraWxscy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3NraWxscy9BdGhsZXRpY3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvQnVpbGQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvRHJpdmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvTWVsZWUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvQ29uc3RpdHV0aW9uU2tpbGxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTa2lsbCBmcm9tICcuL1NraWxsJ1xuaW1wb3J0IFNwZWNpYWx0eSBmcm9tICcuL1NwZWNpYWx0eSdcblxuXG5jb25zdCBBY3JvYmF0aWNzID0gbmV3IFNraWxsKHtcblx0aWQ6IGBmMTljMDdhMi0xMzcxLTQ4ZGItYjBiYy1hODhlNWJjNGU1M2JgLFxuXHRuYW1lOiBgQWNyb2JhdGljc2AsXG5cdGRlc2M6IFtcblx0XHRgR3ltbmFzdGljIHByb3dlc3MuYCxcblx0XSxcblx0cGFyZW50OiBgQWdpbGl0eWAsXG5cdGRpZmY6IDYsXG5cdHNwZWNzOiB7XG5cdFx0ZG9kZ2U6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGBhNzQ1MWYzYS05OTcwLTQzMWEtODMwNC1mMzZhZTA0NmU4NWJgLFxuXHRcdFx0bmFtZTogYERvZGdlYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YFJvbGwgQWNyb2JhdGljcyhEb2RnZSkgdnMgW01lbGVlIG9yIFJhbmdlZF0uYCxcblx0XHRcdFx0YEFzIHBhcnQgb2YgYSBEb2RnZSwgeW91IG1heSBkcm9wIFByb25lIGZvciBmcmVlIGlmIHlvdSB3aXNoLmAsXG5cdFx0XHRcdGBSZWZsZXhpdmUgRG9kZ2UgaXMgeW91ciBEb2RnZSBzY29yZSB3aXRoIG5vIHJvbGwuYCxcblx0XHRcdF1cblx0XHR9KSxcblx0XHRqdW1wOiBuZXcgU3BlY2lhbHR5KHtcblx0XHRcdGlkOiBgN2E1ZTAyNzMtOGQ3Mi00M2MzLWE4MjYtMGE5MjdlMmVlMGU5YCxcblx0XHRcdG5hbWU6IGBKdW1wYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YFJ1bm5pbmcgSnVtcCBkaXN0YW5jZSBpcyB5YXJkcyA9IFtBZ2lsaXR5XS5gLFxuXHRcdFx0XHRgVmVydGljYWwgSnVtcCBkaXN0YW5jZSBpcyBbQWdpbGl0eSB4IDZdIGluY2hlcy5gLFxuXHRcdFx0XVxuXHRcdH0pXG5cdH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFjcm9iYXRpY3MiLCJpbXBvcnQgU2tpbGwgZnJvbSAnLi9Ta2lsbCdcbmltcG9ydCBTcGVjaWFsdHkgZnJvbSAnLi9TcGVjaWFsdHknXG5cblxuY29uc3QgTGFyY2VueSA9IG5ldyBTa2lsbCh7XG5cdGlkOiBgZjg3MjViZDMtYTQwYS00M2I2LTliMWItNGE5YmNkMWM5NTdlYCxcblx0bmFtZTogYExhcmNlbnlgLFxuXHRkZXNjOiBbXG5cdFx0YERlbGljYXRlIG1hbnVhbCBvcGVyYXRpb25zLmAsXG5cdF0sXG5cdHBhcmVudDogYGFnaWxpdHlgLFxuXHRkaWZmOiBgdmFyaWVzYCxcblx0c3BlY3M6IHtcblx0XHRtZWNoYW5pY2FsOiBuZXcgU3BlY2lhbHR5KHtcblx0XHRcdGlkOiBgNDRkMmUwNzQtMzMxNi00MWYxLWEzZjktNTI1MmU4ZTJjMGM0YCxcblx0XHRcdG5hbWU6IGBNZWNoYW5pY2FsYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YChkNiByb3VuZHMpIEFjdGl2YXRlIG9yIGRlYWN0aXZhdGUgTG9ja3MsIFRyYXBzLCBCb21icywgYW5kIHNpbWlsYXIgbWVjaGFuaXNtc2AsXG5cdFx0XHRcdGAjIGJ5IGl0ZW0uYCxcblx0XHRcdF1cblx0XHR9KSxcblx0XHR0cmljazogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDk1OWM1ZjUwLWQ1OTAtNDA2NC1iZjIzLTY1NzM3Y2RhZmM2MWAsXG5cdFx0XHRuYW1lOiBgVHJpY2tgLFxuXHRcdFx0ZGVzYzogW1xuXHRcdFx0XHRgUm9sbCB2cyBbUGVyY2VwdGlvbl0gdG8gcGljayBwb2NrZXRzLCBoaWRlIGl0ZW1zLCBvciBzb21lIG90aGVyIHNsZWlnaHQtb2YtaGFuZC5gLFxuXHRcdFx0XVxuXHRcdH0pXG5cdH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExhcmNlbnkiLCJpbXBvcnQgU2tpbGwgZnJvbSAnLi9Ta2lsbCdcbmltcG9ydCBTcGVjaWFsdHkgZnJvbSAnLi9TcGVjaWFsdHknXG5cblxuY29uc3QgUmFuZ2VkID0gbmV3IFNraWxsKHtcblx0aWQ6IGBkYTE5MzU0MC1jNWZjLTQwOGQtYmYzYS1hNjlhYTA0NmZhODRgLFxuXHRuYW1lOiBgUmFuZ2VkYCxcblx0ZGVzYzogW1xuXHRcdGBQcm9qZWN0aWxlIGNvbWJhdC5gLFxuXHRdLFxuXHRwYXJlbnQ6IGBBZ2lsaXR5YCxcblx0ZGlmZjogYERlZmVuc2VgLFxuXHRzcGVjczoge1xuXHRcdHNob290OiBuZXcgU3BlY2lhbHR5KHtcblx0XHRcdGlkOiBgZjZhMDQ5ZjUtYmM5ZS00OGQyLWIwZDMtMmRmNDc5Y2M3YzZlYCxcblx0XHRcdG5hbWU6IGBTaG9vdGAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBSb2xsIHZzIFtEb2RnZSBvciBCbG9jayAod2l0aCBhIFNoaWVsZCldLmAsXG5cdFx0XHRdXG5cdFx0fSksXG5cdFx0dGhyb3c6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGBjM2U3NWI2Zi1jNjg2LTRjNGYtOTFhOC1lZTEwZGZlNjZiMDdgLFxuXHRcdFx0bmFtZTogYFRocm93YCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YFJvbGwgdnMgW0RvZGdlIG9yIEJsb2NrXWAsXG5cdFx0XHRcdGBSYW5nZSBpcyBbQ29uc3RpdHV0aW9uIHggM3lkc11gLFxuXHRcdFx0XVxuXHRcdH0pXG5cdH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJhbmdlZCIsImltcG9ydCBTa2lsbCBmcm9tICcuL1NraWxsJ1xuaW1wb3J0IFNwZWNpYWx0eSBmcm9tICcuL1NwZWNpYWx0eSdcblxuXG5jb25zdCBTdGVhbHRoID0gbmV3IFNraWxsKHtcblx0aWQ6IGA4YWNiN2Y1Ni1jNWM1LTQ5MTgtOTdiOS0xNTI2MDAyNGZiMTVgLFxuXHRuYW1lOiBgU3RlYWx0aGAsXG5cdGRlc2M6IFtcblx0XHRgQ29uY2VhbCB5b3VyIHByZXNlbmNlLmAsXG5cdF0sXG5cdHBhcmVudDogYEFnaWxpdHlgLFxuXHRkaWZmOiBgUGVyY2VwdGlvbmAsXG5cdHNwZWNzOiB7XG5cdFx0aGlkZTogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYGJjZWM2NzYyLTk3MTYtNDk3ZC04OTRhLTYyNmY4ZTBkNzdkN2AsXG5cdFx0XHRuYW1lOiBgSGlkZWAsXG5cdFx0XHRkZXNjOiBbYFN0YXkgbW90aW9ubGVzcyBhbmQgQ29uY2VhbGVkYCxcblx0XHRcdFx0YCszIGlmIFByb25lLmAsXVxuXHRcdH0pLFxuXHRcdHNuZWFrOiBuZXcgU3BlY2lhbHR5KHtcblx0XHRcdGlkOiBgN2Q0OWRmMTEtZWRlMi00YTE4LWJiMjAtNzExZTQ0ZjI0NDViYCxcblx0XHRcdG5hbWU6IGBTbmVha2AsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBNb3ZlIFdhbGsgU3BlZWQgd2hpbGUgQ29uY2VhbGVkLmAsXG5cdFx0XHRdXG5cdFx0fSlcblx0fVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3RlYWx0aCIsIlxuaW1wb3J0IGFjcm9iYXRpY3MgZnJvbSAnLi9BY3JvYmF0aWNzJ1xuaW1wb3J0IGxhcmNlbnkgZnJvbSAnLi9MYXJjZW55J1xuaW1wb3J0IHJhbmdlZCBmcm9tICcuL1JhbmdlZCdcbmltcG9ydCBzdGVhbHRoIGZyb20gJy4vU3RlYWx0aCdcblxuXG5jb25zdCBBZ2lsaXR5U2tpbGxzID0gW1xuXHRhY3JvYmF0aWNzLFxuXHRsYXJjZW55LFxuXHRyYW5nZWQsXG5cdHN0ZWFsdGgsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEFnaWxpdHlTa2lsbHMiLCJpbXBvcnQgU2tpbGwgZnJvbSAnLi9Ta2lsbCdcbmltcG9ydCBTcGVjaWFsdHkgZnJvbSAnLi9TcGVjaWFsdHknXG5cblxuY29uc3QgTWVkaWNpbmUgPSBuZXcgU2tpbGwoe1xuXHRpZDogYDhlYmFiYzA3LTA1N2YtNDU2OC1iNmVkLWNkYjY5NDFkMTRhNmAsXG5cdG5hbWU6IGBNZWRpY2luZWAsXG5cdGRlc2M6IFtcblx0XHRgRGlhZ25vc2luZyBhbmQgdHJlYXRpbmcgd291bmRzIGFuZCBEaXNlYXNlcy5gLFxuXHRdLFxuXHRwYXJlbnQ6IGBCcmFpbnNgLFxuXHRkaWZmOiBgRGFtYWdlYCxcblx0c3BlY3M6IHtcblx0XHRmaXJzdGFpZDogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYGQ5OWRjZmQ3LWUxOTItNDYzZi05NDFmLTE0ODdlYzE0MTc5M2AsXG5cdFx0XHRuYW1lOiBgRmlyc3QtQWlkYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YFN0b3AgYSBwZXJzb24gZnJvbSBCbGVlZGluZyBmb3IgYSBudW1iZXIgb2YgaG91cnMgZXF1YWwgdG8geW91ciByb2xsLmAsXG5cdFx0XHRcdGBJbmZsaWN0IGFuIGFkZGl0aW9uYWwgMSBEYW1hZ2Ugb24gYSBCb3RjaC5gLFxuXHRcdFx0XHRgVGFrZXMgMSByb3VuZCBwZXIgRGFtYWdlLmAsXG5cdFx0XHRdXG5cdFx0fSksXG5cdFx0c3VyZ2VyeTogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDg0MTM2YTQ5LTdkZDEtNDQ2Mi1hZjRkLWE5YzhlMjM5MGY4MGAsXG5cdFx0XHRuYW1lOiBgU3VyZ2VyeWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBTdG9wIGEgcGVyc29uIGZyb20gQmxlZWRpbmcgYXMgbG9uZyBhcyB0aGV5IGRvIG5vdCB0YWtlIGFueSBtb3JlIERhbWFnZS5gLFxuXHRcdFx0XHRgSW5mbGljdCBhbiBhZGRpdGlvbmFsIGQ2IERhbWFnZSBvbiBhIEJvdGNoLmAsXG5cdFx0XHRcdGBUYWtlcyBbRGFtYWdlIHggMjBdIG1pbnV0ZXMuYCxcblx0XHRcdF1cblx0XHR9KVxuXHR9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpY2luZSIsImltcG9ydCBTa2lsbCBmcm9tICcuL1NraWxsJ1xuaW1wb3J0IFNwZWNpYWx0eSBmcm9tICcuL1NwZWNpYWx0eSdcblxuXG5jb25zdCBQZXJjZXB0aW9uID0gbmV3IFNraWxsKHtcblx0aWQ6IGAxZGQzNDAyZC1hOTc0LTQ5ZDEtYWU0My1iY2M2M2M0OTI1YmNgLFxuXHRuYW1lOiBgUGVyY2VwdGlvbmAsXG5cdGRlc2M6IFtcblx0XHRgUHJvY2Vzc2luZyBzZW5zb3J5IGlucHV0LmAsXG5cdF0sXG5cdHBhcmVudDogYEJyYWluc2AsXG5cdGRpZmY6IGB2YXJpZXNgLFxuXHRzcGVjczoge1xuXHRcdHNlYXJjaDogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDY4ZWE0ZjljLTEyZGQtNGJjZC1iMmEzLWE2ZDcwYjQ4YTE2ZWAsXG5cdFx0XHRuYW1lOiBgU2VhcmNoYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YFJvbGwgdnMgW1N0ZWFsdGggKG9yIFN1cnZpdmFsIGlmIHRyYWNraW5nKV0uYCxcblx0XHRcdF1cblx0XHR9KSxcblx0XHRpbnR1aXRpb246IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGA2MTM3MjQ0NC02ODI1LTRhZDUtOTY3ZS1hMmI0Y2U5OTE5NjBgLFxuXHRcdFx0bmFtZTogYEludHVpdGlvbmAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBSb2xsIHZzIFtTb2NpYWxpemUgb3IgUGVyZm9ybV0uYCxcblx0XHRcdF1cblx0XHR9KVxuXHR9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBQZXJjZXB0aW9uIiwiaW1wb3J0IFNraWxsIGZyb20gJy4vU2tpbGwnXG5pbXBvcnQgU3BlY2lhbHR5IGZyb20gJy4vU3BlY2lhbHR5J1xuXG5cbmNvbnN0IFNjaWVuY2UgPSBuZXcgU2tpbGwoe1xuXHRpZDogYDVkYTE1MGI3LTg2NDMtNGY5ZC1iOWFkLTQ3MGZhMzc1MTBhZWAsXG5cdG5hbWU6IGBTY2llbmNlYCxcblx0ZGVzYzogW1xuXHRcdGBLbm93bGVkZ2Ugb2YgcGh5c2ljYWwgbGF3cy5gLFxuXHRdLFxuXHRwYXJlbnQ6IGBCcmFpbnNgLFxuXHRkaWZmOiBgdmFyaWVzYCxcblx0c3BlY3M6IHtcblx0XHRjaGVtaXN0cnk6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGA0ZjI0MTk0OC01Mjg5LTQzZTUtYmMxZi03N2EwNDQyMGI2YmZgLFxuXHRcdFx0bmFtZTogYENoZW1pc3RyeWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGAoIyB4IDEwbWlucykgVXNlIFtkNiArICMgQ2hlbWljYWxzXS5gLFxuXHRcdFx0XVxuXHRcdH0pLFxuXHRcdHRlY2hub2xvZ3k6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGBiYjQ1YWU3My0zNjlkLTQyMGQtYjk0OS1hYWMyMDljOWFiYzdgLFxuXHRcdFx0bmFtZTogYFRlY2hub2xvZ3lgLFxuXHRcdFx0ZGVzYzogW1xuXHRcdFx0XHRgKHZhcmllcykgTWFrZSBvciB1c2UgZWxlY3Ryb25pYyBkZXZpY2VzLmAsXG5cdFx0XHRdXG5cdFx0fSlcblx0fVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU2NpZW5jZSIsImltcG9ydCBTa2lsbCBmcm9tICcuL1NraWxsJ1xuaW1wb3J0IFNwZWNpYWx0eSBmcm9tICcuL1NwZWNpYWx0eSdcblxuXG5jb25zdCBTdXJ2aXZhbCA9IG5ldyBTa2lsbCh7XG5cdGlkOiBgMmQyMzIyZmYtODM3Ni00ZTA0LWEwMGItYmU4MDNhOWI5ZjAyYCxcblx0bmFtZTogYFN1cnZpdmFsYCxcblx0ZGVzYzogW1xuXHRcdGBQcmltaXRpdmUgcHJhY3RpY2VzIGZvciBsaXZpbmcgb3V0ZG9vcnMuYCxcblx0XSxcblx0cGFyZW50OiBgQnJhaW5zYCxcblx0ZGlmZjogYEJpb21lYCxcblx0c3BlY3M6IHtcblx0XHRmb3JhZ2U6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGBjZGIyMjVhNS1lODJmLTRiZTYtODU1Yy1iYzc4ZWY2ZjQ0ZmNgLFxuXHRcdFx0bmFtZTogYEZvcmFnZWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGAoMWhyKSBQcm92aWRlIDEgTmVlZCBmb3IgMSBwZXJzb24uYCxcblx0XHRcdF1cblx0XHR9KSxcblx0XHRuYXZpZ2F0ZTogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDljMWY2YTYxLWJjMjgtNGRkZS1iODlmLTBjOWEzNDU1NWY1MGAsXG5cdFx0XHRuYW1lOiBgTmF2aWdhdGVgLFxuXHRcdFx0ZGVzYzogW1xuXHRcdFx0XHRgKDFtaW4pIFBsb3QgY291cnNlYCxcblx0XHRcdFx0YFJvbGwgdnMgW1BlcmNlcHRpb25dIGlmIHRyYWNrZWQuYCxcblx0XHRcdF1cblx0XHR9KVxuXHR9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdXJ2aXZhbCIsImltcG9ydCBtZWRpY2luZSBmcm9tICcuL01lZGljaW5lJ1xuaW1wb3J0IHBlcmNlcHRpb24gZnJvbSAnLi9QZXJjZXB0aW9uJ1xuaW1wb3J0IHNjaWVuY2UgZnJvbSAnLi9TY2llbmNlJ1xuaW1wb3J0IHN1cnZpdmFsIGZyb20gJy4vU3Vydml2YWwnXG5cblxuY29uc3QgQnJhaW5zU2tpbGxzID0gW1xuXHRtZWRpY2luZSxcblx0cGVyY2VwdGlvbixcblx0c2NpZW5jZSxcblx0c3Vydml2YWwsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEJyYWluc1NraWxscyIsImltcG9ydCBTa2lsbCBmcm9tICcuL1NraWxsJ1xuaW1wb3J0IFNwZWNpYWx0eSBmcm9tICcuL1NwZWNpYWx0eSdcblxuXG5jb25zdCBBdGhsZXRpY3MgPSBuZXcgU2tpbGwoe1xuXHRpZDogYGIxMzQ4NGEzLTkzNDAtNDdhMi05ZmU0LTA3OWE4ODZiZWI1NmAsXG5cdG5hbWU6IGBBdGhsZXRpY3NgLFxuXHRkZXNjOiBbXG5cdFx0YFBoeXNpY2FsbHkgZGlmZmljdWx0IGZvcm1zIG9mIG1vdGlvbi5gLFxuXHRdLFxuXHRwYXJlbnQ6IGBDb25zdGl0dXRpb25gLFxuXHRkaWZmOiBgdmFyaWVzYCxcblx0c3BlY3M6IHtcblx0XHRjbGltYjogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYGZkYTliMjFlLTVlZTEtNDQ4Zi1hN2Y1LTNkMzU4ZTlhZDA2MmAsXG5cdFx0XHRuYW1lOiBgQ2xpbWJgLFxuXHRcdFx0ZGVzYzogW1xuXHRcdFx0XHRgTW92ZSBhbG9uZyB2ZXJ0aWNhbCBzdXJmYWNlcyBhdCBbV2FsayBTcGVlZCAvIDJdLmAsXG5cdFx0XHRdXG5cdFx0fSksXG5cdFx0c3dpbTogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYGYzNWJiMjkxLTQxMzAtNGNiYS05ODQxLWRjYzE1NmViYTcwY2AsXG5cdFx0XHRuYW1lOiBgU3dpbWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBNb3ZlIGluIHdhdGVyIGF0IFtTcGVlZCAvIDRdLmAsXG5cdFx0XHRdXG5cdFx0fSlcblx0fVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXRobGV0aWNzIiwiaW1wb3J0IFNraWxsIGZyb20gJy4vU2tpbGwnXG5pbXBvcnQgU3BlY2lhbHR5IGZyb20gJy4vU3BlY2lhbHR5J1xuXG5cbmNvbnN0IEJ1aWxkID0gbmV3IFNraWxsKHtcblx0aWQ6IGAyMGFmNzVkNy03OWVmLTRiN2QtYjQwOC0xNzIxYTdhZTExYzZgLFxuXHRuYW1lOiBgQnVpbGRgLFxuXHRkZXNjOiBbXG5cdFx0YE1ha2UgYW4gaXRlbSBmcm9tIFtkNiArICNdIFBhcnRzLmAsXG5cdF0sXG5cdHBhcmVudDogYENvbnN0aXR1dGlvbmAsXG5cdGRpZmY6IGB2YXJpZXNgLFxuXHRzcGVjczoge1xuXHRcdGN1c3RvbWl6ZTogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDRkMDU1YmQ1LTk0MTMtNDgyZi1hZWVmLWVjNjRjZWQ4ZDdhMGAsXG5cdFx0XHRuYW1lOiBgQ3VzdG9taXplYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YCgjaHJzKSAzIHBlciBpdGVtYCxcblx0XHRcdFx0YEVhY2ggbXVzdCBiZSB1bmlxdWVgLFxuXHRcdFx0XHRgV2VhcG9uczogKzEgUmFuZ2VkIEF0dGFjaywgKzEgTWVsZWUgRGFtYWdlLCBvciBhIG5ldyBBdHRyaWJ1dGVgLFxuXHRcdFx0XHRgQXJtb3I6ICsxIERhbWFnZSBSZXNpc3RhbmNlIG9yIGEgbmV3IEF0dHJpYnV0ZS5gLFxuXHRcdFx0XVxuXHRcdH0pLFxuXHRcdHJlcGFpcjogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYDVkY2Q5OTM4LTgyMGYtNDBiNi1iMWRiLTA1MWM5OTI5NTk5N2AsXG5cdFx0XHRuYW1lOiBgUmVwYWlyYCxcblx0XHRcdGRlc2M6IFtcblx0XHRcdFx0YCgjaHJzKSBGaXggYnJva2VuIGl0ZW1gLFxuXHRcdFx0XHRgKzEgd2l0aCBzYW1lIFBhcnRzLmAsXG5cdFx0XHRdXG5cdFx0fSlcblx0fVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQnVpbGQiLCJpbXBvcnQgU2tpbGwgZnJvbSAnLi9Ta2lsbCdcbmltcG9ydCBTcGVjaWFsdHkgZnJvbSAnLi9TcGVjaWFsdHknXG5cblxuY29uc3QgRHJpdmUgPSBuZXcgU2tpbGwoe1xuXHRpZDogYDE5YWViN2FkLWM5NDAtNGM3Yy1iMjM4LWNjNzdjMDVkMWZjNGAsXG5cdG5hbWU6IGBEcml2ZWAsXG5cdGRlc2M6IFtcblx0XHRgT3BlcmF0ZSB2ZWhpY2xlcy5gLFxuXHRdLFxuXHRwYXJlbnQ6IGBDb25zdGl0dXRpb25gLFxuXHRkaWZmOiBgdmFyaWVzYCxcblx0c3BlY3M6IHtcblx0XHRyYW06IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGA5NDgzNDU3Yy01ZTkwLTQyMjUtOTMyZi1mMDEwMDc3ZmVjYWRgLFxuXHRcdFx0bmFtZTogYFJhbWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBSb2xsIHZzIFtEcml2ZShTdHVudCldIHRvIEF0dGFjayB3aXRoIGEgdmVoaWNsZS5gLFxuXHRcdFx0XVxuXHRcdH0pLFxuXHRcdHN0dW50OiBuZXcgU3BlY2lhbHR5KHtcblx0XHRcdGlkOiBgNDdhOTM5Y2YtODhiYS00NzczLWJmNTItNGQzODNmYjM4Njk1YCxcblx0XHRcdG5hbWU6IGBTdHVudGAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBSb2xsIHZzIFtEcml2ZShSYW0pXSBmb3IgRGVmZW5zZSB3aXRoIGEgdmVoaWNsZS5gLFxuXHRcdFx0XVxuXHRcdH0pXG5cdH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERyaXZlIiwiaW1wb3J0IFNraWxsIGZyb20gJy4vU2tpbGwnXG5pbXBvcnQgU3BlY2lhbHR5IGZyb20gJy4vU3BlY2lhbHR5J1xuXG5cbmNvbnN0IE1lbGVlID0gbmV3IFNraWxsKHtcblx0aWQ6IGAxZjg0MDQyZS1jMDJiLTQ3N2YtODY2Mi00MWQzYTBjY2M0ZDVgLFxuXHRuYW1lOiBgTWVsZWVgLFxuXHRkZXNjOiBbXG5cdFx0YEhhbmQtdG8taGFuZCBjb21iYXQuYCxcblx0XSxcblx0cGFyZW50OiBgQ29uc3RpdHV0aW9uYCxcblx0ZGlmZjogYEF0dGFjayBvciBEZWZlbnNlYCxcblx0c3BlY3M6IHtcblx0XHRibG9jazogbmV3IFNwZWNpYWx0eSh7XG5cdFx0XHRpZDogYGFkOWMwYzVhLWYzOTktNGY4MS1iYTMzLTYyNDJiMTdmYzVlNmAsXG5cdFx0XHRuYW1lOiBgQmxvY2tgLFxuXHRcdFx0ZGVzYzogW1xuXHRcdFx0XHRgUm9sbCB2cyBbTWVsZWUgb3IgUmFuZ2VkIChpZiB5b3UgaGF2ZSBhIFNoaWVsZCldLmAsXG5cdFx0XHRcdGBSZWZsZXhpdmUgQmxvY2sgaXMgeW91ciBCbG9jayBzY29yZSB3aXRoIG5vIHJvbGwuYCxcblx0XHRcdF1cblx0XHR9KSxcblx0XHRzdHJpa2U6IG5ldyBTcGVjaWFsdHkoe1xuXHRcdFx0aWQ6IGAxODQyZTAwNi1jMDY0LTQ5OTQtOWYwMy0yN2U1NGYxZDdiOWZgLFxuXHRcdFx0bmFtZTogYFN0cmlrZWAsXG5cdFx0XHRkZXNjOiBbXG5cdFx0XHRcdGBSb2xsIHZzIFtEZWZlbnNlXS5gLFxuXHRcdFx0XHRgRGFtYWdlID0gW3dlYXBvbiBEYW1hZ2UgKyBTdWNjZXNzXS5gLFxuXHRcdFx0XVxuXHRcdH0pXG5cdH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1lbGVlIiwiaW1wb3J0IGF0aGxldGljcyBmcm9tICcuL0F0aGxldGljcydcbmltcG9ydCBidWlsZCBmcm9tICcuL0J1aWxkJ1xuaW1wb3J0IGRyaXZlIGZyb20gJy4vRHJpdmUnXG5pbXBvcnQgbWVsZWUgZnJvbSAnLi9NZWxlZSdcblxuXG5jb25zdCBDb25zdGl0dXRpb25Ta2lsbHMgPSBbXG5cdGF0aGxldGljcyxcblx0YnVpbGQsXG5cdGRyaXZlLFxuXHRtZWxlZSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgQ29uc3RpdHV0aW9uU2tpbGxzIl0sIm5hbWVzIjpbImFjcm9iYXRpY3MiLCJsYXJjZW55IiwicmFuZ2VkIiwic3RlYWx0aCIsIm1lZGljaW5lIiwicGVyY2VwdGlv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
