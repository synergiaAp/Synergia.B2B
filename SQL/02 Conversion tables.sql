print '02 Conversion tables.sql';
GO

IF db_name()<>'master' and
   not exists (	select * from information_schema.tables
		where table_name='CRM_DBConversion' and table_type='BASE TABLE')
BEGIN
	PRINT 'Create table CRM_DBConversion';

	CREATE TABLE [HM].[CRM_DBConversion](
		[Id] [bigint] IDENTITY(1,1) NOT NULL,
		[ConversionType] [varchar](50) NOT NULL DEFAULT (''),
		[IsDone] [tinyint] NOT NULL DEFAULT ((0)),
		[ConversionDate] [datetime] NOT NULL DEFAULT (GETUTCDATE())
	) ON [PRIMARY]
END;

-- Get actual version
DECLARE @VERNO NVARCHAR(20);

SELECT TOP 1 @VERNO = ISNULL(ConversionType, 'No data')
FROM HM.CRM_DBConversion 
WHERE ConversionType LIKE '%VER%'
	AND IsDone = 1
ORDER BY Id DESC

PRINT '----------------------------'
PRINT 'Actual version  : ' + ISNULL(@VERNO, 'No data')
PRINT '----------------------------'


/*
*
* BEGIN VERSION 0_0_1
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_1' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_1;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_1');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			OrderNo tinyint NULL,
			OrderNoText nvarchar(50) NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_1', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_1');
		COMMIT TRAN VER_0_0_1;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_1
		PRINT('Error while converting to version : 0_0_1');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_1
*
*/


/*
*
* BEGIN VERSION 0_0_2
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_2' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_2;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_2');

		ALTER TABLE HM.CRM_HoodOffers ADD
			IsManualOfferNumber bit NOT NULL CONSTRAINT DF_CRM_HoodOffers_IsManualOfferNumber DEFAULT 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_2', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_2');
		COMMIT TRAN VER_0_0_2;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_2
		PRINT('Error while converting to version : 0_0_2');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_2
*
*/


/*
*
* BEGIN VERSION 0_0_3
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_3' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_3;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_3');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			Weight int NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_3', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_3');
		COMMIT TRAN VER_0_0_3;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_3
		PRINT('Error while converting to version : 0_0_3');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_3
*
*/


/*
*
* BEGIN VERSION 0_0_4
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_4' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_4;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_4');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			LayoutType tinyint NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_4', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_4');
		COMMIT TRAN VER_0_0_4;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_4
		PRINT('Error while converting to version : 0_0_4');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_4
*
*/


/*
*
* BEGIN VERSION 0_0_5
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_5' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_5;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_5');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			WeightAdditionalValue int NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_5', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_5');
		COMMIT TRAN VER_0_0_5;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_5
		PRINT('Error while converting to version : 0_0_5');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_5
*
*/

/*
*
* BEGIN VERSION 0_0_6
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_6' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_6;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_6');

		ALTER TABLE HM.CRM_Users ADD
			IsPasswordChangeRequired bit NOT NULL CONSTRAINT DF_CRM_Users_IsPasswordChangeRequired DEFAULT 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_6', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_6');
		COMMIT TRAN VER_0_0_6;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_6
		PRINT('Error while converting to version : 0_0_6');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_6
*
*/


/*
*
* BEGIN VERSION 0_0_7
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_7' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_7;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_7');

		ALTER TABLE HM.CRM_HoodOffers ADD
			LanguageId int NULL
			
		ALTER TABLE HM.CRM_HoodOffers ADD CONSTRAINT
			FK_CRM_HoodOffers_CRM_Languages FOREIGN KEY
			(
			LanguageId
			) REFERENCES HM.CRM_Languages
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_7', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_7');
		COMMIT TRAN VER_0_0_7;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_7
		PRINT('Error while converting to version : 0_0_7');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_7
*
*/


