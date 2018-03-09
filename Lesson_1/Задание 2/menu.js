// Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю.

// Счетчик подменю (поумолчанию считаем что одно есть)
var SUBCOUNT = 1;

function Container() {
	this.id = 'container';
	this.className = 'container';
}

Container.prototype.render = function () {
	var div = document.createElement('div');
	div.id = this.id;
	div.className = this.className;

	return div;
}

// Создание главного меню

function Menu(id, className, items) {
	Container.call(this);
	this.id = id;
	this.className = className;
	this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
	var ul = document.createElement('ul');
	ul.className = this.className;
	ul.id = this.id;

	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i] instanceof MenuItem) {
			ul.appendChild(this.items[i].render());
		}
	}
	return ul;
}

// Создаем новый класс для удаления
// Добавляем проверку на подменю (значение true или false)
function MenuItem(link, label, subMenu, remove) {
	Container.call(this);
	this.link = link;
	this.label = label;
	this.subMenu = subMenu;
	// Создаем новый класс для удаления
  	this.className = remove;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
	var li = document.createElement('li');
	// Добавляем класс
  	li.className = this.className;
	// если в этом пункте должно быть подменю,то присваиваем id пункту c номером меню
		if(this.subMenu){
			li.id = 'sub' + SUBCOUNT;
			SUBCOUNT++;
		}
	var a = document.createElement('a');
	a.href = this.link;
	a.textContent = this.label;
	li.appendChild(a);

	return li;
}
// Функция удаления
function remove(){
  var remove = document.getElementsByClassName('remove');
  for(i = 0; i < remove.length; i++){
    remove[i].onclick = function(e){
      e.target.remove();
    }
  }
}

// Создание подменю

function MenuSub(id, className, items) {
	Container.call(this);
	this.id = id;
	this.className = className;
	this.items = items;
}

MenuSub.prototype = Object.create(Container.prototype);

MenuSub.prototype.render = function () {
	var ul = document.createElement('ul')
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i] instanceof MenuSubItem) {
				ul.appendChild(this.items[i].render());
			}
		}
		return ul;
}

function MenuSubItem(link, label) {
	Container.call(this);
	this.link = link;
	this.label = label;
}

MenuSubItem.prototype = Object.create(Container.prototype);

MenuSubItem.prototype.render = function () {
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.href = this.link;
	a.textContent = this.label;
	li.appendChild(a);

	return li;
}