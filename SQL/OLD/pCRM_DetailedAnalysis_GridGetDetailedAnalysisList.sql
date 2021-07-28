USE [ERP_JEVEN]
GO

/****** Object:  StoredProcedure [HM].[pCRM_DetailedAnalysis_GridGetDetailedAnalysisList]    Script Date: 12.03.2019 22:25:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [HM].[pCRM_DetailedAnalysis_GridGetDetailedAnalysisList] 
	@UserId INT = NULL,
	@Column TINYINT,
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
		Date DATETIME NOT NULL,
		ColumnValue NVARCHAR(MAX)
	)
 
	INSERT INTO @Results
	SELECT *
	FROM
	(
		SELECT U.Surname + ' ' + U.FirstName AS UserName,
			M.Date,
			CASE @Column WHEN 1 THEN M.NewContacts
				WHEN 2 THEN M.MarketingActivities
				WHEN 3 THEN M.MarketingPlans
				WHEN 4 THEN M.Troubles
				WHEN 5 THEN M.Holidays
				WHEN 6 THEN M.Summary
				ELSE ''
				END AS ColumnValue
		FROM HM.CRM_MonthlyReports M
		INNER JOIN HM.CRM_Users U ON U.Id = M.OwnerUserId
		AND M.IsDeleted = 0
		AND M.Date BETWEEN DATEADD(MONTH, -1, @StartDate) AND @EndDate
		AND (@UserId IS NULL OR U.Id = @UserId)
		AND M.Status = 1 /*Submitted*/
	) AS SubQuery
	WHERE (ISNULL(@Search, '') = '' 
			OR SubQuery.ColumnValue LIKE '%' + @Search +'%'
			OR SubQuery.UserName LIKE '%' + @Search +'%' 
	) 
	AND ISNULL(SubQuery.ColumnValue, '') != ''

	SELECT @RecordsTotal = COUNT(*)
	FROM @Results

	SELECT * FROM @Results R
	ORDER BY
		CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.UserName END ASC,
		CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.UserName END DESC,
		CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Date END ASC,
		CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Date END DESC,
		CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.ColumnValue END ASC,
		CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.ColumnValue END DESC
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

