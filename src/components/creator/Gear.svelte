<script>
    import { CharacterStore } from '../../rules/stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { d6Roll } from '../../rules/roller'
    import { AccessoryList } from '../../rules/gear/accessories'
    import { AmmoList } from '../../rules/gear/ammo'
    import { ArmorList } from '../../rules/gear/armor'
    import { BombList } from '../../rules/gear/bombs'
    import { DocumentList } from '../../rules/gear/documents'
    import { DrugsList } from '../../rules/gear/drugs'
    import { ElectronicsList } from '../../rules/gear/electronics'
    import { EquipmentList } from '../../rules/gear/equipment'
    import { MedicalList } from '../../rules/gear/medical'
    import { MeleeList } from '../../rules/gear/melee'
    import { RangedList } from '../../rules/gear/ranged'
    import { StorageList } from '../../rules/gear/storage'


    function roll() {
        console.log(d6Roll())
    }
</script>

<button on:click={roll}>ROLL IT</button>
<div>
    {#each ArmorList as armor}
        <div>{armor.type}</div>
    {/each}
</div>