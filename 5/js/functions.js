/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах

console.log(isMeetingLegal('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingLegal('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingLegal('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingLegal('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingLegal('8:00', '17:30', '08:00', 900)); // false */

const timeStringToMinutes = (string) => parseInt(string.split(':')[0], 10) * 60 + parseInt(string.split(':')[1], 10);

const isMeetingLegal = (dayStart, dayEnd, meetingStart, meetingDurationMinutes) => {
  const dayStartMinutes = timeStringToMinutes(dayStart),
    dayEndMinutes = timeStringToMinutes(dayEnd),
    meetingStartMinutes = timeStringToMinutes(meetingStart);

  return meetingStartMinutes >= dayStartMinutes && (dayEndMinutes - meetingStartMinutes - meetingDurationMinutes) >= 0;
};

isMeetingLegal('08:00', '17:30', '14:00', 90); //true
isMeetingLegal('8:0', '10:0', '8:0', 120); // true
isMeetingLegal('08:00', '14:30', '14:00', 90); // false
isMeetingLegal('14:00', '17:30', '08:0', 90); // false
isMeetingLegal('8:00', '17:30', '08:00', 500); // false
