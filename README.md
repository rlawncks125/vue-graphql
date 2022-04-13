# vue

# Backed ( nest )

접속시 db_database가 없기때문에 에러 발생

```
docker exec -it 'mariadb-contaier' -uroot -p'비밀번호' << mysql 접속
create database 'db_database' << database 생성
```

graphql 설치

```
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
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
