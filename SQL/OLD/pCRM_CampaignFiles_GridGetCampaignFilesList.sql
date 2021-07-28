USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_CampaignFiles_GridGetCampaignFilesList]    Script Date: 03.08.2018 22:10:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_CampaignFiles_GridGetCampaignFilesList] 
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
  OriginalFileName NVARCHAR(255) NOT NULL,
  GeneratedFileName VARCHAR(50) NOT NULL,
  FileSize INT NOT NULL
 )
 
 INSERT INTO @Results
  SELECT CF.[Id]
    ,F.OriginalFileName
	,F.GeneratedFileName
    ,F.FileSize
 FROM HM.CRM_CampaignFiles CF
 INNER JOIN HM.CRM_Files F ON F.Id = CF.FileId
 WHERE CF.IsDeleted = 0
  AND CF.CampaignId = @CampaignId

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  R.Id

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

