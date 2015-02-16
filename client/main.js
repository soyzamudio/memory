'use strict';
/* global _ */
$(document).ready(init);
function init() {
  createCards();
  lineUpCards();
  $('.card').click(flipCard);
  $('#timer').click(startTimer);
  $('#time').text(seconds);
  $('#myModal').modal();
}

var cards = [];
var opened = [];
var matched = [];
var flipped = 0;
var seconds = 60;
var timer;
var isRunning = false;

function startTimer() {
  timer = setInterval(countDown, 1000);
  isRunning = true;
}

function countDown() {
  seconds--;
  if (seconds < 0) {
    seconds = 0;
    clearInterval(timer);
    isRunning = false;
    displayModal('YOU LOST!', 'You can do better than that!');
    seconds = 60;
  }
  $('#time').text(seconds);
}

function flipCard() {
  if (flipped < 2 && _.find(cards, _.matchesProperty($(this).attr('id'))) && isRunning) {
    $(this).addClass('animated flipInY');
    $(this).css('opacity', '1');
    flipped++;
    opened.push($(this));
    if (opened.length === 2) {
      checkMatch(opened);
      opened = [];
      flipped = 0;
    }
  }
}

function checkMatch(array) {
  if (array[0].attr('id') === array[1].attr('id')) {
    array.forEach(function(e) {
      matched.push(_.remove(cards, function(c) { return c.name === e.attr('id'); })[0]);
    });
    if (cards.length === 0) {
      clearInterval(timer);
      seconds = 60;
      displayModal('YOU WON!', 'Great job! You should try it again!');
    }
  } else {
    array.forEach(function(e) {
      e.removeClass('flipInY');
      e.fadeTo(400, 0);
    });
  }
}

function createCards() {
  var c1 = {name: 'barcelona', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3Gzo2NA9daDJyzNeNsY60SlJc7Dj7vlrYTQxYXIYo--wgjYLRMW164AE'};
  var c2 = {name: 'real',  image: 'http://www.soccermaniak.com/images/real-madrid-logo-history-2001.jpg'};
  var c3 = {name: 'chelsea', image: 'http://www.logoeps.com/wp-content/uploads/2011/08/chelsea-logo-vector.png'};
  var c4 = {name: 'manchester', image: 'http://img4.wikia.nocookie.net/__cb20120420192747/fifa/images/2/26/Manchester_United_logo.png'};
  var c5 = {name: 'arsenal', image: 'http://cdns2.freepik.com/free-photo/arsenal-logo-vector-material_15-5413.jpg'};
  var c6 = {name: 'liverpool', image: 'http://sabotagetimes.com/wp-content/uploads/photo-31.jpg'};
  var c7 = {name: 'juventus', image: 'http://www.logoeps.com/wp-content/uploads/2012/02/juventus-fc-logo-vector.jpg'};
  var c8 = {name: 'milan', image: 'http://cf.juggle-images.com/matte/white/280x280/ac-milan-logo-primary.jpg'};
  var c9 = {name: 'inter', image: 'http://www.collective-behavior.com/wp-content/uploads/2014/11/Inter.png'};
  var c10 = {name: 'america', image: 'http://myteamface.com/wp-content/uploads/2013/05/Club-America-logo-tattoo212.jpg'};
  cards.push(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
  cards.push(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
}

function lineUpCards() {
  var array = _.shuffle(cards);
  for (var i = 0; i < array.length; i++) {
    var $card = $('<div>');
    $card.addClass('col-sm-3');
    $card.addClass('outer');
    $card.addClass('bordered');
    var $inner = $('<div>');
    $inner.attr('id', array[i].name);
    $inner.addClass('card animated');
    $inner.css('background-image', 'url("' + array[i].image + '")');
    $card.append($inner);
    $('#cards').append($card);
  }
}

function displayModal(title, message) {
  $('#myModalLabel').text(title);
  $('#message').text(message);
  $('#myModal').modal();
  $('#cards').empty();
  _.shuffle(cards);
  createCards();
  lineUpCards();
}
