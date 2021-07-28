USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Objects_GridGetInstallationObjectsList]    Script Date: 16.09.2018 21:59:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_Objects_GridGetInstallationObjectsList] 
 @Search NVARCHAR(100) = NULL,
 @SortField TINYINT = 0,
 @SortDirection VARCHAR(5) = 'ASC',
 @Start INT = 0,
 @Lenght INT = 10,
 @RecordsTotal INT OUTPUT
AS
BEGIN

 DECLARE @Results TABLE(
  Id INT NOT NULL,
  Code NVARCHAR(150) NULL,
  Name NVARCHAR(250) NULL,
  Address NVARCHAR(250) NULL,
  PostalCode NVARCHAR(50) NULL,
  City NVARCHAR(150) NULL,
  Country NVARCHAR(50) NULL,
  Type NVARCHAR(150) NULL,
  OfferCompanyName NVARCHAR(150) NULL
 )
 
 INSERT INTO @Results
  SELECT U.[Id]
    ,U.kod
    ,U.nazwa
    ,U.adres
	,U.kodpocz
    ,U.miasto
    ,U.kraj
	,U.typ
	,OC.Name
 FROM HM.S_OBIEKTY U 
 LEFT JOIN HM.CRM_OfferCompanies AS OC ON OC.Id = U.OfferCompanyId 
 WHERE (ISNULL(@Search, '') = '' 
   OR U.kod LIKE '%' + @Search +'%'
   OR U.nazwa LIKE '%' + @Search +'%'
   OR U.adres LIKE '%' + @Search +'%'
   OR U.kodpocz LIKE '%' + @Search +'%'
   OR U.miasto LIKE '%' + @Search +'%'
   OR U.kraj LIKE '%' + @Search +'%'
   OR U.typ LIKE '%' + @Search +'%'
   OR OC.Name LIKE '%' + @Search +'%'
  ) AND U.status != 1

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Type END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Type END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Code END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Code END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.Name END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.Name END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Address END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Address END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.PostalCode END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.PostalCode END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.City END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.City END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.Country END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.Country END DESC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.OfferCompanyName END ASC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.OfferCompanyName END DESC
 OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
 
 IF @@ERROR<>0 GOTO ERROR_PROC

 --------------------------------------------------------------------------
 -- exit point of the store proc
 RETURN(0)

 ERROR_PROC:
  DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
  DECLARE @ErrorSeverity INT = ERROR_SEVERITY()
  DECLARE @ErrorState INT = ERROR_STATE()
  RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState)
END
GO