/*
*
* BEGIN VERSION 0_0_8
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_8' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_8;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_8');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			AdditionalAccessoryVentilatorsEnabled bit NOT NULL CONSTRAINT DF_CRM_HoodOfferElements_AdditionalAccessoryVentilatorsEnabled DEFAULT 0,
			AdditionalAccessorySmokiEnabled bit NOT NULL CONSTRAINT DF_CRM_HoodOfferElements_AdditionalAccessorySmokiEnabled DEFAULT 0,
			AdditionalAccessoryAnsulEnabled bit NOT NULL CONSTRAINT DF_CRM_HoodOfferElements_AdditionalAccessoryAnsulEnabled DEFAULT 0,
			AdditionalAccessoryVentilatorsJRS300X600Count int NULL,
			AdditionalAccessoryVentilatorsJRS300X1200Count int NULL,
			AdditionalAccessoryVentilatorsJRS600X600Count int NULL,
			AdditionalAccessoryVentilatorsJRS600X900Count int NULL,
			AdditionalAccessoryVentilatorsJRS600X1200Count int NULL,
			AdditionalAccessoryVentilatorsJRS600X1800Count int NULL,
			AdditionalAccessorySmokiType nvarchar(30) NULL,
			AdditionalAccessoryAnsulType nvarchar(50) NULL 

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_8', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_8');
		COMMIT TRAN VER_0_0_8;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_8
		PRINT('Error while converting to version : 0_0_8');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_8
*
*/


/*
*
* BEGIN VERSION 0_0_9
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_9' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_9;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_9');

		ALTER TABLE HM.CRM_HoodOfferElements
			DROP CONSTRAINT DF_CRM_HoodOfferElements_AdditionalAccessoryVentilatorsEnabled

		ALTER TABLE HM.CRM_HoodOfferElements
			DROP CONSTRAINT DF_CRM_HoodOfferElements_AdditionalAccessorySmokiEnabled

		ALTER TABLE HM.CRM_HoodOfferElements
			DROP COLUMN AdditionalAccessoryVentilatorsEnabled, AdditionalAccessorySmokiEnabled, AdditionalAccessoryVentilatorsJRS300X600Count, AdditionalAccessoryVentilatorsJRS300X1200Count, AdditionalAccessoryVentilatorsJRS600X600Count, AdditionalAccessoryVentilatorsJRS600X900Count, AdditionalAccessoryVentilatorsJRS600X1200Count, AdditionalAccessoryVentilatorsJRS600X1800Count, AdditionalAccessorySmokiType

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_9', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_9');
		COMMIT TRAN VER_0_0_9;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_9
		PRINT('Error while converting to version : 0_0_9');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_9
*
*/


/*
*
* BEGIN VERSION 0_0_10
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_10' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_10;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_10');

		ALTER TABLE HM.CRM_HoodOfferAccessories ADD
			HoodOfferElementId int NULL
	
		ALTER TABLE HM.CRM_HoodOfferAccessories ADD CONSTRAINT
			FK_CRM_HoodOfferAccessories_CRM_HoodOfferElements FOREIGN KEY
			(
			HoodOfferElementId
			) REFERENCES HM.CRM_HoodOfferElements
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_10', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_10');
		COMMIT TRAN VER_0_0_10;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_10
		PRINT('Error while converting to version : 0_0_10');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_10
*
*/
/*
*
* BEGIN VERSION 0_0_11
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_11' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_11;

	BEGIN TRY
		ALTER TABLE HM.CRM_Configuration ADD
			HoodFinalOfferLogoFileId int NULL
			
		ALTER TABLE HM.CRM_Configuration ADD CONSTRAINT
			FK_CRM_Configuration_CRM_Files FOREIGN KEY
			(
			HoodFinalOfferLogoFileId
			) REFERENCES HM.CRM_Files
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_11', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_11');
		COMMIT TRAN VER_0_0_11;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_11
		PRINT('Error while converting to version : 0_0_11');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_11
*
*/

