@echo off
echo ================================
echo Four Season Airplane Game Setup
echo ================================
echo.

echo [1/7] Installing Composer dependencies...
call composer install
if %errorlevel% neq 0 goto error

echo.
echo [2/7] Installing NPM dependencies...
call npm install
if %errorlevel% neq 0 goto error

echo.
echo [3/7] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created
) else (
    echo .env file already exists
)

echo.
echo [4/7] Generating application key...
call php artisan key:generate
if %errorlevel% neq 0 goto error

echo.
echo [5/7] Please configure your database in .env file
echo Edit the following lines:
echo   DB_DATABASE=four_season_game
echo   DB_USERNAME=root
echo   DB_PASSWORD=
echo.
pause

echo.
echo [6/7] Running database migrations...
call php artisan migrate
if %errorlevel% neq 0 (
    echo.
    echo Migration failed. Please check your database configuration.
    echo You can run 'php artisan migrate' manually after fixing the database settings.
    pause
)

echo.
echo [7/7] Building assets...
call npm run build
if %errorlevel% neq 0 goto error

echo.
echo ================================
echo Setup completed successfully!
echo ================================
echo.
echo To start the development server, run:
echo   php artisan serve
echo.
echo Then open your browser to:
echo   http://localhost:8000
echo.
echo Game page: http://localhost:8000
echo Admin login: http://localhost:8000/login
echo.
pause
goto end

:error
echo.
echo ================================
echo Error occurred during setup!
echo ================================
pause
exit /b 1

:end
