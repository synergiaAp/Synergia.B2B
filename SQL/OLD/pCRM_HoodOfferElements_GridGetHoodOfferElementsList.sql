USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_HoodOfferElements_GridGetHoodOfferElementsList]    Script Date: 2018-11-22 19:59:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_HoodOfferElements_GridGetHoodOfferElementsList] 
 @UserId INT = NULL,
 @HoodOfferId INT,
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
  HoodNr NVARCHAR(100),
  Price decimal(18, 2),
  CreatedOn DATETIME NOT NULL,
  ModifiedOn DATETIME NOT NULL,
  FinalPrice DECIMAL(18, 2),
  Quantity INT,
  Type NVARCHAR(50),
  FilterType NVARCHAR(50),
  RowIndex INT
 )
 
 INSERT INTO @Results
  SELECT HOE.Id
    ,HOE.HoodNr
    ,ISNULL(HOE.PriceAdditionalValue, HOE.Price) AS Price
	,HOE.CreatedOn
	,HOE.ModifiedOn
	,HOE.FinalPrice
	,HOE.Quantity
	,HOE.Type
	,HOE.FilterType
	,ROW_NUMBER() OVER(ORDER BY HOE.CreatedOn) AS RowIndex
 FROM HM.CRM_HoodOfferElements HOE
 WHERE (ISNULL(@Search, '') = '' 
   OR HOE.HoodNr LIKE '%' + @Search +'%'
   OR ISNULL(HOE.PriceAdditionalValue, HOE.Price) LIKE '%' + @Search +'%'
   OR HOE.Comments LIKE '%' + @Search +'%'
  ) 
  AND HOE.IsDeleted = 0
  AND HOE.HoodOfferId = @HoodOfferId

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.RowIndex END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.RowIndex END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.HoodNr END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.HoodNr END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Price END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Price END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.Quantity END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.Quantity END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.FinalPrice END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.FinalPrice END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.ModifiedOn END ASC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.ModifiedOn END DESC,
  R.Id
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


