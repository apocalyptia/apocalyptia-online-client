import { traitsList } from './traits'
import { skillsList } from './skills/'


export class Character {
    constructor() {
        this.scenario = "",
        this.completed = false,
        this.description = {
            age: {           label: "Age",       value: "" },
            characterName: { label: "Character", value: "" },
            gender: {        label: "Gender",    value: "" },
            hair: {          label: "Hair",      value: "" },
            height: {        label: "Height",    value: "" },
            playerName: {    label: "Player",    value: "" },
            skin: {          label: "Skin",      value: "" },
            weight: {        label: "Weight",    value: "" },
        },
        this.traits = traitsList,
        this.skills = skillsList,
        this.props = {
            actions: { name: "Actions",    base: 1, score: 1, setActions: () => {
                let actions = Math.floor((this.traits["agility"].score + this.traits["brains"].score) / 2);
                this.props.actions.base = actions;
                return actions;
            } },
            block: {   name: "Block",      base: 0, score: 0, setBlock: () => {
                let block = this.skills["melee"].score;
                this.props.block.base = block;
                return block;
            } },
            dodge: {   name: "Dodge",      base: 0, score: 0, setDodge: () => {
                let dodge = this.skills["acrobatics"].score;
                this.props.dodge.base = dodge;
                return dodge;
            } },
            health: {  name: "Health",     base: 3, score: 3, setHealth: () => {
                let health = this.traits["constitution"].score * 3;
                this.props.health.base = health;
                return health;
            } },
            luck: {    name: "Luck",       base: 1, score: 1, setLuck: () => {
                let luck = this.traits["demeanor"].score;
                this.props.luck.base = luck;
                return luck;
            } },
            psyche: {  name: "Psyche",     base: 1, score: 1, setPsyche: () => {
                let psyche = this.traits["demeanor"].score * 3;
                this.props.psyche.base = psyche;
                return psyche;
            }},
            reflex: {  name: "Reflex",     base: 0, score: 0, setReflex: () => {
                let reflex = Math.floor(this.traits["brains"].score / 2);
                this.props.reflex.base = reflex;
                return reflex;
            } },
            speed: {   name: "Speed",      base: 2, score: 2, setSpeed: () => {
                let speed = this.traits["agility"].score + this.traits["constitution"].score;
                this.props.speed.base = speed;
                return speed;
            } },
            xp: {      name: "Experience", base: 6, score: 6, setXP: () => {
                let xp = this.traits["brains"].score * 6;
                this.props.xp.base = xp;
                return xp;
            } },
        },
        this.abilities = [],
        this.gear = {
            armor: {    name: "Armor",    inventory: [] },
            weapons: {  name: "Weapons",  inventory: [] },
            backpack: { name: "Backpack", inventory: [] },
            ammo: {     name: "Ammo",     inventory: [] },
        },
        this.reflex_score = () => {
            return Math.round(this.traits["brains"].score / 2)
        },
        this.dodge_score = () => {
            return this.traits["agility"].score
        },
        this.block_score = () => {
            return this.skills.melee.score
        }
    }
}