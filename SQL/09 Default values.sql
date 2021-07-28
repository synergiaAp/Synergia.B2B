print '09 Default values.sql';
GO


-- Get actual version
DECLARE @VERNO NVARCHAR(20);

SELECT TOP 1 @VERNO = ISNULL(ConversionType, 'No data')
FROM HM.CRM_DBConversion 
WHERE ConversionType LIKE '%DEF%'
	AND IsDone = 1
ORDER BY Id DESC

PRINT '----------------------------'
PRINT 'Actual version  : ' + ISNULL(@VERNO, 'No data')
PRINT '----------------------------'


/*
*
* BEGIN DEF 0_0_1
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_1' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_1;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_1');

		UPDATE HM.CRM_HoodOfferElements
		SET OrderNo = hoeIndex.RowIndex,
			OrderNoText = CAST(hoeIndex.RowIndex AS NVARCHAR(50))
		FROM HM.CRM_HoodOfferElements hoe
		INNER JOIN
		(
			SELECT hoe1.Id,
				ROW_NUMBER() OVER(PARTITION BY hoe1.HoodOfferId ORDER BY hoe1.CreatedOn) AS RowIndex
			FROM HM.CRM_HoodOfferElements hoe1
			WHERE hoe1.IsDeleted = 0
		) as hoeIndex ON hoeIndex.Id = hoe.Id

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_1', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_1');
		COMMIT TRAN DEF_0_0_1;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_1
		PRINT('Error while converting to def : 0_0_1');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_1
*
*/


/*
*
* BEGIN DEF 0_0_2
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_2' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_2;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_2');

		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Architekt')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Firma consultingowa')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Firma gastronomiczna')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Generalny wykonawca')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Wykonawca instalacji')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Diler Synergia')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Szef kuchni')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Technolog kuchni')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Diler Mareno')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Inwestor sieciowy')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Sanepid')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Inwestor pojedynczy')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Inspektor nadzoru')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Projektant wentylacji')
		INSERT INTO HM.CRM_CustomerType(Name) VALUES('Hurtownia wentylacyjna')

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_2', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_2');
		COMMIT TRAN DEF_0_0_2;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_2
		PRINT('Error while converting to def : 0_0_2');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_2
*
*/


/*
*
* BEGIN DEF 0_0_3
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_3' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_3;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_3');

		INSERT INTO HM.CRM_OfferCompanyCustomerType(CustomerTypeId, 
			OfferCompanyId,
			CreatedByUserId,
			ModifiedByUserId,
			OwnerUserId)
		SELECT ct.Id,
			oc.Id,
			oc.CreatedByUserId,
			oc.ModifiedByUserId,
			oc.OwnerUserId
		FROM HM.CRM_OfferCompanies oc
		INNER JOIN HM.CRM_CustomerType ct ON ct.Name = oc.CustomerType
		WHERE oc.IsDeleted = 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_3', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_3');
		COMMIT TRAN DEF_0_0_3;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_3
		PRINT('Error while converting to def : 0_0_3');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_3
*
*/


/*
*
* BEGIN DEF 0_0_4
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_4' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_4;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_4');

		SET IDENTITY_INSERT [HM].[CRM_Languages] ON 
		
		INSERT [HM].[CRM_Languages] ([Id], [Name], [CultureName], [Abbreviation]) VALUES (1, N'Polski', N'pl-PL', N'PL')
		INSERT [HM].[CRM_Languages] ([Id], [Name], [CultureName], [Abbreviation]) VALUES (2, N'Angielski', N'en-GB', N'EN')
			
		SET IDENTITY_INSERT [HM].[CRM_Languages] OFF
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_4', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_4');
		COMMIT TRAN DEF_0_0_4;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_4
		PRINT('Error while converting to def : 0_0_4');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_4
*
*/


/*
*
* BEGIN DEF 0_0_5
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_5' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_5;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_5');

		UPDATE HM.CRM_HoodOffers
		SET LanguageId = 1
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_5', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_5');
		COMMIT TRAN DEF_0_0_5;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_5
		PRINT('Error while converting to def : 0_0_5');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_5
*
*/


