# vue

Vue3 Composition API
https://v4.apollo.vuejs.org/guide-composable/

```
### Manual installation
npm install --save graphql graphql-tag @apollo/client

### Composition API
npm install --save @vue/apollo-composable


## subscriptions 의존성 설치
npm install --save subscriptions-transport-ws
```

apollo useEvent타입 vs graphQL-codegen 라이브러리

```
// 간단 비교
typescript | apllo < graphQL-codegen
세세한 기능 | apllo > graphQL-codegen

// 이프로젝트는 graphql-codegen으로 type 이 겹칠까봐 apollo:codegen을 사용하지 않았음

apollo useEvvent 타입 장단점
장점 :
단점 : type 정의 할떄마다 타입 캐스팅 해줘야하는 번거로움이 있음

graphQL-codegen 타입 장단점
장점 : 타입 스크립트 형식으로 use함수를 만들어줌
단점 : 세세한 기능(loading , toMore머시기 등등) 못쓰는거 같음

```

graphQL-codegen 라이브러리 사용

```
// 설치
# npm install --save graphql
# npm install --save @graphql-codegen/cli

// 플러그인 설치
# npm install --save @graphql-codegen/typescript-vue-urql
# npm install --save @graphql-codegen/typescript
# npm install --save @graphql-codegen/typescript-operations

// codegen 환경 구성
codegen.yml << 설정 파일

// urql 의존성 설치
# npm install --save @urql/vue

// urql 쓰기위한 설정
./plugin/graphql-codegen  << 설정 파일

// main.ts 추가
import urql from "@urql/vue";
import { urqlClient } from "@/plugin/graphql-codegen";

vue.use(urql, urqlClient) // graphql-codegen 라이브러리 urql 통신 사용

// codegen 명령어 설정
{
  "codegen": "npx graphql-codegen"
}

```

# Backed ( nest )

docker로 만든 DB 접속시 db_database가 없기때문에 에러 발생

```
docker exec -it 'mariadb-contaier' -uroot -p'비밀번호' << mysql 접속
ALTER USER root@localhost IDENTIFIED BY '새로운패스워드'; << root 임시 비밀번호 재설정
create database 'db_database' << database 생성
```

graphql 설치

```
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

graphql-ws 설정

```
패키지 설치
// 설정
npm install graphql-ws
npm install subscriptions-transport-ws

// subscriptions 패키지
npm install graphql-subscriptions

```

# GraphQL

### @Args 타입 선언 방법 ArgsType 과 InputType 으로 나뉘움

ArgsType

```
// user/dtos/userUpdated.dto.ts

// GraphQL ArgType 선언
@ArgsType()
export class updateUserArgsType extends PickType(
  User,
  ['dsc'] as const,
  ArgsType,
) {}

// GraphQL ArgType
  async functionName(
    @Args() { dsc }: updateUserArgsType,
  ) {
    return this.userService.update(user, { dsc });
  }

```

InputType

```
// user/dtos/userUpdated.dto.ts

// GraphQL inputType 선언
@InputType()
export class updateUserInputType extends PickType(
  User,
  ['dsc'] as const,
  InputType,
) {}

// GraphQL inputType 사용
  async functionName(
    @Args('args') { dsc }: updateUserInputType,
  ) {
    return this.userService.update(user, { dsc });
  }

```

# docker-compose 설정

```
version: "3"
services:
  web:
    image: rlawncks125/vue-graphql
    build:
      context: ./front-vue
      dockerfile: Dockerfile
    ports:
      - 8888:8888
    environment:
      - PORTS=8888
    volumes:
      - /usr/src/app/node_modules
      - ./front-vue:/usr/src/app
      - ./front-vue/node_modules/@types:/usr/src/app/node_modules/@types
    container_name: vue-graphQL

  myDB:
    image: mariadb
    environment:
      - MARIADB_ROOT_PASSWORD='password'
    ports:
      - 3306:3306
    volumes:
      - ./mariadb/mysql_data:/var/lib/mysql
    container_name: graphql-mariadb

  back:
    image: rlawncks125/nest-graphql
    build:
      context: ./backed
      dockerfile: Dockerfile
    ports:
      - 3033:3033
    environment:
      - PORTS=3033
      - DB_HOST=myDB
      - DB_PORT=3306
      - DB_ROOT=root
      - DB_PASSWORD='password'
      - DB_DATABASE='database'
      - JWT_KEY='jwt-key'
      - ENV=Local
    volumes:
      - ./backed:/usr/src/app
    container_name: nest-graphQL


```
