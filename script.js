/* ============================================================
   FRESHOPIA ULTIMATE GAME ENGINE 6.0
   COMPLETE ALL-IN-ONE EDITION
   Anime RPG | Cooking | Sustainability | Rewards
   NO QUIZ SYSTEM
============================================================ */

"use strict";

/* ============================================================
   1. CONFIGURATION
============================================================ */

const GAME_KEY = "freshopiaUltimate6Save";

const CONFIG = {
    maxLevel: 30,
    startCoins: 150,
    startXP: 0,
    maxIngredients: 6,
    orderDuration: 180,
    autosave: 10000,
    dailyReward: 100
};

/* ============================================================
   2. GAME DATA
============================================================ */

const INGREDIENTS = [
    {id:"tomato",name:"Tomato",emoji:"🍅",type:"vegetable"},
    {id:"lettuce",name:"Lettuce",emoji:"🥬",type:"vegetable"},
    {id:"carrot",name:"Carrot",emoji:"🥕",type:"vegetable"},
    {id:"avocado",name:"Avocado",emoji:"🥑",type:"vegetable"},
    {id:"broccoli",name:"Broccoli",emoji:"🥦",type:"vegetable"},
    {id:"mushroom",name:"Mushroom",emoji:"🍄",type:"vegetable"},
    {id:"corn",name:"Corn",emoji:"🌽",type:"vegetable"},
    {id:"pepper",name:"Pepper",emoji:"🫑",type:"vegetable"},
    {id:"apple",name:"Apple",emoji:"🍎",type:"fruit"},
    {id:"strawberry",name:"Strawberry",emoji:"🍓",type:"fruit"},
    {id:"lemon",name:"Lemon",emoji:"🍋",type:"fruit"},
    {id:"banana",name:"Banana",emoji:"🍌",type:"fruit"},
    {id:"rice",name:"Rice",emoji:"🍚",type:"grain"},
    {id:"bread",name:"Wholegrain Bread",emoji:"🍞",type:"grain"},
    {id:"pasta",name:"Pasta",emoji:"🍝",type:"grain"},
    {id:"egg",name:"Egg",emoji:"🥚",type:"protein"},
    {id:"beans",name:"Beans",emoji:"🫘",type:"protein"},
    {id:"milk",name:"Milk",emoji:"🥛",type:"dairy"},
    {id:"cheese",name:"Cheese",emoji:"🧀",type:"dairy"},
    {id:"oliveoil",name:"Olive Oil",emoji:"🫒",type:"fat"}
];

const RECIPES = [
    {
        id:"rainbow",
        name:"Rainbow Salad",
        emoji:"🥗",
        ingredients:["tomato","lettuce","carrot","avocado"],
        level:1,xp:100,coins:35,eco:20,
        difficulty:"Easy"
    },
    {
        id:"greenbowl",
        name:"Green Energy Bowl",
        emoji:"🥑",
        ingredients:["avocado","broccoli","rice","lemon"],
        level:2,xp:130,coins:40,eco:30,
        difficulty:"Easy"
    },
    {
        id:"gardenpasta",
        name:"Garden Pasta",
        emoji:"🍝",
        ingredients:["pasta","tomato","mushroom","oliveoil"],
        level:3,xp:160,coins:50,eco:25,
        difficulty:"Medium"
    },
    {
        id:"protein",
        name:"Protein Toast",
        emoji:"🍞",
        ingredients:["bread","egg","avocado","cheese"],
        level:4,xp:180,coins:55,eco:25,
        difficulty:"Medium"
    },
    {
        id:"fruit",
        name:"Fresh Fruit Dessert",
        emoji:"🍓",
        ingredients:["strawberry","banana","apple","milk"],
        level:5,xp:200,coins:65,eco:40,
        difficulty:"Medium"
    },
    {
        id:"rice",
        name:"Eco Vegetable Rice",
        emoji:"🍚",
        ingredients:["rice","carrot","corn","beans"],
        level:7,xp:250,coins:75,eco:50,
        difficulty:"Hard"
    },
    {
        id:"deluxe",
        name:"Deluxe Chef Plate",
        emoji:"🍽️",
        ingredients:["pasta","tomato","cheese","mushroom","oliveoil"],
        level:10,xp:300,coins:100,eco:45,
        difficulty:"Hard"
    },
    {
        id:"legend",
        name:"Legendary Garden Feast",
        emoji:"👑",
        ingredients:["broccoli","avocado","rice","beans","carrot"],
        level:15,xp:450,coins:150,eco:80,
        difficulty:"Expert"
    },
    {
        id:"champion",
        name:"Freshopia Champion Dish",
        emoji:"🏆",
        ingredients:["tomato","avocado","pasta","egg","broccoli"],
        level:20,xp:600,coins:200,eco:100,
        difficulty:"Legendary"
    }
];

