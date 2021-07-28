USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_MonthlyReport_GridGetMonthlyReportsList]    Script Date: 12.06.2018 22:53:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_MonthlyReport_GridGetMonthlyReportsList] 
 @UserId INT = NULL,
 @ShowAllSubmittedReports bit,
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
  Date datetime NOT null,
  UserName nvarchar(100) NOT NULL,
  RegionCode nvarchar(50) NOT NULL,
  OrdersValueSum Decimal(18,2) NOT NULL,
  PlannedOrdersValueSum Decimal(18,2) NOT NULL,
  ModifiedOn datetime NOT NULL,
  Status tinyint NOT NULL
 )
 
 INSERT INTO @Results
  SELECT M.[Id]
    ,M.Date
    ,U.Surname + ' ' + U.FirstName 
	,R.Code
	,M.OrdersValueSum
	,M.PlannedOrdersValueSum
	,M.ModifiedOn
	,M.Status
 FROM HM.CRM_MonthlyReports M
 INNER JOIN HM.CRM_Users Ulogged ON Ulogged.Id = @UserId AND (Ulogged.Role = 1/*admin*/ OR Ulogged.Id = M.OwnerUserId) 
 INNER JOIN HM.CRM_Users U ON U.Id = M.OwnerUserId
 INNER JOIN HM.CRM_Regions R ON R.Id = M.RegionId
 WHERE (ISNULL(@Search, '') = '' 
   OR U.Surname LIKE '%' + @Search +'%'
   OR R.Code LIKE '%' + @Search +'%'
   OR M.OrdersValueSum LIKE '%' + @Search +'%'
   OR M.PlannedOrdersValueSum LIKE '%' + @Search +'%'
   OR M.ModifiedOn LIKE '%' + @Search +'%'
  ) AND M.IsDeleted = 0
  AND ((@ShowAllSubmittedReports = 1 AND m.Status = 1/*submitted*/) OR (@ShowAllSubmittedReports = 0))

 SELECT @RecordsTotal = COUNT(*)
 FROM @Results

 SELECT * FROM @Results R
 ORDER BY
  CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Date END ASC,
  CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Date END DESC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.UserName END ASC,
  CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.UserName END DESC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.RegionCode END ASC,
  CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.RegionCode END DESC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.OrdersValueSum END ASC,
  CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.OrdersValueSum END DESC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.PlannedOrdersValueSum END ASC,
  CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.PlannedOrdersValueSum END DESC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.ModifiedOn END ASC,
  CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.ModifiedOn END DESC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.Status END ASC,
  CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.Status END DESC
 
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

