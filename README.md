# Four Season Airplane Game

A Laravel-based web application featuring a Phaser game with a Tabler admin panel.

## Features

- **Game Page**: Phaser-powered airplane game accessible to all visitors
- **Admin Panel**: Tabler UI framework with authentication
- **Separate Assets**: Admin and game have completely separate SASS and JavaScript bundles
- **Authentication**: Laravel Breeze authentication system

## Tech Stack

- **Backend**: Laravel 10
- **Game Engine**: Phaser 3
- **Admin UI**: Tabler (Bootstrap-based)
- **Asset Compilation**: Vite
- **Styling**: SASS
- **Authentication**: Laravel Breeze

## Project Structure

```
├── resources/
│   ├── sass/
│   │   ├── admin/          # Admin panel styles (Tabler)
│   │   │   └── app.scss
│   │   └── game/           # Game-specific styles
│   │       └── app.scss
│   ├── js/
│   │   ├── admin/          # Admin panel JavaScript
│   │   │   └── app.js
│   │   └── game/           # Game JavaScript (Phaser)
│   │       └── app.js
│   └── views/
│       ├── admin/          # Admin panel views
│       ├── game/           # Game views
│       └── layouts/
│           └── admin/      # Admin layout
├── app/
│   └── Http/
│       └── Controllers/
│           ├── Admin/      # Admin controllers
│           └── GameController.php
└── routes/
    └── web.php             # Application routes
```

## Installation

1. **Install PHP dependencies**
   ```bash
   composer install
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database in `.env`**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Build assets**
   ```bash
   npm run build
   ```
   
   For development with hot reload:
   ```bash
   npm run dev
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

## Routes

- `/` - Game page (public)
- `/login` - Login page
- `/register` - Registration page
- `/admin/dashboard` - Admin dashboard (requires authentication)
- `/profile` - User profile settings (requires authentication)

## Asset Compilation

The project uses Vite for asset compilation with separate bundles:

- **Admin Bundle**: 
  - SASS: `resources/sass/admin/app.scss`
  - JS: `resources/js/admin/app.js`
  - Includes Tabler UI framework

- **Game Bundle**:
  - SASS: `resources/sass/game/app.scss`
  - JS: `resources/js/game/app.js`
  - Includes Phaser 3

Build commands:
```bash
npm run dev      # Development with hot reload
npm run build    # Production build
```

## Admin Panel Features

- Dashboard with statistics cards
- Tabler UI components
- User profile management
- Responsive sidebar navigation
- Quick action menu

## Game Features

- Phaser 3 game engine
- Keyboard controls (arrow keys)
- Score tracking
- Lives system
- Responsive game container

## Development

### Adding new admin pages

1. Create controller in `app/Http/Controllers/Admin/`
2. Add route in `routes/web.php` under the admin group
3. Create view in `resources/views/admin/`
4. Extend `layouts.admin.app` layout

### Customizing the game

Edit `resources/js/game/app.js` to modify Phaser game logic:
- Add game assets in `preload()` function
- Initialize game objects in `create()` function
- Update game state in `update()` function

### Styling

- Admin styles: `resources/sass/admin/app.scss`
- Game styles: `resources/sass/game/app.scss`

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false` in `.env`
3. Run `composer install --optimize-autoloader --no-dev`
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Run `php artisan view:cache`
7. Run `npm run build`

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Credits

- Laravel Framework
- Phaser Game Engine
- Tabler UI Framework
