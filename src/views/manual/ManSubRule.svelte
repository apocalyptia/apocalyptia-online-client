<script>
    export let subrule
</script>


<details class='subrule-details'>
    <summary class='sub-name'>{subrule.name}</summary>
    {#each subrule.desc as sub_desc}
        <p class='sub-desc'>{sub_desc}</p>
    {/each}
</details>


<style>
    .subrule-details {
		margin: var(--s100);
	}
	.sub-name {
		font-weight: bold;
	}
	.sub-desc {
		margin-bottom: var(--s100);
	}
</style>