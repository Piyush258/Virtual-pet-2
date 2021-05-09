//Create variables here
var d, happyDog, database, foodS, foodStock;
var Dog;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var milk,milkImg;

function preload()
{
  //load images here
  d = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  milkImg = loadImage("Milk.png");
}

function setup() {
	createCanvas(600, 500);
  Dog = createSprite(250,300,10,10);
  Dog.addImage(d);
  Dog.scale = 0.25;

  foodObj = new Food();
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 139, 87);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12 && lastFed != undefined){
    text("Last feed :"+ lastFed%12 + "PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed + "AM",350,30);
  }
  foodObj.display();
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  Dog.addImage(happyDog);
  milk = createSprite(170, 360, 10, 10);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
  
}
