
const BASE_URL = "http://localhost:3000"
const PLAYERS_URL = `${BASE_URL}/players`
const HANDS_URL = `${BASE_URL}/hands`

document.addEventListener('DOMContentLoaded', function(){
    fetch(PLAYERS_URL)
        .then(response => response.json())
        .then(all_players => {
            console.log(all_players)
            createAllPlayerCards(all_players);
            addReleaseButtonEvents();
            addHandsButtonEvents();
        });
});

function addHandsButtonEvents(){
    document.querySelectorAll('div.card > button').forEach(button => {
        button.addEventListener('click', addHands)
    });
}

function addHands(){
    console.log('adding')
    let player_id = this.getAttribute('data-player-id')

    let formData = {
        player_id: player_id
    }

    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        },
        body: JSON.stringify(formData)
    }

    fetch(HANDS_URL, config)
        .then(response => response.json())
        .then(object => {
            document.querySelector(`div.card[data_id="${object.player_id}"] ul`).appendChild(createHandListItem(object))
        })
        .catch(error => alert(error.message))
}

function releaseHand(){

    let handID = this.getAttribute('data_hand_id');

    let config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    fetch(`${HANDS_URL}/${handID}`, config)
        .then( response => {
            return response.json()
        })
        .then( object => {
            document.querySelector(`button.release[data_hand_id = "${object.id}"]`).parentNode.remove();
        })
        .catch( error => {
            console.log(error)
        });
}

function addReleaseButtonEvents(){
    document.querySelectorAll('button.release').forEach(button => {
        button.addEventListener('click', releaseHand)
    });
}

function createAllPlayerCards(all_players){
    let players_container = document.querySelector('main')
    all_players.forEach(function(player){
        players_container.appendChild(createPlayerCard(player))
    });
}

function createPlayerCard(player){
    let new_card = document.createElement('div');
    new_card.className = 'card';
    new_card.setAttribute('data_id', player.id);
    new_card.appendChild(createElementWithInnerHTML('p', player.name));
    new_card.appendChild(createAddHandButton(player.id));
    new_card.appendChild(createHandList(player.hands))
    return new_card
}

function createElementWithInnerHTML(element_name, inner_html){
    let element = document.createElement(element_name);
    element.innerHTML = inner_html;
    return element;
}

function createAddHandButton(player_id){
    let element = document.createElement('button');
    element.setAttribute('data-player-id', player_id);
    element.innerHTML = 'Add Hand';
    return element
}

function createHandList(all_hand){
    let unordered_list = document.createElement('ul');
    all_hand.forEach( hand => {
        unordered_list.appendChild(createHandListItem(hand))
    });
    return unordered_list;
}

function createHandListItem(hand){
    let list_item = document.createElement('li');
    list_item.innerHTML = `${hand.nickname} (${hand.species})`;
    list_item.appendChild(createHandReleaseButton(hand.id));
    return list_item
}

function createHandReleaseButton(hand_id){
    let element = document.createElement('button');
    element.className = 'release';
    element.setAttribute('data_hand_id', hand_id)
    element.innerHTML = 'Release';
    return element
}