/*
*
* BEGIN VERSION 0_0_12
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_12' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_12;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_12');

	ALTER TABLE HM.CRM_HoodFinalOfferElements ADD
			HoodOfferAccessoryId int NULL
	
		ALTER TABLE HM.CRM_HoodFinalOfferElements ADD CONSTRAINT
			FK_CRM_HoodFinalOfferElements_CRM_HoodOfferAccessories FOREIGN KEY
			(
			HoodOfferAccessoryId
			) REFERENCES HM.CRM_HoodOfferAccessories
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_12', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_12');
		COMMIT TRAN VER_0_0_12;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_12
		PRINT('Error while converting to version : 0_0_12');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_12
*
*/

/*
*
* BEGIN VERSION 0_0_13
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_13' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_13;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_13');

	ALTER TABLE HM.CRM_Configuration ADD
	HoodFinalOfferStartingNumber int NULL
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_13', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_13');
		COMMIT TRAN VER_0_0_13;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_13
		PRINT('Error while converting to version : 0_0_13');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_13
*
*/


/*
*
* BEGIN VERSION 0_0_14_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_14_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_14_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_14_JB');

		ALTER TABLE HM.CRM_Configuration ADD
			HoodOrderEmailRecipients nvarchar(200) NULL
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_14_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_14_JB');
		COMMIT TRAN VER_0_0_14_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_14_JB
		PRINT('Error while converting to version : 0_0_14_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_14_JB
*
*/


/*
*
* BEGIN VERSION 0_0_15_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_15_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_15_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_15_JB');

		ALTER TABLE HM.CRM_Configuration ADD
			SubmittedMonthlyReportEmailRecipients nvarchar(200) NULL
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_15_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_15_JB');
		COMMIT TRAN VER_0_0_15_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_15_JB
		PRINT('Error while converting to version : 0_0_15_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_15_JB
*
*/

/*
*
* BEGIN VERSION 0_0_16_WG
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_16_WG' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_16_WG;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_16_WG');

		ALTER TABLE HM.CRM_WeeklyPlans ADD
			Saturday nvarchar(MAX) NULL,
			Sunday nvarchar(MAX) NULL
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_16_WG', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_16_WG');
		COMMIT TRAN VER_0_0_16_WG;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_16_WG
		PRINT('Error while converting to version : 0_0_16_WG');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_16_WG
*
*/


/*
*
* BEGIN VERSION 0_0_17_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_17_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_17_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_17_JB');

		ALTER TABLE HM.CRM_OfferCompanies ADD CONSTRAINT
			FK_CRM_OfferCompanies_CRM_Users FOREIGN KEY
			(
			OwnerUserId
			) REFERENCES HM.CRM_Users
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
			
		ALTER TABLE HM.CRM_OfferCompanies ADD CONSTRAINT
			FK_CRM_OfferCompanies_CRM_Users1 FOREIGN KEY
			(
			CreatedByUserId
			) REFERENCES HM.CRM_Users
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
			

		ALTER TABLE HM.CRM_OfferCompanies ADD CONSTRAINT
			FK_CRM_OfferCompanies_CRM_Users2 FOREIGN KEY
			(
			ModifiedByUserId
			) REFERENCES HM.CRM_Users
			(
			Id
			) ON UPDATE  NO ACTION 
			 ON DELETE  NO ACTION 
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_17_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_17_JB');
		COMMIT TRAN VER_0_0_17_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_17_JB
		PRINT('Error while converting to version : 0_0_17_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_17_JB
*
*/


/*
*
* BEGIN VERSION 0_0_18_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_18_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_18_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_18_JB');

		ALTER TABLE HM.CRM_HoodOrders ADD
			City nvarchar(100) NULL,
			PaymentType tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_PaymentType DEFAULT 0,
			DeliveryTimeDays tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_DeliveryTimeDays DEFAULT ((0))
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_18_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_18_JB');
		COMMIT TRAN VER_0_0_18_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_18_JB
		PRINT('Error while converting to version : 0_0_18_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_18_JB
*
*/


