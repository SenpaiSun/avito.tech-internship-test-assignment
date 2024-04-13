# Тестовое задание на стажировку в [Avito.Tech](https://start.avito.ru/tech)
### Описание проекта:
Фронтенд приложение для быстрого поиска информации по фильмам и сериалам с платформы «Кинопоиска», с возможностью просмотра основной информации по конкретному фильму.

![2024-04-13 23-48-23 (online-video-cutter com)](https://github.com/SenpaiSun/avito.tech-internship-test-assignment/assets/100027896/467cbeb0-988e-4df8-b282-47238c04015a)



### Стек приложения:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine](https://mantine.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Husky](https://www.npmjs.com/package/husky)
- [SCC-in-JS(styled components)](https://styled-components.com/docs/basics)
## Инструкция по запуску:
- Клонировать проект командой `git clone git@github.com:SenpaiSun/avito.tech-internship-test-assignment.git`;
- Установить необходимые зависимости командой `npm install`;
- Запустить проект командой `$env:REACT_APP_API_TOKEN = "YOUR_TOKEN" ; npm start`, где `YOUR_TOKEN` предоставляет из себя X-API-KEY для kinopoiskdev.

## Вопросы/проблемы, возникшие во время выполнения тестового задания:
1. В Нефункциональных требования, в стеке технологий  было указано использовать webpack. Необходимо было сконфигурировать его самостоятельно?
  - Я использовал в качестве сборщика CRA, в который уже предустановлен и сконфигурирован webpack.
2. Про стейт-менеджеры указано не было.
  - Я использовал в качестве стейт-менеджера Redux Toolkit

## Примеры запросов и ответов клиент-серверного взаимодействия:
1. Получение всех фильмов:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "docs": [
    {
      "status": null,
      "rating": {
        "kp": 8.823,
<-- Большое тело ответа -->
 "isSeries": false,
      "seriesLength": null,
      "totalSeriesLength": null
    }
  ],
  "total": 1056227,
  "limit": 10,
  "page": 1,
  "pages": 105623
}
```

2. Получение конкретного фильма:
- Запрос:
```
curl --request GET \
     --url https://api.kinopoisk.dev/v1.4/movie/535341 \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "fees": {
    "world": {
      "value": 426588510,
      "currency": "$"
    },
    "russia": {
      "value": 1725813,
<-- Большое тело ответа -->
      {
        "url": "https://www.youtube.com/embed/34WIbmXkewU",
        "name": "The Intouchables Official Trailer #1 (2012) HD Movie",
        "site": "youtube",
        "type": "TRAILER"
      }
    ]
  }
}
```
3. Получение постеров:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=535341' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "docs": [
    {
      "url": "https://image.openmoviedb.com/kinopoisk-images/1773646/dd6228ad-c0fe-4693-a703-f1158c2de023/orig",
      "createdAt": "2022-09-24T01:12:51.278Z",
      "height": 1200,
      "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1773646/dd6228ad-c0fe-4693-a703-f1158c2de023/360",
      "type": "wallpaper",
      "updatedAt": "2022-09-27T00:52:35.568Z",
<-- Большое тело ответа -->
"width": 927,
      "movieId": 535341,
      "id": "632e59926382d4223be8239f"
    }
  ],
  "total": 117,
  "limit": 10,
  "page": 1,
  "pages": 12
}
```
4. Получение отзывов пользователей:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/review?page=1&limit=10&movieId=535341' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "docs": [
    {
      "id": 3353261,
      "movieId": 535341,
      "title": "неприкасаемые",
      "type": "Нейтральный",
      "review": "Говорить что-то сейчас о '1+1' практически не имеет смысла. Фильм стал чуть ли не культовым, и практически нет любителей большого кино, которые бы его не видели или хотя бы не слышали.\r\n\r\nРассказываемая история на самом деле даже не столько драма, сколько повесть, в чем-то жизнеутверждающая. Дружба двух людей из совершенно разных социальных слоев, разных настолько, что их можно считать буквально разными мирами. Дружба людей, которые в иное время не могли пересечься нигде, но трагедия свела-таки их вместе.\r\n\r\n'1+1' это приятный фильм, качественно снятый, хорошо написанный и талантливо сыгранный. Главный экранный дуэт, Франсуа Клюзе и Омар Си, очень хорошо гармонируют вместе, пусть поначалу их образы и смотрятся максимально контрастно. Однако химия между героями определенно чувствуется, и на ней строится львиная доля очарования ленты.\r\n\r\nПравда, есть все же в ленте даже не недостаток, а условие, которая делает фильм достаточно легким для просмотра, несмотря на тяжелое состояние персонажа Клюзе. Филипп до безобразия богат. Богат настолько, что будучи парализованным может позволить себе развлечения и жизнь, какие недоступны большинству физически здоровых людей. Да, безусловно, участь Филиппа не завидная, такого, как говорят, и врагу не пожелаешь. Однако на фоне таких же людей, лишенных доступа к безграничным средствам, по-настоящему сопереживать Филиппу не получается. А фильм благодаря этому выглядит как нечто жизнеутверждающее, о чем я уже сказал, а не как беспросветная чернуха.\r\n\r\nТак или иначе, '1+1' это прекрасный фильм с прекрасными персонажами. Он определенно заслуживает внимания и тех оценок, какими он сейчас может похвастать.",
      "date": "2024-02-18
<-- Большое тело ответа -->
"author": "AstAAfeV346",
      "userRating": 1,
      "reviewLikes": 5,
      "reviewDislikes": 1,
      "authorId": 112962089,
      "createdAt": "2023-04-11T17:56:49.111Z",
      "updatedAt": "2023-09-03T16:09:43.110Z"
    }
  ],
  "total": 581,
  "limit": 10,
  "page": 1,
  "pages": 59
}
```
5. Получение сезонов и серий:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/season?page=1&limit=10&movieId=535341' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
-Ответ:
```
{
  "docs": [],
  "total": 0,
  "limit": 10,
  "page": 1,
  "pages": 0
}
```
6. Получение актеров:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/person?page=1&limit=10&movies.id=535341' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "docs": [
    {
      "id": 6827355,
      "age": null,
      "enName": "Robin Noel",
      "name": null,
      "photo": null,
      "sex": null
    },
    {
      "id": 4559766,
      "name": "Хэ Юньпин",
      "enName": "He Yunping",
      "photo": null,
      "age": null,
      "sex": "Мужской"
    },
    {
      "id": 3152843,
      "name": "Лорен Сиво",
      "enName": "Laurent Sivot",
      "photo": null,
      "age": null,
      "sex": "Мужской"
    },
    {
      "id": 3152842,
      "name": "Филипп Поццо ди Борго",
      "enName": "Philippe Pozzo di Borgo",
      "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/aaaa39cd-18ab-4634-a9d6-2669533f8d3b/orig",
      "age": 72,
      "sex": "Мужской"
    },
    {
      "id": 3084682,
      "name": "Филипп Ле Февр",
      "enName": "Philippe Le Fevre",
      "photo": null,
      "age": null,
      "sex": "Мужской"
    },
    {
      "id": 3084681,
      "name": "Ле Капариксьо Франсе",
      "enName": "Le Capriccio Français",
      "photo": null,
      "age": null,
      "sex": "Мужской"
    },
    {
      "id": 3084680,
      "name": "Абса Дьяту Тур",
      "enName": "Absa Diatou Toure",
      "photo": null,
      "age": null,
      "sex": "Женский"
    },
    {
      "id": 3084679,
      "name": "Салимата Камате",
      "enName": "Salimata Kamate",
      "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/98c86038-52af-4da6-b61b-5f6a02357f13/orig",
      "age": null,
      "sex": "Женский"
    },
    {
      "id": 2789409,
      "name": "Абдель Селлу",
      "enName": "Abdel Sellou",
      "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/a3a69460-81f3-4222-9fbf-05e5e834665b/orig",
      "age": null,
      "sex": "Мужской"
    },
    {
      "id": 2687590,
      "name": "Доминик Анри",
      "enName": "Dominique Henry",
      "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/f2568cf6-1934-45e5-bf7d-1c9d205adf24/orig",
      "age": null,
      "sex": "Мужской"
    }
  ],
  "total": 74,
  "limit": 10,
  "page": 1,
  "pages": 8
}
```
7. Получение фильмов по названию:
- Запрос:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=1%20%2B%201' \
     --header 'X-API-KEY: XXXX-XXXX-XXXX-XXXX' \
     --header 'accept: application/json'
```
- Ответ:
```
{
  "docs": [
    {
      "id": 4414407,
      "name": "",
      "alternativeName": "1 + 1",
      "enName": "",
      "type": "cartoon",
      "year": 2015,
      "description": "",
      "shortDescription": "",
<-- Большое тело ответа -->
"countries": [
        {
          "name": "Нидерланды"
        }
      ],
      "releaseYears": []
    }
  ],
  "total": 1000,
  "limit": 10,
  "page": 1,
  "pages": 100
}
```