/* ============================================================
   3. PLAYER SYSTEM
============================================================ */

function newPlayer(){
    return {
        nickname:"Chef",
        level:1,
        xp:0,
        coins:CONFIG.startCoins,
        ecoScore:0,

        completedOrders:0,
        failedOrders:0,
        perfectOrders:0,
        wastePrevented:0,

        totalPlayTime:0,
        sessionTime:0,

        badges:[],
        unlockedFeatures:[],
        ownedItems:["default"],
        selectedOutfit:"default",

        dailyCompleted:[],
        dailyDate:"",
        dailyRewardClaimed:false,

        musicEnabled:true,
        soundEnabled:true,
        voiceEnabled:true,

        avatar:"👩‍🍳",
        started:false
    };
}

function loadPlayer(){
    try{
        const data=JSON.parse(localStorage.getItem(GAME_KEY));
        return data ? {...newPlayer(),...data} : newPlayer();
    }catch(e){
        return newPlayer();
    }
}

let player=loadPlayer();

/* ============================================================
   4. GAME STATE
============================================================ */

let currentRecipe=null;
let selectedIngredients=[];
let remainingTime=CONFIG.orderDuration;

let gameTimer=null;
let sessionTimer=null;

let audioContext=null;
let musicInterval=null;
let musicNodes=[];
let musicStarted=false;

/* ============================================================
   5. LEVEL SYSTEM
============================================================ */

function requiredXP(level){
    return 250+(level-1)*150;
}

const LEVEL_REWARDS=[
    {level:2,name:"Kitchen Tools",description:"New cooking tools unlocked."},
    {level:3,name:"Recipe Collection",description:"More recipes unlocked."},
    {level:4,name:"Eco Kitchen",description:"Special eco missions unlocked."},
    {level:5,name:"Mika Pink Outfit",description:"A special character outfit unlocked."},
    {level:7,name:"Restaurant Expansion",description:"New restaurant missions unlocked."},
    {level:10,name:"Master Chef",description:"Master Chef challenges unlocked."},
    {level:12,name:"Golden Kitchen",description:"Premium kitchen features unlocked."},
    {level:15,name:"Legendary Recipes",description:"Legendary recipes unlocked."},
    {level:20,name:"Champion Restaurant",description:"Champion restaurant unlocked."},
    {level:25,name:"Royal Chef",description:"Royal character outfit unlocked."},
    {level:30,name:"Freshopia Legend",description:"Ultimate achievement unlocked."}
];

function addXP(amount){
    player.xp+=amount;

    while(
        player.xp>=requiredXP(player.level)&&
        player.level<CONFIG.maxLevel
    ){
        player.xp-=requiredXP(player.level);
        player.level++;
        levelUp();
    }

    updateStats();
}

function levelUp(){
    const bonus=player.level*30;
    player.coins+=bonus;

    const reward=LEVEL_REWARDS.find(r=>r.level===player.level);

    if(reward&&!player.unlockedFeatures.includes(reward.name)){
        player.unlockedFeatures.push(reward.name);
    }

    showLevelUp(player.level,bonus,reward);

    checkBadges();
    renderAll();
}

function showLevelUp(level,bonus,reward){
    const modal=document.getElementById("levelModal");

    if(modal){
        modal.hidden=false;
        modal.classList.add("active");

        const title=modal.querySelector("h2");
        const text=modal.querySelector("p");

        if(title)title.textContent=`LEVEL ${level}!`;
        if(text)text.textContent=
            `Mika is proud of you! +${bonus} Coins! ${
                reward?reward.description:"New level achieved!"
            }`;
    }

    mikaSpeak(`Amazing! You reached level ${level}!`);
    soundEffect("level");
}

/* ============================================================
   6. ANIME CHARACTER MIKA
============================================================ */

