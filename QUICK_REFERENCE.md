# Quick Reference Card

## 🚀 Quick Start Commands

```bash
# Setup (first time only)
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run build

# Development
php artisan serve          # Start server
npm run dev               # Watch assets (optional)

# Production
npm run build             # Build assets
```

## 📂 Important File Locations

### Admin Panel
- Layout: `resources/views/layouts/admin/app.blade.php`
- Dashboard: `resources/views/admin/dashboard.blade.php`
- Styles: `resources/sass/admin/app.scss`
- Scripts: `resources/js/admin/app.js`
- Controller: `app/Http/Controllers/Admin/DashboardController.php`

### Game
- View: `resources/views/game/index.blade.php`
- Styles: `resources/sass/game/app.scss`
- Game Logic: `resources/js/game/app.js`
- Controller: `app/Http/Controllers/GameController.php`

### Configuration
- Routes: `routes/web.php`
- Vite Config: `vite.config.js`
- Environment: `.env`

## 🌐 Routes

| URL | Description | Auth Required |
|-----|-------------|---------------|
| `/` | Game page | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/admin/dashboard` | Admin panel | Yes |
| `/profile` | User profile | Yes |

## 🎨 UI Frameworks

### Admin - Tabler
- Docs: https://tabler.io/docs
- Icons: https://tabler.io/icons
- CDN: Loaded via admin layout

### Game - Phaser 3
- Docs: https://phaser.io/docs
- Examples: https://phaser.io/examples
- Package: Installed via npm

## 📦 Asset Bundles

Vite compiles 3 separate bundles:

1. **Admin Bundle**
   - Input: `resources/sass/admin/app.scss` + `resources/js/admin/app.js`
   - Includes: Tabler UI
   - Used in: Admin pages

2. **Game Bundle**
   - Input: `resources/sass/game/app.scss` + `resources/js/game/app.js`
   - Includes: Phaser 3
   - Used in: Game page

3. **Auth Bundle**
   - Input: `resources/css/app.css` + `resources/js/app.js`
   - Includes: Alpine.js, default styles
   - Used in: Login/Register pages

## 🔧 Common Tasks

### Add Admin Menu Item
Edit `resources/views/layouts/admin/app.blade.php`:
```blade
<li class="nav-item">
    <a class="nav-link" href="{{ route('admin.mypage') }}">
        <span class="nav-link-icon">
            <i class="ti ti-icon-name"></i>
        </span>
        <span class="nav-link-title">My Page</span>
    </a>
</li>
```

### Create New Admin Page
```bash
# 1. Create controller
php artisan make:controller Admin/MyController

# 2. Add route in routes/web.php
Route::get('/my-page', [MyController::class, 'index'])->name('mypage');

# 3. Create view at resources/views/admin/mypage.blade.php
@extends('layouts.admin.app')
@section('content')
  <!-- Your content -->
@endsection
```

### Modify Game
Edit `resources/js/game/app.js`:
- `preload()`: Load assets
- `create()`: Setup game
- `update()`: Game loop

### Add Database Table
```bash
php artisan make:migration create_mytable_table
php artisan migrate
```

## 🐛 Debugging

```bash
# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Check logs
tail -f storage/logs/laravel.log

# Rebuild assets
npm run build
```

## 📊 Database

Default connection: MySQL (XAMPP)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=four_season_game
DB_USERNAME=root
DB_PASSWORD=
```

## 🔐 Default Auth

Laravel Breeze included:
- Login/Register views
- Password reset
- Email verification (optional)
- Profile management

## 💡 Tips

1. **Use `npm run dev`** during development for hot reload
2. **Run `npm run build`** before committing
3. **Keep admin and game assets separate** - don't mix bundles
4. **Use Tabler components** for consistent admin UI
5. **Check browser console** for Phaser game errors

## 📱 Responsive

- Admin: Responsive via Tabler (Bootstrap)
- Game: Fixed canvas size (customizable)

## 🎯 Next Steps

1. Configure database (.env)
2. Run migrations
3. Create admin user
4. Customize game in `resources/js/game/app.js`
5. Add game assets to `public/assets/`
6. Build admin features as needed
