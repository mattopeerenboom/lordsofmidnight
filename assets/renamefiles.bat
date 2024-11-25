@echo off
setlocal enabledelayedexpansion

:: Check if the directory argument is provided
if "%~1"=="" (
    echo Usage: %~nx0 [directory_path]
    echo Please provide the path to the directory.
    pause
    exit /b
)

:: Set the directory from the first argument
set "dir=%~1"

:: Verify the directory exists
if not exist "%dir%" (
    echo The directory "%dir%" does not exist.
    pause
    exit /b
)

:: Change to the target directory
pushd "%dir%" || (echo Failed to access the directory & pause & exit /b)

:: Initialize counter
set /a counter=0

:: Loop through all files in the directory
for %%F in (*.png) do (
    :: Format the counter with leading zeros
    set "newname=000"
    set /a newcounter=counter
    set /a counter+=1
    set "newname=000!newcounter!"
    set "newname=!newname:~-3!.png"

    :: Rename the file
    ren "%%F" "!newname!"
)

:: Return to the original directory
popd

echo Renaming complete!