const MIKA_MESSAGES={
    welcome:[
        "Welcome back, Chef! Let's make Freshopia amazing!",
        "Ready for a new cooking adventure?",
        "Let's cook, earn rewards and save food!"
    ],
    success:[
        "Perfect! You're an amazing chef!",
        "That looks delicious!",
        "Wonderful work! I'm proud of you!",
        "Another beautiful dish completed!"
    ],
    failure:[
        "Don't worry! Let's try again!",
        "Every great chef makes mistakes!",
        "We can do better together!"
    ],
    eco:[
        "Amazing! You're protecting our planet!",
        "Less waste, more happiness!",
        "You're a true Eco Hero!"
    ]
};

function mikaMessage(message){
    const el=document.getElementById("mikaMessage");
    if(el)el.textContent=message;

    const avatar=document.getElementById("mikaCharacter");

    if(avatar){
        avatar.classList.remove("mika-excited");
        void avatar.offsetWidth;
        avatar.classList.add("mika-excited");
    }
}

function mikaSpeak(message){
    mikaMessage(message);

    if(
        !player.voiceEnabled||
        !("speechSynthesis" in window)
    )return;

    speechSynthesis.cancel();

    const speech=new SpeechSynthesisUtterance(message);
    speech.lang="en-US";
    speech.pitch=1.4;
    speech.rate=1;
    speech.volume=0.9;

    const voice=speechSynthesis.getVoices()
        .find(v=>v.lang.startsWith("en"));

    if(voice)speech.voice=voice;

    speechSynthesis.speak(speech);
}

function randomMika(type){
    const messages=MIKA_MESSAGES[type];
    if(messages)mikaSpeak(messages[Math.floor(Math.random()*messages.length)]);
}

function changeAvatar(avatar){
    player.avatar=avatar;

    const el=document.getElementById("mikaCharacter");
    if(el)el.textContent=avatar;

    saveGame();
}

function repeatMika(){
    const el=document.getElementById("mikaMessage");
    mikaSpeak(el?.textContent||"Welcome to Freshopia!");
}

/* ============================================================
   7. SOUND SYSTEM
============================================================ */

function initializeAudio(){
    if(musicStarted)return;

    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;

    audioContext=new AC();
    musicStarted=true;

    if(audioContext.state==="suspended")audioContext.resume();

    if(player.musicEnabled)startMusic();
}

function soundEffect(type="click"){
    if(!player.soundEnabled||!audioContext)return;

    const patterns={
        click:[440],
        success:[523,659,784],
        level:[523,659,784,1046],
        reward:[659,784,988],
        error:[220,180]
    };

    const notes=patterns[type]||patterns.click;

    notes.forEach((frequency,index)=>{
        setTimeout(()=>{
            if(!audioContext)return;

            const osc=audioContext.createOscillator();
            const gain=audioContext.createGain();

            osc.frequency.value=frequency;
            osc.type="sine";

            gain.gain.setValueAtTime(.08,audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                .001,audioContext.currentTime+.2
            );

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime+.2);
        },index*120);
    });
}

function startMusic(){
    if(!audioContext||musicNodes.length)return;

    const notes=[261.63,329.63,392,440,392,329.63];

    notes.forEach(freq=>{
        const osc=audioContext.createOscillator();
        const gain=audioContext.createGain();

        osc.type="sine";
        osc.frequency.value=freq;
        gain.gain.value=.004;

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        musicNodes.push({osc,gain});
    });

    let index=0;

    musicInterval=setInterval(()=>{
        if(!player.musicEnabled||!audioContext)return;

        musicNodes.forEach(node=>{
            node.gain.gain.setTargetAtTime(
                .002,audioContext.currentTime,.1
            );
        });

        const selected=musicNodes[index%musicNodes.length];

        selected.gain.gain.setTargetAtTime(
            .018,audioContext.currentTime,.1
        );

        index++;
    },450);
}

function stopMusic(){
    clearInterval(musicInterval);
    musicInterval=null;

    musicNodes.forEach(node=>{
        try{node.osc.stop();}catch(e){}
    });

    musicNodes=[];
}

function toggleMusic(){
    player.musicEnabled=!player.musicEnabled;

    if(player.musicEnabled){
        initializeAudio();
        startMusic();
    }else{
        stopMusic();
    }

    updateSettings();
    saveGame();
}

