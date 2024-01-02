const apiKey = '7d14288264ab0bf23e34850a66e9528e';
const token = 'ATTAc4e9eee205f99466cbe7b9e67bdc03db64e48cb1723aabc8ad5bdb9cecbbffc5D4FB9F69';
const boardId = '58e8964f1c3d23a2f251e15a';

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