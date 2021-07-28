if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[fCRM_SplitToInt]') and OBJECTPROPERTY(id, N'IsTableFunction ') = 1)
drop function [HM].[fCRM_SplitToInt]
GO
print 'Create function fCRM_SplitToInt';
GO
CREATE FUNCTION [HM].[fCRM_SplitToInt]
(
   @List VARCHAR(max)
  , @Delimiter CHAR(1)
)
RETURNS @Items TABLE (Id INT IDENTITY(1,1), Item INT)
AS
BEGIN
	DECLARE @ll INT = LEN(@List) + 1, @ld INT = LEN(@Delimiter);
	WITH a AS
	(
		SELECT
			[start] = 1,
			[end]   = COALESCE(NULLIF(CHARINDEX(@Delimiter, 
						@List, 1), 0), @ll),
			[value] = SUBSTRING(@List, 1, 
						COALESCE(NULLIF(CHARINDEX(@Delimiter, 
						@List, 1), 0), @ll) - 1)
		UNION ALL
		SELECT
			[start] = CONVERT(INT, [end]) + @ld,
			[end]   = COALESCE(NULLIF(CHARINDEX(@Delimiter, 
						@List, [end] + @ld), 0), @ll),
			[value] = SUBSTRING(@List, [end] + @ld, 
						COALESCE(NULLIF(CHARINDEX(@Delimiter, 
						@List, [end] + @ld), 0), @ll)-[end]-@ld)
		FROM a
		WHERE [end] < @ll
	)
	INSERT @Items 
	SELECT [value]
	FROM a
	WHERE LEN([value]) > 0
	OPTION (MAXRECURSION 0);
	RETURN
END
GO
-- end fCRM_SplitToInt