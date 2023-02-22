# Simple Full-Stack App with React + TypeScript + Mysql + Fastify

if you want to run this app first clone this app and after that run `docker-compose up --d`

for learning more information about backend api take a look at `api.http` file at the root directory.

1.To run this project you must have typescript 4.9 on your system.
2.Then run `sh build.sh`
3.finally run this command `docker-compose up --d`

docker-compose.yaml :

```yaml
version: "3"

services:
  database:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: testpass
      MYSQL_DATABASE: imanhpr
  fastify:
    build: .
    image: webapp
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://root:testpass@database:3306/imanhpr
    command: sh run.sh
    ports:
      - 8000:8000
    depends_on:
      - database
  frontend:
    build: frontend/
    image: reactapp
    ports:
      - 5173:5173
    depends_on:
      - fastify
```
