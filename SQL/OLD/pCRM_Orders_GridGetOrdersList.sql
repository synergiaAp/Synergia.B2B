USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Orders_GridGetOrdersList]    Script Date: 28.05.2018 22:54:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [HM].[pCRM_Orders_GridGetOrdersList] 
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
  OrderNumber NVARCHAR(50),
  OrderDate date,
  CustomerName NVARCHAR(150),
  SellerName NVARCHAR(150),
  CatalogValue decimal(18, 2),
  FinalValueAfterAllDiscounts decimal(18, 2),
  OfferNumber NVARCHAR(100),
  Status tinyint,
  OrderPdfGeneratedFileName VARCHAR(50),
  OrderPdfOriginalFileName VARCHAR(50)
 )
 
 INSERT INTO @Results
  SELECT C.[Id]
    ,C.OrderNumber
    ,C.OrderDate
	,O.Name
	,F.nazwa
	,C.CatalogValue
	,C.FinalValueAfterAllDiscounts
	,Z.OfferNumber
	,C.Status
	,Fpdf.GeneratedFileName
	,Fpdf.OriginalFileName
 FROM HM.CRM_Orders C
 INNER JOIN HM.vCRM_Firmy F ON F.id = C.SellerFirmaId
 LEFT JOIN HM.CRM_OfferCompanies O ON O.id = C.CustomerOfferCompanyId
 LEFT JOIN HM.CRM_Files Fpdf ON Fpdf.Id = C.PdfFileId
 LEFT JOIN HM.CRM_Offers Z ON Z.Id = C.OrderFromOfferId
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (U.Role = 1/*admin*/ OR U.CustomerId = C.SellerFirmaId) 
 WHERE (ISNULL(@Search, '') = '' 
   OR C.OrderNumber LIKE '%' + @Search +'%'
   OR C.OrderDate LIKE '%' + @Search +'%'
   OR O.Name LIKE '%' + @Search +'%'
   OR F.nazwa LIKE '%' + @Search +'%'
   OR C.CatalogValue LIKE '%' + @Search +'%'
   OR C.FinalValueAfterAllDiscounts LIKE '%' + @Search +'%'
   OR Z.OfferNumber LIKE '%' + @Search +'%'
   OR C.Status LIKE '%' + @Search +'%'
  ) AND C.IsDeleted = 0

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OrderNumber END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OrderNumber END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.OrderDate END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.OrderDate END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.SellerName END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.SellerName END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.CatalogValue END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.CatalogValue END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.FinalValueAfterAllDiscounts END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.FinalValueAfterAllDiscounts END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
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

