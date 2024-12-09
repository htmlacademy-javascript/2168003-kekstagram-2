// В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.

// Структура каждого объекта должна быть следующей:
// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }

// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
// Всё отлично!
// В целом всё неплохо. Но не всё.
// Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
// Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
// Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
// Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

//#region Constants

const AMOUNT_OF_POSTS = 25;
const DUMMY_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DUMMY_NAMES = [
  'Аарон', 'Абид', 'Аботур', 'Аввакум', 'Авдей', 'Авигдор', 'Авксентий', 'Авл', 'Авнер', 'Аврелий', 'Автандил', 'Автоном', 'Агапит', 'Агафангел', 'Агафодор', 'Агафон', 'Агриппа', 'Адам', 'Адиль', 'Адольф', 'Адонирам', 'Адриан', 'Азамат', 'Азат', 'Азиз', 'Азим', 'Айварс', 'Айдар', 'Акакий', 'Аквилий', 'Акиндин', 'Акиф', 'Акоп', 'Аксель', 'Алан', 'Аланус', 'Александр', 'Алексей', 'Алик', 'Алим', 'Алипий', 'Алишер', 'Алоиз', 'Альберик', 'Альберт', 'Альбин', 'Альваро', 'Альвизе', 'Альфонс', 'Альфред', 'Амадис', 'Амвросий', 'Амедей', 'Амин', 'Амир', 'Амр', 'Анания', 'Анас', 'Анастасий', 'Анатолий', 'Андокид', 'Андреан', 'Андреас', 'Андрей', 'Андроник', 'Аникий', 'Аникита', 'Аннерс', 'Анри', 'Ансельм', 'Антипа', 'Антон', 'Антоний', 'Антонин', 'Арефа', 'Арзуман', 'Аристарх', 'Ариф', 'Аркадий', 'Арсен', 'Арсений', 'Артём', 'Артемий', 'Артур', 'Арфаксад', 'Архипп', 'Атанасий', 'Аттик', 'Афанасий', 'Афинагор', 'Афиней', 'Африкан', 'Ахилл', 'Ахмад', 'Ахтям', 'Ашот', 'Бадр', 'Барни', 'Басир', 'Бахтияр', 'Бен', 'Бехруз', 'Билял', 'Богдан', 'Болеслав', 'Болот', 'Бонавентура', 'Борис', 'Борислав', 'Боян', 'Бронислав', 'Брячислав', 'Булат', 'Бурхан', 'Бямбасурэн', 'Вадим', 'Валентин', 'Валерий', 'Валерьян', 'Вальдемар', 'Вангьял', 'Варлам', 'Варнава', 'Варсонофий', 'Варфоломей', 'Василий', 'Вахтанг', 'Велвел', 'Велимир', 'Вениамин', 'Венцеслав', 'Верослав', 'Викентий', 'Виктор', 'Викторин', 'Вильгельм', 'Винцас', 'Виссарион', 'Виталий', 'Витаутас', 'Владимир', 'Владислав', 'Владлен', 'Влас', 'Волк', 'Володарь', 'Вольфганг', 'Вописк', 'Всеволод', 'Всеслав', 'Вук', 'Вукол', 'Вячеслав', 'Гавриил', 'Гай', 'Галактион', 'Гарет', 'Гаспар', 'Гафур', 'Гвидо', 'Гейдар', 'Геласий', 'Гельмут', 'Геннадий', 'Генри', 'Генрих', 'Георге', 'Георгий', 'Гераклид', 'Герберт', 'Герман', 'Германн', 'Геронтий', 'Герхард', 'Гессий', 'Гильем', 'Гинкмар', 'Глеб', 'Гней', 'Гонорий', 'Горацио', 'Гордей', 'Гостомысл', 'Гоффредо', 'Градислав', 'Григорий', 'Гримоальд', 'Груди', 'Гуго', 'Гьялцен', 'Давид', 'Дамдинсурэн', 'Дамир', 'Данакт', 'Даниил', 'Дарий', 'Демид', 'Демьян', 'Денис'
];
const DUMMY_SURNAMES = [
  'Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семенов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Белоусов', 'Крылов', 'Карпов', 'Воробьёв', 'Денисов', 'Богданов', 'Поляков', 'Анисимов', 'Тарасов', 'Горшков', 'Захаров', 'Калинин', 'Куликов', 'Артемьев', 'Герасимов', 'Никитин', 'Григорьев', 'Лазарев', 'Медведев', 'Кораблёв', 'Голубев', 'Овчинников', 'Кудрявцев', 'Прохоров', 'Наумов', 'Панфилов', 'Кириллов', 'Маркелов', 'Соболев', 'Громов', 'Виноградов', 'Фомин', 'Дементьев', 'Мельников', 'Щербаков', 'Блинов', 'Колесников', 'Кондратьев', 'Баранов', 'Щукин', 'Фролов', 'Артамонов', 'Зубов', 'Суворов', 'Тимофеев', 'Орехов', 'Ермаков', 'Дроздов', 'Игнатьев', 'Савельев', 'Логинов', 'Сафонов', 'Капустин', 'Кирсанов', 'Маслов', 'Родионов', 'Гурьев', 'Елисеев', 'Ефремов', 'Исаев', 'Евдокимов', 'Калашников', 'Кабанов', 'Носков', 'Юдин', 'Кулагин', 'Лапин', 'Комаров', 'Александров', 'Соловьёв', 'Рыбаков', 'Кочергин', 'Вавилов', 'Гончаров', 'Прокофьев', 'Филатов', 'Королёв', 'Климов', 'Пантелеев', 'Устинов', 'Миронов', 'Кудряшов', 'Белов', 'Гаврилов', 'Ермолов', 'Мартынов', 'Лазарев', 'Одинцов', 'Ежов', 'Никонов', 'Гаврилин', 'Золотарёв', 'Воронцов', 'Чистяков', 'Симонов', 'Кожевников', 'Оськин', 'Буторин'
];
const DUMMY_DESCRIPTIONS = {
  which: [
    'красный', 'синий', 'зелёный', 'жёлтый', 'чёрный', 'белый', 'серый', 'фиолетовый', 'оранжевый', 'розовый', 'голубой', 'коричневый', 'золотой', 'серебряный'
  ],
  who: [
    'кот', 'дом', 'человек', 'мост', 'город', 'цветок', 'корабль', 'лес', 'парк', 'пляж', 'пёс'
  ],
  what: [
    'бежит', 'сидит', 'летит', 'прыгает', 'стоит', 'плавает', 'играет', 'смотрит', 'спит', 'думает', 'работает', 'разговаривает', 'рисует', 'поёт', 'читаёт', 'улыбается', 'катается', 'гуляет', 'строит', 'танцует'
  ],
  where: [
    'в лесу', 'на пляже', 'в городе', 'на озере', 'в парке', 'на улице', 'в горах', 'в поле', 'на крыше дома', 'на мосту', 'на берегу реки', 'в саду', 'на площади', 'в замке', 'на стадионе', 'в пустыне', 'в аэропорту'
  ],
  when: [
    'утром', 'днём', 'вечером', 'ночью', 'на рассвете', 'на закате', 'при лунном свете', 'во время дождя', 'при тумане'
  ],
  hashtags: [
    '#nature', '#photography', '#travel', '#art', '#beautiful', '#instagood', '#photooftheday', '#love', '#fashion',
    '#summer', '#sunset', '#naturelovers', '#landscape', '#adventure', '#happy', '#fun', '#smile', '#beach', '#friends',
    '#food', '#fitness', '#style', '#motivation', '#beauty', '#design', '#inspiration', '#music', '#life', '#workout',
    '#health', '#mindfulness', '#urban', '#city', '#mountains', '#sky', '#sea', '#photo', '#picoftheday', '#family',
    '#creative', '#quotes', '#flowers', '#sun', '#dog', '#cat', '#animals', '#selfie', '#lifestyle', '#happiness',
    '#goodvibes', '#travelgram', '#explore', '#photographer', '#naturephotography', '#loveit', '#instamood', '#fitnessmotivation',
    '#wanderlust', '#skylovers', '#instatravel', '#architecture', '#minimal', '#night', '#party', '#weekend', '#relax',
    '#hiking', '#camping', '#wildlife', '#streetphotography', '#retro', '#memories', '#blackandwhite', '#ocean', '#water',
    '#cool', '#igers', '#follow', '#instadaily', '#repost', '#daily', '#best', '#artwork', '#dream', '#mindset', '#positivevibes',
    '#weekendvibes', '#winter', '#snow', '#coffee', '#tea', '#reading', '#writing', '#film', '#cinema', '#portrait',
    '#moments', '#colorful', '#calm', '#exploremore'
  ]
};

