//получаем оставшееся время
function getTimeRemaining(deadline) {
  //Date.parse() - разбирает строковое представление даты и возвращает временную метку
  //в миллисекундах.
    var t = Date.parse(deadline) - Date.parse(new Date()); //вычитаем одну дату из другой (из большего меньшее)
    //Date.parse(deadline) - дата равная следующему дню + 9ч от текущего времени
    //Date.parse(new Date()) - текущее значение даты в миллисекундах
    //т.о. образом временная метка будет положительной
    //переводим миллисекунды в с, мин
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    //возвращаем числовые значения для мин и с
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
}

//выводим оставшееся время на экран
function initializeClock(id, deadline) {
  //получаем элементы html по их селекторам и id
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  //updateClock - ф-ция обновляющая значения в таймере
  function updateClock() {
    var t = getTimeRemaining(deadline);
    //выводим мин и с в полученных эл-тах
    //с помощью slice() берем только два предпоследних эл-та массива
    //если элементов в массиве меньше двух, то ставим впереди 0 и эл-т из массива
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    //проверяем временная метка меньше или равна нулю
    if (t.total <= 0) {
      clearInterval(timeinterval);
      //скрываем блок с таймером
      document.getElementById("countdown").classList.add('hidden');
      //обновляем название заголовка после того как выполнится условие if
      document.getElementById("countdown-title").innerHTML = "Желаю Вам доброго полета!";
      //выводим картинку после того как время вышло
      document.getElementById("timer").innerHTML = "<img class='gagarin' src='gagarin.jpg'>";
      function soundClick() {
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = 'go.mp3'; // Указываем путь к звуку
        audio.autoplay = true; // Автоматически запускаем
      }
      soundClick();
    }
  }
  //вызываем ф-цию updateClock
  updateClock();
  //с помощью ф-ции setInterval другая ф-ция updateClock выполняется каждую секунду
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 1 * 60 * 1000); // дата окончания работы таймера
//значение переменной deadline = Sun Jul 21 2024 08:24:03 GMT+0300 (Москва, стандартное время) - как пример
//всегда показывает значение следующего дня
initializeClock('countdown', deadline); //вызываем ф-цию initializeClock