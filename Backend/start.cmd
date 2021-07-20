@echo off
cls
set /p db="Enter DB Connection String (leave blank for default): "

IF "%db"=="" (
	npm run-script start
) ELSE (
        npm run-script start "%db%"
)


