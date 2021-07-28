USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_HoodOffers_GridGetHoodOffersList]    Script Date: 16.05.2019 19:06:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [HM].[pCRM_HoodOffers_GridGetHoodOffersList] 
 @UserId INT = NULL,
 @Status TINYINT = NULL,
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
  OfferNumber NVARCHAR(50),
  CreatedOn DATETIME NOT NULL,
  City NVARCHAR (100),
  FinalValue decimal(18, 2),
  InstallationObjectName NVARCHAR(250),
  Status tinyint,
  Comment NVARCHAR (MAX),
  PdfFileName NVARCHAR(MAX),
  RegionCode NVARCHAR(50),
  Address NVARCHAR(250)
 )
 
 INSERT INTO @Results
  SELECT HO.Id
    ,HO.OfferNumber
    ,HO.CreatedOn
	,OB.miasto
	,HO.FinalValue
	,OB.nazwa
	,HO.Status
	,HO.Comment
	,HO.OfferNumber + CASE WHEN OB.id IS NOT NULL 
		THEN '_' + ISNULL(OB.nazwa, '') + ' ' + ISNULL(OB.adres, '')  + ' ' + ISNULL(OB.miasto, '') 
		ELSE '' END + '_A' AS PdfFileName
	,R.Code
	,OB.adres
 FROM HM.CRM_HoodOffers HO
 LEFT JOIN HM.CRM_Regions R ON R.Id = HO.RegionId
 --INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.CustomerId = HO.SellerFirmaId) 
 LEFT JOIN HM.S_OBIEKTY OB ON OB.id = HO.InstallationObjectObiektyId
 WHERE (ISNULL(@Search, '') = '' 
   OR HO.OfferNumber LIKE '%' + @Search +'%'
   OR HO.CreatedOn LIKE '%' + @Search +'%'
   OR OB.miasto LIKE '%' + @Search +'%'
   OR HO.FinalValue LIKE '%' + @Search +'%'
   OR OB.nazwa LIKE '%' + @Search +'%'
   OR R.Code LIKE '%' + @Search +'%'
   OR OB.adres LIKE '%' + @Search +'%'
  ) 
  AND HO.IsDeleted = 0
  AND (@Status IS NULL OR HO.Status = @Status)
  AND HO.Status != 0 /*New*/

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.City END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.City END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Address END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Address END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.InstallationObjectName END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.InstallationObjectName END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.RegionCode END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.RegionCode END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.FinalValue END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.FinalValue END DESC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.Status END ASC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.Status END DESC,
  CASE WHEN @SortField = 8 AND @SortDirection = 'ASC' THEN R.Comment END ASC,
  CASE WHEN @SortField = 8 AND @SortDirection = 'DESC' THEN R.Comment END DESC,
  Id DESC
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

