USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_Campaigns_GridGetCampaignsList]    Script Date: 13.05.2018 19:09:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [HM].[pCRM_Campaigns_GridGetCampaignsList] 
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
  Name NVARCHAR(500) NOT NULL,
  Status TINYINT NOT NULL,
  SendDate DATETIME,
  RecipientsCount INT NOT NULL,
  MessageSubject NVARCHAR(500) NOT NULL
 )
 
 INSERT INTO @Results
  SELECT C.[Id]
    ,C.Name
    ,C.Status
	,C.SendDate
	,COUNT(CC.Id)
	,C.MessageSubject
 FROM HM.CRM_Campaigns C
 LEFT JOIN HM.CRM_CampaignContacts CC ON CC.CampaignId = C.Id 
	AND CC.IsDeleted = 0
 WHERE (ISNULL(@Search, '') = '' 
   OR C.Name LIKE '%' + @Search +'%'
   OR C.MessageSubject LIKE '%' + @Search +'%'
  ) AND C.IsDeleted = 0
 GROUP BY C.Id, C.Name, C.Status, C.SendDate, C.MessageSubject

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Name END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Name END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Status END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Status END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.SendDate END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.SendDate END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.RecipientsCount END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.RecipientsCount END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.MessageSubject END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.MessageSubject END DESC,
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

