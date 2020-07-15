"use strict";
var TITLES = [
  "отель1",
  "отель2",
  "отель3",
  "отель4",
  "отель5",
  "отель6",
  "отель7",
  "отель8",
];
var TYPES = ["palace", "flat", "bungalo", "house"];
var CHECKIN = ["12:00", "13:00", "14:00"];
var CHECKOUT = ["12:00", "13:00", "14:00"];
var DESCRIPTONS = [
  "about",
  "about2",
  "about3",
  "about4",
  "about5",
  "about6",
  "about7",
  "about8",
];
var FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
var PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 22;

var objects = [];

function generateRandomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomStringFromArray(array) {
  var randomArray = [];
  var randomCount = Math.ceil(Math.random() * array.length);

  for (var i = 0; i < randomCount; i += 1) {
    randomArray.push(array[i]);
  }

  return randomArray.toString();
}

var createNewObjs = function (count) {
  for (var i = 0; i < count; i += 1) {
    objects.push({
      author: { avatar: `img/avatars/user0${i + 1}.png` },
      offer: {
        title: TITLES[i],
        address: [
          generateRandomNumberFromInterval(100, 1000),
          generateRandomNumberFromInterval(100, 1000),
        ].toString(),
        price: generateRandomNumberFromInterval(100, 1000),
        type: TYPES[generateRandomNumberFromInterval(0, 4)],
        rooms: generateRandomNumberFromInterval(0, 10),
        guests: generateRandomNumberFromInterval(0, 10),
        checkin: CHECKIN[generateRandomNumberFromInterval(0, 3)],
        checkout: CHECKOUT[generateRandomNumberFromInterval(0, 3)],
        features: generateRandomStringFromArray(FEATURES),
        description: DESCRIPTONS[i],
        photos: generateRandomStringFromArray(PHOTOS),
      },
      location: {
        x: generateRandomNumberFromInterval(100, 980) - PIN_WIDTH / 2,
        y: generateRandomNumberFromInterval(130, 630) - PIN_HEIGHT,
      },
    });
  }
  return objects;
};

//вторая часть задания DOM

var pin = document.querySelector(".map__pins");
var fragment = document.createDocumentFragment();
var pinsArray = [];
var objectsArray = createNewObjs(8);

function createPinsFromObjects(objects) {
  for (var i = 0; i < objects.length; i += 1) {
    var newBtn = document.createElement("button");
    var img = document.createElement("img");
    newBtn.className = "map__pin";
    newBtn.style.left = objects[i].location.x + "px";
    newBtn.style.top = objects[i].location.y + "px";
    img.src = objects[i].author.avatar;
    img.width = 50;
    img.height = 50;
    img.alt = objects[i].offer.title;
    img.style.top = 0;
    newBtn.appendChild(img);
    pinsArray.push(newBtn);
  }
}

function addedPinsInParentNode(pins) {
  for (var i = 0; i < pins.length; i += 1) {
    fragment.appendChild(pins[i]);
  }
  pin.appendChild(fragment);
}

createPinsFromObjects(objectsArray);
addedPinsInParentNode(pinsArray);
