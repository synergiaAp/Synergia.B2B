USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_WeeklyPlans_GridGetWeeklyPlansList]    Script Date: 25.03.2019 22:03:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_WeeklyPlans_GridGetWeeklyPlansList] 
 @UserId INT = NULL,
 @ShowAllWeeklyReports bit,
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
  CreatedOn datetime NOT null,
  UserName nvarchar(100) NOT NULL,
  RegionCode nvarchar(50) NOT NULL,
  ModifiedOn datetime NOT NULL,
  Status tinyint NOT NULL,
  YearValue SMALLINT,
  WeekValue TINYINT
 )
 
 INSERT INTO @Results
  SELECT M.[Id]
    ,M.CreatedOn
    ,U.Surname + ' ' + U.FirstName 
	,R.Code
	,M.ModifiedOn
	,M.Status
	,M.YearValue
	,M.WeekValue
 FROM HM.CRM_WeeklyPlans M
 INNER JOIN HM.CRM_Users Ulogged ON Ulogged.Id = @UserId AND (Ulogged.Role = 1/*admin*/ OR Ulogged.Id = M.OwnerUserId) 
 INNER JOIN HM.CRM_Users U ON U.Id = M.OwnerUserId
 INNER JOIN HM.CRM_Regions R ON R.Id = M.RegionId
 WHERE (ISNULL(@Search, '') = '' 
   OR U.Surname LIKE '%' + @Search +'%'
   OR R.Code LIKE '%' + @Search +'%'
   OR M.ModifiedOn LIKE '%' + @Search +'%'
   OR M.CreatedOn LIKE '%' + @Search +'%'
  ) AND M.IsDeleted = 0
  AND ((@ShowAllWeeklyReports = 1 AND m.Status = 1/*submitted*/) OR (@ShowAllWeeklyReports = 0))

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.UserName END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.UserName END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.RegionCode END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.RegionCode END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN (R.YearValue * 100) + R.WeekValue END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN (R.YearValue * 100) + R.WeekValue END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.ModifiedOn END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.ModifiedOn END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.Status END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.Status END DESC
 
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

