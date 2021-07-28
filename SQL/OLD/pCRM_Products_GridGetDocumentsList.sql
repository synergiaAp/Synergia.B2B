USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Products_GridGetDocumentsList]    Script Date: 13.05.2018 19:11:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create PROCEDURE [HM].[pCRM_Products_GridGetDocumentsList] 
 @ProductIds VARCHAR(MAX),
 @Search NVARCHAR(100) = NULL,
 @SortField TINYINT = 0,
 @SortDirection VARCHAR(5) = 'ASC',
 @Start INT = 0,
 @Lenght INT = 10,
 @RecordsTotal INT OUTPUT
AS
BEGIN

 DECLARE @Results TABLE(
  TypeName NVARCHAR(100) NOT NULL,
  FileName NVARCHAR(250) NULL,
  SortNumber INT NOT NULL,
  ProductId INT NOT NULL,
  ProductCode VARCHAR(40) NOT NULL
 )
 
 INSERT INTO @Results
  SELECT TD.typNazwa
    ,TD.dokument
    ,TD.lp
	,P.id
	,P.kod
 FROM HM.vCRM_TowaryDok TD
 INNER JOIN [HM].[fCRM_SplitToInt](@ProductIds, ',') pIds ON pIds.Item = TD.twid
 INNER JOIN HM.vCRM_Produkty P ON P.id = TD.twid
 WHERE (ISNULL(@Search, '') = '' 
   OR TD.dokument LIKE '%' + @Search +'%'
   OR TD.typNazwa LIKE '%' + @Search +'%'
  ) 
  --AND TD.twid = @ProductId

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY R.SortNumber
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

