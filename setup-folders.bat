@echo off
echo ========================================
echo   Chery Website - Folder Setup
echo ========================================
echo.

REM Create vehicle images folder
if not exist "public\images\vehicles" mkdir public\images\vehicles
echo [OK] Created: public/images/vehicles/

REM Create branch folders
if not exist "public\images\branches\cibubur" mkdir public\images\branches\cibubur
echo [OK] Created: public/images/branches/cibubur/

if not exist "public\images\branches\makassar" mkdir public\images\branches\makassar
echo [OK] Created: public/images/branches/makassar/

if not exist "public\images\branches\pare-pare" mkdir public\images\branches\pare-pare
echo [OK] Created: public/images/branches/pare-pare/

REM Create lifestyle folder
if not exist "public\images\lifestyle" mkdir public\images\lifestyle
echo [OK] Created: public/images/lifestyle/

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy vehicle images to public/images/vehicles/
echo 2. Copy branch photos to public/images/branches/[branch]/
echo 3. Copy lifestyle images to public/images/lifestyle/
echo 4. Run: npm run dev
echo.
pause