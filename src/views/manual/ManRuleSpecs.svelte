<script>
    export let rule
</script>


<ul>
    {#each Object.values(rule.specs) as spec}
        <li>
            <div class='sub-name'>{spec.name}</div>
            {#each spec.desc as spec_desc}
                <p class='spec-desc'>{spec_desc}</p>
            {/each}
        </li>
    {/each}
</ul>


<style>
    .spec-desc {
		margin-bottom: var(--s100);
	}
</style>