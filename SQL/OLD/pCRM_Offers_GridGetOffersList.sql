USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Offers_GridGetOffersList]    Script Date: 13.05.2018 19:10:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_Offers_GridGetOffersList] 
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
  OfferDate date,
  CustomerName NVARCHAR(150),
  SellerName NVARCHAR(150),
  CatalogValue decimal(18, 2),
  ValueAfterPrimatyDiscount decimal(18, 2),
  FinalValueAfterAllDiscounts decimal(18, 2),
  Status tinyint,
  OfferPdfGeneratedFileName VARCHAR(50),
  OfferPdfOriginalFileName VARCHAR(50),
  DokExists BIT,
  InstallationObjectName NVARCHAR(250)
 )
 
 INSERT INTO @Results
  SELECT C.[Id]
    ,C.OfferNumber
    ,C.OfferDate
	,O.Name
	,F.nazwa
	,C.CatalogValue
	,C.ValueAfterPrimatyDiscount
	,C.FinalValueAfterAllDiscounts
	,C.Status
	,Fpdf.GeneratedFileName
	,Fpdf.OriginalFileName
	,IIF(OE.Id IS NOT NULL, 1, 0) AS DokExists
	,OB.nazwa
 FROM HM.CRM_Offers C
 INNER JOIN HM.vCRM_Firmy F ON F.id = C.SellerFirmaId
 LEFT JOIN HM.CRM_OfferCompanies O ON O.id = C.CustomerOfferCompanyId
 LEFT JOIN HM.CRM_Files Fpdf ON Fpdf.Id = C.OfferPdfFileId
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.CustomerId = C.SellerFirmaId) 
 LEFT JOIN HM.S_OBIEKTY OB ON OB.id = C.InstallationObjectObiektyId
 OUTER APPLY
 (
	SELECT TOP 1 OE.Id
	FROM HM.CRM_OfferElements OE
	INNER JOIN HM.vCRM_TowaryDok TD ON TD.twid = OE.ProduktId
	WHERE OE.OffersId = C.Id
 ) AS OE
 WHERE (ISNULL(@Search, '') = '' 
   OR C.OfferNumber LIKE '%' + @Search +'%'
   OR C.OfferDate LIKE '%' + @Search +'%'
   OR O.Name LIKE '%' + @Search +'%'
   OR F.nazwa LIKE '%' + @Search +'%'
   OR C.CatalogValue LIKE '%' + @Search +'%'
   OR C.ValueAfterPrimatyDiscount LIKE '%' + @Search +'%'
   OR C.FinalValueAfterAllDiscounts LIKE '%' + @Search +'%'
   OR C.Status LIKE '%' + @Search +'%'
   OR OB.nazwa LIKE '%' + @Search +'%'
  ) AND C.IsDeleted = 0
  AND (@Status IS NULL OR C.Status = @Status)

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.OfferDate END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.OfferDate END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.SellerName END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.SellerName END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.CatalogValue END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.CatalogValue END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.ValueAfterPrimatyDiscount END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.ValueAfterPrimatyDiscount END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.FinalValueAfterAllDiscounts END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.FinalValueAfterAllDiscounts END DESC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.Status END ASC,
  CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.Status END DESC
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

