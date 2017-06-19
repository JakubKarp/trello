/*var table = {
name: 'project',
element: <'div'>, // for example $('div')
};
	
var column = {
id: '11aa',
name: 'todo',
element: <'div'>, // for example $('div')
};

var card = {
id: 'aa11',
description: 'Create Kanban app',
color: 'green',
element: <'div'>
};
	*/
$(function(){
	
// PIERWSZY ELEMENT
	function randomString() { //funkcja, która tworzy unikalne id z 10 cyfr na podstawie losowania z tablicy
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	
// DRUGI ELEMENT
	//KLASA KOLUMNA
	function Column(name) { //klasa kolumna z podpiętą nazwą
    var self = this;

    this.id = randomString(); // nadawanie unikalnego id
    this.name = name; // nadawanie nazwy
    this.$element = createColumn();

		//TWORZENIE ELEMENTÓW KOLUMNY
		function createColumn() { // funkcja tworząca kolumnę
			
			var $column = $('<div>').addClass('column'); //początek tworzenia elementów kolumny. W tym wierszu div o klasie column
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name); //nazwa kolumny 
			var $columnCardList = $('<ul>').addClass('column-card-list');// lista w kolumnie - lista kartek
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');// tu i poniżej dwa przyciski
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card'); //koniec elementów kolumny
					
			//STRUKTURA KOLUMNY BĘDZIE WYGLĄDAŁA TAK:
				/*	<div class="column">
					<h2 class="column-title">Column name</h2>
					<button class="btn-delete">x</button>
					<button class="add-card">Add a card</button>
					<ul class="column-card-list"></ul>
				</div>*/
			
			//TWORZENIE ZDARZEŃ - PODPINANIE ICH
			$columnDelete.click(function() { //usuwanie kolumny
				self.removeColumn();
			});
			$columnAddCard.click(function() { //dodawanie kolumny
        		self.addCard(new Card(prompt("Enter the name of the card")));
			});
			
			//ŁĄCZENIE ELEMENTÓW W CAŁOŚĆ - KONSTUOWANIE CAŁEJ KOLUMNY
			$column.append($columnTitle)
        		.append($columnDelete)
        		.append($columnAddCard)
        		.append($columnCardList);
			
			//ZWRACANIE STWORZONEJ KOLUMNY
			return $column;
		}
    };

	
	//METODY DLA KLASY COLUMN - DODANIE I USUNIĘCIE KARTY DO KOLUMNY 
	Column.prototype = {
		addCard: function(card) { //dodaje kartę
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() { //usuwa kartę
      		this.$element.remove();
    	}
	};

//TRZECI ELEMENT	
	//KLASA KARTA (CARD)
	function Card(description) {
	var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard(); //

		//TWORZENIE ELEMENTÓW KARTY
		function createCard() { //kolejne elementy karty
			
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');
			
				//STRUKTURA KARTY BĘDZIE WYGLĄDAŁA TAK:
				/*<li class="card">,
				<button class="btn-delete">x</button>
				<p>Description of the card</p></li>*/
		
			//TWORZENIE ZDARZEŃ	
			$cardDelete.click(function(){
				self.removeCard();
			});	
			
			//ŁĄCZENIE ELEMENTÓW W CAŁOŚĆ - KONSTUOWANIE CAŁEJ KARTY
			$card.append($cardDelete)
				.append($cardDescription);
				
			//ZWRACANIE STWORZONEJ KARTY
			return $card;
		}
	}


			//METODY DLA KLASY CARD - USUNIĘCIE KARTY  
			Card.prototype = {
				removeCard: function() {
				this.$element.remove();
				}	
			}	

//CZWARTY ELEMENT
			//OBIEKT TABLICA I NASŁUCHIWANIE ZDARZEŃ
			var board = {
				name: 'Kanban Board',
				addColumn: function(column) {
				  this.$element.append(column.$element);
				  initSortable();
				},
				$element: $('#board .column-container')
			};
	
//PIĄTY ELEMENT	
			//SORTOWANIE KART - WYKORZYSTANIE jQUERY UI SORTABLE
			function initSortable() {
				$('.column-card-list').sortable({
					  connectWith: '.column-card-list',
					  placeholder: 'card-placeholder'
					}).disableSelection();
			  }

//SZÓSTY ELEMENT
			//DODAWANIE NOWYCH KOLUMN
			$('.create-column')
			  .click(function(){
				var name = prompt('Enter a column name');
				var column = new Column(name);
					board.addColumn(column);
			  });
	
	
//SIÓDMY ELEMENT
			// TWORZENIE KOLUMN
			var todoColumn = new Column('To do');
			var doingColumn = new Column('Doing');
			var doneColumn = new Column('Done');

			// DODAWANIE KOLUMN DO TABLICY
			board.addColumn(todoColumn);
			board.addColumn(doingColumn);
			board.addColumn(doneColumn);

			// TWORZENIE NOWYCH EGZEMPLARZY KART
			var card1 = new Card('New task');
			var card2 = new Card('Create kanban boards');

			// DODAWANIE KART DO KOLUMN
			todoColumn.addCard(card1);
			doingColumn.addCard(card2);
	
	
//DOMKNIĘCIE CAŁEJ FUNKCJI	
});
	
	
	
	
	

 