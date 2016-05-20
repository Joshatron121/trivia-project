var categoriesArray = ['Select Category', 'Select Category', 'Select Category', 'Select Category', 'Select Category', 'Select Category'];
// var categoriesArray = []
var playerList = [];

// initialize a new builder function that will create the board when called.
var builder = function(array){
  // added: Kent
var category = array.length;
  //clear anything already in the board
  $('#board').empty();
  // loop through this function 6 times (one for each row)
  for (var i = 1; i <= 6; i++ ) {
    // on each loop create a new row of the board
    // append the row
    // if the row is 1, fill with array of passed text
    if (i === 1) {
      $('#board').append('<div class="row row-' + 
        // added: Changes made by Kent
        i + '"><div class="col-xs-2 col-sm-2 col-md-2 column-1 choice-field"><div class="choice-cat">' + 
        array[category - 1] + '</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-2 choice-field"><div class="choice-cat">' + 
        array[category - 2] + '</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-3 choice-field"><div class="choice-cat">' + 
        array[category - 3] + '</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-4 choice-field"><div class="choice-cat">' + 
        array[category - 4] + '</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-5 choice-field"><div class="choice-cat">' + 
        array[category - 5] + '</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-6 choice-field"><div class="choice-cat">' + 
        array[category - 6] + '</div></div></div>')
    // else fill with i - 1 hundreds of dollars
    } else {
      $('#board').append('<div class="row row-' + i + '"><div class="col-xs-2 col-sm-2 col-md-2 column-1 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-2 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-3 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-4 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-5 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div><div class="col-xs-2 col-sm-2 col-md-2 column-6 choice-field"><div class="choice-text">$' + (i-1) + '00</div></div></div>')
    }
  }
}

var setNumber = undefined

$('.player-selection-buttons').on('click','button',function(){
  if ($(this).hasClass('two-players')){
    playerNameSelectionBuilder.buildPlayerSelectLayout(2);
    playerNameSelectionBuilder.buildPlayerInput(2);
    setNumber = getNumber(2) // gets number of players and stores it into a closer to be used later.
  } else if ($(this).hasClass('three-players')){
    playerNameSelectionBuilder.buildPlayerSelectLayout(3);
    playerNameSelectionBuilder.buildPlayerInput(3)
    setNumber = getNumber(3)
  
  } else {
    playerNameSelectionBuilder.buildPlayerSelectLayout(4);
    playerNameSelectionBuilder.buildPlayerInput(4)
    setNumber = getNumber(4) 
  }
})

var playerFactory = function(name, id){
  return {
    id: id,
    name: name,
    score: 0,
  }
}
// gets number of players and stores it into a closer to be used later.
var getNumber = function(num) {
  var numPlayers = num;
  return function(){
    for (var k = 1; k <= numPlayers; k++) {
      if ($('#name-select-' + k).val() === '') {
        playerList = []
        $('.name-check-alert').show()
      } else {
      playerList[k-1] = (playerFactory($('#name-select-' + k).val(),k))
      }
      if(playerList.length === numPlayers) {
        $('#setupModal').modal('hide');
      }
    }
  }
}



$('.submit-name-button').click(function(){
  playerList = []
  setNumber()
  playerNameSelectionBuilder.buildPlayerBoards(playerList)
});

