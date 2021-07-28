SET SQL_SERVER=.
SET DB_NAME=ERP_SYNERGIA
SET OSQL_PATH=sqlcmd.exe

%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\01 Tables.sql" & IF ERRORLEVEL 1 goto ERROR
%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\02 Conversion tables.sql" & IF ERRORLEVEL 1 goto ERROR
%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\04 Functions.sql" & IF ERRORLEVEL 1 goto ERROR
%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\06 Procedures.sql" & IF ERRORLEVEL 1 goto ERROR
%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\08 Indexes.sql" & IF ERRORLEVEL 1 goto ERROR
%OSQL_PATH% -b -E -S %SQL_SERVER% -d %DB_NAME% -i ".\09 Default values.sql" & IF ERRORLEVEL 1 goto ERROR

echo OK
pause
exit

:ERROR
echo Error
pause
exit 1
