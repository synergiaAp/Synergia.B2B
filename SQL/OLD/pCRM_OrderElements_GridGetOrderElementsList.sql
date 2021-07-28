USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_OrderElements_GridGetOrderElementsList]    Script Date: 13.05.2018 19:10:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_OrderElements_GridGetOrderElementsList] 
 @UserId INT = NULL,
 @OrderId INT = NULL,
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
  ProductCode NVARCHAR(100) NULL,
  ProductName NVARCHAR(MAX) NULL,
  ProductDimensions NVARCHAR(100) NULL,
  Quantity INT,
  ProductTerminal NVARCHAR(100) NULL,
  ProductPowerGas DECIMAL(18,2),
  ProductPowerGasSum DECIMAL(18,2),
  ProductPowerElectricity DECIMAL(18,2),
  ProductPowerElectricitySum DECIMAL(18,2),
  CatalogPriceNet DECIMAL(18,2) NULL,
  Discount DECIMAL(18,2),
  PriceAfterDiscountNet DECIMAL(18,2) NULL,
  FinalValueNet DECIMAL(18,2) NULL,
  FileName NVARCHAR(100) NULL,
  ProductId INT NULL,
  DeliveryTimeDays TINYINT NOT NULL
 )
 
 INSERT INTO @Results
  SELECT C.[Id]
    ,P.kod
    ,P.nazwa
	,P.Gabaryty
	,C.Quantity
	,P.Przylacze
	,COALESCE(P.MocGaz, 0)
	,COALESCE(P.MocGaz * C.Quantity, 0)
	,COALESCE(P.MocPrad, 0)
	,COALESCE(P.MocPrad * C.Quantity, 0)
	,C.CatalogPriceNet
	,C.Discount
	,C.PriceAfterDiscountNet
	,C.FinalValueNet
	,P.foto1
	,P.id
	,C.DeliveryTimeDays
 FROM HM.CRM_OrderElements C
 INNER JOIN HM.CRM_Orders O ON O.Id = C.OrderId AND O.Id = @OrderId 
 INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (O.OwnerUserId = U.Id OR U.Role = 1/*admin*/)
 LEFT JOIN HM.vCRM_Produkty P ON P.id = C.ProduktId
 WHERE (ISNULL(@Search, '') = '' 
   OR P.kod LIKE '%' + @Search +'%'
   OR P.nazwa LIKE '%' + @Search +'%'
   OR P.Gabaryty LIKE '%' + @Search +'%'
   OR C.Quantity LIKE '%' + @Search +'%'
   OR P.Przylacze LIKE '%' + @Search +'%'
   OR P.MocGaz LIKE '%' + @Search +'%'
   OR P.MocPrad LIKE '%' + @Search +'%'
   OR C.CatalogPriceNet LIKE '%' + @Search +'%'
   OR C.Discount LIKE '%' + @Search +'%'
   OR C.PriceAfterDiscountNet LIKE '%' + @Search +'%'
   OR C.FinalValueNet LIKE '%' + @Search +'%'
   OR C.DeliveryTimeDays LIKE '%' + @Search +'%'
  ) AND C.IsDeleted = 0

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY R.Id
  
 --OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
 
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

