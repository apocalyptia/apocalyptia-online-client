<script>
import Abilities from '../../components/rules/Abilities'
import Properties from '../../components/rules/Properties'
import Skills from '../../components/rules/Skills'
import Traits from '../../components/rules/Traits'
import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<h1>Creation</h1>
<div class='explanation'>
	<p>Making a new character in Apocalyptia is easy. Just follow these 6 steps:</p>
</div>
<div class='section-card'>
	<h3>Step 1: Description</h3>
	<p>Describe your Character's identity, age, sex, height, weight, skin, and hair.</p>
</div>
<div class='section-card'>
	<h3>Step 2: Traits</h3>
	{#each Traits.explanation as line}
		<p>{line}</p>
	{/each}
	<p>The {Traits.list.length} Traits are:</p>
	<p>
		{#each Traits.list as trait, index}
			{trait.name}{#if index < Traits.list.length - 1},&nbsp;{/if}
		{/each}
	</p>
</div>
<div class='section-card'>
	<h3>Step 3: Skills</h3>
	{#each Skills.explanation as line}
		<p>{line}</p>
	{/each}
	{#each Skills.groups as group}
		<p><span class='skill-type'>{group.name} Skills</span>:</p>
		<p>
			{#each group.list as skill, index}
				{skill.name}{#if index < group.list.length - 1},&nbsp;{/if}
			{/each}
		</p>
	{/each}
</div>
<div class='section-card'>
	<h3>Step 4: Properties</h3>
	{#each Properties.explanation as line}
		<p>{line}</p>
	{/each}
	<p>Your Character's Properties are calculated automatically:</p>
	<ul>
		{#each Properties.list as property}
			<li>{property.description[0]}</li>
		{/each}
	</ul>
</div>
<div class='section-card'>
	<h3>Step 5: Abilities</h3>
	{#each Abilities.explanation as line}
		<p>{line}</p>
	{/each}
	<p>Buy Abilities for your Character using Experience Points (XP), or save some or all of your starting XP for later.</p>
</div>
<div class='section-card'>
	<h3>Step 6: Gear</h3>
	<p>Equip your Character with a random Melee weapon, a random Ranged weapon (with some random Ammo), and a random piece of Armor.</p>
</div>
<NavBar links={{back: '/', next: '/creator/description'}}/>


<style>
	.section-card {
		display: block;
		margin-bottom: var(--base-unit);
	}
	p {
		line-height: 1.5;
	}
	.explanation {
		padding: var(--base-unit);
	}
	h3 {
		font-weight: bold;
		margin-bottom: var(--half-unit);
		text-decoration: underline;
	}
	.skill-type {
		text-decoration: underline;
	}
	ul {
		list-style-position: inside;
		list-style-type: disc;
	}

</style>