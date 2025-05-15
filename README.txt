# Toora.ma - Electric Scooter Rental Platform

This project is a full-stack web application for managing and renting electric scooters, built with **React** (frontend) and **Laravel** (backend API).

---

## Features

- User registration, login, and profile management
- Admin dashboard for managing scooters, cities, users, tariffs, and reservations
- QR code generation for each scooter (scan to reserve)
- Reservation and payment system
- Responsive UI with Bootstrap

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Composer](https://getcomposer.org/) (for Laravel)
- [PHP](https://www.php.net/) (v8.1+ recommended)
- [MySQL](https://www.mysql.com/) or compatible database

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Badreddine-Chourane/toora.git
cd toora
---------------------------------------------------------------------------------------

#how to push

git init
git add .
git commit -m "new commit"
git push -f

----------------------------------------------------------------------------------------

#how to clone

----------------------------------------------------------------------------------------


cd laravel_api

composer install

cp .env.example .env

php artisan key:generate
php artisan storage:link
composer require laravel/sanctum
composer require spatie/laravel-permission
php artisan migrate --seed

php artisan serve

------------------------------------------------------------------------------------------

cd toora-react

npm install
npm install react-router-dom axios bootstrap qrcode.react dayjs

npm install -D tailwindcss@3.4.17 postcss@8.5.3 autoprefixer@10.4.21
npx tailwindcss@3.4.17 init -p
npm install lucide-react
npm install react-leaflet leaflet
npm install leaflet

npm start