//#endregion

//#region Utility functions
function generateUniqueId () {
  let currentId = 0;

  return function () {
    currentId++;
    return currentId;
  };
}

function getRandomPositiveIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * array.length)];
}

//#endregion


//#region Generational functions


const getRandomDescription = () => {
  let description = '';

  Object.keys(DUMMY_DESCRIPTIONS).forEach((partName) => {
    const getRandomHashtag = () => getRandomArrayElement(DUMMY_DESCRIPTIONS[partName]);

    let randomPart, amountOfHashtags;
    switch (partName) {
      case 'hashtags':
        amountOfHashtags = getRandomPositiveIntFromRange(3, 9);
        randomPart = Array.from({length: amountOfHashtags}, getRandomHashtag).join(' ');
        break;
      default:
        randomPart = DUMMY_DESCRIPTIONS[partName][Math.floor(Math.random() * DUMMY_DESCRIPTIONS[partName].length)];
        break;
    }

    description += randomPart;
    description += ' ';
  });

  description = description[0].toUpperCase() + description.slice(1);
  return description.trimEnd();
};

const getPostId = generateUniqueId();
const getCommentId = generateUniqueId();

function getPost () {
  const getRandomComment = () => {
    const commentId = getCommentId(),
      avatarId = getRandomPositiveIntFromRange(1, 6),
      message = getRandomArrayElement(DUMMY_COMMENTS),
      name = `${getRandomArrayElement(DUMMY_NAMES)} ${getRandomArrayElement(DUMMY_SURNAMES)}`;

    return {
      id: commentId,
      avatar: `img/avatar-${avatarId}.svg`,
      message: message,
      name: name
    };
  };

  const id = getPostId(),
    url = `photos/${id}.jpg`,
    description = getRandomDescription(),
    likes = getRandomPositiveIntFromRange(15, 200),
    amountOfComments = getRandomPositiveIntFromRange(0, 30),
    comments = Array.from({length: amountOfComments}, getRandomComment);

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments
  };

}

//#endregion

Array.from({length: AMOUNT_OF_POSTS}, getPost);