USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Invoices_GridGetInvoicesList]    Script Date: 13.05.2018 19:09:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [HM].[pCRM_Invoices_GridGetInvoicesList] 
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
  ValueNet FLOAT NULL,
  ValueGross FLOAT NULL,
  ValueToPay FLOAT NULL
 )
 
 INSERT INTO @Results
  SELECT C.[fvsid]
    ,C.fvsnr
	,C.nazwa_dok
    ,C.fvsdata
	,F.nazwa
    ,C.fvsnetto
	,C.fvsbrutto
    ,C.fvsdozaplaty
 FROM HM.vCRM_FirmyFVS C
 INNER JOIN HM.vCRM_Firmy F ON F.id = C.khid
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.CustomerId = C.khid) 
 WHERE (ISNULL(@Search, '') = '' 
   OR C.fvsnr LIKE '%' + @Search +'%'
   OR C.nazwa_dok LIKE '%' + @Search +'%'
   OR C.fvsdata LIKE '%' + @Search +'%'
   OR F.nazwa LIKE '%' + @Search +'%'
   OR C.fvsnetto LIKE '%' + @Search +'%'
   OR C.fvsbrutto LIKE '%' + @Search +'%'
   OR C.fvsdozaplaty LIKE '%' + @Search +'%'
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
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.ValueNet END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.ValueNet END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.ValueGross END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.ValueGross END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.ValueToPay END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.ValueToPay END DESC
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

