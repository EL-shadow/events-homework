/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){
};

/**
 * Объект - список слушателей по событию
 */
PubSub.prototype.listeners={};

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    if (this.listeners.hasOwnProperty(eventName)==false) this.listeners[eventName]=[];
    this.listeners[eventName].push(handler);
    return handler;
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {
    if (this.listeners.hasOwnProperty(eventName)){
        for (var i=0;i<this.listeners[eventName].length;i++){
            if (this.listeners[eventName][i]===handler){
                this.listeners[eventName].splice(this.listeners[eventName][i],1);
            }
        }
    }
    return handler;
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {
    if (this.listeners.hasOwnProperty(eventName)){
        for (var i=0;i<this.listeners[eventName].length;i++){
            this.listeners[eventName][i](data);
        }
        return true;
    }
    else return false;
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    return delete this.listeners[eventName];
};

/**
 * @example
 *
 * var pubSub = new PubSub();
 *
 * pubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = pubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * pubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * pubSub.off('click');
 */

/*
    Дополнительный вариант — без явного использования глобального объекта
    нужно заставить работать методы верно у любой функции
 */

var pubSub = new PubSub();
window.Function.prototype.subscribe=function(eventName){
    pubSub.subscribe(eventName,this);
};
window.Function.prototype.unsubscribe=function(eventName){
    pubSub.unsubscribe(eventName,this);
}

function foo(event, data) {
    //body…
}

foo.subscribe('click');

foo.unsubscribe('click');
