/* =====================================================
   FRESHOPIA - ANIME COOKING ADVENTURE
   Healthy Kitchen & Zero Waste Edition
===================================================== */

const $ = id => document.getElementById(id);

/* ================= PLAYER DATA ================= */

let player = {
  level: 1,
  xp: 0,
  coins: 100,
  reputation: 0,
  happyCustomers: 0,
  completedOrders: 0,
  healthyPoints: 0,
  rescuedFood: 0,
  foodWaste: 0,
  perfectMeals: 0
};

let currentOrder = null;
let selectedItems = [];
let restaurantOpen = false;
let orderTime = 60;
let orderTimerInterval = null;
let cookingReady = false;
let voiceEnabled = true;
let mikaStep = 0;
let currentPuzzleAnswer = null;
let currentPuzzleCompleted = false;

/* ================= INGREDIENTS ================= */

const ingredients = [
  {id:"bread",name:"Whole Grain Bread",emoji:"🍞",stock:15,category:"Grains",shelfLife:4},
  {id:"beef",name:"Lean Beef",emoji:"🥩",stock:12,category:"Protein",shelfLife:2},
  {id:"cheese",name:"Cheese",emoji:"🧀",stock:12,category:"Dairy",shelfLife:7},
  {id:"lettuce",name:"Lettuce",emoji:"🥬",stock:15,category:"Vegetables",shelfLife:3},
  {id:"tomato",name:"Tomato",emoji:"🍅",stock:18,category:"Vegetables",shelfLife:5},
  {id:"pasta",name:"Whole Wheat Pasta",emoji:"🍝",stock:15,category:"Grains",shelfLife:180},
  {id:"basil",name:"Fresh Basil",emoji:"🌿",stock:15,category:"Herbs",shelfLife:4},
  {id:"cream",name:"Light Cream",emoji:"🥛",stock:12,category:"Dairy",shelfLife:5},
  {id:"chicken",name:"Chicken Breast",emoji:"🍗",stock:15,category:"Protein",shelfLife:2},
  {id:"rice",name:"Brown Rice",emoji:"🍚",stock:20,category:"Grains",shelfLife:180},
  {id:"carrot",name:"Carrot",emoji:"🥕",stock:18,category:"Vegetables",shelfLife:14},
  {id:"potato",name:"Potato",emoji:"🥔",stock:18,category:"Vegetables",shelfLife:21},
  {id:"salmon",name:"Salmon",emoji:"🐟",stock:10,category:"Protein",shelfLife:2},
  {id:"quinoa",name:"Quinoa",emoji:"🌾",stock:15,category:"Grains",shelfLife:180},
  {id:"avocado",name:"Avocado",emoji:"🥑",stock:12,category:"Fruit",shelfLife:4},
  {id:"lemon",name:"Lemon",emoji:"🍋",stock:15,category:"Fruit",shelfLife:14},
  {id:"cucumber",name:"Cucumber",emoji:"🥒",stock:15,category:"Vegetables",shelfLife:6},
  {id:"yogurt",name:"Plain Yogurt",emoji:"🥣",stock:15,category:"Dairy",shelfLife:7},
  {id:"strawberry",name:"Strawberry",emoji:"🍓",stock:12,category:"Fruit",shelfLife:3},
  {id:"banana",name:"Banana",emoji:"🍌",stock:15,category:"Fruit",shelfLife:5},
  {id:"oats",name:"Oats",emoji:"🥣",stock:20,category:"Grains",shelfLife:180},
  {id:"apple",name:"Apple",emoji:"🍎",stock:15,category:"Fruit",shelfLife:14},
  {id:"walnut",name:"Walnuts",emoji:"🌰",stock:12,category:"Nuts",shelfLife:90},
  {id:"lentils",name:"Lentils",emoji:"🫘",stock:20,category:"Protein",shelfLife:180},
  {id:"bulgur",name:"Bulgur",emoji:"🌾",stock:20,category:"Grains",shelfLife:180},
  {id:"spinach",name:"Spinach",emoji:"🥬",stock:15,category:"Vegetables",shelfLife:3},
  {id:"oliveoil",name:"Olive Oil",emoji:"🫒",stock:20,category:"Healthy Fats",shelfLife:365},
  {id:"egg",name:"Egg",emoji:"🥚",stock:15,category:"Protein",shelfLife:21},
  {id:"honey",name:"Honey",emoji:"🍯",stock:12,category:"Sweetener",shelfLife:365},
  {id:"sweetpotato",name:"Sweet Potato",emoji:"🍠",stock:12,category:"Vegetables",shelfLife:14}
];

/* ================= RECIPES ================= */

const recipes = [
  {
    id:"burger",
    name:"Classic Burger",
    description:"A juicy burger with cheese and fresh vegetables.",
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    ingredients:["bread","beef","cheese","lettuce","tomato"],
    reward:35,
    nutrition:{calories:520,protein:28,carbs:42,fiber:4}
  },
  {
    id:"pasta",
    name:"Creamy Basil Pasta",
    description:"Creamy pasta with fresh basil.",
    image:"https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
    ingredients:["pasta","basil","cream"],
    reward:40,
    nutrition:{calories:480,protein:14,carbs:62,fiber:5}
  },
  {
    id:"chicken",
    name:"Chicken Rice Bowl",
    description:"Chicken served with rice and carrots.",
    image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    ingredients:["chicken","rice","carrot"],
    reward:45,
    nutrition:{calories:430,protein:32,carbs:48,fiber:4}
  },
  {
    id:"veggie",
    name:"Fresh Garden Salad",
    description:"A colorful mix of fresh vegetables.",
    image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    ingredients:["lettuce","tomato","carrot"],
    reward:35,
    nutrition:{calories:180,protein:5,carbs:24,fiber:7}
  },
  {
    id:"potato",
    name:"Golden Potato Bowl",
    description:"A comforting bowl with potatoes and fresh vegetables.",
    image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
    ingredients:["potato","carrot","cheese"],
    reward:38,
    nutrition:{calories:310,protein:10,carbs:45,fiber:6}
  },
  {
    id:"chicken-salad",
    name:"Healthy Chicken Salad",
    description:"Fresh greens with protein-rich chicken.",
    image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    ingredients:["chicken","lettuce","tomato","carrot"],
    reward:50,
    nutrition:{calories:290,protein:30,carbs:18,fiber:6}
  }
];
/* ================= CUSTOMERS ================= */

const customers = [
  {name:"Emma",avatar:"👩🏻",mood:"😊",message:"I'm hungry! Can you cook for me?"},
  {name:"Oliver",avatar:"👨🏻",mood:"😋",message:"I can't wait to taste your food!"},
  {name:"Luna",avatar:"👧🏻",mood:"🥰",message:"I love this little restaurant!"},
  {name:"Mia",avatar:"👩🏽",mood:"🤩",message:"Surprise me with something delicious!"},
  {name:"Noah",avatar:"🧑🏻",mood:"🙂",message:"I hope my order is ready soon!"},
  {name:"Sophie",avatar:"👩🏼",mood:"🌸",message:"Do you have a healthy meal today?"},
  {name:"Leo",avatar:"👦🏻",mood:"😋",message:"I love colorful and fresh food!"}
];

/* ================= MIKA DIALOGUES ================= */

