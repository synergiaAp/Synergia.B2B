USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_CampaignContacts_GridGetCampaignContactsList]    Script Date: 31.07.2018 22:20:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_CampaignContacts_GridGetCampaignContactsList] 
 @CampaignId INT,
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
  FirstName NVARCHAR(50) NULL,
  Surname NVARCHAR(100) NULL,
  CustomerName NVARCHAR(150) NULL,
  Position NVARCHAR(100) NULL,
  Attitude VARCHAR(100) NULL,
  Email NVARCHAR(100) NULL,
  CustomerType NVARCHAR(100) NULL
 )
 
 INSERT INTO @Results
  SELECT CC.[Id]
    ,C.FirstName
    ,C.Surname
	,O.Name
	,C.Position
	,C.Attitude
	,C.Email
	,C.CustomerType
 FROM HM.CRM_CampaignContacts CC
 INNER JOIN HM.CRM_Contacts C ON C.Id = CC.ContactId
 INNER JOIN HM.CRM_OfferCompanies O ON O.Id = C.OffersCompanyId
 WHERE (ISNULL(@Search, '') = '' 
   OR C.FirstName LIKE '%' + @Search +'%'
   OR C.Surname LIKE '%' + @Search +'%'
   OR O.Name LIKE '%' + @Search +'%'
   OR C.Position LIKE '%' + @Search +'%'
   OR C.Attitude LIKE '%' + @Search +'%'
   OR C.Email LIKE '%' + @Search +'%'
  ) AND C.IsDeleted = 0
  AND CC.IsDeleted = 0
  AND CC.CampaignId = @CampaignId

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.FirstName END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.FirstName END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Surname END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Surname END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Position END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Position END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.Attitude END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.Attitude END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.Email END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.Email END DESC,
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