var playerNameSelectionBuilder = {
  buildPlayerInput: function(num){
    if (num === 3) {
      for (var i = 1; i <= num; i++) {
        $('.name-column-' + i).append('<input type="text" class="form-control" id="name-select-' + i + '" placeholder="Enter Name"></div>')
      }
    } else {
      for (var j = 1; j <= num; j++) {
        $('.name-column-' + j).append('<input type="text" class="form-control" id="name-select-' + j + '" placeholder="Enter Name">')
      }
    }
  },
  buildPlayerSelectLayout: function(num){
    $('.name-selection').empty()
  if (num === 3){
    $('.name-selection').append('<div class="row"><div class="col-xs-4 col-sm-4 col-md-4 name-column-1"></div><div class="col-xs-4 col-sm-4 col-md-4 name-column-2"></div><div class="col-xs-4 col-sm-4 col-md-4 name-column-3"></div></div>')
  } else {
    $('.name-selection').append('<div class="row"><div class="col-xs-3 col-sm-3 col-md-3 name-column-3"></div><div class="col-xs-3 col-sm-3 col-md-3 name-column-1"></div><div class="col-xs-3 col-sm-3 col-md-3 name-column-2"></div><div class="col-xs-3 col-sm-3 col-md-3 name-column-4"></div></div>')
  }
  $('.name-selection, .submit-names').show()
  },
  buildPlayerBoards: function(list){
    $('#playerBoards .row').empty();
    if (playerList.length === 3){
      for (var i = 0; i < playerList.length; i++){
        $('#playerBoards > .row').append('<div class="col-md-4"><div class="row"><span class="player-' +(i + 1) + '-name">' + playerList[i].name + '</span></div><div class="row"><span class="player-' + (i + 1) + '-score">' + playerList[i].score +'</span></div>')
      }
    } else {
      for (var i = 0; i < playerList.length; i++){
        $('#playerBoards > .row').append('<div class="col-md-3"><div class="row"><span class="player-' + (i + 1) + '-name">' + playerList[i].name + '</span></div><div class="row"><span class="player-' + (i + 1) + '-score">' + playerList[i].score +'</span></div></div>')
      }
    }
  }
}
var categoriesSetup = []
var boardLayout = {}
var thisValue = 0
var catInsert = function() {
  var categories = $.get('http://jservice.io/api/categories?count=6&offset=' + Math.floor(Math.random() * 10000)).success(buildCategories);
}


$('#board').on('click','.choice-field',function(){
  for (var i = 1; i <= 6; i++) {
    if ($(this).hasClass('column-' + i)) {
      thisValue = ($(this).text().slice(1,2))
      $(this).html('&nbsp;')
      console.log(boardLayout.id[i-1])
      var clues = $.get('http://jservice.io/api/category?id=' + boardLayout.id[i -1]).success(setClues);      
    }
  }
})
var setClues = function(clueData) {
  boardLayout.clues = clueData.clues
  console.log(boardLayout.clues[thisValue - 1])
  var thisQuestion = boardLayout.clues[thisValue - 1].question
  var thisAnswer = boardLayout.clues[thisValue - 1].answer
  initializeQuestion(thisQuestion, thisAnswer)
  $('.submit-answer-button').click(function(){
    var userAnswer = $('#input-answer').val()
    console.log(userAnswer)
    if(userAnswer === '') {
      $('.submit-check-alert').show()
    } else if (userAnswer.toLowerCase === thisAnswer.toLowerCase) {
        playerList[buzzedPlayer - 1].score += (thisValue * 100)
        playerNameSelectionBuilder.buildPlayerBoards(playerList)
        $('#questionModal').modal('hide')
    }
  })
}

var buildCategories = function(categoryData) {
  categoriesSetup = categoryData
  boardLayout = {
    id: [],
    clues: [{
      category1: [],
      category2: [],
      category3: [],
      category4: [],
      category5: [],
      category6: []
    }],
  }
  for (var i = 0; i < categoryData.length; i++) {
    categoriesArray.pop()
    categoriesArray.unshift(categoryData[i].title.toUpperCase())
    boardLayout.id.push(categoryData[i].id)
  }
  builder(categoriesArray)
}

var buzzedPlayer = 0
var initializeQuestion = function(question, answer) {
  $('.question-field').text(question + '.')
  $('#questionModal').modal({
    keyboard: false,
    backdrop: 'static',
  });
  $('#questionModal').keyup(function(event) {
    if (event.which === 65) {
      // Player 1
      buzzedPlayer = 1
      hideStuff()
    } else if (event.which === 101) {
      // Player 2
      buzzedPlayer = 2
      hideStuff()
    } else if (event.which === 32) {
      // Player 3
      buzzedPlayer = 3
      hideStufF()
    } else if (event.which === 76) {
      // Player 4
      buzzedPlayer = 4
      hideStuff()
    } else {
    }
    console.log(buzzedPlayer)
  })
  console.log(question)
  console.log(answer)
}

var hideStuff = function(){
  $('.info').hide();
  $('.instruction').hide();
  $('.answer-input').show();
  $('.answer-button').show();
}