const mikaMessages = [
  {title:"Welcome, Chef! 🌸",message:"Hi! I'm Mika, your cooking guide. Welcome to Freshopia!"},
  {title:"Your first mission 🍓",message:"Choose ingredients, prepare a delicious meal and serve your customer!"},
  {title:"Healthy Kitchen 🥑",message:"Fresh ingredients help us create balanced meals. Check protein, fiber and sugar!"},
  {title:"Zero Waste Mission ♻️",message:"Save ingredients, plan portions and turn suitable leftovers into new meals!"},
  {title:"Let's begin! 💗",message:"You're ready, Chef! Open your restaurant!"}
];

/* ================= MISSIONS ================= */

const missions = [
  {id:1,title:"Serve your first customer",target:1,progress:0,reward:30},
  {id:2,title:"Prepare 3 delicious meals",target:3,progress:0,reward:60},
  {id:3,title:"Earn 100 coins",target:100,progress:0,reward:50},
  {id:4,title:"Prepare 3 healthy meals",target:3,progress:0,reward:70},
  {id:5,title:"Rescue 3 ingredients",target:3,progress:0,reward:60},
  {id:6,title:"Prepare a plant-based meal",target:1,progress:0,reward:50}
];

/* ================= ACHIEVEMENTS ================= */

const achievements = [
  {
    id:1,
    title:"First Customer",
    description:"Serve your first customer.",
    unlocked:false,
    tier:"BRONZE",
    medal:"🥉"
  },
  {
    id:2,
    title:"Little Chef",
    description:"Complete 5 orders.",
    unlocked:false,
    tier:"SILVER",
    medal:"🥈"
  },
  {
    id:3,
    title:"Rising Star",
    description:"Reach level 3.",
    unlocked:false,
    tier:"GOLD",
    medal:"🥇"
  }
];

/* ================= FOOD QUIZ ================= */

const questions = [
  {
    question:"Which nutrient helps build and repair muscles?",
    options:["Protein","Sugar","Salt"],
    answer:"Protein",
    explanation:"Protein supports the growth and repair of body tissues."
  },
  {
    question:"Which ingredient is a good source of fiber?",
    options:["Oats","Soft drink","Candy"],
    answer:"Oats",
    explanation:"Oats contain dietary fiber."
  },
  {
    question:"What should we do with suitable leftover vegetables?",
    options:["Use them in another meal","Throw them away","Leave them outside"],
    answer:"Use them in another meal",
    explanation:"Safe and properly stored leftover vegetables can be used in another recipe."
  },
  {
    question:"Which storage method helps keep many vegetables fresh?",
    options:["Correct refrigeration","Direct sunlight","Leaving them open"],
    answer:"Correct refrigeration",
    explanation:"Many fresh vegetables need suitable refrigerated storage."
  },
  {
    question:"Which is a plant-based protein source?",
    options:["Lentils","Soda","Candy"],
    answer:"Lentils",
    explanation:"Lentils are rich in plant-based protein and fiber."
  },
  {
    question:"What does FIFO mean in food storage?",
    options:["First In, First Out","Food Is For Others","Fresh Ingredients For Orders"],
    answer:"First In, First Out",
    explanation:"Use older suitable stock before newer stock."
  },
  {
    question:"Which action helps reduce food waste?",
    options:["Planning portions","Overfilling plates","Buying too much food"],
    answer:"Planning portions",
    explanation:"Preparing suitable portion sizes reduces unnecessary leftovers."
  },
  {
    question:"Which nutrient is the body's main source of energy?",
    options:["Carbohydrates","Water","Vitamins"],
    answer:"Carbohydrates",
    explanation:"Carbohydrates are an important energy source."
  },
  {
    question:"What can suitable vegetable scraps become?",
    options:["Compost","Plastic","Metal"],
    answer:"Compost",
    explanation:"Many plant-based food scraps can be composted."
  }
];

/* ================= GAME STATE ================= */

function loadPlayer(){
  try{
    const saved=JSON.parse(localStorage.getItem("freshopiaPlayer")||"null");
    if(saved) player={...player,...saved};

    const savedMissions=JSON.parse(localStorage.getItem("freshopiaMissions")||"null");
    if(savedMissions){
      savedMissions.forEach(savedMission=>{
        const mission=missions.find(m=>m.id===savedMission.id);
        if(mission) mission.progress=savedMission.progress;
      });
    }

    const savedAchievements=JSON.parse(localStorage.getItem("freshopiaAchievements")||"null");
    if(savedAchievements){
      savedAchievements.forEach(savedAchievement=>{
        const achievement=achievements.find(a=>a.id===savedAchievement.id);
        if(achievement) achievement.unlocked=savedAchievement.unlocked;
      });
    }

    const savedStock=JSON.parse(localStorage.getItem("freshopiaStock")||"null");
    if(savedStock){
      savedStock.forEach(savedItem=>{
        const item=ingredients.find(i=>i.id===savedItem.id);
        if(item) item.stock=savedItem.stock;
      });
    }
  }catch(error){
    console.log("Starting a new game.");
  }
}

function savePlayer(){
  try{
    localStorage.setItem("freshopiaPlayer",JSON.stringify(player));
    localStorage.setItem("freshopiaMissions",JSON.stringify(missions));
    localStorage.setItem("freshopiaAchievements",JSON.stringify(achievements));
    localStorage.setItem("freshopiaStock",JSON.stringify(ingredients));
  }catch(error){
    console.log("Save unavailable.");
  }
}

/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded",initializeGame);

function initializeGame(){
  loadPlayer();
  createFreshopiaPanels();
  updatePlayerDisplay();
  renderIngredients();
  renderRecipes();
  renderCharacters();
  renderMissions();
  renderAchievements();
  renderPuzzle();
  renderInventory();
  renderSustainability();
  updateCustomerArea();
  startMikaIntroduction();
  showToast("Welcome to Freshopia! 🌸");
}

/* ================= GENERAL HELPERS ================= */

function setText(id,value){
  const element=$(id);
  if(element) element.textContent=value;
}

function createElement(tag,className,text){
  const element=document.createElement(tag);
  if(className) element.className=className;
  if(text!==undefined) element.textContent=text;
  return element;
}