/*
*
* BEGIN VERSION 0_0_19_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_19_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_19_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_19_JB');

			ALTER TABLE HM.CRM_HoodOrderElements
				ALTER COLUMN ProductCode NVARCHAR(100) NULL

			ALTER TABLE HM.CRM_HoodOrderElements
				ALTER COLUMN UoM NVARCHAR(10) NULL
			
			ALTER TABLE HM.CRM_HoodOrders
				ALTER COLUMN OrderDesc nvarchar(150) NULL

			ALTER TABLE HM.CRM_HoodOrders
				ALTER COLUMN OrderNote nvarchar(500) NULL
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_19_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_19_JB');
		COMMIT TRAN VER_0_0_19_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_19_JB
		PRINT('Error while converting to version : 0_0_19_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_19_JB
*
*/


/*
*
* BEGIN VERSION 0_0_20_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_20_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_20_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_20_JB');

		ALTER TABLE HM.CRM_HoodOrders ADD
			Type tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_Type DEFAULT 1
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_20_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_20_JB');
		COMMIT TRAN VER_0_0_20_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_20_JB
		PRINT('Error while converting to version : 0_0_20_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_20_JB
*
*/


/*
*
* BEGIN VERSION 0_0_21_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_21_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_21_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_21_JB');

		ALTER TABLE HM.CRM_HoodFinalOfferElements ADD
			PurchasePriceNet decimal(18, 2) NOT NULL CONSTRAINT DF_CRM_HoodFinalOfferElements_PurchasePriceNet DEFAULT 0,
			PriceFactor decimal(5, 2) NOT NULL CONSTRAINT DF_CRM_HoodFinalOfferElements_PriceFactor DEFAULT 1
	
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_21_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_21_JB');
		COMMIT TRAN VER_0_0_21_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_21_JB
		PRINT('Error while converting to version : 0_0_21_JB');
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_21_JB
*
*/


/*
*
* BEGIN VERSION 0_0_22_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_22_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_22_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_22_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			DeliveryTime nvarchar(50) NULL
			
		ALTER TABLE HM.CRM_HoodFinalOffers
			DROP CONSTRAINT DF_CRM_HoodFinalOffers_DeliveryTimeWeeks

		ALTER TABLE HM.CRM_HoodFinalOffers
			DROP COLUMN DeliveryTimeDays
			
		ALTER TABLE HM.CRM_HoodFinalOfferElements
			DROP CONSTRAINT DF_CRM_HoodFinalOfferElements_DeliveryTimeDays

		ALTER TABLE HM.CRM_HoodFinalOfferElements
			DROP COLUMN DeliveryTimeDays
	
		ALTER TABLE HM.CRM_HoodOrders ADD
			DeliveryTime nvarchar(50) NULL
	
		ALTER TABLE HM.CRM_HoodOrders
			DROP CONSTRAINT DF_CRM_HoodOrders_DeliveryTimeDays

		ALTER TABLE HM.CRM_HoodOrders
			DROP COLUMN DeliveryTimeDays
	
		ALTER TABLE HM.CRM_HoodOrderElements
			DROP COLUMN DeliveryTimeDays

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_22_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_22_JB');
		COMMIT TRAN VER_0_0_22_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_22_JB
		PRINT('Error while converting to version : 0_0_22_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_22_JB
*
*/


/*
*
* BEGIN VERSION 0_0_23_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_23_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_23_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_23_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			ContactPerson nvarchar(100) NULL,
			ContactEmail varchar(50) NULL,
			ContactPhone varchar(20) NULL,
			Comment nvarchar(MAX) NULL
			
		ALTER TABLE HM.CRM_HoodOrders ADD
			ContactPerson nvarchar(100) NULL,
			ContactEmail varchar(50) NULL,
			ContactPhone varchar(20) NULL,
			Comment nvarchar(MAX) NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_23_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_23_JB');
		COMMIT TRAN VER_0_0_23_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_23_JB
		PRINT('Error while converting to version : 0_0_23_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_23_JB
*
*/


