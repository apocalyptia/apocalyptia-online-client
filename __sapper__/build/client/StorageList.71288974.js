import{C as e,A as a,P as d,S as s,R as c}from"./SWBodyguard.54177d3a.js";class n extends e{constructor({id:e,name:a,desc:d,sz:s,qty:c,attr:n,cal:i=""}){super({id:e,name:a,desc:d,sz:s,qty:c,attr:n}),this.cal=i}}class i extends a{constructor({id:e,name:a,desc:d,cal:s}){super({id:e,name:a,desc:d}),this.cal=s}}const t=[new n({id:"b157becd-2144-4e55-9e3b-be88089ec6fe",name:"Broadhead Arrow",desc:["Hunting arrow."],sz:.1,cal:"Arrow",attr:[new i({id:"f505bab5-8584-461d-067a-ac0f45cc4eb3",name:"Broadhead",desc:["+1 Damage."],cal:["Arrow"]}),d]}),new n({id:"f05595e3-0e2c-42fb-82b0-2e46dd2fd43f",name:"Target Arrow",desc:["Practice arrow."],sz:.1,cal:"Arrow"})],o=new i({id:"993005af-9d1a-440a-6b22-501ba1eafb28",name:"Hollow Point",desc:["+1 Damage."],cal:[".22","9mm",".357","5.56",".308"]}),r=new n({id:"af1d4448-b795-4340-b1d6-2eeb601eeea7",name:".22 Hollow Point",desc:["Self-defense ammunition."],sz:.005,cal:".22",attr:[o]}),f=new i({id:"b45dcd31-3da4-45a9-1bbf-f9132373bcf8",name:"Match",desc:["+1 Ranged Attack."],cal:[".22","9mm",".357","5.56",".308"]}),m=[r,new n({id:"abcff657-e505-4981-ad07-8a4d5ff0fcee",name:".22 Match",desc:["Competition-grade ammunition."],sz:.005,cal:".22",attr:[f]}),new n({id:"4c09000b-23fd-4085-a49f-d16f14367ea0",name:".22 Standard",desc:["Basic ammunition."],sz:.005,cal:".22"})],l=[new n({id:"2ae93589-3bd7-4abf-a6a1-153bd1b4e7ed",name:"9mm Hollow Point",desc:["Self-defense ammunition."],sz:.01,cal:"9mm",attr:[o]}),new n({id:"dcfa9f26-6c02-4646-b369-ff8ba26246da",name:"9mm Match",desc:["Competition-grade ammunition."],sz:.01,cal:"9mm",attr:[f]}),new n({id:"552009c4-d6a9-4287-ac4f-598014adbbba",name:"9mm Standard",desc:["Basic ammunition."],sz:.01,cal:"9mm"})],b=[new n({id:"798c6783-f44b-447f-9f9b-8332bd4ab74e",name:".357 Hollow Point",desc:["Self-defense ammunition."],sz:.01,cal:".357",attr:[o]}),new n({id:"4266c19a-2978-4d12-88b9-d05ef59c9620",name:".357 Standard",desc:["Basic ammunition."],sz:.01,cal:".357"})],w=[new n({id:"c911b821-137b-4e08-8685-84d82c854b69",name:"5.56mm Armor Piercing",desc:["Battlefield ammunition."],sz:.02,cal:"5.56",attr:[d]}),new n({id:"f6f0b22f-df8c-4604-ae1e-1f381ea60e4a",name:"5.56mm Hollow Point",desc:["Self-defense ammunition."],sz:.02,cal:"5.56",attr:[o]}),new n({id:"5bd2b42f-78bb-4b7a-a4c1-86ba01caddd0",name:"5.56mm Match",desc:["Competition-grade ammunition."],sz:.02,cal:"5.56",attr:[f]}),new n({id:"2e3ef39f-b6f8-4d79-b2f6-a73186f0fa6c",name:"5.56mm Standard",desc:["Basic ammunition."],sz:.02,cal:"5.56"})],z=[new n({id:"08f1864b-66cf-4d61-be54-4139b4242c02",name:".308 Armor Piercing",desc:["Battlefield ammunition."],sz:.02,cal:".308",attr:[d]}),new n({id:"d9ef6e71-5f4c-4372-a1fb-70ad48637276",name:".308 Hollow Point",desc:["Self-defense ammunition."],sz:.02,cal:".308",attr:[o]}),new n({id:"fd9887fc-ffa3-4d7d-9984-f9d18eeaa0bf",name:".308 Match",desc:["Competition-grade ammunition."],sz:.02,cal:".308",attr:[f]}),new n({id:"ee9e5c28-98bd-4dcd-b531-a0dc2086f551",name:".308 Standard",desc:["Basic ammunition."],sz:.02,cal:".308"})],u=[new n({id:"facd4679-38bc-4a4d-9da9-8dda5d569094",name:"12g Buckshot",desc:["Scatter-shot ammunition."],sz:.05,cal:"12g",attr:[s]}),new n({id:"3d42c43d-4507-4c35-9bcf-88fee3cdb943",name:"12g Slug",desc:["Single-projectile ammunition."],sz:.05,cal:"12g",attr:[new i({id:"0563870a-9302-4825-579c-c28cfb478c90",name:"Slug",desc:["Range x2."],cal:["12g"]})]})];class g extends e{constructor({name:e,desc:a,sz:d,qty:s,attr:c,dr:n,loc:i}){super({name:e,desc:a,sz:d,qty:s,attr:c}),this.dr=n,this.loc=i}}const h=new g({id:"d6861b08-b92a-468d-a929-410c130b2a2d",name:"Athletic Helmet",sz:2,dr:1,loc:"Head"}),p=new g({id:"799b9afa-d54b-4c9e-9cf8-f498be18b1c0",name:"Athletic Pads",sz:2,dr:1,loc:"Torso"});class y extends a{constructor({id:e,name:a,desc:d}){super({id:e,name:a,desc:d})}}const S=new y({id:"e492e043-fcc0-49ed-262f-01b4c60208ad",name:"Camo",desc:["+1 Stealth per Body Part when in a given Biome."]}),v=new y({id:"a9c9954a-2803-45d0-4a65-257a521db481",name:"Fire Resistance",desc:["Armor Damage Resistance reduces Fire Damage."]}),P=new g({id:"6b26c241-5fef-463f-bfc6-cadab2281711",name:"Combat Helmet",sz:2,dr:3,loc:"Head",attr:[S,v]}),k=new y({id:"f2fa3f07-b7ac-4c7b-fb22-2baf6f39f8cb",name:"Cold Resistance",desc:["Delay Hypothermia for 1hr per Body Part."]}),C=new g({id:"71ede3ad-c8a7-4556-86f1-c4037244757e",name:"Coveralls",sz:3,dr:1,loc:"Arms, Torso, Legs",attr:[S,k]}),H=new y({id:"5bd4ae85-eeaf-4031-8a8c-e0e712f6a236",name:"Mask",desc:["Obscures identity and protects face. -1 Perception."]}),B=new g({id:"eefc5c02-3139-42cd-b5f9-fe055a915098",name:"Firefighter Suit",sz:5,dr:2,loc:"Full Body",attr:[k,v,H]}),A=(new g({id:"31e3f366-1adf-4141-912d-0664c5644430",name:"Flak Jacket",sz:4,dr:2,loc:"Torso",attr:[S]}),new g({id:"6ec3af0b-27c8-4dde-b8b5-05a51633241b",name:"Ghillie Suit",sz:4,dr:1,loc:"Full Body",attr:[S,k]})),M=new g({id:"6f6e31ff-67fa-4d25-9652-8541c3fabc0c",name:"Hazmat Suit",sz:2,dr:0,loc:"Full Body",attr:[new y({id:"cc89a67e-746f-48db-2466-c5f2d6bf5378",name:"Impermeable",desc:["Automatic Success to resist exposure to Diseases and Toxins."]}),H]}),x=new g({id:"5cd1e496-431f-4eff-bd34-5e2b74ef06e9",name:"Hiking Boots",sz:2,dr:1,loc:"Legs",attr:[k,v]}),T=new g({id:"a4d0d99a-3546-4805-912c-4ffb2fbe0c85",name:"Kevlar Vest",sz:4,dr:3,loc:"Torso",attr:[k,v]}),R=new g({id:"cf560d38-9a41-40c8-9f14-f7839a3ecf82",name:"Leather Jacket",sz:2,dr:1,loc:"Arms, Torso"}),F=new g({id:"9b54d7fd-c70c-4b97-b471-eff6477622d3",name:"Motorcycle Helmet",sz:2,dr:1,loc:"Head",attr:[v,H]}),D=new g({id:"6734c9c6-d9b0-4e3d-b455-6db395645014",name:"Plate Carrier",sz:4,dr:4,loc:"Torso",attr:[S,k,v]}),q=new g({id:"102e1133-3242-4a89-9658-e58aa5636e45",name:"Winter Coat",sz:2,dr:1,loc:"Arms, Torso",attr:[k]}),L=new g({id:"05dbfaf0-40aa-498e-a19e-d57bcdd1d6b7",name:"Work Gloves",sz:1,dr:1,loc:"Arms",attr:[v]});class G extends c{constructor({id:e,name:a,desc:d,sz:s,qty:c=0}){super({id:e,name:a,desc:d}),this.sz=s,this.qty=c}}class I extends G{constructor({id:e,name:a,desc:d,sz:s,qty:c}){super({id:e,name:a,desc:d,sz:s,qty:c})}}const W=new I({id:"0bd4e81f-184a-4022-ca40-ffb1b8ecc59f",name:"Bilingual Dictionary",desc:["Multilingual Ability"],sz:1}),E=new I({id:"3355f314-57f5-4875-4496-d1e80a89bec2",name:"Body in Balance",desc:["+1 Athletics"],sz:1}),N=new I({id:"b8734117-d386-4a48-4547-d64733cabcd7",name:"Tao of Jeet Kune Do",desc:["+1 Melee"],sz:1}),J=new I({id:"a6c2892a-0afb-483a-83af-0d42856070dc",name:"Classic Novel",desc:["+1 Psyche"],sz:1}),K=new I({id:"0e75fc4b-6a94-4126-01ef-98de7833bbd9",name:"Brief History of Time",desc:["+1 Science"],sz:1}),U=new I({id:"a6c2892a-0afb-483a-83af-0d42856070dc",name:"Defensive Driving",desc:["+1 Drive"],sz:1}),j=new I({id:"a6c2892a-0afb-483a-83af-0d42856070dc",name:"Dog Tricks",desc:["+1 Tame"],sz:1}),O=new I({id:"a6c2892a-0afb-483a-83af-0d42856070dc",name:"Effective Habits",desc:["+1 to any one Skill"],sz:1}),V=new I({id:"1473e9cc-aa60-432d-c963-706f6027ec3a",name:"Engineering Concepts",desc:["+1 Build"],sz:1}),Y=new I({id:"631c4ab8-e6ed-4b03-58f2-5a18e367f0a2",name:"Gray's Anatomy",desc:["+1 Medicine"],sz:1}),Z=new I({id:"0d34f869-b076-48d0-39f3-9d7d01949df7",name:"Holy Book",desc:["-1 Psyche"],sz:1}),Q=new I({id:"53f6c3b9-8df8-4374-057c-3a38973a49fc",name:"Home Security",desc:["+1 Larceny"],sz:1}),X=new I({id:"4f22c946-4376-4006-9f07-6a9294b89bcf",name:"How to Win Friends",desc:["+1 Socialize"],sz:1}),$=new I({id:"c2e1dfd4-d5dd-4149-a6fc-d696179ae9d2",name:"How Yoga Works",desc:["+1 Acrobatics"],sz:1}),_=new I({id:"aae544a7-01c8-4f98-bc38-34b6332b1868",name:"Leadership Basics",desc:["+1 Leadership"],sz:1}),ee=new I({id:"aada7d2a-381d-4988-d915-81ce5f595d2d",name:"Map (Atlas)",desc:["+1 Survival(Navigate)"],sz:1}),ae=new I({id:"b3c55045-16de-4193-4196-5681db54e755",name:"Map (Local)",desc:["+1 Survival(Navigate) in a given Region."],sz:0}),de=new I({id:"5e0e17b4-8771-44e2-607d-d16754fce17d",name:"Map (Topographic)",desc:["+3 Survival(Navigate) in a given Region."],sz:0}),se=new I({id:"8bce5059-df27-43be-aacd-94e5685fe537",name:"Personal Defense",desc:["+1 Ranged"],sz:1}),ce=new I({id:"1bad72d4-a758-473e-d1bf-f52a200a5f5a",name:"SAS Survival Guide",desc:["+1 Survival"],sz:1}),ne=new I({id:"d6b2ddeb-7033-4530-4c57-0d71b099785a",name:"Stand-up Comedy",desc:["+1 Entertain"],sz:1}),ie=new I({id:"ac4656eb-0903-4f60-f323-83a1c63f84e6",name:"Yellow Pages",desc:["+1 Scavenging in a given Region."],sz:1}),te=new I({id:"2c017ecd-b770-4704-4a16-7a3037a82d49",name:"Zen Mind",desc:["+1 Perception"],sz:1}),oe=[W,E,N,J,K,J,U,j,O,V,Y,Z,Q,X,$,_,ee,ae,de,se,ce,ne,ie,te];class re extends G{constructor({id:e,name:a,desc:d,sz:s,qty:c,mix:n,od:i}){super({id:e,name:a,desc:d,sz:s,qty:c}),this.mix=n,this.od=i}}const fe=new re({id:"de0dd5f5-8630-4827-121d-e39fc099a9ab",name:"Alcohol",desc:["Can be used as an Antibiotic or Fuel.","C9# or Unstable."],sz:1,mix:9,od:!0}),me=new re({id:"5d0b08ad-11c0-490d-00ca-6a8bbeb3b4fa",name:"Antibiotic",desc:["Prevents infection in Recovery for 1 day."],sz:0,mix:12,od:!1}),le=new re({id:"462f38ee-ef66-4f76-9110-95802de92a6b",name:"Hallucinogen",desc:["+1 Perform and Tame, -3 to all other rolls, and -1 Psyche."],sz:0,mix:15,od:!1}),be=new re({id:"c9be0c61-4165-45eb-5460-995a546e1e6f",name:"Painkiller",desc:["Ignore 1 Pain penalty."],sz:0,mix:9,od:!0}),we=new re({id:"4fb51505-52ff-45a1-5b73-129aabc09b83",name:"Sedative",desc:["Demeanor#6/round to take any action."],sz:0,mix:12,od:!0}),ze=new re({id:"e124e538-8a31-4ed3-442e-06c040e353ce",name:"Stimulant",desc:["Ignore Exhaustion penalties for 6hrs."],sz:0,mix:9,od:!0}),ue=[fe,me,le,be,we,ze];class ge extends G{constructor({id:e,name:a,hrs:d,desc:s,sz:c,qty:n}){super({id:e,name:a,desc:s,sz:c,qty:n}),this.hrs=d}}const he=new ge({id:"fdf4711d-ccc0-4a37-3808-f3334c827c30",name:"Cellphone",desc:["1yd light, camera, remote control."],sz:1,hrs:3}),pe=new ge({id:"6914f941-5c30-48b4-f4ca-131e39075fb3",name:"Emergency Radio",desc:["AM/FM/Shortwave.","1yd light."],sz:1,hrs:6}),ye=new ge({id:"100f3da0-5b60-4a73-b828-0009c2702bf0",name:"Flashlight",desc:["10yd light. -3 Ranged Attack to Blind 1 round."],sz:1,hrs:3}),Se=new ge({id:"0b857eb3-3aea-44b4-34a2-93f578870af4",name:"Geiger Counter",desc:["Science 6# to detect Radiation in 1yd."],sz:2,hrs:24}),ve=new ge({id:"6aa47c61-a2f3-472a-f9c6-d6fedc08aefc",name:"Hand Radio",desc:["9-channel 2-way radio.","3 mile range."],sz:1,hrs:9}),Pe=new ge({id:"7374fe66-3389-407c-20cc-3b8c53fd8a7a",name:"Headlamp",desc:["3yd light. Hands free."],sz:0,hrs:3}),ke=new ge({id:"c25dadce-1873-4bd0-4da5-a5675504fe46",name:"Lantern",desc:["3yd light radius."],sz:2,hrs:6}),Ce=new ge({id:"5e242eff-66c8-41d6-1350-28071590b956",name:"Megaphone",desc:["+1 Leadership when speaking to a crowd."],sz:2,hrs:12}),He=new ge({id:"53ffeb0d-4324-437f-e06e-19b84ca2acc0",name:"Multimeter",desc:["+3 Science(Technology).","Detects voltage, battery life, and closed circuits."],sz:1,hrs:48}),Be=new ge({id:"c2506a47-bbf1-45e0-daa9-297af21a11ea",name:"Nightvision Goggles",desc:["Ignore Visibility penalties in darkness."],sz:1,hrs:36}),Ae=new ge({id:"b8de49bf-83d7-4d99-554a-bdf378b0672e",name:"Quadcopter Drone",desc:["Science 6# to use.","Onboard camera.","90yd Speed."],sz:2,hrs:.25}),Me=new ge({id:"d7cb8c39-edbf-4dba-180f-f5a90c8a3c2c",name:"RC Car",desc:["Science 3# to use.","45yd Speed."],sz:3,hrs:.5}),xe=new ge({id:"aa480ec7-9df9-4011-ff78-d4b34567c144",name:"Solar Lamp",desc:["1yd light radius.","1 day charge."],sz:1,hrs:9}),Te=new ge({id:"addf59b3-5134-4a92-770c-564f831ac30b",name:"Stun Gun",desc:["Melee Attack.","C9# or Stun next round."],sz:1,hrs:.1}),Re=[he,pe,ye,Se,ve,Pe,ke,Ce,He,Be,Ae,Me,xe,Te];class Fe extends G{constructor({id:e,name:a,desc:d,sz:s,qty:c}){super({id:e,name:a,desc:d,sz:s,qty:c})}}const De=[new Fe({id:"3227f45d-6091-4d3f-c6b3-9ad65810be80",name:"Air Horn",desc:["Emits a loud shriek up to a 1 mile radius."],sz:1}),new Fe({id:"b368d8c5-e9f7-4c65-efba-60146a39be78",name:"Bicycle",desc:["Athletics 3#.","Speed x3yds (x.7mph).","2h."],sz:8}),new Fe({id:"20b85479-d079-4fc0-44e1-dd3fd989850d",name:"Binoculars",desc:["+3 Perception(See) at 50+yds."],sz:1}),new Fe({id:"888116f7-35ad-4822-7a05-2ec1607a27a1",name:"Cage Trap",desc:["+3 Survival(Forage).","Takes 1day."],sz:6}),new Fe({id:"3c1ae77d-8b52-452a-01a1-68aa5a6be931",name:"Candle",desc:["1yd light radius for 6hrs."],sz:0}),new Fe({id:"57d01f7d-b16c-4e1a-2628-8b0d63b030cd",name:"Candy",desc:["Restores 1 Luck point.","1/day."],sz:0}),new Fe({id:"cb6ca246-f672-499c-ac06-64f36b70d559",name:"Chalk",desc:["Used to temporarily write on any surface."],sz:0}),new Fe({id:"af94f8fc-afed-489c-dafd-3e342c06a2af",name:"Compass",desc:["+3 Survival(Navigate).","Always points North."],sz:0}),new Fe({id:"286804f0-6e15-4522-f705-228d37aefb2e",name:"Egg Timer",desc:["Set up to 60mins.","Loud ringing for 1min."],sz:1}),new Fe({id:"97ab1837-f6ba-447f-e527-9390cea6b780",name:"Fire-stick",desc:["+3 Survival(Camp).","Magnesium rod and steel."],sz:0}),new Fe({id:"b3d467fc-fb21-43ff-8c28-036596dee4dc",name:"Fishing Pole",desc:["+1 Survival(Forage) at river, lake, or ocean."],sz:2}),new Fe({id:"5821a2de-279f-483d-876c-b3635e4d4df3",name:"Flare Gun",desc:["Pistol.","Range:3.","Ammo: 12g Flares or 1 use 12g."],sz:1}),new Fe({id:"d12c1c96-ac98-4208-f602-0867e5e3bb23",name:"Grappling Hook",desc:["+3 Athletics(Climb and Rappel).","Holds 100Sz."],sz:2}),new Fe({id:"4486f872-8456-4d18-95d5-629dcbff3f40",name:"Hammock",desc:["Suspended sleeping device for 1 person."],sz:1}),new Fe({id:"f5393228-3433-4ba1-6aee-4e0a17b276d7",name:"Lighter",desc:["Makes a small fire.","1yd radius light."],sz:0}),new Fe({id:"c62ac23d-b60d-4bbc-7b1e-cb7de1db5f9c",name:"Luxury Item",desc:["Toilet paper, cigarette, etc.","+1 Psyche 1/wk."],sz:0}),new Fe({id:"a1933da2-1353-41ff-a303-67239f26c39e",name:"Marbles",desc:["30/bag.","2sqyd area.","A12# or fall Prone."],sz:1}),new Fe({id:"20ba8a90-aae0-480d-588c-c42e73ad07c3",name:"Marker",desc:["Used to permanently write on any surface."],sz:0}),new Fe({id:"3c615dc7-8c73-4384-4ad3-07fa991cb899",name:"Matchbook",desc:["+1 Survival(Camp).","1yd light radius, 3 rounds."],sz:0}),new Fe({id:"9a1ed4f3-3845-43a1-e114-c19fd37e7085",name:"Monocular",desc:["+1 Perception(See) at 25+yds."],sz:1}),new Fe({id:"901a5d7e-8731-46d1-5597-7511b52118ab",name:"Musical Instrument",desc:["+1 Entertain(Distract and Inspire)."],sz:1}),new Fe({id:"a3ec02d2-f62b-4854-7122-af87d17303aa",name:"Mylar Blanket",desc:["Cold Resistance.","1yd x 2yd reflective foil sheet."],sz:0}),new Fe({id:"edcd3449-6b01-4e47-fef5-2e65359176ec",name:"Notebook",desc:["100 pages of paper with a wire binding."],sz:1}),new Fe({id:"3036a514-0773-4bbe-99ab-37e73ae37adb",name:"Padlock",desc:["2 Damage Resistance.","Larceny(Disable) 9#."],sz:1}),new Fe({id:"db7dc950-2272-4619-d84c-0794e4ab6181",name:"Paracord",desc:["60yd coil.","Holds 50Sz."],sz:1}),new Fe({id:"bc0af616-f2b7-46fe-7c40-c248950c436a",name:"Pepper Spray",desc:["+3 Ranged(Shoot) with this weapon.","Range:1.","Successful Called Shot: Head causes 6 Pain.","Takes 1 round for Pain to start.","Pain lasts for d6x5 minutes.","3 uses.","Toxin."],sz:0}),new Fe({id:"b61d42d4-cce8-4da4-6eae-930f7a7da673",name:"Pocket Mirror",desc:["Perception(See) 6# to see from behind Cover."],sz:0}),new Fe({id:"7f17fc95-3e41-4720-78e7-43caff07d751",name:"Rat Trap",desc:["+1 Survival(Forage).","Takes 1day."],sz:1}),new Fe({id:"0d1618d3-a749-453a-7142-8ad0baada784",name:"Road Flare",desc:["3 Fire Damage.","10yd light radius for 20mins."],sz:1}),new Fe({id:"48af2ad2-8313-454e-866e-21ddd60e6c42",name:"Rope",desc:["30yd nylon coil.","Holds 100Sz.","Survival 6# to use as Handcuffs."],sz:2}),new Fe({id:"eda75200-b159-42b6-4029-6dba3d392127",name:"Skateboard",desc:["Athletics 6#.","Speed x3.","Fail:Prone."],sz:3}),new Fe({id:"1d32992c-02d3-4739-4a92-0714018ff743",name:"Sleeping Bag",desc:["Insulated bag for up to 2 people.","Cold Resistance +3hrs."],sz:3}),new Fe({id:"6f65efe9-f547-4ee4-2fea-1f1c5be8ad69",name:"Spotting Scope",desc:["+6 Perception(See) at 100+yds."],sz:2}),new Fe({id:"2d517256-6dea-42ed-1040-48247b6f4b4d",name:"Tarp",desc:["3yd x 3yd plastic sheet.","Cold Resistance.","Waterproof."],sz:1}),new Fe({id:"68073937-9618-405f-b4c5-5b80a08bde6f",name:"Tent",desc:["4 person.","5min setup/take-down.","Cold Resistance +3hrs."],sz:6}),new Fe({id:"1935e1a4-76d6-4de0-02bc-9583cf974c1a",name:"Whetstone",desc:["Blade gets +1 Damage for 1day.","Takes 1hr/blade."],sz:1}),new Fe({id:"18888c68-ef39-4613-9e2d-f600cc7d000b",name:"Whistle",desc:["+1 Tame(Train).","Loud shriek 500yd radius."],sz:0}),new Fe({id:"3d9a0750-5858-41da-b103-99f5a31130bb",name:"Zip Tie",desc:["Place on Arms behind target's back to make them Harmless.","Place on Legs to make target Immobilized.","Constitution or Acrobatics 12# to escape.","Use for +1 Build."],sz:0})];class qe extends G{constructor({id:e,name:a,desc:d,sz:s,qty:c}){super({id:e,name:a,desc:d,sz:s,qty:c})}}const Le=new qe({id:"d886320f-a3b9-4576-9ad9-aa882e5544e3",name:"Bandage",desc:["+1 Medicine(First-Aid).","1 use."],sz:0}),Ge=new qe({id:"9d4b5d7f-59fd-4a9f-a7f1-59c60f4a8dc3",name:"Crutch",desc:["Halves Leg Damage Pain penalty to Speed."],sz:3}),Ie=new qe({id:"a2fa2383-c6fe-4569-961e-09fc9f537403",name:"EMT Bag",desc:["+3 Medicine(First-Aid).","30 uses."],sz:5}),We=new qe({id:"a6a66459-d98c-4d2a-cd5d-a76a83b229d2",name:"First-Aid Kit",desc:["+1 Medicine(First-Aid).","5 uses."],sz:1}),Ee=new qe({id:"7a5e1d36-e88e-4c93-4d1c-537ba80119bb",name:"Pressure Cuff",desc:["+1 Medicine."],sz:1}),Ne=new qe({id:"a76f880c-da27-401f-4463-5a16f58a0799",name:"Stethoscope",desc:["+1 Medicine.","Perception(Hear) 6# through doors."],sz:1}),Je=new qe({id:"5c63537c-9b70-44cb-9244-911da739b03d",name:"Surgery Kit",desc:["+3 Medicine(Surgery)."],sz:3}),Ke=new qe({id:"5c84cf80-cb41-40da-0d0d-f0ea70566ee0",name:"Thermometer",desc:["+1 Medicine.","Accurately reads temperature."],sz:0}),Ue=new qe({id:"4cccec0d-4732-4421-dec9-12fd84a54611",name:"Transfusion Kit",desc:["Medicine 9#.","Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.","Takes 1hr."],sz:1}),je=new qe({id:"d055db56-81db-4cfe-f709-85f8de83586a",name:"Water Filter",desc:["Purifies 1 Water ration (.5gal) per minute."],sz:1}),Oe=[Le,Ge,Ie,We,Ee,Ne,Je,Ke,Ue,je];class Ve extends G{constructor({id:e,name:a,desc:d,sz:s,qty:c,slots:n}){super({id:e,name:a,desc:d,sz:s,qty:c}),this.slots=n}}const Ye=new Ve({id:"7caea7f9-2dd6-4a98-8d6c-899d66e734e7",name:"Backpack",desc:["2 rounds to access."],sz:1,slots:30}),Ze=new Ve({id:"ddb41f64-a0fa-43e8-a4cc-60eb2932e82b",name:"Bandoleer",desc:["Holds 50 bullets of any caliber."],sz:0,slots:1}),Qe=new Ve({id:"4288e7a8-01c0-49aa-8093-0bfaad3f9011",name:"BDU Jacket",desc:["Camo."],sz:0,slots:4}),Xe=new Ve({id:"5120d13e-d85d-4f58-a74e-e9a1d2d5c4c2",name:"Cargo Pants",desc:["Camo."],sz:1,slots:6}),$e=new Ve({id:"a61e20a4-89c8-438e-b483-9da4de93d112",name:"Canteen",desc:["Holds 1 unit (.5gal) of liquid.","Metal."],sz:1,slots:1}),_e=new Ve({id:"4796d7d9-15ad-4d4f-9e5c-f85944a9de41",name:"Concealed Holster",desc:["Perception 12# to spot a Size 1 Gun."],sz:0,slots:1}),ea=new Ve({id:"3305d4c0-1049-48fd-a478-76f487280f71",name:"Cooler",desc:["Hunted or Foraged Food lasts 6 days."],sz:4,slots:30}),aa=new Ve({id:"8b2feee5-b9c9-4a0e-9e9b-c4971de669c3",name:"Duffel Bag",desc:["2 rounds to access."],sz:3,slots:40}),da=new Ve({id:"42db67a0-e9a1-44fe-99ba-e5c62a986bec",name:"Fuel Can",desc:["5gal Fuel.","d6 Fire Damage/gal, 1min, 1yd/gal Blast."],sz:2,slots:5}),sa=new Ve({id:"cf65b23b-706d-438b-b89d-31e4eb8e6329",name:"Hoody",desc:["Cold Resistance."],sz:0,slots:2}),ca=new Ve({id:"5287fe67-386f-43e1-9e65-5be527769990",name:"Hydration Pack",desc:["Holds 4 units (2gal) of liquid."],sz:1,slots:4}),na=new Ve({id:"84a145e0-51b4-423b-bb39-2ef9672a1768",name:"Lockbox",desc:["2 Damage Resistance.","Fire Resistance.","Larceny(Disable) 9#."],sz:2,slots:1}),ia=new Ve({id:"6002e120-8d3c-448a-a6cf-e96a53e9cd5d",name:"Messenger Bag",desc:["1 round to access."],sz:2,slots:4}),ta=new Ve({id:"84943a54-249d-4a6e-b374-c4f4b853003c",name:"Plastic Jug",desc:["Holds 2 units (1gal) of liquid."],sz:1,slots:2}),oa=new Ve({id:"7abdf601-5d37-4d04-9187-6c145f64aa72",name:"Purse",desc:["1 round to access."],sz:1,slots:3}),ra=new Ve({id:"11224942-3b02-412a-a8f5-294ccedd8d15",name:"Speed-loader",desc:["Reload a revolver cylinder as 1 action."],sz:0,slots:0}),fa=new Ve({id:"f82fec74-827a-4ce7-988e-d3f7c4da2aec",name:"Tool Belt",desc:["6x 1 Slots.","+1 Build.","Miscellaneous small tools."],sz:2,slots:6}),ma=new Ve({id:"fbcf0beb-01c5-443d-b86f-69e0a89078e4",name:"Trench Coat",desc:["Cold Resistance.","+1 Stealth."],sz:1,slots:4}),la=new Ve({id:"ce28fa26-8497-4234-b2df-2b0560f8d76b",name:"Water Bottle",desc:["Holds 1 unit (.5gal) of liquid."],sz:1,slots:1}),ba=[Ye,Ze,Qe,Xe,$e,_e,ea,aa,da,sa,ca,na,ia,ta,oa,ra,fa,ma,la];export{me as $,t as A,W as B,P as C,oe as D,Re as E,B as F,A as G,x as H,Q as I,X as J,T as K,m as L,De as M,$ as N,_ as O,D as P,ee as Q,ae as R,ba as S,de as T,se as U,ce as V,q as W,ne as X,ie as Y,te as Z,fe as _,ue as a,le as a0,be as a1,we as a2,ze as a3,he as a4,pe as a5,ye as a6,Se as a7,ve as a8,Pe as a9,da as aA,sa as aB,ca as aC,na as aD,ia as aE,ta as aF,oa as aG,ra as aH,fa as aI,ma as aJ,la as aK,G as aL,ke as aa,Ce as ab,He as ac,Be as ad,Ae as ae,Me as af,xe as ag,Te as ah,Le as ai,Ge as aj,Ie as ak,We as al,Ee as am,Ne as an,Je as ao,Ke as ap,Ue as aq,je as ar,Ye as as,Ze as at,Qe as au,Xe as av,$e as aw,_e as ax,ea as ay,aa as az,Oe as b,l as c,b as d,w as e,z as f,u as g,h,p as i,C as j,S as k,R as l,F as m,M as n,L as o,Fe as p,E as q,N as r,J as s,K as t,U as u,j as v,O as w,V as x,Y as y,Z as z};