function createFreshopiaPanels(){
  const recipeGrid=$("recipeGrid");

  if(recipeGrid && ! $("freshopiaEcoPanel")){
    const panel=document.createElement("div");
    panel.id="freshopiaEcoPanel";
    panel.className="freshopia-extra-panel";
    panel.innerHTML=`
      <div class="eco-heading">
        <h2>🌱 Healthy & Sustainable Kitchen</h2>
        <p>Cook healthy meals and protect our planet!</p>
      </div>
      <div id="freshopiaStats" class="eco-stats"></div>
      <div class="eco-columns">
        <div class="eco-card">
          <h3>🥑 Healthy Chef</h3>
          <p>Prepare nutritious meals and earn healthy points.</p>
          <div id="healthyStats"></div>
        </div>
        <div class="eco-card">
          <h3>♻️ Food Rescue</h3>
          <p>Use available ingredients to reduce food waste.</p>
          <div id="foodRescueArea"></div>
        </div>
      </div>
      <div class="eco-card">
        <h3>📦 Kitchen Inventory</h3>
        <p>Check your ingredient stock and restock when needed.</p>
        <div id="inventoryGrid"></div>
      </div>
      <div class="eco-card">
        <h3>🌍 Sustainability Challenges</h3>
        <div id="ecoChallenges"></div>
      </div>
    `;

    recipeGrid.parentElement.insertBefore(panel,recipeGrid);
  }

  if(!$("freshopiaEcoStyle")){
    const style=document.createElement("style");
    style.id="freshopiaEcoStyle";
    style.textContent=`
      .freshopia-extra-panel{margin:25px 0;padding:20px;border-radius:22px;background:linear-gradient(135deg,#f1f9e9,#fff2f7);color:#405b43}
      .eco-heading{text-align:center;margin-bottom:20px}
      .eco-heading h2{color:#47784c}
      .eco-stats,.eco-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:15px 0}
      .eco-card{background:#fff;border:1px solid #e4eddf;border-radius:16px;padding:15px;margin:12px 0;min-width:0}
      .eco-card h3{color:#54865a}
      .eco-stat{background:#fff;padding:12px;border-radius:13px;text-align:center}
      .eco-stat strong{display:block;font-size:22px;color:#54865a}
      .eco-stat small{color:#777}
      .eco-button{border:0;border-radius:12px;padding:10px 14px;background:#78a978;color:white;font-weight:bold;margin:5px;cursor:pointer}
      .eco-button:disabled{opacity:.5;cursor:not-allowed}
      .eco-button.pink{background:#e99bbd}
      .inventory-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:9px}
      .inventory-item{background:#f7faf3;padding:10px;border-radius:12px;border:1px solid #e6eddf}
      .inventory-item strong,.inventory-item small{display:block}
      .inventory-item small{color:#777;margin:4px 0}
      .inventory-item button{font-size:12px}
      .nutrition-row{display:flex;gap:7px;flex-wrap:wrap;margin:9px 0}
      .nutrition-tag{background:#eef6e9;border-radius:9px;padding:5px 8px;font-size:12px}
      .healthy-label{display:inline-block;background:#e5f5df;color:#42734a;padding:5px 9px;border-radius:20px;font-size:12px}
      .eco-progress{height:9px;background:#e9eee5;border-radius:20px;overflow:hidden;margin:8px 0}
      .eco-progress span{display:block;height:100%;background:#80b77d}
      .eco-challenge{padding:10px;background:#f7faf3;border-radius:12px;margin:8px 0}
      .eco-recipe-info{font-size:13px;color:#66816a}
      .recipe-card img{max-width:100%;height:auto}
      @media(max-width:500px){.freshopia-extra-panel{padding:12px}.eco-card{padding:12px}}
    `;
    document.head.appendChild(style);
  }
}

/* ================= PLAYER DISPLAY ================= */

function updatePlayerDisplay(){
  setText("playerLevel",player.level);
  setText("homeLevel",player.level);
  setText("playerCoins",player.coins);
  setText("homeCoins",player.coins);
  setText("restaurantCoins",player.coins);
  setText("restaurantReputation",player.reputation);
  setText("happyCustomers",player.happyCustomers);

  const needed=player.level*100;

  if($("xpProgress")){
    $("xpProgress").style.width=Math.min(100,player.xp/needed*100)+"%";
  }

  setText("xpText",`${player.xp} / ${needed} XP`);
  savePlayer();

  renderSustainability();
}

/* ================= XP AND COINS ================= */

function addXP(amount){
  player.xp+=amount;

  while(player.xp>=player.level*100){
    player.xp-=player.level*100;
    player.level++;
    showLevelUp();
  }

  updatePlayerDisplay();
  checkAchievements();
}

function addCoins(amount){
  player.coins+=amount;
  updatePlayerDisplay();
  updateMissionProgress(3,amount);
}

function showLevelUp(){
  setText("levelMessage",`You reached Level ${player.level}!`);

  if($("levelModal")) $("levelModal").classList.add("show");

  mikaDance();
  guideSay(`Amazing! You reached level ${player.level}! Let's dance!`,"LEVEL UP! 🎉");
}

function closeLevelModal(){
  if($("levelModal")) $("levelModal").classList.remove("show");
  stopMikaDance();
}

/* ================= MIKA SYSTEM ================= */

function mikaElement(){
  return $("mika-art")||$("mikaAssistant");
}

function mikaSpeak(message){
  const text=$("mika-text")||$("mikaMessage");
  const mika=mikaElement();

  if(text && message) text.textContent=message;

  if(mika){
    mika.classList.remove("mika-talking");
    void mika.offsetWidth;
    mika.classList.add("mika-talking");
    setTimeout(()=>mika.classList.remove("mika-talking"),3000);
  }

  if(voiceEnabled) speakMika(message);
}

function mikaWave(){
  const mika=mikaElement();
  if(!mika) return;

  mika.classList.remove("mika-wave");
  void mika.offsetWidth;
  mika.classList.add("mika-wave");
}

function mikaDance(){
  const mika=mikaElement();
  if(!mika) return;

  mika.classList.remove("mika-dance","mika-dancing");
  void mika.offsetWidth;
  mika.classList.add("mika-dance");

  setTimeout(()=>mika.classList.remove("mika-dance"),4000);
}

function stopMikaDance(){
  const mika=mikaElement();
  if(mika) mika.classList.remove("mika-dance","mika-dancing");
}

function mikaHappy(){
  const mika=mikaElement();

  if(mika){
    mika.classList.remove("mika-happy");
    void mika.offsetWidth;
    mika.classList.add("mika-happy");
    setTimeout(()=>mika.classList.remove("mika-happy"),1800);
  }

  mikaSpeak("Yaaa! Our customer is so happy! You are an amazing chef! 💗");
}

function startMikaIntroduction(){
  mikaStep=0;
  showMikaMessage();
  if($("mikaBubble")) $("mikaBubble").classList.add("show");
}

function showMikaMessage(){
  const item=mikaMessages[mikaStep];
  if(!item) return;

  setText("mikaTitle",item.title);
  setText("mikaMessage",item.message);
  setText("mikaNextButton",mikaStep===mikaMessages.length-1?"Let's Go! →":"Next →");
}

function mikaNext(){
  if(mikaStep<mikaMessages.length-1){
    mikaStep++;
    showMikaMessage();
    mikaSpeak(mikaMessages[mikaStep].message);
  }else{
    closeMika();
    showSection("restaurant");
    guideSay("Let's open your restaurant and welcome our first customer!");
  }
}

function guideSay(message,title="Mika 💗"){
  setText("mikaTitle",title);
  setText("mikaMessage",message);

  if($("mikaBubble")) $("mikaBubble").classList.add("show");
  mikaSpeak(message);
}

function closeMika(){
  if($("mikaBubble")) $("mikaBubble").classList.remove("show");
}

function toggleMika(){
  if($("mikaBubble")) $("mikaBubble").classList.toggle("show");
}

function toggleMikaVoice(){
  voiceEnabled=!voiceEnabled;

  if(!voiceEnabled && "speechSynthesis" in window){
    speechSynthesis.cancel();
  }

  showToast(voiceEnabled?"Mika voice is ON 🔊":"Mika voice is OFF 🔇");
}

