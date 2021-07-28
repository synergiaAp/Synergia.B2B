USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_WZDocs_GridGetWZDocsList]    Script Date: 11.05.2019 22:34:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_WZDocs_GridGetWZDocsList] 
 @UserId INT = NULL,
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
  Number VARCHAR(40) NULL,
  DocumentName NVARCHAR(40) NULL,
  Date DATETIME NULL,
  CustomerName NVARCHAR(150) NULL,
  FileName nvarchar(100) NULL
 )
 
 INSERT INTO @Results
  SELECT C.[wzid]
    ,C.wznr
	,C.nazwa_dok
    ,C.wzdata
	,F.nazwa
	,C.Plik
 FROM HM.vCRM_FirmyWZ C
 INNER JOIN HM.vCRM_Firmy F ON F.id = C.khid
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.CustomerId = C.khid) 
 WHERE (ISNULL(@Search, '') = '' 
   OR C.wznr LIKE '%' + @Search +'%'
   OR C.nazwa_dok LIKE '%' + @Search +'%'
   OR C.wzdata LIKE '%' + @Search +'%'
   OR F.nazwa LIKE '%' + @Search +'%'
  )

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Number END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Number END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.DocumentName END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.DocumentName END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.Date END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.Date END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC
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

