# programmers-search

Programmers Problem Search API

# 소계

프로그래머스의 검색기능이 없다는걸 듣고 검색API를 제작하였습니다. 

교내 프로젝트로 프로그래머스 + 여러가지 서비스를 제작할 계획이였지만 여러가지 이유로 시간이 부족하여 프로그래머스 문제검색 API만...

# 사용법

/server 에 .env파일을 만들고 각각 자신의 설정과 매칭해준뒤

```cli
npm install
npm init
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

- TDD
  - SuperTest
  - Mocha