/*
*
* BEGIN DEF 0_0_6
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_6' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_6;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_6');

		INSERT INTO HM.CRM_HoodPartsPriceList(Name, PriceNet)
		VALUES ('nawiewniki JRS 300X600', 520),
			('nawiewniki JRS 300X1200', 1020),
			('nawiewniki JRS 600X600', 990),
			('nawiewniki JRS 600X900', 1150),
			('nawiewniki JRS 600X1200', 1470),
			('nawiewniki JRS 600X1800', 1980),
			('SMOKI Junior 200', 32000),
			('SMOKI Junior 250', 32000),
			('SMOKI Junior 300', 42000),
			('SMOKI Maxi grill 250', 59000),
			('SMOKI Maxi grill 350', 66000),
			('SMOKI Maxi grill 400', 95000),
			('SMOKI Maxi grill 500', 110000),
			('ANSUL uk³ad 1-zbiornikowy', 12000),
			('ANSUL uk³ad 2-zbiornikowy', 19000),
			('ANSUL uk³ad 3-zbiornikowy', 28000),
			('ANSUL uk³ad 4-zbiornikowy', 35000),
			('ANSUL uk³ad 5-zbiornikowy', 45000),
			('ANSUL uk³ad 6-zbiornikowy', 53000),
			('ANSUL uk³ad 7-zbiornikowy', 61000),
			('ANSUL uk³ad 8-zbiornikowy', 69000)
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_6', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_6');
		COMMIT TRAN DEF_0_0_6;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_6
		PRINT('Error while converting to def : 0_0_6');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_6
*
*/


/*
*
* BEGIN DEF 0_0_7
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_7' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_7;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_7');

		UPDATE hoa
		SET hoa.Name = 'Nawiewnik ' + hoa.Name
		FROM [HM].[CRM_HoodOfferAccessories] hoa
		WHERE Name LIKE '%JRS%'

		UPDATE hppl
		SET hppl.Name = REPLACE(hppl.Name, 'nawiewniki', 'nawiewnik')
		FROM HM.CRM_HoodPartsPriceList hppl
		WHERE hppl.Name LIKE '%JRS%'
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_7', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_7');
		COMMIT TRAN DEF_0_0_7;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_7
		PRINT('Error while converting to def : 0_0_7');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_7
*
*/


/*
*
* BEGIN DEF 0_0_8
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_8' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_8;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_8');

		SET IDENTITY_INSERT [HM].[CRM_Languages] ON 
		
		INSERT [HM].[CRM_Languages] ([Id], [Name], [CultureName], [Abbreviation]) VALUES (3, N'Ukraiñski', N'uk-UA', N'UA')
			
		SET IDENTITY_INSERT [HM].[CRM_Languages] OFF
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_8', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_8');
		COMMIT TRAN DEF_0_0_8;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_8
		PRINT('Error while converting to def : 0_0_8');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_8
*
*/


/*
*
* BEGIN DEF 0_0_9
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'DEF_0_0_9' AND IsDone = 1)
BEGIN
	BEGIN TRAN DEF_0_0_9;

	BEGIN TRY
		PRINT('Begin of conversion for def : 0_0_9');

		INSERT INTO HM.CRM_UserRolesDict(Id,
			Name)
		VALUES (1, 'Admin'),
			(2, 'Panel Mened¿era'),
			(3, 'Produkty'),
			(4, 'Klienci'),
			(5, 'Oferty i zamówienia Mareno'),
			(6, 'Dokumenty'),
			(7, 'Plany i raporty'),
			(8, 'Dobory'),
			(9, 'Oferty i zamówienia okapów'),
			(10, 'Administracja')

		INSERT INTO HM.CRM_UserRoles(UserId,
			UserRoleDictId,
			CreatedByUserId,
			ModifiedByUserId
		)
		SELECT Id,
			1, /*Admin*/
			Id,
			Id
		FROM HM.CRM_Users 
		WHERE Role = 1 /*Admin*/ AND IsDeleted = 0
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('DEF_0_0_9', 1, GETUTCDATE())
		PRINT('Successful converting to def : 0_0_9');
		COMMIT TRAN DEF_0_0_9;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN DEF_0_0_9
		PRINT('Error while converting to def : 0_0_9');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END DEF 0_0_9
*
*/


/*
* END FILE
*/
ENDFILE:

