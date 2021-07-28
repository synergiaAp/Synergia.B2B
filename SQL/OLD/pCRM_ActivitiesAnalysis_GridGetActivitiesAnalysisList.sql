USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_ActivitiesAnalysis_GridGetActivitiesAnalysisList]    Script Date: 12.03.2019 22:16:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [HM].[pCRM_ActivitiesAnalysis_GridGetActivitiesAnalysisList] 
	@UserId INT = NULL,
	@StartDate DATE,
	@EndDate DATE,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN

	DECLARE @Results TABLE(
		UserName NVARCHAR(100) NOT NULL,
		MeetingsQuantity SMALLINT NOT NULL,
		TechnicalSelectionsSum SMALLINT NOT NULL,
		Agreements SMALLINT NOT NULL,
		OffersSum SMALLINT NOT NULL,
		OrdersValueSum DECIMAL(18, 2) NOT NULL,
		PlannedOrdersValueSum DECIMAL(18, 2) NOT NULL
	)
 
	INSERT INTO @Results
	SELECT U.Surname + ' ' + U.FirstName,
		SUM(CASE WHEN M.Date BETWEEN @StartDate AND @EndDate THEN ISNULL(M.MeetingsQuantity, 0) ELSE 0 END),
		SUM(CASE WHEN M.Date BETWEEN @StartDate AND @EndDate THEN ISNULL(M.TechnicalSelectionsSum, 0) ELSE 0 END),
		SUM(CASE WHEN M.Date BETWEEN @StartDate AND @EndDate THEN ISNULL(M.Agreements, 0) ELSE 0 END),
		SUM(CASE WHEN M.Date BETWEEN @StartDate AND @EndDate THEN ISNULL(M.OffersSum, 0) ELSE 0 END),
		SUM(CASE WHEN M.Date BETWEEN @StartDate AND @EndDate THEN ISNULL(M.OrdersValueSum, 0) ELSE 0 END),
		SUM(CASE WHEN M.Date BETWEEN DATEADD(MONTH, -1, @StartDate) AND DATEADD(MONTH, -1, @EndDate) THEN ISNULL(M.PlannedOrdersValueSum, 0) ELSE 0 END)
	FROM HM.CRM_MonthlyReports M
	INNER JOIN HM.CRM_Users U ON U.Id = M.OwnerUserId
	WHERE (ISNULL(@Search, '') = '' 
		OR U.Surname + ' ' + U.FirstName LIKE '%' + @Search +'%'
	) 
	AND M.IsDeleted = 0
	AND M.Date BETWEEN DATEADD(MONTH, -1, @StartDate) AND @EndDate
	AND M.Status = 1 /*Submitted*/
	GROUP BY U.Id, U.Surname + ' ' + U.FirstName
	HAVING MAX(M.Date) >= @StartDate

	SELECT @RecordsTotal = COUNT(*)
	FROM @Results

	SELECT * FROM @Results R
	ORDER BY
		CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.UserName END ASC,
		CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.UserName END DESC,
		CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.MeetingsQuantity END ASC,
		CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.MeetingsQuantity END DESC,
		CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.TechnicalSelectionsSum END ASC,
		CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.TechnicalSelectionsSum END DESC,
		CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Agreements END ASC,
		CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Agreements END DESC,
		CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.OffersSum END ASC,
		CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.OffersSum END DESC,
		CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.OrdersValueSum END ASC,
		CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.OrdersValueSum END DESC,
		CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.PlannedOrdersValueSum END ASC,
		CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.PlannedOrdersValueSum END DESC
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

