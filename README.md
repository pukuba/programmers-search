# programmers-search

Programmers-API

# 소계

프로그래머스의 검색기능이 없다는걸 듣고 검색API를 제작하고 추가로 다양한 서비스를 포함하여 제작하였습니다. (커뮤니티, 문제추천, 검색) 등등...

# 사용법

/server 에 .env파일을 만들고 각각 자신의 설정과 매칭해준뒤

```cli
npm install
npm start
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

- Auth

  - Json Web Token

- TDD
  - SuperTest
  - Mocha
