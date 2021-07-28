USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Products_GridGetProductsList]    Script Date: 13.05.2018 19:11:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [HM].[pCRM_Products_GridGetProductsList] 
 @PairType TINYINT,
 @ParentProductId INT,
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
  Code NVARCHAR(100),
  Name NVARCHAR(MAX),
  GroupCode NVARCHAR(100),
  Line NVARCHAR(100),
  Model NVARCHAR(100),
  Terminal NVARCHAR(100),
  Dimensions NVARCHAR(100),
  PowerGas Decimal(18,2),
  PowerElecticity Decimal(18,2),
  SortNumber TINYINT
 )
 
 INSERT INTO @Results
  SELECT P.id
    ,P.kod
    ,P.nazwa
    ,P.GrupaKod
	,P.Linia
    ,P.Model
    ,P.Przylacze
    ,P.Gabaryty
    ,P.MocGaz
    ,P.MocPrad
	,TP.lp
 FROM HM.vCRM_TowaryPow TP
 INNER JOIN HM.vCRM_Produkty P ON P.id = TP.twid
 WHERE (ISNULL(@Search, '') = '' 
   OR P.kod LIKE '%' + @Search +'%'
   OR P.nazwa LIKE '%' + @Search +'%'
   OR P.GrupaKod LIKE '%' + @Search +'%'
   OR P.Linia LIKE '%' + @Search +'%'
   OR P.Model LIKE '%' + @Search +'%'
   OR P.Oznaczenie LIKE '%' + @Search +'%'
   OR P.Przylacze LIKE '%' + @Search +'%'
   OR P.Gabaryty LIKE '%' + @Search +'%'
   OR P.MocGaz LIKE '%' + @Search +'%'
   OR P.MocPrad LIKE '%' + @Search +'%'
  ) AND TP.typ = @PairType AND TP.twparid = @ParentProductId

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY R.SortNumber, R.Id
 
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

