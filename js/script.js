/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict';

// ЗАМЕНА ТЕКСТА
var changeButtonText = function () {
  var headerButton = document.querySelector('.header__main .button');
  if (headerButton) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      headerButton.innerHTML = 'Бесплатная консультация';
    } else {
      headerButton.innerHTML = 'Получить бесплатную консультацию';
    }
  }
};

// ПЕРЕМЕЩЕНИЕ БЛОКОВ
var moveCopyright = function () {
  var copyrightElem = document.getElementById('copyright');
  var confidentialityElem = document.querySelector('.footer__confidentiality');
  var logoElem = document.querySelector('.footer__logo');
  var newParentDiv = confidentialityElem.parentNode;
  var oldParentDiv = logoElem.parentNode;

  if (copyrightElem) {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      newParentDiv.insertBefore(copyrightElem, confidentialityElem);
    } else {
      oldParentDiv.insertBefore(copyrightElem, logoElem.nextSibling);
    }
  }
};

window.addEventListener('resize', changeButtonText);
window.addEventListener('resize', moveCopyright);
changeButtonText();
moveCopyright();

// СКРЫТИЕ БЛОКОВ В ФУТЕРЕ

var footer = document.querySelector('.footer');
var menu = document.querySelector('.footer__menu');
var menuToggle = document.querySelector('.footer__menu .footer__button');
var contacts = document.querySelector('.footer__contacts');
var contactsToggle = document.querySelector('.footer__contacts .footer__button');

if (footer) {
  footer.classList.add('footer--js');
}
if (menu) {
  menu.classList.add('footer__menu--closed');
}

if (contacts) {
  contacts.classList.add('footer__contacts--closed');
}

if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    if (menu.classList.contains('footer__menu--closed')) {
      menu.classList.remove('footer__menu--closed');
      menu.classList.add('footer__menu--opened');
    } else {
      menu.classList.add('footer__menu--closed');
      menu.classList.remove('footer__menu--opened');
    }
  });
}

if (contactsToggle) {
  contactsToggle.addEventListener('click', function () {
    if (contacts.classList.contains('footer__contacts--closed')) {
      contacts.classList.remove('footer__contacts--closed');
      contacts.classList.add('footer__contacts--opened');
    } else {
      contacts.classList.add('footer__contacts--closed');
      contacts.classList.remove('footer__contacts--opened');
    }
  });
}


// МОДАЛЬНОЕ

var enableModal = function () {
  var Enter = 13;
  var Esc = 27;
  var modal = document.querySelector('.modal');
  var openButton = document.querySelector('.contacts__button');
  var overlay = document.querySelector('.overlay');
  var closeButton = document.querySelector('.modal__close-button');
  var nameInput = modal.querySelector('#customer-name-popup');

  // Открыть модальное
  var openModal = function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--opened');
    overlay.classList.add('overlay--showed');
    nameInput.focus();
  };

  // Закрыть модальное
  var closeModal = function (evt) {
    evt.preventDefault();
    document.querySelector('.modal--opened').classList.remove('modal--opened');
    overlay.classList.remove('overlay--showed');
  };

  // Добавить прослушивальщика событий на кнопку
  openButton.addEventListener('click', function (evt) {
    openModal(evt);
  });

  openButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Enter) {
      openModal(evt);
    }
  });

  // Закрытие по нажатию клавиши
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Esc) {
      if (document.querySelector('.modal--opened')) {
        closeModal(evt);
      }
    }
  });

  // Добавление прослушивальщика на овелей
  overlay.addEventListener('click', function (evt) {
    closeModal(evt);
  });

  // Добавление прослушивальщиков на кнопку
  closeButton.addEventListener('click', function (evt) {
    closeModal(evt);
  });
  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Enter) {
      closeModal(evt);
    }
  });
};
enableModal();


// СОХРАНЕНИЕ ДАННЫХ

if (window.localStorage) {
  var modal = document.querySelector('.modal');
  var elements = modal.querySelectorAll('[id^="customer"]');

  for (var i = 0, length = elements.length; i < length; i++) {

    (function (element) {
      var name = element.getAttribute('id');

      element.value = localStorage.getItem(name) || '';

      element.onkeyup = function () {
        localStorage.setItem(name, element.value);
      };
    })(elements[i]);
  }
}

// ПРОКРУТКА

var advantagesLink = document.querySelector('.header__scroll-link');
var consultationLink = document.querySelector('.header__main .button');

var handleAnchorClick = function () {
  event.preventDefault();
  var linkTarget = event.currentTarget.getAttribute('href');
  var id = linkTarget.substring(1, linkTarget.length);
  var aim = document.getElementById(id);
  aim.scrollIntoView({block: 'start', behavior: 'smooth'});
};

if (advantagesLink) {
  advantagesLink.addEventListener('click', handleAnchorClick);
}

if (consultationLink) {
  consultationLink.addEventListener('click', handleAnchorClick);
}

// МАСКА ДЛЯ ПОЛЯ ТЕЛЕФОНА

// var telInputPopup = document.getElementById('customer-phone-popup');
// var telInput = document.getElementById('customer-phone');

// var testSymbol = function () {
//   var id = event.target.id;
//   var element = document.getElementById(id);
//   var text = element.value;
//   if (isNaN(text)) {
//     element.value = text.substring(0, text.length - 1);
//   }
// };

// if (telInputPopup) {
//   telInputPopup.addEventListener('keyup', testSymbol);
// }

// if (telInputPopup) {
//   telInput.addEventListener('keyup', testSymbol);
// }

// var telInputPopup = document.getElementById('customer-phone-popup');


var telInput = document.getElementById('customer-phone');
var telInputPopup = document.getElementById('customer-phone-popup');

var maskOptions = {
  mask: '+{7}(000)000-00-00'
};
// eslint-disable-next-line no-undef
var mask = IMask(telInput, maskOptions);
var mask = IMask(telInputPopup, maskOptions);