function toggleSound(){
    player.soundEnabled=!player.soundEnabled;
    updateSettings();
    saveGame();
}

function toggleVoice(){
    player.voiceEnabled=!player.voiceEnabled;

    if(!player.voiceEnabled&&"speechSynthesis"in window){
        speechSynthesis.cancel();
    }

    updateSettings();
    saveGame();
}

/* ============================================================
   8. INGREDIENT SYSTEM
============================================================ */

function renderIngredients(){
    const grid=document.getElementById("ingredientGrid");
    if(!grid)return;

    grid.innerHTML="";

    INGREDIENTS.forEach(item=>{
        const btn=document.createElement("button");

        btn.type="button";
        btn.className="ingredient-card";

        if(selectedIngredients.includes(item.id)){
            btn.classList.add("selected");
        }

        btn.innerHTML=`
            <span class="ingredient-emoji">${item.emoji}</span>
            <span>${item.name}</span>
        `;

        btn.addEventListener("click",()=>selectIngredient(item.id));

        grid.appendChild(btn);
    });
}

function selectIngredient(id){
    if(!player.started||!currentRecipe){
        setText("feedback","Start the game first!");
        return;
    }

    if(selectedIngredients.includes(id)){
        selectedIngredients=selectedIngredients.filter(x=>x!==id);
    }else if(selectedIngredients.length<CONFIG.maxIngredients){
        selectedIngredients.push(id);
    }else{
        setText("feedback","Maximum ingredient limit reached!");
    }

    renderIngredients();
    soundEffect("click");
}

function clearIngredients(){
    selectedIngredients=[];
    renderIngredients();
    setText("feedback","Ingredients cleared!");
}

function giveHint(){
    if(!currentRecipe)return;

    if(player.coins<15){
        setText("feedback","Not enough coins!");
        return;
    }

    player.coins-=15;

    const missing=currentRecipe.ingredients.filter(
        x=>!selectedIngredients.includes(x)
    );

    const ingredient=INGREDIENTS.find(x=>x.id===missing[0]);

    setText(
        "feedback",
        ingredient
            ?`Mika's Hint: Try ${ingredient.emoji} ${ingredient.name}!`
            :"All ingredients are selected!"
    );

    updateStats();
    saveGame();
}

/* ============================================================
   9. ORDER AND CUSTOMER SYSTEM
============================================================ */

const CUSTOMERS=[
    {name:"Luna",avatar:"👩🏻",message:"I'd love something fresh!"},
    {name:"Aiko",avatar:"👧🏻",message:"Can you prepare a healthy meal?"},
    {name:"Oliver",avatar:"🧑🏻",message:"Surprise me with your best dish!"},
    {name:"Mia",avatar:"👩🏽",message:"Something delicious and sustainable, please!"},
    {name:"Noah",avatar:"🧑🏼",message:"I'm hungry! Let's order!"},
    {name:"Emma",avatar:"👩🏼",message:"I love colorful food!"}
];

let currentCustomer=null;

function startGame(){
    initializeAudio();

    if(gameTimer)return;

    player.started=true;

    const btn=document.getElementById("startButton");

    if(btn){
        btn.disabled=true;
        btn.textContent="Order Running";
    }

    if(!sessionTimer){
        sessionTimer=setInterval(()=>{
            player.totalPlayTime++;
            player.sessionTime++;

            checkTimeUnlocks();
            checkBadges();

            if(player.totalPlayTime%30===0)saveGame();
        },1000);
    }

    generateOrder();
    randomMika("welcome");
    saveGame();
}

function generateOrder(){
    stopOrderTimer();

    const available=RECIPES.filter(
        recipe=>player.level>=recipe.level
    );

    currentRecipe=available[
        Math.floor(Math.random()*available.length)
    ];

    currentCustomer=CUSTOMERS[
        Math.floor(Math.random()*CUSTOMERS.length)
    ];

    selectedIngredients=[];
    remainingTime=CONFIG.orderDuration;

    setText("timer",formatTime(remainingTime));
    setText("recipeName",currentRecipe.name);
    setText("currentRecipeName",currentRecipe.name);
    setText("recipeEmoji",currentRecipe.emoji);
    setText("customerName",currentCustomer.name);
    setText("customerMessage",currentCustomer.message);
    setText("customerAvatar",currentCustomer.avatar);
    setText("feedback","");

    renderIngredients();

    gameTimer=setInterval(()=>{
        remainingTime--;

        setText("timer",formatTime(remainingTime));

        if(remainingTime<=30){
            const timer=document.getElementById("timer");
            if(timer)timer.classList.add("timer-danger");
        }

        if(remainingTime<=0)orderFailed();
    },1000);
}