function speakMika(message){
  if(!voiceEnabled||!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const speech=new SpeechSynthesisUtterance(message);
  speech.lang="en-US";
  speech.rate=.95;
  speech.pitch=1.25;
  speechSynthesis.speak(speech);
}

/* ================= NAVIGATION ================= */

function showSection(sectionId){
  document.querySelectorAll(".game-section").forEach(section=>{
    section.classList.remove("active");
  });

  document.querySelectorAll(".nav-btn").forEach(button=>{
    button.classList.remove("active");
  });

  const target=$(sectionId);
  if(target) target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(button=>{
    if(button.getAttribute("onclick")?.includes(sectionId)){
      button.classList.add("active");
    }
  });

  if(sectionId==="restaurant"&&!restaurantOpen){
    guideSay("Ready to cook? Open your restaurant to welcome your first customer!");
  }

  window.scrollTo({top:0,behavior:"smooth"});
}

/* ================= RESTAURANT ================= */

function openRestaurant(){
  if(restaurantOpen){
    showToast("Your restaurant is already open!");
    return;
  }

  restaurantOpen=true;

  const button=$("openRestaurantBtn");
  if(button){
    button.textContent="Restaurant Open ✓";
    button.disabled=true;
  }

  guideSay("Your restaurant is open! Our first customer is here!","Welcome! 🌸");
  startNextOrder();
}

function getAvailableRecipes(){
  return recipes.filter(recipe=>
    recipe.ingredients.every(id=>{
      const ingredient=ingredients.find(item=>item.id===id);
      return ingredient&&ingredient.stock>0;
    })
  );
}

function startNextOrder(){
  clearInterval(orderTimerInterval);

  const available=getAvailableRecipes();

  if(available.length===0){
    currentOrder=null;
    setText("orderName","Kitchen needs restocking!");
    setText("orderDescription","Visit your inventory and buy ingredients.");
    setText("customerMood","📦 Out of stock");
    showToast("Restock your ingredients to continue!");
    renderInventory();
    return;
  }

  const recipe=available[Math.floor(Math.random()*available.length)];
  const customer=customers[Math.floor(Math.random()*customers.length)];

  currentOrder={recipe,customer,completed:false};
  selectedItems=[];
  cookingReady=false;
  orderTime=60;

  setText("orderName",recipe.name);
  setText("orderDescription",recipe.description);
  setText("orderTimer",orderTime);
  setText("customerMood","😊 Waiting");
  setText("orderFeedback","");

  const image=$("orderImage");
  if(image){
    image.src=recipe.image;
    image.alt=recipe.name;
    image.onerror=function(){this.style.visibility="hidden";};
    image.style.visibility="visible";
  }

  if($("prepareMealBtn")) $("prepareMealBtn").disabled=false;
  if($("serveMealBtn")) $("serveMealBtn").disabled=true;

  setText("cookingSteps","Choose the ingredients for this recipe.");
  setText("cookingContent","");
  updateCustomerArea();
  renderIngredients();
  renderSelectedIngredients();

  orderTimerInterval=setInterval(()=>{
    orderTime--;
    setText("orderTimer",orderTime);

    if(orderTime<=20) setText("customerMood","😟 Getting impatient...");

    if(orderTime<=0){
      clearInterval(orderTimerInterval);
      setText("customerMood","😢 Customer left");
      setText("orderFeedback","The customer ran out of patience.");

      if($("prepareMealBtn")) $("prepareMealBtn").disabled=true;
      if($("serveMealBtn")) $("serveMealBtn").disabled=true;

      showToast("Customer left. Try the next order!");
      guideSay("Oh no! Let's be faster next time, Chef.");

      setTimeout(()=>{
        if(restaurantOpen) startNextOrder();
      },2500);
    }
  },1000);
}

function updateCustomerArea(){
  const area=$("customerArea");
  if(!area) return;

  if(!currentOrder){
    area.innerHTML="<h2>Waiting for customers...</h2>";
    return;
  }

  area.innerHTML=`
    <div class="customer-avatar">${currentOrder.customer.avatar}</div>
    <h2>${currentOrder.customer.name} is here!</h2>
    <p>${currentOrder.customer.message}</p>
  `;
}

/* ================= INGREDIENTS ================= */

function renderIngredients(){
  const grid=$("ingredientGrid");
  if(!grid) return;

  grid.innerHTML="";

  ingredients.forEach(ingredient=>{
    const selected=selectedItems.includes(ingredient.id);
    const card=document.createElement("div");

    card.className="ingredient-card"+(selected?" selected":"");

    const image=document.createElement("div");
    image.className="ingredient-emoji";
    image.textContent=ingredient.emoji;

    const name=createElement("strong","",ingredient.name);
    const stock=createElement("small","",`Stock: ${ingredient.stock}`);
    const instruction=createElement("small","",selected?"Selected ✓":"Tap to select");

    card.append(image,name,stock,instruction);

    if(ingredient.stock<=0) card.classList.add("out-of-stock");

    card.addEventListener("click",()=>toggleIngredient(ingredient.id));

    grid.appendChild(card);
  });
}

function toggleIngredient(id){
  if(cookingReady||!currentOrder) return;

  const ingredient=ingredients.find(item=>item.id===id);
  if(!ingredient||ingredient.stock<=0){
    showToast("This ingredient is out of stock!");
    return;
  }

  if(selectedItems.includes(id)){
    selectedItems=selectedItems.filter(item=>item!==id);
  }else{
    selectedItems.push(id);
  }

  renderIngredients();
  renderSelectedIngredients();
}

function renderSelectedIngredients(){
  const area=$("selectedIngredients");
  if(!area) return;

  area.className="selected-list";

  if(selectedItems.length===0){
    area.textContent="No ingredients selected yet.";
    return;
  }

  area.innerHTML="";

  selectedItems.forEach(id=>{
    const ingredient=ingredients.find(item=>item.id===id);
    if(!ingredient) return;

    const chip=document.createElement("span");
    chip.className="selected-chip";
    chip.textContent=ingredient.emoji+" "+ingredient.name;
    area.appendChild(chip);
  });
}

/* ================= COOKING ================= */

function prepareMeal(){
  if(!currentOrder||cookingReady) return;

  if(selectedItems.length===0){
    showToast("Choose some ingredients first!");
    guideSay("Choose the ingredients shown in the recipe, Chef!");
    return;
  }

  const required=currentOrder.recipe.ingredients;
  const missing=required.filter(id=>!selectedItems.includes(id));
  const extra=selectedItems.filter(id=>!required.includes(id));

  if(missing.length>0||extra.length>0){
    setText("cookingSteps","Not quite right! Check the recipe.");
    setText("cookingContent","You need the correct ingredients.");
    setText("orderFeedback","Some ingredients are missing or incorrect.");
    guideSay("Oops! Check the recipe again. Tap ingredients to select or remove them.");
    return;
  }

  cookingReady=true;

  if($("prepareMealBtn")) $("prepareMealBtn").disabled=true;

  setText("cookingSteps","Step 1: Ingredients collected ✓");
  setText("cookingContent","Step 2: Mixing and cooking...");
  guideSay("Perfect! Your meal is cooking. Great job!");

  setTimeout(()=>{
    if(!currentOrder||currentOrder.completed) return;

    setText("cookingSteps","Step 3: Your dish is ready! ✓");
    setText("cookingContent","Beautifully prepared! Now serve your customer.");

    if($("serveMealBtn")) $("serveMealBtn").disabled=false;
  },1800);
}

/* ================= SERVING ================= */

function serveMeal(){
  if(!currentOrder||!cookingReady||currentOrder.completed) return;

  const recipe=currentOrder.recipe;
  const customer=currentOrder.customer;

  if(!recipe.ingredients.every(id=>{
    const item=ingredients.find(i=>i.id===id);
    return item&&item.stock>0;
  })){
    showToast("Not enough ingredients in stock!");
    return;
  }

  currentOrder.completed=true;
  clearInterval(orderTimerInterval);

  recipe.ingredients.forEach(id=>{
    const item=ingredients.find(i=>i.id===id);
    item.stock--;
  });

  const speedBonus=orderTime>=40?15:orderTime>=20?8:0;
  const reward=recipe.reward+speedBonus;
  const healthyBonus=recipe.health>=90?15:recipe.health>=80?10:0;

  player.completedOrders++;
  player.happyCustomers++;
  player.reputation+=10;
  player.healthyPoints+=recipe.health;

  if(recipe.health>=80) player.perfectMeals++;

  addCoins(reward);
  addXP(35+healthyBonus);

  updateMissionProgress(1,1);
  updateMissionProgress(2,1);

  if(recipe.health>=80) updateMissionProgress(4,1);
  if(recipe.category==="Plant Based") updateMissionProgress(6,1);

  setText("customerMood","😍 Very happy!");
  setText("orderFeedback",`Amazing! You earned ${reward} coins and ${35+healthyBonus} XP!`);
  setText("cookingContent","Your customer loved the meal! 🎉");

  if($("serveMealBtn")) $("serveMealBtn").disabled=true;

  addOrderHistory(recipe.name,reward);

  showToast(`Order completed! +${reward} coins and +${35+healthyBonus} XP`);
  mikaHappy();
  mikaDance();

  guideSay(
    `${customer.name} loved your ${recipe.name}! You earned ${reward} coins. ${healthyBonus>0?"Healthy Chef bonus! 🥑":""}`,
    "Wonderful, Chef! 🌟"
  );

  checkAchievements();
  updatePlayerDisplay();
  renderInventory();

  setTimeout(()=>{
    if(restaurantOpen) startNextOrder();
  },3500);
}

/* ================= ORDER HISTORY ================= */

function addOrderHistory(name,reward){
  const history=$("orderHistory");
  if(!history) return;

  const item=document.createElement("p");
  item.textContent=`✓ ${name} — ${reward} coins earned`;
  history.prepend(item);
}

/* ================= RECIPE BOOK ================= */

function renderRecipes(){
  const grid=$("recipeGrid");
  if(!grid) return;

  grid.innerHTML="";

  recipes.forEach(recipe=>{
    const card=document.createElement("div");
    card.className="recipe-card";

    card.innerHTML=`
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">

      <h3>${recipe.name}</h3>

      <p>${recipe.description}</p>

      <div class="recipe-nutrition">
        <span>🔥 ${recipe.nutrition.calories} kcal</span>
        <span>💪 ${recipe.nutrition.protein}g Protein</span>
        <span>🍞 ${recipe.nutrition.carbs}g Carbs</span>
        <span>🌿 ${recipe.nutrition.fiber}g Fiber</span>
      </div>

      <p>🪙 Reward: ${recipe.reward} coins</p>

      <button type="button">View ingredients</button>
    `;

    const image=card.querySelector("img");

    image.onerror=function(){
      this.style.display="none";
    };

    card.querySelector("button").addEventListener("click",()=>{
      const names=recipe.ingredients
        .map(id=>ingredients.find(item=>item.id===id)?.name)
        .filter(Boolean);

      showToast(names.join(" • "));
    });

    grid.appendChild(card);
  });
}

/* ================= INVENTORY ================= */

function renderInventory(){
  const grid=$("inventoryGrid");
  if(!grid) return;

  grid.className="inventory-grid";
  grid.innerHTML="";

  ingredients.forEach(item=>{
    const card=document.createElement("div");
    card.className="inventory-item";

    const title=createElement("strong","",item.emoji+" "+item.name);
    const stock=createElement("small","",`Available: ${item.stock}`);
    const category=createElement("small","",`Category: ${item.category}`);
    const shelf=createElement("small","",`Shelf life: ${item.shelfLife} days`);

    const button=createElement("button","eco-button pink","Restock +5");
    button.type="button";
    button.addEventListener("click",()=>restockIngredient(item.id));

    card.append(title,stock,category,shelf,button);
    grid.appendChild(card);
  });
}

function restockIngredient(id){
  const item=ingredients.find(i=>i.id===id);
  if(!item) return;

  const cost=15;

  if(player.coins<cost){
    showToast("Not enough coins! Complete more orders.");
    return;
  }

  player.coins-=cost;
  item.stock+=5;

  showToast(`${item.name} restocked! +5 📦`);
  updatePlayerDisplay();
  renderInventory();
  renderIngredients();
}

/* ================= FOOD RESCUE ================= */

function rescueIngredient(id){
  const item=ingredients.find(i=>i.id===id);
  if(!item||item.stock<=0){
    showToast("No available ingredient to rescue.");
    return;
  }

  item.stock--;
  player.rescuedFood++;
  player.healthyPoints+=5;

  updateMissionProgress(5,1);

  addXP(10);

  showToast(`${item.name} rescued! +10 XP ♻️`);
  guideSay(`Great job! You saved ${item.name} from being wasted. Every ingredient matters!`);

  renderInventory();
  renderSustainability();
  checkAchievements();
  updatePlayerDisplay();
}

function renderSustainability(){
  const stats=$("freshopiaStats");
  if(stats){
    stats.innerHTML=`
      <div class="eco-stat"><strong>${player.healthyPoints}</strong><small>🥑 Healthy Points</small></div>
      <div class="eco-stat"><strong>${player.rescuedFood}</strong><small>♻️ Ingredients Rescued</small></div>
      <div class="eco-stat"><strong>${player.foodWaste}</strong><small>🗑️ Food Waste</small></div>
      <div class="eco-stat"><strong>${player.perfectMeals}</strong><small>🌱 Healthy Meals</small></div>
    `;
  }

  const healthy=$("healthyStats");
  if(healthy){
    healthy.innerHTML=`
      <p>Healthy meals prepared: <strong>${player.perfectMeals}</strong></p>
      <p>Total healthy points: <strong>${player.healthyPoints}</strong></p>
      <div class="eco-progress"><span style="width:${Math.min(100,player.healthyPoints/5)}%"></span></div>
      <small>Reach 500 points to become a Healthy Kitchen Master!</small>
    `;
  }

  const rescue=$("foodRescueArea");
  if(rescue){
    rescue.innerHTML=`
      <p>Rescue suitable ingredients instead of wasting them.</p>
      <button class="eco-button" onclick="rescueRandomIngredient()">Rescue an Ingredient ♻️</button>
      <p>Ingredients rescued: <strong>${player.rescuedFood}</strong></p>
    `;
  }

  const challenges=$("ecoChallenges");
  if(challenges){
    challenges.innerHTML=`
      <div class="eco-challenge">
        <strong>🥑 Healthy Chef Challenge</strong>
        <p>Prepare 5 meals with a health score of 80 or higher.</p>
        <small>Progress: ${Math.min(player.perfectMeals,5)} / 5</small>
      </div>
      <div class="eco-challenge">
        <strong>♻️ Food Rescue Challenge</strong>
        <p>Rescue 10 available ingredients.</p>
        <small>Progress: ${Math.min(player.rescuedFood,10)} / 10</small>
      </div>
      <div class="eco-challenge">
        <strong>🌍 Sustainable Kitchen</strong>
        <p>Complete 10 orders and keep your food waste low.</p>
        <small>Progress: ${Math.min(player.completedOrders,10)} / 10</small>
      </div>
    `;
  }

  renderInventory();
}

function rescueRandomIngredient(){
  const available=ingredients.filter(item=>item.stock>0);

  if(available.length===0){
    showToast("No ingredients available to rescue!");
    return;
  }

  const item=available[Math.floor(Math.random()*available.length)];
  rescueIngredient(item.id);
}

/* ================= MISSIONS ================= */

function renderMissions(){
  const list=$("missionList");
  if(!list) return;

  list.innerHTML="";

  missions.forEach(mission=>{
    const completed=mission.progress>=mission.target;
    const card=document.createElement("div");

    card.className="mission-card"+(completed?" completed":"");

    card.innerHTML=`
      <h3>${completed?"✅":"🎯"} ${mission.title}</h3>
      <p>Progress: ${Math.min(mission.progress,mission.target)} / ${mission.target}</p>
      <p>Reward: ${mission.reward} coins</p>
      ${completed?"<strong>Mission completed!</strong>":""}
    `;

    list.appendChild(card);
  });
}

function updateMissionProgress(id,amount){
  const mission=missions.find(item=>item.id===id);
  if(!mission) return;

  const wasCompleted=mission.progress>=mission.target;
  mission.progress=Math.min(mission.target,mission.progress+amount);

  if(!wasCompleted&&mission.progress>=mission.target){
    player.coins+=mission.reward;
    showToast(`Mission completed! +${mission.reward} coins 🎯`);
    updatePlayerDisplay();
  }

  renderMissions();
  savePlayer();
}

/* ================= ACHIEVEMENTS ================= */

function renderAchievements(){
  const list=$("achievementList");
  if(!list) return;

  list.innerHTML="";

  achievements.forEach(achievement=>{
    const card=document.createElement("div");

    card.className="achievement-card "+achievement.tier.toLowerCase()+
      (achievement.unlocked?" unlocked":" locked");

    card.innerHTML=`
      <div class="achievement-medal">
        ${achievement.unlocked?achievement.medal:"🔒"}
      </div>
      <h3>${achievement.title}</h3>
      <span class="achievement-tier">${achievement.tier}</span>
      <p>${achievement.description}</p>
      <small>${achievement.unlocked?"UNLOCKED!":"LOCKED"}</small>
    `;

    list.appendChild(card);
  });
}

function checkAchievements(){
  const checks=[
    player.completedOrders>=1,
    player.completedOrders>=5,
    player.level>=3,
    player.healthyPoints>=200,
    player.rescuedFood>=5,
    player.rescuedFood>=10
  ];

  achievements.forEach((achievement,index)=>{
    if(checks[index]&&!achievement.unlocked){
      achievement.unlocked=true;
      showToast(`Achievement unlocked: ${achievement.title} 🏆`);
      player.xp+=10;
    }
  });

  while(player.xp>=player.level*100){
    player.xp-=player.level*100;
    player.level++;
    showLevelUp();
  }

  renderAchievements();
  updatePlayerDisplay();
}

/* ================= FOOD QUIZ ================= */

function renderPuzzle(){
  const area=$("puzzleGame");
  if(!area) return;

  const question=questions[Math.floor(Math.random()*questions.length)];
  currentPuzzleAnswer=question.answer;
  currentPuzzleCompleted=false;

  area.innerHTML=`
    <div class="puzzle-card">
      <h2>🧠 Healthy Food & Sustainability Quiz</h2>
      <p>${question.question}</p>
      <div id="puzzleOptions"></div>
      <p id="puzzleFeedback"></p>
      <button type="button" onclick="renderPuzzle()">Next Question ↻</button>
    </div>
  `;

  question.options.forEach(option=>{
    const button=document.createElement("button");
    button.textContent=option;
    button.type="button";
    button.addEventListener("click",()=>answerPuzzle(option));
    $("puzzleOptions").appendChild(button);
  });

  area.dataset.explanation=question.explanation;
}

function answerPuzzle(answer){
  const feedback=$("puzzleFeedback");
  if(!feedback||currentPuzzleCompleted) return;

  if(answer===currentPuzzleAnswer){
    currentPuzzleCompleted=true;
    feedback.textContent="Correct! "+$("puzzleGame").dataset.explanation+" +10 XP 🎉";
    addXP(10);
  }else{
    feedback.textContent="Not quite! Try again. 💗";
  }
}

/* ================= CHARACTERS ================= */

function renderCharacters(){
  const grid=$("characterGrid");
  if(!grid) return;

  const team=[
    {name:"Mika",role:"Your cooking guide",image:"mika.png"},
    {name:"Emma",role:"A friendly customer",image:"emma.png"},
    {name:"Oliver",role:"A food lover",image:"oliver.png"},
    {name:"Sophie",role:"A healthy food fan",image:""},
    {name:"Leo",role:"A sustainability lover",image:""}
  ];

  grid.innerHTML="";

  team.forEach(character=>{
    const card=document.createElement("div");
    card.className="character-card";

    if(character.image){
      const image=document.createElement("img");
      image.src=character.image;
      image.alt=character.name;
      image.loading="lazy";
      image.onerror=function(){this.style.display="none";};
      card.appendChild(image);
    }else{
      const avatar=createElement("div","character-emoji","👩🏻‍🍳");
      card.appendChild(avatar);
    }

    card.append(
      createElement("h3","",character.name),
      createElement("p","",character.role)
    );

    grid.appendChild(card);
  });
}

/* ================= TOAST MESSAGE ================= */

function showToast(message){
  const toast=$("toast");
  if(!toast){
    console.log(message);
    return;
  }

  toast.textContent=message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout=setTimeout(()=>toast.classList.remove("show"),2600);
}

/* ================= BUTTON ANIMATIONS ================= */

document.addEventListener("click",event=>{
  const button=event.target.closest("button");
  if(!button) return;

  if(button.textContent.trim().toLowerCase().includes("next")){
    mikaWave();
  }
});

window.addEventListener("load",()=>{
  mikaWave();
});
/* ==========================================
   FRESHOPIA - ZERO WASTE KITCHEN
========================================== */

const ecoKitchen = {
  rescued: 0,
  compost: 0,
  ecoPoints: 0,
  savedIngredients: [],
  completedChallenges: [],
  storageKnowledge: 0
};

const ecoChallenges = [
  {
    id: "rescue3",
    title: "Save 3 Ingredients",
    description: "Rescue 3 ingredients from being wasted.",
    target: 3,
    reward: 30
  },
  {
    id: "compost2",
    title: "Green Compost",
    description: "Create 2 compost portions.",
    target: 2,
    reward: 25
  },
  {
    id: "leftover1",
    title: "Creative Chef",
    description: "Prepare a leftover meal.",
    target: 1,
    reward: 40
  },
  {
    id: "storage2",
    title: "Smart Storage",
    description: "Learn 2 food storage tips.",
    target: 2,
    reward: 20
  }
];

const ecoProgress = {
  rescue3: 0,
  compost2: 0,
  leftover1: 0,
  storage2: 0
};

const storageTips = [
  {
    question: "Where should fresh lettuce be stored?",
    options: ["In the refrigerator", "In direct sunlight", "Next to a heater"],
    answer: "In the refrigerator",
    explanation: "Leafy vegetables generally stay fresh longer when refrigerated."
  },
  {
    question: "What is the best way to store dry pasta?",
    options: ["In a sealed, dry container", "In an open bowl", "In water"],
    answer: "In a sealed, dry container",
    explanation: "Keep dry pasta sealed in a cool, dry place."
  },
  {
    question: "How should raw chicken be stored?",
    options: ["Covered on the bottom shelf of the fridge", "Next to fresh fruit", "At room temperature"],
    answer: "Covered on the bottom shelf of the fridge",
    explanation: "Keep raw chicken covered and separate from ready-to-eat foods."
  },
  {
    question: "What should you do with leftovers?",
    options: ["Refrigerate promptly in covered containers", "Leave them out overnight", "Keep them in sunlight"],
    answer: "Refrigerate promptly in covered containers",
    explanation: "Refrigerate leftovers promptly and use them within safe storage times."
  }
];

function loadEcoKitchen() {
  try {
    const saved = localStorage.getItem("freshopiaEcoKitchen");

    if (saved) {
      const data = JSON.parse(saved);

      Object.assign(ecoKitchen, data.ecoKitchen || {});
      Object.assign(ecoProgress, data.ecoProgress || {});
    }
  } catch (error) {
    console.log("Starting a new Eco Kitchen.");
  }
}

function saveEcoKitchen() {
  try {
    localStorage.setItem("freshopiaEcoKitchen", JSON.stringify({
      ecoKitchen,
      ecoProgress
    }));
  } catch (error) {
    console.log("Eco Kitchen save unavailable.");
  }
}

function initializeEcoKitchen() {
  loadEcoKitchen();
  createEcoKitchenPanel();
  renderEcoKitchen();
}

function createEcoKitchenPanel() {
  if ($("zeroWastePanel")) return;

  const recipeGrid = $("recipeGrid");

  if (!recipeGrid || !recipeGrid.parentElement) {
    console.log("Recipe section not found.");
    return;
  }

  const panel = document.createElement("section");
  panel.id = "zeroWastePanel";
  panel.className = "zero-waste-panel";

  panel.innerHTML = `
    <div class="eco-header">
      <div>
        <span class="eco-label">FRESHOPIA GREEN PROJECT</span>
        <h2>🌱 Zero Waste Kitchen</h2>
        <p>Save ingredients, reduce food waste and become an Eco Chef!</p>
      </div>
      <div class="eco-leaf">♻️</div>
    </div>

    <div class="eco-stats">
      <div class="eco-stat">
        <span>🥕</span>
        <strong id="ecoRescued">0</strong>
        <small>Rescued</small>
      </div>
      <div class="eco-stat">
        <span>🌿</span>
        <strong id="ecoCompost">0</strong>
        <small>Compost</small>
      </div>
      <div class="eco-stat">
        <span>⭐</span>
        <strong id="ecoPoints">0</strong>
        <small>Eco Points</small>
      </div>
    </div>

    <div class="eco-content">
      <div class="eco-box">
        <h3>🥕 Food Rescue Station</h3>
        <p>Rescue ingredients and use them creatively instead of wasting them.</p>
        <div id="ecoIngredientList"></div>
      </div>

      <div class="eco-box">
        <h3>🍲 Leftover Kitchen</h3>
        <p>Combine two rescued ingredients to create a surprise meal.</p>
        <div id="ecoLeftoverInfo"></div>
        <button id="ecoLeftoverButton" class="eco-button">
          Create Leftover Meal
        </button>
      </div>

      <div class="eco-box">
        <h3>♻️ Compost Bin</h3>
        <p>Turn suitable vegetable scraps into compost for the garden.</p>
        <div class="eco-compost-art">🌱 🥬 🍂</div>
        <button id="ecoCompostButton" class="eco-button">
          Add Vegetable Scraps
        </button>
      </div>

      <div class="eco-box">
        <h3>🧊 Smart Storage School</h3>
        <p>Learn how to store food safely and keep ingredients fresh.</p>
        <div id="ecoStorageQuestion"></div>
        <div id="ecoStorageFeedback"></div>
      </div>
    </div>

    <div class="eco-box eco-challenges">
      <h3>🏆 Eco Chef Challenges</h3>
      <div id="ecoChallengeList"></div>
    </div>
  `;

  const style = document.createElement("style");
  style.id = "zeroWasteStyles";

  style.textContent = `
    .zero-waste-panel {
      margin: 28px 0;
      padding: 24px;
      border-radius: 24px;
      background: linear-gradient(145deg,#f0faed,#fff7fa);
      border: 1px solid #d8ebd3;
      color: #45634a;
    }

    .eco-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .eco-label {
      font-size: 11px;
      letter-spacing: 2px;
      font-weight: bold;
      color: #82a77a;
    }

    .eco-header h2 {
      margin: 8px 0;
      color: #547b59;
    }

    .eco-header p, .eco-box p {
      color: #718475;
      line-height: 1.5;
    }

    .eco-leaf {
      font-size: 48px;
    }

    .eco-stats {
      display: grid;
      grid-template-columns: repeat(3,minmax(0,1fr));
      gap: 12px;
      margin: 22px 0;
    }

    .eco-stat {
      text-align: center;
      background: white;
      padding: 15px 8px;
      border-radius: 16px;
      box-shadow: 0 4px 12px #547b5912;
    }

    .eco-stat span {
      display: block;
      font-size: 23px;
    }

    .eco-stat strong {
      display: block;
      font-size: 22px;
      margin: 5px;
      color: #5d9365;
    }

    .eco-stat small {
      color: #849285;
    }

    .eco-content {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
      gap: 15px;
    }

    .eco-box {
      background: rgba(255,255,255,.92);
      border: 1px solid #e0eedc;
      padding: 17px;
      border-radius: 18px;
      margin-bottom: 15px;
    }

    .eco-box h3 {
      color: #587c5d;
      margin-top: 0;
    }

    .eco-ingredient {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 9px 0;
      border-bottom: 1px solid #edf3eb;
    }

    .eco-ingredient button {
      border: 0;
      background: #e4f2df;
      color: #507b55;
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
      font-weight: bold;
    }

    .eco-button {
      width: 100%;
      border: 0;
      border-radius: 12px;
      padding: 12px;
      background: linear-gradient(135deg,#8ebd86,#b8dcb1);
      color: white;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
    }

    .eco-button:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .eco-compost-art {
      font-size: 30px;
      text-align: center;
      padding: 12px;
    }

    .eco-option {
      display: block;
      width: 100%;
      text-align: left;
      border: 1px solid #dcebd8;
      border-radius: 10px;
      background: #f8fcf6;
      color: #527457;
      padding: 9px;
      margin: 7px 0;
      cursor: pointer;
    }

    .eco-challenge {
      padding: 12px 0;
      border-bottom: 1px solid #e6eee3;
    }

    .eco-challenge strong {
      color: #527b58;
    }

    .eco-progress {
      height: 8px;
      background: #e7eee4;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 8px;
    }

    .eco-progress span {
      display: block;
      height: 100%;
      background: #91c48b;
      border-radius: 10px;
    }

    @media(max-width:480px) {
      .zero-waste-panel {
        padding: 15px;
      }
      .eco-stats {
        gap: 7px;
      }
    }
  `;

  document.head.appendChild(style);
  recipeGrid.parentElement.insertBefore(panel, recipeGrid);
  
  $("ecoCompostButton").addEventListener("click", createCompost);
  $("ecoLeftoverButton").addEventListener("click", createLeftoverMeal);
}

function renderEcoKitchen() {
  if (!$("zeroWastePanel")) return;

  setText("ecoRescued", ecoKitchen.rescued);
  setText("ecoCompost", ecoKitchen.compost);
  setText("ecoPoints", ecoKitchen.ecoPoints);

  renderEcoIngredients();
  renderEcoLeftover();
  renderEcoChallenges();

  if (!$("ecoStorageQuestion").innerHTML.trim()) {
    renderStorageQuestion();
  }

  const leftoverButton = $("ecoLeftoverButton");

  if (leftoverButton) {
    leftoverButton.disabled = ecoKitchen.savedIngredients.length < 2;
  }

  saveEcoKitchen();
}

function renderEcoIngredients() {
  const area = $("ecoIngredientList");
  if (!area) return;

  area.innerHTML = "";

  ingredients.forEach((ingredient, index) => {
    const alreadySaved = ecoKitchen.savedIngredients.includes(ingredient.id);
    const alreadyRescued = ecoKitchen.rescuedIngredients?.includes(ingredient.id);

    const row = document.createElement("div");
    row.className = "eco-ingredient";

    const name = document.createElement("span");
    name.textContent = `${["🥬","🥕","🍅","🥔","🌿"][index % 5]} ${ingredient.name}`;

    const button = document.createElement("button");

    if (alreadySaved) {
      button.textContent = "Saved ✓";
      button.disabled = true;
    } else if (alreadyRescued) {
      button.textContent = "Used ✓";
      button.disabled = true;
    } else {
      button.textContent = "Rescue +";
      button.addEventListener("click", () => rescueEcoIngredient(ingredient.id));
    }

    row.appendChild(name);
    row.appendChild(button);
    area.appendChild(row);
  });
}

function rescueEcoIngredient(id) {
  if (!ecoKitchen.rescuedIngredients) {
    ecoKitchen.rescuedIngredients = [];
  }

  if (ecoKitchen.rescuedIngredients.includes(id)) return;

  ecoKitchen.rescuedIngredients.push(id);
  ecoKitchen.savedIngredients.push(id);
  ecoKitchen.rescued++;
  ecoKitchen.ecoPoints += 10;

  ecoProgress.rescue3++;

  showToast("Ingredient rescued! +10 Eco Points 🌱");

  checkEcoChallenges();
  renderEcoKitchen();
}

function renderEcoLeftover() {
  const area = $("ecoLeftoverInfo");
  if (!area) return;

  const savedNames = ecoKitchen.savedIngredients
    .map(id => ingredients.find(item => item.id === id)?.name)
    .filter(Boolean);

  area.textContent = savedNames.length
    ? "Available ingredients: " + savedNames.join(", ")
    : "Rescue at least 2 ingredients to create a meal.";
}

function createLeftoverMeal() {
  if (ecoKitchen.savedIngredients.length < 2) {
    showToast("Rescue at least 2 ingredients first!");
    return;
  }

  const used = ecoKitchen.savedIngredients.splice(0, 2);

  const names = used.map(id =>
    ingredients.find(item => item.id === id)?.name
  ).filter(Boolean);

  ecoKitchen.ecoPoints += 25;
  ecoProgress.leftover1++;

  player.coins += 15;
  player.xp += 10;

  updatePlayerDisplay();

  showToast("Creative leftover meal: " + names.join(" + ") + " 🍲");

  checkEcoChallenges();
  renderEcoKitchen();
}

function createCompost() {
  ecoKitchen.compost++;
  ecoKitchen.ecoPoints += 10;
  ecoProgress.compost2++;

  showToast("Vegetable scraps turned into compost! +10 Eco Points 🌿");

  checkEcoChallenges();
  renderEcoKitchen();
}

function renderStorageQuestion() {
  const area = $("ecoStorageQuestion");
  if (!area) return;

  const question = storageTips[
    Math.floor(Math.random() * storageTips.length)
  ];

  area.innerHTML = `
    <p><strong>${question.question}</strong></p>
    <div id="ecoStorageOptions"></div>
  `;

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "eco-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      const feedback = $("ecoStorageFeedback");

      if (option === question.answer) {
        feedback.textContent = "Correct! " + question.explanation;
        ecoKitchen.storageKnowledge++;
        ecoKitchen.ecoPoints += 10;
        ecoProgress.storage2++;
        showToast("Smart Storage learned! +10 Eco Points 🧊");
        checkEcoChallenges();
      } else {
        feedback.textContent = "Not quite! " + question.explanation;
      }

      document.querySelectorAll("#ecoStorageOptions button").forEach(btn => {
        btn.disabled = true;
      });

      saveEcoKitchen();
      renderEcoKitchen();
    });

    $("ecoStorageOptions").appendChild(button);
  });
}

