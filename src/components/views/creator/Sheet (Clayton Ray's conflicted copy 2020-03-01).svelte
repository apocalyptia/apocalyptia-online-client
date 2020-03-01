<script>
import { character } from '../../../stores/characterStore'
import Capitalize from '../../functions/Capitalize'

const traits = Object.keys($character.traits)
const skills = Object.keys($character.skills)
</script>


<div class="character_sheet_1">
	<div class='section-card description-section'>
		<div>Player: {$character.description.player.value}</div>
		<div>Character: {$character.description.character.value}</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Age: {$character.description.age.value}</span>
			</div>
		</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Sex: {$character.description.sex.value}</span>
			</div>
		</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Skin: {$character.description.skin.value}</span>
			</div>
		</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Hair: {$character.description.hair.value}</span>
			</div>
		</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Height: {$character.description.height.value}</span>
			</div>
		</div>
		<div class='pair-block'>
			<div class='pair-container'>
				<span>Weight: {$character.description.weight.value}</span>
			</div>
		</div>
	</div>

	<div class='section-card traits-section'>
		{#each traits as t}
			<div>{Capitalize($character.traits[t].name)}: {$character.traits[t].score}</div>
		{/each}
	</div>

	<div class='section-card skills-section'>
		{#each traits as t}
			<div>{t} Skills</div>
			{#each skills as s}
				{#if t == $character.skills[s].parent}
					<div>{s.name}: {s.score}</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>


<!-- 
		<tr>
			<td colspan="2" class="property_name"><b>Speed:</b><span id="s_speed"></span>yds</td>
			<td colspan="2" class="property_name"><b>XP:</b><span id="s_cur_xp"></span>/<span id="s_max_xp"></span></td>
			<td colspan="2" class="property_name"><b>Carry:</b><span id="s_cur_carry"></span>/<span id="s_max_carry"></span></td>
			<td colspan="2" class="property_name"><b>Luck:</b>&nbsp;/<span id="s_max_luck"></span></td>
		</tr>
	</table>
	<h3 id="s_combat_header">COMBAT</h3>
	<table id="sheet_defenses" style="">
		<tr>
			<td id="s_def_header" class="s_def">DEFENSES:</td>
			<td class="s_def">&nbsp;BLOCK: <span id="s_block"></span></td>
			<td class="s_def">&nbsp;DODGE: <span id="s_dodge"></span></td>
			<td class="s_def">&nbsp;REFLEX: <span id="s_reflex"></span></td>
			<td id="s_def_blank" class="s_def" style="background-color: #000000; border-collapse: true;"></td>
			<td id="s_def_pain_header">PAIN:</td>
			<td id="s_def_pain_score">&nbsp;</td>
		</tr>
	</table>
	<br>
	<table id="sheet_health_armor">
		<tr>
			<th colspan="6" id="s_health_table">HEALTH</th>
		</tr>
		<tr>
			<td id="s_location_header">LOCATION</td>
			<td id="s_hp_header" class="center">HP</td>
			<td id="s_armor_header">ARMOR</td>
			<td id="s_ar_header" class="center">AR</td>
			<td id="s_armor_sz_header" class="center">Sz</td>
			<td id="s_armor_notes_header">Notes</td>
		</tr>
		<tr id="s_head_row">
			<td id="s_head_loc" class="location_name">Head</td>
			<td id="s_head_hp" class="center">&nbsp;/<span id="s_head_max_hp"></span></td>
			<td><span id="s_head_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_head_max_ar"></span></td>
			<td class="center"><span id="s_head_armor_sz"></span></td>
			<td><span id="s_head_armor_notes"></span></td>
		</tr>
		<tr id="s_larm_row">
			<td id="s_larm_loc" class="location_name">L. Arm</td>
			<td id="s_larm_hp" class="center">&nbsp;/<span id="s_larm_max_hp"></span></td>
			<td><span id="s_larm_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_larm_max_ar"></span></td>
			<td class="center"><span id="s_larm_armor_sz"></span></td>
			<td><span id="s_larm_armor_notes"></span></td>
		</tr>
		<tr id="s_rarm_row">
			<td id="s_rarm_loc" class="location_name">R. Arm</td>
			<td id="s_rarm_hp" class="center">&nbsp;/<span id="s_rarm_max_hp"></span></td>
			<td><span id="s_rarm_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_rarm_max_ar"></span></td>
			<td class="center"><span id="s_rarm_armor_sz"></span></td>
			<td><span id="s_rarm_armor_notes"></span></td>
		</tr>
		<tr id="s_torso_row">
			<td id="s_torso_loc" class="location_name">Torso</td>
			<td id="s_torso_hp" class="center">&nbsp;/<span id="s_torso_max_hp"></span></td>
			<td><span id="s_torso_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_torso_max_ar"></span></td>
			<td class="center"><span id="s_torso_armor_sz"></span></td>
			<td><span id="s_torso_armor_notes"></span></td>
		</tr>
		<tr id="s_lleg_row">
			<td id="s_lleg_loc" class="location_name">L. Leg</td>
			<td id="s_lleg_hp" class="center">&nbsp;/<span id="s_lleg_max_hp"></span></td>
			<td><span id="s_lleg_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_lleg_max_ar"></span></td>
			<td class="center"><span id="s_lleg_armor_sz"></span></td>
			<td><span id="s_lleg_armor_notes"></span></td>
		</tr>
		<tr id="s_rleg_row">
			<td id="s_rleg_loc" class="location_name">R. Leg</td>
			<td id="s_rleg_hp" class="center">&nbsp;/<span id="s_rleg_max_hp"></span></td>
			<td><span id="s_rleg_armor_type"></span></td>
			<td class="center">&nbsp;/<span id="s_rleg_max_ar"></span></td>
			<td class="center"><span id="s_rleg_armor_sz"></span></td>
			<td><span id="s_rleg_armor_notes"></span></td>
		</tr>
	</table>
	<br>
	<table id="s_weapons_table">
		<tr>
			<th id="s_weap_table_header" colspan="8">WEAPONS</th>
		</tr>
		<tr>
			<td id="s_weap_type" class="s_weap_header">Type</td>
			<td id="s_weap_atk" class="s_weap_header">ATK</td>
			<td id="s_weap_dmg" class="s_weap_header">DMG</td>
			<td id="s_weap_rng" class="s_weap_header">RNG</td>
			<td id="s_weap_sz" class="s_weap_header">Sz</td>
			<td id="s_weap_ammo" class="s_weap_header" colspan="2">Ammo</td>
			<td id="s_weap_notes" class="s_weap_header">Notes</td>
		</tr>
		<tr>
			<td id="s_weap0_type">&nbsp;</td>
			<td id="s_weap0_atk" class="centered">&nbsp;</td>
			<td id="s_weap0_dmg" class="centered">&nbsp;</td>
			<td id="s_weap0_rng" class="centered">&nbsp;</td>
			<td id="s_weap0_sz" class="centered">&nbsp;</td>
			<td id="s_weap0_cal" class="centered">&nbsp;</td>
			<td id="s_weap0_mag" class="centered">&nbsp;</td>
			<td id="s_weap0_notes">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_weap1_type">&nbsp;</td>
			<td id="s_weap1_atk" class="centered">&nbsp;</td>
			<td id="s_weap1_dmg" class="centered">&nbsp;</td>
			<td id="s_weap1_rng" class="centered">&nbsp;</td>
			<td id="s_weap1_sz" class="centered">&nbsp;</td>
			<td id="s_weap1_cal" class="centered">&nbsp;</td>
			<td id="s_weap1_mag" class="centered">&nbsp;</td>
			<td id="s_weap1_notes">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_weap2_type">&nbsp;</td>
			<td id="s_weap2_atk" class="centered">&nbsp;</td>
			<td id="s_weap2_dmg" class="centered">&nbsp;</td>
			<td id="s_weap2_rng" class="centered">&nbsp;</td>
			<td id="s_weap2_sz" class="centered">&nbsp;</td>
			<td id="s_weap2_cal" class="centered">&nbsp;</td>
			<td id="s_weap2_mag" class="centered">&nbsp;</td>
			<td id="s_weap2_notes">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_weap3_type">&nbsp;</td>
			<td id="s_weap3_atk" class="centered">&nbsp;</td>
			<td id="s_weap3_dmg" class="centered">&nbsp;</td>
			<td id="s_weap3_rng" class="centered">&nbsp;</td>
			<td id="s_weap3_sz" class="centered">&nbsp;</td>
			<td id="s_weap3_cal" class="centered">&nbsp;</td>
			<td id="s_weap3_mag" class="centered">&nbsp;</td>
			<td id="s_weap3_notes">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_weap4_type">&nbsp;</td>
			<td id="s_weap4_atk" class="centered">&nbsp;</td>
			<td id="s_weap4_dmg" class="centered">&nbsp;</td>
			<td id="s_weap4_rng" class="centered">&nbsp;</td>
			<td id="s_weap4_sz" class="centered">&nbsp;</td>
			<td id="s_weap4_cal" class="centered">&nbsp;</td>
			<td id="s_weap4_mag" class="centered">&nbsp;</td>
			<td id="s_weap4_notes">&nbsp;</td>
		</tr>
	</table>
	<br>
	<table id="s_ammo_table">
		<tr>
			<td class="mag_ammo_header">Magazines</td>
			<td id="s_mag_type0" class="mag_ammo">&nbsp;</td>
			<td id="s_mag_type1" class="mag_ammo">&nbsp;</td>
			<td id="s_mag_type2" class="mag_ammo">&nbsp;</td>
			<td id="s_mag_type3" class="mag_ammo">&nbsp;</td>
			<td id="s_mag_type4" class="mag_ammo">&nbsp;</td>
			<td id="s_mag_type5" class="mag_ammo">&nbsp;</td>
		</tr>
		<tr>
			<td class="mag_ammo_header">Ammunition</td>
			<td id="s_mag_ammo0" class="mag_ammo">&nbsp;/&nbsp;</td>
			<td id="s_mag_ammo1" class="mag_ammo">&nbsp;/&nbsp;</td>
			<td id="s_mag_ammo2" class="mag_ammo">&nbsp;/&nbsp;</td>
			<td id="s_mag_ammo3" class="mag_ammo">&nbsp;/&nbsp;</td>
			<td id="s_mag_ammo4" class="mag_ammo">&nbsp;/&nbsp;</td>
			<td id="s_mag_ammo5" class="mag_ammo">&nbsp;/&nbsp;</td>
		</tr>
	</table>
	<br>
	<table id="s_abilities_table">
		<tr>
			<th id="s_ability_name0" class="ability_header">ABILITIES</th>
			<th id="s_ability_desc0" class="ability_header">Description</th>
			<th id="s_ability_taken0" class="ability_header">Taken</th>
		</tr>
		<tr>
			<td id="s_ability_name1">&nbsp;</td>
			<td id="s_ability_desc1">&nbsp;</td>
			<td id="s_ability_taken1" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name2">&nbsp;</td>
			<td id="s_ability_desc2">&nbsp;</td>
			<td id="s_ability_taken2" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name3">&nbsp;</td>
			<td id="s_ability_desc3">&nbsp;</td>
			<td id="s_ability_taken3" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name4">&nbsp;</td>
			<td id="s_ability_desc4">&nbsp;</td>
			<td id="s_ability_taken4" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name5">&nbsp;</td>
			<td id="s_ability_desc5">&nbsp;</td>
			<td id="s_ability_taken5" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name6">&nbsp;</td>
			<td id="s_ability_desc6">&nbsp;</td>
			<td id="s_ability_taken6" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name7">&nbsp;</td>
			<td id="s_ability_desc7">&nbsp;</td>
			<td id="s_ability_taken7" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name8">&nbsp;</td>
			<td id="s_ability_desc8">&nbsp;</td>
			<td id="s_ability_taken8" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name9">&nbsp;</td>
			<td id="s_ability_desc9">&nbsp;</td>
			<td id="s_ability_taken9" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name10">&nbsp;</td>
			<td id="s_ability_desc10">&nbsp;</td>
			<td id="s_ability_taken10" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name11">&nbsp;</td>
			<td id="s_ability_desc11">&nbsp;</td>
			<td id="s_ability_taken11" class="s_taken">&nbsp;</td>
		</tr>
		<tr>
			<td id="s_ability_name12">&nbsp;</td>
			<td id="s_ability_desc12">&nbsp;</td>
			<td id="s_ability_taken12" class="s_taken">&nbsp;</td>
		</tr>
	</table>
</div>
<br>
<br>
<div id="character_sheet_2">
	<br>
	<br>
	<table id="backpack_table">
		<tr>
			<td id="backpack_header" colspan="2">BACKPACK</td>
		</tr>
		<tr>
			<td id="b0">&nbsp;</td><td id="b1">&nbsp;</td>
		</tr>
		<tr>
			<td id="b2">&nbsp;</td><td id="b3">&nbsp;</td>
		</tr>
		<tr>
			<td id="b4">&nbsp;</td><td id="b5">&nbsp;</td>
		</tr>
		<tr>
			<td id="b6">&nbsp;</td><td id="b7">&nbsp;</td>
		</tr>
		<tr>
			<td id="b8">&nbsp;</td><td id="b9">&nbsp;</td>
		</tr>
		<tr>
			<td id="b10">&nbsp;</td><td id="b11">&nbsp;</td>
		</tr>
		<tr>
			<td id="b12">&nbsp;</td><td id="b13">&nbsp;</td>
		</tr>
		<tr>
			<td id="b14">&nbsp;</td><td id="b15">&nbsp;</td>
		</tr>
		<tr>
			<td id="b16">&nbsp;</td><td id="b17">&nbsp;</td>
		</tr>
		<tr>
			<td id="b18">&nbsp;</td><td id="b19">&nbsp;</td>
		</tr>
		<tr>
			<td id="b20">&nbsp;</td><td id="b21">&nbsp;</td>
		</tr>
		<tr>
			<td id="b22">&nbsp;</td><td id="b23">&nbsp;</td>
		</tr>
		<tr>
			<td id="b24">&nbsp;</td><td id="b25">&nbsp;</td>
		</tr>
		<tr>
			<td id="b26">&nbsp;</td><td id="b27">&nbsp;</td>
		</tr>
		<tr>
			<td id="b28">&nbsp;</td><td id="b29">&nbsp;</td>
		</tr>
	</table>
	<br>
	<table id="game_notes">
		<tr>
			<td id="game_notes_header">GAME NOTES:</td>
			<td id="comrades_header">COMRADES</td>
		</tr>
		<tr>
			<td><b>Relationship:</b> <span id="s_rel1"></span></td><td><span id="s_com1"></span></td>
		</tr>
		<tr>
			<td><b>Relationship:</b> <span id="s_rel2"></span></td><td><span id="s_com2"></span></td>
		</tr>
		<tr>
			<td><b>Relationship:</b> <span id="s_rel3"></span></td><td><span id="s_com3"></span></td>
		</tr>
		<tr>
			<td><b>Relationship:</b> <span id="s_rel4"></span></td><td><span id="s_com4"></span></td>
		</tr>
		<tr>
			<td><b>Relationship:</b> <span id="s_rel5"></span></td><td><span id="s_com5"></span></td>
		</tr>
		<tr>
			<td><b>Faction:</b> <span id="s_faction_name"></span></td><td>&nbsp;</td>
		</tr>
		<tr>
			<td><b>Starting Experience:</b> <span id="s_starting_xp"></span></td><td>&nbsp;</td>
		</tr>
		<tr>
			<td><b>Flaw:</b> <span id="s_flaw"></span></td><td>&nbsp;</td>
		</tr>
		<tr>
			<td><b>History:</b> <span id="s_profession"></span></td><td>&nbsp;</td>
		</tr>
		<tr>
			<td><b>Profession:</b> <span id="s_history"></span></td><td>&nbsp;</td>
		</tr>
		<tr>
			<td id="s_psyche"></td><td>&nbsp;</td>
		</tr>
	</table>
</div> -->


<style>
.pair-container {
	display: inline-block;
	text-align: left;
}
@media only screen and (max-width: 768px) {
	.pair-block {
		display: block;
		padding: var(--third-unit);
		width: 55%;
	}
	.stat-label {
		display: block;
	}
}
@media only screen and (min-width: 768px) {
	.pair-block {
		width: 50%;
	}
}
.full-block {
	display: block;
	width: 100%;
}
</style>