function formatTime(seconds){
    const m=Math.floor(seconds/60);
    const s=seconds%60;

    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function stopOrderTimer(){
    clearInterval(gameTimer);
    gameTimer=null;
}

function serveOrder(){
    if(!currentRecipe||!player.started){
        setText("feedback","Start your restaurant first!");
        return;
    }

    const required=currentRecipe.ingredients;

    const missing=required.filter(
        x=>!selectedIngredients.includes(x)
    );

    const extra=selectedIngredients.filter(
        x=>!required.includes(x)
    );

    if(missing.length===0&&extra.length===0){
        completeOrder();
    }else{
        player.failedOrders++;

        setText(
            "feedback",
            `Order needs improvement! Missing: ${missing.length}, Extra: ${extra.length}.`
        );

        randomMika("failure");
        soundEffect("error");

        saveGame();
    }
}

function completeOrder(){
    stopOrderTimer();

    player.completedOrders++;
    player.perfectOrders++;

    const bonus=Math.floor(remainingTime/10);

    const xp=currentRecipe.xp+bonus;
    const coins=currentRecipe.coins+Math.floor(bonus/2);

    addXP(xp);

    player.coins+=coins;
    player.ecoScore+=currentRecipe.eco;
    player.wastePrevented++;

    setText(
        "feedback",
        `Perfect! +${xp} XP | +${coins} Coins | +${currentRecipe.eco} Eco Points`
    );

    randomMika("success");
    soundEffect("success");

    showResult(
        "ORDER COMPLETED!",
        `${currentRecipe.emoji} ${currentRecipe.name}`,
        `+${xp} XP • +${coins} Coins • +${currentRecipe.eco} Eco Points`
    );

    checkBadges();
    checkDailyMissions();
    updateStats();

    saveGame();
    enableNextOrder();
}

function orderFailed(){
    stopOrderTimer();

    player.failedOrders++;

    setText("feedback","Time is up! Try again!");

    randomMika("failure");

    enableNextOrder();
    saveGame();
}

function enableNextOrder(){
    const btn=document.getElementById("startButton");

    if(btn){
        btn.disabled=false;
        btn.textContent="Next Order";
    }
}

/* ============================================================
   10. BADGE SYSTEM
============================================================ */

const BADGES=[
    {
        id:"first",
        name:"First Order",
        emoji:"🍽️",
        description:"Complete your first order.",
        test:p=>p.completedOrders>=1
    },
    {
        id:"eco",
        name:"Eco Beginner",
        emoji:"🌱",
        description:"Earn 50 Eco Points.",
        test:p=>p.ecoScore>=50
    },
    {
        id:"chef",
        name:"Professional Chef",
        emoji:"👩‍🍳",
        description:"Complete 10 orders.",
        test:p=>p.completedOrders>=10
    },
    {
        id:"perfect",
        name:"Perfectionist",
        emoji:"💎",
        description:"Complete 10 perfect orders.",
        test:p=>p.perfectOrders>=10
    },
    {
        id:"master",
        name:"Master Chef",
        emoji:"⭐",
        description:"Reach level 10.",
        test:p=>p.level>=10
    },
    {
        id:"ecoMaster",
        name:"Eco Master",
        emoji:"🌍",
        description:"Reach 500 Eco Points.",
        test:p=>p.ecoScore>=500
    },
    {
        id:"legend",
        name:"Freshopia Legend",
        emoji:"👑",
        description:"Reach level 30.",
        test:p=>p.level>=30
    },
    {
        id:"dedicated",
        name:"Dedicated Player",
        emoji:"⏰",
        description:"Play for 30 minutes.",
        test:p=>p.totalPlayTime>=1800
    },
    {
        id:"collector",
        name:"Fashion Collector",
        emoji:"👗",
        description:"Own 4 outfits.",
        test:p=>p.ownedItems.length>=4
    }
];

function checkBadges(){
    BADGES.forEach(badge=>{
        if(!player.badges.includes(badge.id)&&badge.test(player)){
            player.badges.push(badge.id);
            player.coins+=75;

            showResult(
                "NEW BADGE UNLOCKED!",
                `${badge.emoji} ${badge.name}`,
                `${badge.description} +75 Coins!`
            );

            soundEffect("reward");
            renderBadges();
        }
    });

    updateStats();
}

function renderBadges(){
    const list=document.getElementById("badgeList");
    if(!list)return;

    list.innerHTML="";

    BADGES.forEach(badge=>{
        const unlocked=player.badges.includes(badge.id);

        const item=document.createElement("div");

        item.className=`badge-item ${unlocked?"unlocked":"locked"}`;

        item.innerHTML=`
            <span>${badge.emoji}</span>
            <strong>${badge.name}</strong>
            <small>${unlocked?"UNLOCKED":"LOCKED"}</small>
            <p>${badge.description}</p>
        `;

        list.appendChild(item);
    });
}

/* ============================================================
   11. TIME-BASED UNLOCK SYSTEM
============================================================ */

const TIME_REWARDS=[
    {time:60,id:"quick",name:"Quick Challenges"},
    {time:180,id:"special",name:"Special Missions"},
    {time:300,id:"bonus",name:"Bonus Rewards"},
    {time:600,id:"advanced",name:"Advanced Kitchen"},
    {time:900,id:"expert",name:"Expert Missions"},
    {time:1800,id:"legendary",name:"Legendary Challenges"}
];

function checkTimeUnlocks(){
    TIME_REWARDS.forEach(reward=>{
        if(
            player.sessionTime>=reward.time&&
            !player.unlockedFeatures.includes(reward.id)
        ){
            player.unlockedFeatures.push(reward.id);

            showResult(
                "NEW FEATURE!",
                `🔓 ${reward.name}`,
                "Your dedication unlocked a new feature!"
            );

            mikaSpeak(`Amazing! You unlocked ${reward.name}!`);

            saveGame();
        }
    });
}

/* ============================================================
   12. DAILY MISSIONS
============================================================ */

function dailyReset(){
    const today=new Date().toLocaleDateString("en-CA");

    if(player.dailyDate!==today){
        player.dailyDate=today;
        player.dailyCompleted=[];
        player.dailyRewardClaimed=false;
        saveGame();
    }
}

function dailyMissions(){
    return [
        {
            id:"orders",
            name:"Complete 3 Orders",
            reward:100,
            condition:()=>player.completedOrders>=3
        },
        {
            id:"perfect",
            name:"Complete 2 Perfect Dishes",
            reward:100,
            condition:()=>player.perfectOrders>=2
        },
        {
            id:"eco",
            name:"Earn 50 Eco Points",
            reward:100,
            condition:()=>player.ecoScore>=50
        }
    ];
}

function checkDailyMissions(){
    dailyMissions().forEach(mission=>{
        if(
            mission.condition()&&
            !player.dailyCompleted.includes(mission.id)
        ){
            player.dailyCompleted.push(mission.id);
            player.coins+=mission.reward;

            showResult(
                "DAILY MISSION COMPLETE!",
                mission.name,
                `+${mission.reward} Coins`
            );
        }
    });

    saveGame();
}

function renderDailyMissions(){
    const list=document.getElementById("dailyMissionList");
    if(!list)return;

    list.innerHTML="";

    dailyMissions().forEach(mission=>{
        const done=player.dailyCompleted.includes(mission.id);

        const item=document.createElement("div");

        item.className="mission-item";

        item.innerHTML=`
            <strong>${done?"✅":"🎯"} ${mission.name}</strong>
            <span>${done?"Completed":`Reward: ${mission.reward} Coins`}</span>
        `;

        list.appendChild(item);
    });
}

function claimDailyReward(){
    dailyReset();

    if(player.dailyRewardClaimed){
        setText("feedback","Daily reward already claimed!");
        return;
    }

    player.dailyRewardClaimed=true;
    player.coins+=CONFIG.dailyReward;

    showResult(
        "DAILY LOGIN REWARD!",
        "🎁 Welcome back!",
        `You earned ${CONFIG.dailyReward} Coins!`
    );

    updateStats();
    saveGame();
}

/* ============================================================
   13. SHOP SYSTEM
============================================================ */

const SHOP_ITEMS=[
    {
        id:"default",
        name:"Classic Mika",
        emoji:"👩‍🍳",
        price:0,
        level:1
    },
    {
        id:"pink",
        name:"Pink Mika",
        emoji:"👩🏻‍🎤",
        price:250,
        level:5
    },
    {
        id:"chef",
        name:"Master Chef Mika",
        emoji:"👩🏻‍🍳",
        price:400,
        level:10
    },
    {
        id:"royal",
        name:"Royal Mika",
        emoji:"👸🏻",
        price:800,
        level:25
    },
    {
        id:"star",
        name:"Star Mika",
        emoji:"🌟",
        price:600,
        level:15
    }
];

function renderShop(){
    const shop=document.getElementById("shopList");
    if(!shop)return;

    shop.innerHTML="";

    SHOP_ITEMS.forEach(item=>{
        const owned=player.ownedItems.includes(item.id);

        const card=document.createElement("div");
        card.className="shop-item";

        card.innerHTML=`
            <div>${item.emoji}</div>
            <strong>${item.name}</strong>
            <p>Level ${item.level}</p>
            <p>${owned?"Owned":`${item.price} Coins`}</p>
            <button type="button" ${owned||player.level<item.level?"disabled":""}>
                ${owned?"Owned":"Purchase"}
            </button>
        `;

        card.querySelector("button").addEventListener("click",()=>{
            purchaseItem(item.id);
        });

        shop.appendChild(card);
    });
}

function purchaseItem(id){
    const item=SHOP_ITEMS.find(x=>x.id===id);

    if(!item)return;
    if(player.ownedItems.includes(id))return;

    if(player.level<item.level){
        setText("feedback","Level requirement not reached!");
        return;
    }

    if(player.coins<item.price){
        setText("feedback","Not enough coins!");
        return;
    }

    player.coins-=item.price;
    player.ownedItems.push(id);

    checkBadges();

    showResult(
        "ITEM PURCHASED!",
        item.emoji+" "+item.name,
        "Your new outfit is ready!"
    );

    renderShop();
    updateStats();
    saveGame();
}

function equipOutfit(id){
    if(!player.ownedItems.includes(id))return;

    player.selectedOutfit=id;

    const item=SHOP_ITEMS.find(x=>x.id===id);

    if(item)changeAvatar(item.emoji);

    saveGame();
}

/* ============================================================
   14. RESULT WINDOW
============================================================ */

function showResult(title,subtitle,description){
    const modal=document.getElementById("resultModal");

    if(modal){
        const h2=modal.querySelector("h2");
        const h3=modal.querySelector("h3");
        const p=modal.querySelector("p");

        if(h2)h2.textContent=title;
        if(h3)h3.textContent=subtitle;
        if(p)p.textContent=description;

        modal.hidden=false;
        modal.classList.add("active");

        return;
    }

    const notification=document.createElement("div");

    notification.className="freshopia-notification";

    const heading=document.createElement("strong");
    const subtitleText=document.createElement("p");
    const descriptionText=document.createElement("small");

    heading.textContent=title;
    subtitleText.textContent=subtitle;
    descriptionText.textContent=description;

    notification.append(heading,subtitleText,descriptionText);
    document.body.appendChild(notification);

    setTimeout(()=>notification.remove(),4000);
}

function closeResult(){
    const modal=document.getElementById("resultModal");

    if(modal){
        modal.hidden=true;
        modal.classList.remove("active");
    }
}

function closeLevelModal(){
    const modal=document.getElementById("levelModal");

    if(modal){
        modal.hidden=true;
        modal.classList.remove("active");
    }
}

/* ============================================================
   15. PLAYER STATISTICS
============================================================ */

function updateStats(){
    setText("levelValue",player.level);
    setText("xpValue",player.xp);
    setText("coinValue",player.coins);
    setText("ecoValue",player.ecoScore);
    setText("badgeCount",player.badges.length);
    setText("orderCount",player.completedOrders);

    const required=requiredXP(player.level);
    const progress=Math.min(100,player.xp/required*100);

    const fill=document.getElementById("xpFill");

    if(fill)fill.style.width=progress+"%";

    setText("levelProgressText",`${player.xp} / ${required} XP`);
}

function showProgressReport(){
    showResult(
        "PLAYER REPORT",
        `${player.nickname} | Level ${player.level}`,
        `XP: ${player.xp} | Coins: ${player.coins} | Eco Points: ${player.ecoScore} | Orders: ${player.completedOrders} | Badges: ${player.badges.length} | Play Time: ${formatTime(player.totalPlayTime)}`
    );
}

/* ============================================================
   16. INTERFACE HELPERS
============================================================ */

function setText(id,value){
    const el=document.getElementById(id);
    if(el)el.textContent=value;
}

function updateSettings(){
    const music=document.getElementById("musicToggle");
    const sound=document.getElementById("soundToggle");
    const voice=document.getElementById("voiceToggle");

    if(music)music.checked=player.musicEnabled;
    if(sound)sound.checked=player.soundEnabled;
    if(voice)voice.checked=player.voiceEnabled;
}

function renderUnlocks(){
    const list=document.getElementById("unlockList");
    if(!list)return;

    list.innerHTML="";

    LEVEL_REWARDS.forEach(reward=>{
        const unlocked=player.level>=reward.level;

        const item=document.createElement("div");

        item.className=`unlock-item ${unlocked?"unlocked":"locked"}`;

        item.innerHTML=`
            <strong>${unlocked?"🔓":"🔒"} ${reward.name}</strong>
            <small>Level ${reward.level}</small>
            <p>${reward.description}</p>
        `;

        list.appendChild(item);
    });
}

function renderAll(){
    updateStats();
    updateSettings();
    renderIngredients();
    renderBadges();
    renderUnlocks();
    renderDailyMissions();
    renderShop();

    const avatar=document.getElementById("mikaCharacter");
    if(avatar)avatar.textContent=player.avatar;
}

/* ============================================================
   17. PLAYER PROFILE
============================================================ */

function setNickname(name){
    name=String(name).trim().slice(0,20);

    if(!name)return;

    player.nickname=name;
    saveGame();

    mikaSpeak(`Welcome to Freshopia, ${name}!`);
}

function resetGame(){
    if(!confirm("Reset all Freshopia progress?"))return;

    stopOrderTimer();

    clearInterval(sessionTimer);
    sessionTimer=null;

    stopMusic();

    localStorage.removeItem(GAME_KEY);

    player=newPlayer();
    selectedIngredients=[];
    currentRecipe=null;

    renderAll();
    mikaSpeak("A brand new adventure begins!");
}

/* ============================================================
   18. SAVE SYSTEM
============================================================ */

function saveGame(){
    try{
        localStorage.setItem(GAME_KEY,JSON.stringify(player));
    }catch(error){
        console.error("Save failed:",error);
    }
}

function initializeSave(){
    dailyReset();

    setInterval(saveGame,CONFIG.autosave);

    window.addEventListener("beforeunload",saveGame);

    document.addEventListener("visibilitychange",()=>{
        if(document.hidden)saveGame();
    });
}

/* ============================================================
   19. EVENT SYSTEM
============================================================ */

function bindEvents(){
    const events=[
        ["startButton","click",startGame],
        ["serveButton","click",serveOrder],
        ["clearButton","click",clearIngredients],
        ["hintButton","click",giveHint],
        ["musicToggle","change",toggleMusic],
        ["soundToggle","change",toggleSound],
        ["voiceToggle","change",toggleVoice],
        ["repeatMika","click",repeatMika],
        ["closeResult","click",closeResult],
        ["closeLevelModal","click",closeLevelModal],
        ["reportButton","click",showProgressReport],
        ["resetButton","click",resetGame],
        ["dailyRewardButton","click",claimDailyReward]
    ];

    events.forEach(([id,event,callback])=>{
        const el=document.getElementById(id);

        if(el){
            el.addEventListener(event,callback);
        }
    });
}

/* ============================================================
   20. GAME INITIALIZATION
============================================================ */

function initializeFreshopia(){
    console.log("Freshopia Ultimate 6.0 Ready!");

    bindEvents();
    initializeSave();

    renderAll();

    mikaMessage(
        `Welcome back, ${player.nickname}! Your adventure continues!`
    );

    console.log("Game loaded successfully.");
    console.log("Player:",player);
}

if(document.readyState==="loading"){
    document.addEventListener(
        "DOMContentLoaded",
        initializeFreshopia
    );
}else{
    initializeFreshopia();
}

/* ============================================================
   END OF FRESHOPIA ULTIMATE 6.0
============================================================ */
