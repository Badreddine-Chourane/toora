---------------------------------------------------------------------------------------

#how to push

git init
git add .
git commit -m "new commit"
git push -f

----------------------------------------------------------------------------------------

#how to clone

----------------------------------------------------------------------------------------

git clone https://github.com/Badreddine-Chourane/toora.git

--------------------------------------------------------------------------------------

cd laravel_api

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve

------------------------------------------------------------------------------------------

cd toora-react

npm install

npm start
