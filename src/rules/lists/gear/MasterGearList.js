import AccessoryList from 'rules/lists/gear/AccessoryList.js'
import AmmoList from 'rules/lists/gear/AmmoList.js'
import ArmorList from 'rules/lists/gear/ArmorList.js'
import BombList from 'rules/lists/gear/BombList.js'
import DocumentList from 'rules/lists/gear/DocumentList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import EquipmentList from 'rules/lists/gear/EquipmentList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MeleeWeaponList from 'rules/lists/gear/MeleeWeaponList.js'
import RangedWeaponList from 'rules/lists/gear/RangedWeaponList.js'
import StorageList from 'rules/lists/gear/StorageList.js'

export default [
    {
        name: 'Master Gear List',
        value: undefined,
        list: [
            ...AccessoryList,
            ...AmmoList,
            ...ArmorList,
            ...BombList,
            ...DocumentList,
            ...DrugsList,
            ...ElectronicsList,
            ...EquipmentList,
            ...MedicalList,
            ...MeleeWeaponList,
            ...RangedWeaponList,
            ...StorageList
        ]
    },
    {
        name: 'Accessory',
        value: undefined,
        list: AccessoryList
    },
    {
        name: 'Ammo',
        value: undefined,
        list: AmmoList
    },
    {
        name: 'Armor',
        value: undefined,
        list: ArmorList
    },
    {
        name: 'Bomb',
        value: undefined,
        list: BombList
    },
    {
        name: 'Document',
        value: undefined,
        list: DocumentList
    },
    {
        name: 'Drug',
        value: undefined,
        list: DrugsList
    },
    {
        name: 'Electronics',
        value: undefined,
        list: ElectronicsList
    },
    {
        name: 'Equipment',
        value: undefined,
        list: EquipmentList
    },
    {
        name: 'Medical',
        value: undefined,
        list: MedicalList
    },
    {
        name: 'Melee',
        value: undefined,
        list: MeleeWeaponList
    },
    {
        name: 'Ranged',
        value: undefined,
        list: RangedWeaponList
    },
    {
        name: 'Storage',
        value: undefined,
        list: StorageList
    },
]