/*
*
* BEGIN VERSION 0_0_24_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_24_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_24_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_24_JB');

		ALTER TABLE HM.CRM_HoodFinalOfferElements ADD
			ProductName nvarchar(100) NULL
			
		ALTER TABLE HM.CRM_HoodOrderElements ADD
			ProductName nvarchar(100) NULL

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_24_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_24_JB');
		COMMIT TRAN VER_0_0_24_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_24_JB
		PRINT('Error while converting to version : 0_0_24_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_24_JB
*
*/


/*
*
* BEGIN VERSION 0_0_25_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_25_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_25_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_25_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			GuaranteeYearsHoods tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsHoods DEFAULT 2,
			GuaranteeYearsVentilators tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsVentilators DEFAULT 2,
			GuaranteeYearsCookAir tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsCookAir DEFAULT 2,
			GuaranteeYearsSmoki tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsSmoki DEFAULT 2,
			GuaranteeYearsAnsul tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsAnsul DEFAULT 5,
			GuaranteeYearsKES tinyint NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYearsKES DEFAULT 2

		ALTER TABLE HM.CRM_HoodFinalOffers 
			DROP CONSTRAINT DF_CRM_HoodFinalOffers_GuaranteeYears

		ALTER TABLE HM.CRM_HoodFinalOffers 
			DROP COLUMN GuaranteeYears

		ALTER TABLE HM.CRM_HoodOrders ADD
			GuaranteeYearsHoods tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsHoods DEFAULT 2,
			GuaranteeYearsVentilators tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsVentilators DEFAULT 2,
			GuaranteeYearsCookAir tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsCookAir DEFAULT 2,
			GuaranteeYearsSmoki tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsSmoki DEFAULT 2,
			GuaranteeYearsAnsul tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsAnsul DEFAULT 5,
			GuaranteeYearsKES tinyint NOT NULL CONSTRAINT DF_CRM_HoodOrders_GuaranteeYearsKES DEFAULT 2

		ALTER TABLE HM.CRM_HoodOrders DROP COLUMN GuaranteeYears

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_25_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_25_JB');
		COMMIT TRAN VER_0_0_25_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_25_JB
		PRINT('Error while converting to version : 0_0_25_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_25_JB
*
*/


/*
*
* BEGIN VERSION 0_0_26_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_26_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_26_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_26_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			Discount decimal(18, 2) NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_Discount DEFAULT 0

		ALTER TABLE HM.CRM_HoodOrders ADD
			Discount decimal(18, 2) NOT NULL CONSTRAINT DF_CRM_HoodOrders_Discount DEFAULT 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_26_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_26_JB');
		COMMIT TRAN VER_0_0_26_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_26_JB
		PRINT('Error while converting to version : 0_0_26_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_26_JB
*
*/


/*
*
* BEGIN VERSION 0_0_27_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_27_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_27_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_27_JB');

		ALTER TABLE HM.CRM_Offers ADD
			WithEmptyInstallationObjectObiektyId bit NOT NULL CONSTRAINT DF_CRM_Offers_WithEmptyInstallationObjectObiektyId DEFAULT 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_27_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_27_JB');
		COMMIT TRAN VER_0_0_27_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_27_JB
		PRINT('Error while converting to version : 0_0_27_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_27_JB
*
*/


