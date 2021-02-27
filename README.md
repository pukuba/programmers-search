[![Build Status](https://travis-ci.org/pukuba/programmers-search.svg?branch=main)](https://travis-ci.org/pukuba/programmers-search)

# programmers-search

Programmers Problem Search API

# 소계

프로그래머스 알고리즘 문제관련 API

# 사용법

run server
```  
npm install
npm run init
npm start
```
docker-build
```
docker-compose up -d --build
```

플레이 그라운드에서 직접 쿼리를 날릴수 있습니다. http://localhost:2004/playground

사용 예시

```js
const endpoint = "http://localhost:2004/graphql";
const query = `
    query{
        getAllProblem{
            title
            url
            lv
            tag
        }
    }`;

async function getAPI() {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const result = await response.json();
  console.log(result);
}

getAPI();
```

# 사용한 프레임워크 / 기술 🗂

- Server

  - Node.js
    - express
    - apollo-server-express
  - GraphQL

- DataBase

  - MongoDB Atlas

- Cloud

  - Naver Cloud Platform

- Docker

  - Nginx
  - Server

- TDD
  - SuperTest
  - Mocha
