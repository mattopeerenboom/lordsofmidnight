@echo off
if "%~1"=="" (
    echo Usage: %~nx0 [directory]
    exit /b 1
)

set "target_dir=%~1"

if not exist "%target_dir%" (
    echo Error: The directory "%target_dir%" does not exist.
    exit /b 1
)

pushd "%target_dir%" || exit /b 1

for %%f in (*.png) do (
    magick "%%f" -flop "temp_%%~nf.png"
    move /y "temp_%%~nf.png" "%%f" >nul
)

popd

echo All .png images in "%target_dir%" have been flipped horizontally and overwritten.