/*
*
* BEGIN VERSION 0_0_28_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_28_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_28_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_28_JB');

		ALTER TABLE HM.CRM_Offers ADD
			HasOnlyInnoSavaProducts bit NOT NULL CONSTRAINT DF_CRM_Offers_HasOnlyInnoSavaProducts DEFAULT 0

		ALTER TABLE HM.CRM_Orders ADD
			HasOnlyInnoSavaProducts bit NOT NULL CONSTRAINT DF_CRM_Orders_HasOnlyInnoSavaProducts DEFAULT 0

		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_28_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_28_JB');
		COMMIT TRAN VER_0_0_28_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_28_JB
		PRINT('Error while converting to version : 0_0_28_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_28_JB
*
*/


/*
*
* BEGIN VERSION 0_0_29_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_29_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_29_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_29_JB');

		ALTER TABLE HM.CRM_Offers ADD
			DeliveryType tinyint NOT NULL CONSTRAINT DF_CRM_Offers_DeliveryType DEFAULT 1,
			DeliveryCost decimal(18, 2) NOT NULL CONSTRAINT DF_CRM_Offers_DeliveryCost DEFAULT 0
			
		ALTER TABLE HM.CRM_Orders ADD
			DeliveryType tinyint NOT NULL CONSTRAINT DF_CRM_Orders_DeliveryType DEFAULT 1,
			DeliveryCost decimal(18, 2) NOT NULL CONSTRAINT DF_CRM_Orders_DeliveryCost DEFAULT 0
			
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_29_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_29_JB');
		COMMIT TRAN VER_0_0_29_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_29_JB
		PRINT('Error while converting to version : 0_0_29_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_29_JB
*
*/


/*
*
* BEGIN VERSION 0_0_30_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_30_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_30_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_30_JB');

		ALTER TABLE HM.CRM_HoodOfferElements ADD
			FinalPriceSingleElement decimal(18, 2) NULL,
			FinalWeightSingleElement int NULL
			
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_30_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_30_JB');
		COMMIT TRAN VER_0_0_30_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_30_JB
		PRINT('Error while converting to version : 0_0_30_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_30_JB
*
*/


/*
*
* BEGIN VERSION 0_0_31_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_31_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_31_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_31_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			HideDiscountInPdfFile bit NOT NULL CONSTRAINT DF_CRM_HoodFinalOffers_HideDiscountInPdfFile DEFAULT 0

		ALTER TABLE HM.CRM_HoodOrders ADD
			HideDiscountInPdfFile bit NOT NULL CONSTRAINT DF_CRM_HoodOrders_HideDiscountInPdfFile DEFAULT 0
			
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_31_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_31_JB');
		COMMIT TRAN VER_0_0_31_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_31_JB
		PRINT('Error while converting to version : 0_0_31_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_31_JB
*
*/


/*
*
* BEGIN VERSION 0_0_32_JB
*
*/
IF NOT EXISTS (
	SELECT * 
	FROM HM.CRM_DBConversion 
	WHERE ConversionType = 'VER_0_0_32_JB' AND IsDone = 1)
BEGIN
	BEGIN TRAN VER_0_0_32_JB;

	BEGIN TRY
		PRINT('Begin of conversion for version : 0_0_32_JB');

		ALTER TABLE HM.CRM_HoodFinalOffers ADD
			FixedValueAfterAllDiscounts decimal(18, 2) NULL

		ALTER TABLE HM.CRM_HoodOrders ADD
			FixedValueAfterAllDiscounts decimal(18, 2) NULL
			
		---------------------------------------------------------------------
		INSERT INTO HM.CRM_DBConversion (ConversionType, IsDone, ConversionDate)
		VALUES ('VER_0_0_32_JB', 1, GETUTCDATE())
		PRINT('Successful converting to version : 0_0_32_JB');
		COMMIT TRAN VER_0_0_32_JB;	
		---------------------------------------------------------------------
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN VER_0_0_32_JB
		PRINT('Error while converting to version : 0_0_32_JB');
		THROW;
		GOTO ENDFILE
	END CATCH
END
/*
*
* END VERSION 0_0_32_JB
*
*/



/*
* END FILE
*/
ENDFILE:



