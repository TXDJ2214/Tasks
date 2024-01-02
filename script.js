const apiKey = 'YOUR_TRELLO_API_KEY';
const token = 'YOUR_TRELLO_TOKEN';
const boardId = 'YOUR_TRELLO_BOARD_ID';

function loadTrelloBoard() {
    $.ajax({
        url: `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`,
        type: 'GET',
        success: function (lists) {
            lists.forEach(list => {
                $('#board').append(`<div class="list" id="${list.id}"><h3>${list.name}</h3></div>`);
                loadCards(list.id);
            });
        },
        error: function (error) {
            console.error('Error loading Trello board:', error);
        }
    });
}

function loadCards(listId) {
    $.ajax({
        url: `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`,
        type: 'GET',
        success: function (cards) {
            cards.forEach(card => {
                $(`#${listId}`).append(`<div class="card" id="${card.id}" draggable="true">${card.name}</div>`);
            });
            initializeSortable();
        },
        error: function (error) {
            console.error('Error loading Trello cards:', error);
        }
    });
}

function initializeSortable() {
    const lists = document.getElementsByClassName('list');
    for (const list of lists) {
        new Sortable(list, {
            group: 'shared',
            animation: 150,
            onEnd: function (evt) {
                // Handle card movement here (update Trello API)
                console.log('Card moved:', evt.item.id, 'from', evt.from.id, 'to', evt.to.id);
            }
        });
    }
}

$(document).ready(function () {
    loadTrelloBoard();
});