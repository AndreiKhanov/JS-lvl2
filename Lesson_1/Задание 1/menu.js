/*Задание 1: Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет контейнер.*/
/*Начинается с function MenuItem. Сделал удаление не контейнера, а пунктов меню т.к. возможно потом пригодится
 для настройки пользовательского интерфейса*/

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

function MenuItem(link, label, remove) {
  Container.call(this);
  this.link = link;
  this.label = label;
  // Создаем новый класс для удаления
  this.className = remove;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  // Добавляем класс
  li.className = this.className;
  var a = document.createElement('a');
  a.href = this.link;
  a.textContent = this.label;
  li.appendChild(a);

  return li;
}

// Функция удаления
function remove(){
  var remove = document.getElementsByTagName('li');
  for(i = 0; i < remove.length; i++){
    remove[i].onclick = function(e){
      e.target.remove();
    }
  }
}