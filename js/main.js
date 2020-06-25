'use strict';
var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png',
  'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['отель1', 'отель2', 'отель3', 'отель4', 'отель5', 'отель6', 'отель7', 'отель8'];
var ADDRESS = ['600 350', '500 400', '550 300', '630 340', '570 380', '620 380', '670 580', '550 330'];
var PRICE = [200, 300, 400, 500, 600, 700, 800, 900];
var TYPE = ['palace', 'flat', 'bungalo', 'house'];
var ROOMS = [2, 4, 8, 5];
var GUESTS = [1, 2, 3, 4];
var CHECKIN = ['12:00', '12:30', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
var CHECKOUT = ['14:00', '15:00', '13:00', '11:00', '17:00', '10:00', '10:30', '12:30'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTON = ['about', 'about2', 'about3', 'about4', 'about5', 'about6', 'about7', 'about8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION = [7, 5];

var objects = [];

var createNewObj = function (avatar, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, location) {
  return {
    author: {avatar: avatar},
    offer: {
      title: title,
      address: address,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos
    },
    location: {
      x: '',
      y: ''
    }
  };
};


var createArrObjects = function (arrLength, avatarProp, titleProp, addressProp, priceProp, typeProp, roomsProp, guestsProp, checkinProp, checkoutProp, featuresProp, descriptionProp, photosProp) {
  for (var i = 0; i < arrLength; i += 1) {
    var avatar = avatarProp[i];
    var title = titleProp[i];
    var address = addressProp[i];
    var price = priceProp[Math.floor(Math.random() * 8)];
    var type = typeProp[Math.floor(Math.random() * 4)];
    var rooms = roomsProp[Math.floor(Math.random() * 4)];
    var guests = guestsProp[Math.floor(Math.random() * 4)];
    var checkin = checkinProp[Math.floor(Math.random() * 8)];
    var checkout = checkoutProp[Math.floor(Math.random() * 8)];
    var features = featuresProp[Math.floor(Math.random() * 6)];
    var photos = photosProp[Math.floor(Math.random() * 3)];
    var description = descriptionProp[i];
    objects.push(createNewObj(avatar, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos));
  }
};

createArrObjects(8, AVATAR, TITLE, ADDRESS, PRICE, TYPE, ROOMS, GUESTS, CHECKIN, CHECKOUT, FEATURES, DESCRIPTON, PHOTOS);
console.log(objects);