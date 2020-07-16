'use strict';
var TITLES = [
  'отель1',
  'отель2',
  'отель3',
  'отель4',
  'отель5',
  'отель6',
  'отель7',
  'отель8',
];
var TYPES = ['palace', 'flat', 'bungalo', 'house'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var DESCRIPTONS = [
  'about',
  'about2',
  'about3',
  'about4',
  'about5',
  'about6',
  'about7',
  'about8',
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 22;

var INTERVALS = {
  locationX: {
    min: 100,
    max: 980
  },
  locationY: {
    min: 130,
    max: 630
  },
  price: {
    min: 100,
    max: 1000
  },
  types: {
    min: 0,
    max: 4
  },
  roomsAndGuests: {
    min: 1,
    max: 10
  },
  chekinAndCheckout: {
    min: 0,
    max: 3
  }
};


function generateRandomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomArray(array) {
  var randomArray = [];
  var randomCount = Math.ceil(Math.random() * array.length);

  for (var i = 0; i < randomCount; i++) {
    randomArray.push(array[i]);
  }

  return randomArray;
}

var createNewPinsArray = function (count) {
  var objects = [];
  for (var i = 0; i < count; i += 1) {
    var locX = generateRandomNumberFromInterval(INTERVALS.locationX.min, INTERVALS.locationX.max) - PIN_WIDTH / 2;
    var locY = generateRandomNumberFromInterval(INTERVALS.locationY.min, INTERVALS.locationY.max) - PIN_HEIGHT;
    objects.push({
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {
        title: TITLES[i],
        address: locX + ' ' + locY,
        price: generateRandomNumberFromInterval(INTERVALS.price.min, INTERVALS.price.max),
        type: TYPES[generateRandomNumberFromInterval(INTERVALS.types.min, INTERVALS.types.max)],
        rooms: generateRandomNumberFromInterval(INTERVALS.roomsAndGuests.min, INTERVALS.roomsAndGuests.max),
        guests: generateRandomNumberFromInterval(INTERVALS.roomsAndGuests.min, INTERVALS.roomsAndGuests.max),
        checkin: CHECKIN[generateRandomNumberFromInterval(INTERVALS.chekinAndCheckout.min, INTERVALS.chekinAndCheckout.max)],
        checkout: CHECKOUT[generateRandomNumberFromInterval(INTERVALS.chekinAndCheckout.min, INTERVALS.chekinAndCheckout.max)],
        features: generateRandomArray(FEATURES),
        description: DESCRIPTONS[i],
        photos: generateRandomArray(PHOTOS),
      },
      location: {
        x: locX,
        y: locY,
      },
    });
  }
  return objects;
};

// вторая часть задания DOM

var pin = document.querySelector('.map__pins');
var pinsArray = [];
var objectsArray = createNewPinsArray(8);

function createPinsFromArray(objectsPins) {
  objectsPins.forEach(function (item) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var element = templatePin.cloneNode(true);
    element.style.left = item.location.x + 'px';
    element.style.top = item.location.y + 'px';
    element.children[0].src = item.author.avatar;
    element.children[0].alt = item.offer.title;
    pinsArray.push(element);
  });
}

function addedPinsInParentNode(pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
  }
  pin.appendChild(fragment);
}

createPinsFromArray(objectsArray);
addedPinsInParentNode(pinsArray);

var popupsArray = [];
var popup = document.querySelector('.map');

function createPopup() {
  var templatePopup = document.querySelector('#card').content.querySelector('.map__card, .popup');
  var element = templatePopup.cloneNode(true);
  var avatar = objectsArray[0].author.avatar;
  var title = objectsArray[0].offer.title;
  var address = objectsArray[0].offer.address;
  var price = objectsArray[0].offer.price;
  var type = objectsArray[0].offer.type;
  var rooms = objectsArray[0].offer.rooms;
  var guests = objectsArray[0].offer.guests;
  var checkin = objectsArray[0].offer.checkin;
  var checkout = objectsArray[0].offer.checkout;
  var features = objectsArray[0].offer.features;
  var description = objectsArray[0].offer.description;
  var photos = objectsArray[0].offer.photos;

  element.children[0].src = avatar;
  element.children[2].textContent = title;
  element.children[3].textContent = address;
  element.children[4].textContent = price + ' ₽/ночь';
  switch (type) {
    case 'palace':
      element.children[5].textContent = 'Дворец';
      break;
    case 'flat':
      element.children[5].textContent = 'Квартира';
      break;
    case 'bungalo':
      element.children[5].textContent = 'Бунгало';
      break;
    case 'house':
      element.children[5].textContent = 'Дом';
      break;
  }
  element.children[6].textContent = rooms + ' комнаты для ' + guests + ' гостей';
  element.children[7].textContent = 'Заезд после ' + checkin + ' , выезд до ' + checkout;
  var featuresArray = element.children[8].children;
  for (var i = 0; i < featuresArray.length; i++) {
    featuresArray[i].style.display = 'none';
  }
  features.forEach(function (item) {
    switch (item) {
      case 'wifi':
        element.children[8].children[0].style.display = 'inline-block';
        break;
      case 'dishwasher':
        element.children[8].children[1].style.display = 'inline-block';
        break;
      case 'parking':
        element.children[8].children[2].style.display = 'inline-block';
        break;
      case 'washer':
        element.children[8].children[3].style.display = 'inline-block';
        break;
      case 'elevator':
        element.children[8].children[4].style.display = 'inline-block';
        break;
      case 'conditioner':
        element.children[8].children[5].style.display = 'inline-block';
        break;
    }
  });
  element.children[9].textContent = description;
  for (var j = 0; j < objectsArray[0].offer.photos.length; j++) {
    if (j === 0) {
      element.children[10].children[0].src = photos[0] + '';
    } else {
      var newImg = document.createElement('img');
      newImg.src = photos[j] + '';
      newImg.className = 'popup__photo';
      newImg.style.width = '45px';
      newImg.style.height = '40px';
      newImg.alt = 'Фотография жилья';
      element.children[10].appendChild(newImg);
    }
  }
  popupsArray.push(element);
}

function addedPopupInParentNode(popups) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < popups.length; i++) {
    fragment.appendChild(popups[i]);
  }
  popup.appendChild(fragment);
}


createPopup();
addedPopupInParentNode(popupsArray);