function renderEcoChallenges() {
  const area = $("ecoChallengeList");
  if (!area) return;

  area.innerHTML = "";

  ecoChallenges.forEach(challenge => {
    const progress = Math.min(
      ecoProgress[challenge.id] || 0,
      challenge.target
    );

    const completed = ecoKitchen.completedChallenges.includes(challenge.id);

    const card = document.createElement("div");
    card.className = "eco-challenge";

    card.innerHTML = `
      <strong>${completed ? "✅" : "🎯"} ${challenge.title}</strong>
      <p>${challenge.description}</p>
      <small>${progress} / ${challenge.target} · Reward: ${challenge.reward} coins</small>
      <div class="eco-progress">
        <span style="width:${progress / challenge.target * 100}%"></span>
      </div>
      ${completed ? "<small>Challenge completed!</small>" : ""}
    `;

    area.appendChild(card);
  });
}

function checkEcoChallenges() {
  ecoChallenges.forEach(challenge => {
    const progress = ecoProgress[challenge.id] || 0;

    if (
      progress >= challenge.target &&
      !ecoKitchen.completedChallenges.includes(challenge.id)
    ) {
      ecoKitchen.completedChallenges.push(challenge.id);
      player.coins += challenge.reward;
      ecoKitchen.ecoPoints += 15;

      showToast(
        "Eco Challenge completed! +" +
        challenge.reward +
        " coins 🏆"
      );

      updatePlayerDisplay();
    }
  });

  saveEcoKitchen();
  renderEcoChallenges();
}

document.addEventListener("DOMContentLoaded", initializeEcoKitchen);
