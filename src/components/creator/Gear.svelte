<script>
    import { CharacterStore } from '../../rules/Stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { AccessoryList } from '../../rules/gear/Accessories'
    import { AmmoList } from '../../rules/gear/Ammo'
    import { ArmorList, RandomArmor } from '../../rules/gear/Armor'
    import { BombList } from '../../rules/gear/Bombs'
    import { DocumentList } from '../../rules/gear/Documents'
    import { DrugsList } from '../../rules/gear/Drugs'
    import { ElectronicsList } from '../../rules/gear/Electronics'
    import { EquipmentList } from '../../rules/gear/Equipment'
    import { MedicalList } from '../../rules/gear/Medical'
    import { MeleeList } from '../../rules/gear/Melee'
    import { RangedList } from '../../rules/gear/Ranged'
    import { StorageList } from '../../rules/gear/Storage'

    let armorResult = ""



    function rollArmor() {
        armorResult = RandomArmor()
    }
</script>

<button on:click={rollArmor}>ROLL IT</button>
<div>
    {#each ArmorList as armor}
        <div>{armor.name}</div>
    {/each}
</div>
<br>
<div>My Armor: {armorResult.name}</div>