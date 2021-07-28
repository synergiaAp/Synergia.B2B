USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_HoodPartsPriceList_GridGetHoodPartsPriceListList]    Script Date: 22.11.2018 20:20:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




Create PROCEDURE [HM].[pCRM_HoodPartsPriceList_GridGetHoodPartsPriceListList] 
 @Search NVARCHAR(100) = NULL,
 @SortField TINYINT = 0,
 @SortDirection VARCHAR(5) = 'ASC',
 @Start INT = 0,
 @Lenght INT = 10,
 @RecordsTotal INT OUTPUT
AS
BEGIN

 DECLARE @Results TABLE(
  Id BIGINT NOT NULL,
  Name NVARCHAR(150) NOT NULL,
  PriceNet Decimal(18,2) NOT NULL
 )
 
 INSERT INTO @Results
  SELECT U.[Id]
    ,U.Name
    ,U.PriceNet
 FROM HM.CRM_HoodPartsPriceList U
 WHERE (ISNULL(@Search, '') = '' 
   OR U.Name LIKE '%' + @Search +'%'
   OR U.PriceNet LIKE '%' + @Search +'%'
  ) AND U.IsDeleted = 0

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Name END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Name END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.PriceNet END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.PriceNet END DESC
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

