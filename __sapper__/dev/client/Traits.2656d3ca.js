import { b as Stat } from './Specialty.adf26afb.js';
import { A as AgilitySkills, B as BrainsSkills, C as ConstitutionSkills } from './ConstitutionSkills.56e093ee.js';
import { R as RandomRoll } from './RandomRoll.f18d347c.js';

class Trait extends Stat {
	constructor({
		id,
		name,
		desc,
		base=1,
		mods,
		score=1
	}) {
		super({
			id,
			name,
			desc,
			base,
			mods,
			score
		});
	}
}

const Agility = new Trait({
	id: `c84ca95a-9f01-476f-897c-e6ad07231551`,
	name: `Agility`,
	desc: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Brains = new Trait({
	id: `ac0d45e3-221c-4cf3-ab70-a19908b86bd7`,
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Constitution = new Trait({
	id: `da48b9f5-de7d-44b3-bb24-392e69bebe90`,
	name: `Constitution`,
	desc: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait is a factor in the Health and Block Properties.`,
		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Demeanor = new Trait({
	id: `2f73a727-6149-482e-9c36-70cccbfd03d4`,
	name: `Demeanor`,
	desc: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${ConstitutionSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const traitMax = 6;

const traitPoints = 14;

var Traits = {
	name: `Traits`,
	explanation: [
		`You get ${traitPoints} Trait points to assign.`,
		`Traits range from 1 to ${traitMax}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: [
		Agility,
		Brains,
		Constitution,
		Demeanor,
	],
	max: traitMax,
	startingPoints: () => traitPoints,
	assign: function(c, target) {
		c.traits[target.name].score = parseInt(target.value);
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		while(this.remaining(c) < 0) c.traits[targetName].score--;
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.traits));
			if (c.traits[t].score < this.max) c.traits[t].score++;
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0);
		return this.startingPoints() - spent
	},
	reset: function(c) {
		Object.keys(c.traits).forEach(t => c.traits[t].score = 1);
		return c
	}
};

export { Agility as A, Brains as B, Constitution as C, Demeanor as D, Traits as T };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhaXRzLjI2NTZkM2NhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy90cmFpdHMvVHJhaXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy90cmFpdHMvQWdpbGl0eS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3RyYWl0cy9CcmFpbnMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy90cmFpdHMvQ29uc3RpdHV0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvdHJhaXRzL0RlbWVhbm9yLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvdHJhaXRzL1RyYWl0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhdCBmcm9tICdydWxlcy9TdGF0LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFpdCBleHRlbmRzIFN0YXQge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRkZXNjLFxuXHRcdGJhc2U9MSxcblx0XHRtb2RzLFxuXHRcdHNjb3JlPTFcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2MsXG5cdFx0XHRiYXNlLFxuXHRcdFx0bW9kcyxcblx0XHRcdHNjb3JlXG5cdFx0fSlcblx0fVxufSIsImltcG9ydCBUcmFpdCBmcm9tICdydWxlcy90cmFpdHMvVHJhaXQuanMnXG5pbXBvcnQgQWdpbGl0eVNraWxscyBmcm9tICdydWxlcy9za2lsbHMvQWdpbGl0eVNraWxscy5qcydcblxuXG5jb25zdCBBZ2lsaXR5ID0gbmV3IFRyYWl0KHtcblx0aWQ6IGBjODRjYTk1YS05ZjAxLTQ3NmYtODk3Yy1lNmFkMDcyMzE1NTFgLFxuXHRuYW1lOiBgQWdpbGl0eWAsXG5cdGRlc2M6IFtcblx0XHRgQWdpbGl0eSBpcyBhIENoYXJhY3RlcuKAmXMgdGFsZW50IGZvciBwaHlzaWNhbCBjb29yZGluYXRpb24uYCxcblx0XHRgSGlnaCBBZ2lsaXR5IGluZGljYXRlcyBiYWxhbmNlLCBmbGV4aWJpbGl0eSwgYW5kIGZpbmUgbW90b3Igc2tpbGwuYCxcblx0XHRgVGhpcyBUcmFpdCBpcyBhIGZhY3RvciBpbiB0aGUgU3BlZWQgYW5kIERvZGdlIFByb3BlcnRpZXMuYCxcblx0XHRgQWdpbGl0eSBpcyB0aGUgcGFyZW50IFRyYWl0IGZvciB0aGUgZm9sbG93aW5nIFNraWxsczogJHtBZ2lsaXR5U2tpbGxzLm1hcChza2lsbCA9PiBza2lsbC5uYW1lKS5qb2luKCcsICcpfS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBZ2lsaXR5IiwiaW1wb3J0IFRyYWl0IGZyb20gJ3J1bGVzL3RyYWl0cy9UcmFpdC5qcydcbmltcG9ydCBCcmFpbnNTa2lsbHMgZnJvbSAncnVsZXMvc2tpbGxzL0JyYWluc1NraWxscy5qcydcblxuXG5jb25zdCBCcmFpbnMgPSBuZXcgVHJhaXQoe1xuXHRpZDogYGFjMGQ0NWUzLTIyMWMtNGNmMy1hYjcwLWExOTkwOGI4NmJkN2AsXG5cdG5hbWU6IGBCcmFpbnNgLFxuXHRkZXNjOiBbXG5cdFx0YEJyYWlucyBpcyBhIENoYXJhY3RlcuKAmXMgdGFsZW50IGZvciBjb2duaXRpdmUgcGVyZm9ybWFuY2UgYW5kIGFic3RyYWN0IHRob3VnaHQuYCxcblx0XHRgSGlnaCBCcmFpbnMgaW5kaWNhdGVzIHNoYXJwIG1lbW9yeSwga2VlbiBhd2FyZW5lc3MsIGFuZCBzdHVkaW91c25lc3MuYCxcblx0XHRgVGhpcyBUcmFpdCBpcyBhIGZhY3RvciBpbiB0aGUgRXhwZXJpZW5jZSBhbmQgSW50ZWxsZWN0IFByb3BlcnRpZXMuYCxcblx0XHRgQnJhaW5zIGlzIHRoZSBwYXJlbnQgVHJhaXQgZm9yIHRoZSBmb2xsb3dpbmcgU2tpbGxzOiAke0JyYWluc1NraWxscy5tYXAoc2tpbGwgPT4gc2tpbGwubmFtZSkuam9pbignLCAnKX0uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQnJhaW5zIiwiaW1wb3J0IFRyYWl0IGZyb20gJ3J1bGVzL3RyYWl0cy9UcmFpdC5qcydcbmltcG9ydCBDb25zdGl0dXRpb25Ta2lsbHMgZnJvbSAncnVsZXMvc2tpbGxzL0NvbnN0aXR1dGlvblNraWxscy5qcydcblxuXG5jb25zdCBDb25zdGl0dXRpb24gPSBuZXcgVHJhaXQoe1xuXHRpZDogYGRhNDhiOWY1LWRlN2QtNDRiMy1iYjI0LTM5MmU2OWJlYmU5MGAsXG5cdG5hbWU6IGBDb25zdGl0dXRpb25gLFxuXHRkZXNjOiBbXG5cdFx0YENvbnN0aXR1dGlvbiBpcyBhIENoYXJhY3RlcuKAmXMgdGFsZW50IGZvciBwaHlzaWNhbCBwb3dlciBhbmQgZHVyYWJpbGl0eS5gLFxuXHRcdGBIaWdoIENvbnN0aXR1dGlvbiBpbmRpY2F0ZXMgZ29vZCBoZWFsdGgsIGhpZ2ggc3RhbWluYSwgYW5kIHN0cm9uZyBtdXNjbGVzLmAsXG5cdFx0YFRoaXMgVHJhaXQgaXMgYSBmYWN0b3IgaW4gdGhlIEhlYWx0aCBhbmQgQmxvY2sgUHJvcGVydGllcy5gLFxuXHRcdGBDb25zdGl0dXRpb24gaXMgdGhlIHBhcmVudCBUcmFpdCBmb3IgdGhlIGZvbGxvd2luZyBTa2lsbHM6ICR7Q29uc3RpdHV0aW9uU2tpbGxzLm1hcChza2lsbCA9PiBza2lsbC5uYW1lKS5qb2luKCcsICcpfS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDb25zdGl0dXRpb24iLCJpbXBvcnQgVHJhaXQgZnJvbSAncnVsZXMvdHJhaXRzL1RyYWl0LmpzJ1xuaW1wb3J0IERlbWVhbm9yU2tpbGxzIGZyb20gJ3J1bGVzL3NraWxscy9Db25zdGl0dXRpb25Ta2lsbHMuanMnXG5cblxuY29uc3QgRGVtZWFub3IgPSBuZXcgVHJhaXQoe1xuXHRpZDogYDJmNzNhNzI3LTYxNDktNDgyZS05YzM2LTcwY2NjYmZkMDNkNGAsXG5cdG5hbWU6IGBEZW1lYW5vcmAsXG5cdGRlc2M6IFtcblx0XHRgRGVtZWFub3IgaXMgYSBDaGFyYWN0ZXLigJlzIHRhbGVudCBmb3Igc29jaWFsIGV4Y2hhbmdlcyBhbmQgc2hlZXIgZm9yY2Ugb2Ygd2lsbC5gLFxuXHRcdGBIaWdoIERlbWVhbm9yIGluZGljYXRlcyBjaGFyaXNtYSwgc2VsZi1tb3RpdmF0aW9uLCBhbmQgY29uZmlkZW5jZS5gLFxuXHRcdGBUaGlzIFRyYWl0IGlzIGEgZmFjdG9yIGluIHRoZSBQc3ljaGUgYW5kIEx1Y2sgUHJvcGVydGllcy5gLFxuXHRcdGBEZW1lYW5vciBpcyB0aGUgcGFyZW50IFRyYWl0IGZvciB0aGUgZm9sbG93aW5nIFNraWxsczogJHtEZW1lYW5vclNraWxscy5tYXAoc2tpbGwgPT4gc2tpbGwubmFtZSkuam9pbignLCAnKX0uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRGVtZWFub3IiLCJpbXBvcnQgQWdpbGl0eSBmcm9tICdydWxlcy90cmFpdHMvQWdpbGl0eS5qcydcbmltcG9ydCBCcmFpbnMgZnJvbSAncnVsZXMvdHJhaXRzL0JyYWlucy5qcydcbmltcG9ydCBDb25zdGl0dXRpb24gZnJvbSAncnVsZXMvdHJhaXRzL0NvbnN0aXR1dGlvbi5qcydcbmltcG9ydCBEZW1lYW5vciBmcm9tICdydWxlcy90cmFpdHMvRGVtZWFub3IuanMnXG5pbXBvcnQgUmFuZG9tUm9sbCBmcm9tICdyYW5kb20vUmFuZG9tUm9sbC5qcydcblxuXG5leHBvcnQgY29uc3QgdHJhaXRNYXggPSA2XG5cbmV4cG9ydCBjb25zdCB0cmFpdFBvaW50cyA9IDE0XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogYFRyYWl0c2AsXG5cdGV4cGxhbmF0aW9uOiBbXG5cdFx0YFlvdSBnZXQgJHt0cmFpdFBvaW50c30gVHJhaXQgcG9pbnRzIHRvIGFzc2lnbi5gLFxuXHRcdGBUcmFpdHMgcmFuZ2UgZnJvbSAxIHRvICR7dHJhaXRNYXh9LmAsXG5cdFx0YFRyYWl0IHJvbGxzIGFyZSBbZDYgKyBUcmFpdF0uYCxcblx0XHRgVHJhaXQgc2NvcmVzIHNldCB0aGUgbGltaXQgZm9yIHRoZWlyIFNraWxscy5gLFxuXHRdLFxuXHRsaXN0OiBbXG5cdFx0QWdpbGl0eSxcblx0XHRCcmFpbnMsXG5cdFx0Q29uc3RpdHV0aW9uLFxuXHRcdERlbWVhbm9yLFxuXHRdLFxuXHRtYXg6IHRyYWl0TWF4LFxuXHRzdGFydGluZ1BvaW50czogKCkgPT4gdHJhaXRQb2ludHMsXG5cdGFzc2lnbjogZnVuY3Rpb24oYywgdGFyZ2V0KSB7XG5cdFx0Yy50cmFpdHNbdGFyZ2V0Lm5hbWVdLnNjb3JlID0gcGFyc2VJbnQodGFyZ2V0LnZhbHVlKVxuXHRcdHJldHVybiB0aGlzLmxpbWl0KGMsIHRhcmdldC5uYW1lKVxuXHR9LFxuXHRsaW1pdDogZnVuY3Rpb24oYywgdGFyZ2V0TmFtZSkge1xuXHRcdHdoaWxlKHRoaXMucmVtYWluaW5nKGMpIDwgMCkgYy50cmFpdHNbdGFyZ2V0TmFtZV0uc2NvcmUtLVxuXHRcdHJldHVybiBjXG5cdH0sXG5cdHJhbmRvbTogZnVuY3Rpb24oYykge1xuXHRcdGMgPSB0aGlzLnJlc2V0KGMpXG5cdFx0d2hpbGUodGhpcy5yZW1haW5pbmcoYykgPiAwKSB7XG5cdFx0XHRjb25zdCB0ID0gUmFuZG9tUm9sbChPYmplY3Qua2V5cyhjLnRyYWl0cykpXG5cdFx0XHRpZiAoYy50cmFpdHNbdF0uc2NvcmUgPCB0aGlzLm1heCkgYy50cmFpdHNbdF0uc2NvcmUrK1xuXHRcdH1cblx0XHRyZXR1cm4gY1xuXHR9LFxuXHRyZW1haW5pbmc6IGZ1bmN0aW9uKGMpIHtcblx0XHRjb25zdCBzcGVudCA9IE9iamVjdC52YWx1ZXMoYy50cmFpdHMpLnJlZHVjZSgodCwgeyBzY29yZSB9KSA9PiB0ICs9IHNjb3JlLCAwKVxuXHRcdHJldHVybiB0aGlzLnN0YXJ0aW5nUG9pbnRzKCkgLSBzcGVudFxuXHR9LFxuXHRyZXNldDogZnVuY3Rpb24oYykge1xuXHRcdE9iamVjdC5rZXlzKGMudHJhaXRzKS5mb3JFYWNoKHQgPT4gYy50cmFpdHNbdF0uc2NvcmUgPSAxKVxuXHRcdHJldHVybiBjXG5c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