echo sleep 10 sec before contnie ...
sleep 10
npx prisma migrate deploy
npx prisma generate

node app.js
