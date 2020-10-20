import{b as e,S as a,a as o}from"./Specialty.adf26afb.js";class s extends e{constructor({id:e,name:a,desc:o,formula:s,score:r,parent:t=""}){super({id:e,name:a,desc:o,formula:s}),this.score=r,this.parent=t}}const r=new a({id:"1f84042e-c02b-477f-8662-41d3a0ccc4d5",name:"Melee",desc:["Hand-to-hand combat."],parent:"Constitution",diff:"Attack or Defense",specs:{block:new o({id:"ad9c0c5a-f399-4f81-ba33-6242b17fc5e6",name:"Block",desc:["Roll vs [Melee or Ranged (if you have a Shield)].","Reflexive Block is your Block score with no roll."]}),strike:new o({id:"1842e006-c064-4994-9f03-27e54f1d7b9f",name:"Strike",desc:["Roll vs [Defense].","Damage = [weapon Damage + Success]."]})}}),t=new s({id:"ceb4a52f-8e47-4892-8d34-4ff4de12a486",name:r.specs.block.name,desc:["Block = Melee",...r.specs.block.desc],formula:e=>{e.props.block.score=e.skills.melee.score},base:0,score:0}),c=new s({id:"c35b76a8-9912-46fc-b1d3-b0b23b71ef3d",name:"Carry",desc:["Carry = Constitution x 3","1 Pain per Size above Carry."],formula:e=>{e.props.carry.current=0,e.props.carry.score=3*e.traits.constitution.score},base:3,score:3}),n=new a({id:"f19c07a2-1371-48db-b0bc-a88e5bc4e53b",name:"Acrobatics",desc:["Gymnastic prowess."],parent:"Agility",diff:6,specs:{dodge:new o({id:"a7451f3a-9970-431a-8304-f36ae046e85b",name:"Dodge",desc:["Roll Acrobatics(Dodge) vs [Melee or Ranged].","As part of a Dodge, you may drop Prone for free if you wish.","Reflexive Dodge is your Dodge score with no roll."]}),jump:new o({id:"7a5e0273-8d72-43c3-a826-0a927e2ee0e9",name:"Jump",desc:["Running Jump distance is yards = [Agility].","Vertical Jump distance is [Agility x 6] inches."]})}}),i=new s({id:"c83be9cc-03c9-4b19-85d2-8a2e89475848",name:n.specs.dodge.name,desc:["Dodge = Acrobatics",...n.specs.dodge.desc],formula:e=>{e.props.dodge.score=e.skills.acrobatics.score}}),d=new s({id:"3bee3f4e-dce9-4943-a2d0-1d3a4edc5920",name:"Experience",desc:["Experience (XP) = Brains x 3","Experience represents how much you have learned up to now.","You get additional XP = Intellect for each game session you survive.","You also get +1 XP every time you roll a Botch.","The Narrator may choose to give bonus XP.","You may spend XP to buy Abilities to improve your Character.","You may also spend 1XP per round to regain 1 Luck Point."],formula:e=>{e.props.experience.score=3*e.traits.brains.score,e.props.experience.current=3*e.traits.brains.score}}),u=new s({id:"7f6c7b57-75c1-48e8-b5b8-9b5c14ec8d85",name:"Health",desc:["Head, Arm, and Leg Health = Constitution","Torso Health = Constitution x 2","Health is a measure of how much Damage you can withstand."],formula:e=>{Object.values(e.health).forEach((a=>{"Torso"==a.name?(a.score=2*e.traits.constitution.score,a.current=2*e.traits.constitution.score):(a.score=e.traits.constitution.score,a.current=e.traits.constitution.score)}))}}),l=new s({id:"99433632-a504-4529-8e11-e9b9d56ec532",name:"Intellect",desc:["Intellect = Brains","Intellect is the amount of Experience that is earned automatically for each game session that you survive."],formula:e=>{e.props.intellect.score=e.traits.brains.score}}),m=new s({id:"58641270-0e30-4ca9-9986-7c9da1cc4d28",name:"Luck",desc:["Luck = Demeanor","Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.","You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.","You regain 1 spent Luck Point at dawn each day.","• Re-roll the last die you rolled with a +6 bonus.","• Take an extra Action on your turn.","• Give a Luck point to a Comrade."],formula:e=>{e.props.luck.score=e.traits.demeanor.score,e.props.luck.current=e.traits.demeanor.score}}),p=new s({id:"59f47468-200a-45ab-b8ca-a3cfa78ab1f8",name:"Psyche",desc:["Psyche = Demeanor x 3","This is a measure of how much Trauma you can withstand.","Any number of horrible events can cause Trauma.","When Trauma = [Demeanor x 3] you lose all hope and seek out death at the earliest opportunity.","Someone must protect you from yourself until you have Recovered from at least 1 Trauma."],formula:e=>{e.props.psyche.score=3*e.traits.demeanor.score,e.props.psyche.current=3*e.traits.demeanor.score}}),f=new s({id:"c7081a3e-1fed-41ee-81a4-2b2fab4942e8",name:"Speed",desc:["Speed = Agility x 3","Roll this Property against all other participants at the beginning of each round of combat to determine the order in which turns are resolved.","This is also the number of yards you can Walk as 1 Action.","When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day."],formula:e=>{e.props.speed.score=3*e.traits.agility.score}});export{n as A,t as B,c as C,i as D,d as E,u as H,l as I,m as L,r as M,p as P,f as S};