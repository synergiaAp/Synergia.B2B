USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_PersonalProducts_GridGetPersonalProductsList]    Script Date: 13.05.2018 19:11:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [HM].[pCRM_PersonalProducts_GridGetPersonalProductsList] 
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
  Code NVARCHAR(50),
  Name NVARCHAR(300),
  Dimensions NVARCHAR(50) NULL,
  Terminal NVARCHAR(50) NULL,
  PowerGas NVARCHAR(50) NULL,
  PowerElectricity NVARCHAR(50) NULL,
  PriceNet Decimal(18,2) NULL
 )
 
 INSERT INTO @Results
  SELECT P.[Id]
    ,P.Code
    ,P.Name
	,P.Dimensions
	,P.Terminal
	,P.PowerGas
	,P.PowerElectricity
	,P.PriceNet
 FROM HM.CRM_PersonalProducts P
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.Id = P.OwnerUserId) 
 WHERE (ISNULL(@Search, '') = '' 
   OR P.Code LIKE '%' + @Search +'%'
   OR P.Name LIKE '%' + @Search +'%'
   OR P.Dimensions LIKE '%' + @Search +'%'
   OR P.Terminal LIKE '%' + @Search +'%'
   OR P.PowerGas LIKE '%' + @Search +'%'
   OR P.PowerElectricity LIKE '%' + @Search +'%'
   OR P.PriceNet LIKE '%' + @Search +'%'
  ) AND P.IsDeleted = 0

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Code END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Code END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.Name END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.Name END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Dimensions END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Dimensions END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.Terminal END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.Terminal END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.PowerGas END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.PowerGas END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.PowerElectricity END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.PowerElectricity END DESC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.PriceNet END ASC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.PriceNet END DESC
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

