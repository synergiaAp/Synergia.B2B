print '06 Procedures_WEB.sql';
GO

SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodOffers_GridGetHoodOffersList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodOffers_GridGetHoodOffersList]
GO
	print 'Creating procedure pCRM_HoodOffers_GridGetHoodOffersList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodOffers_GridGetHoodOffersList] 
	@UserId INT = NULL,
	@Statuses VARCHAR(MAX) = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			OfferNumber NVARCHAR(50),
			CreatedOn DATETIME NOT NULL,
			City NVARCHAR (100),
			FinalValue decimal(18, 2),
			InstallationObjectName NVARCHAR(250),
			Status tinyint,
			Comment NVARCHAR (MAX),
			PdfFileName NVARCHAR(MAX),
			RegionCode NVARCHAR(50),
			Address NVARCHAR(250),
			HoodFinalOfferNumber NVARCHAR(50)
		)
 
		INSERT INTO @Results
		SELECT HO.Id
			,HO.OfferNumber
			,HO.CreatedOn
			,OB.miasto
			,HO.FinalValue
			,OB.nazwa
			,HO.Status
			,HO.Comment
			,HO.OfferNumber + CASE WHEN OB.id IS NOT NULL 
				THEN '_' + ISNULL(OB.nazwa, '') + ' ' + ISNULL(OB.adres, '')  + ' ' + ISNULL(OB.miasto, '') 
				ELSE '' END + '_A' AS PdfFileName
			,R.Code
			,OB.adres
			,hfo.OfferNumber
		FROM HM.CRM_HoodOffers HO
		LEFT JOIN HM.CRM_Regions R ON R.Id = HO.RegionId
		LEFT JOIN HM.S_OBIEKTY OB ON OB.id = HO.InstallationObjectObiektyId
		LEFT JOIN HM.fCRM_SplitToInt(@Statuses, ',') st ON st.Item = HO.Status
		LEFT JOIN
		(
			SELECT hfo.Id,
				'JE/' + LEFT(hfo.OfferNumber, 5) AS OfferNumber,
				hfo.HoodOffersId,
				ROW_NUMBER() OVER(PARTITION BY hfo.HoodOffersId ORDER BY hfo.Id DESC) AS RowIndex
			FROM HM.CRM_HoodFinalOffers hfo
			INNER JOIN HM.CRM_Regions r ON r.Id = hfo.RegionId
			WHERE hfo.IsDeleted = 0
		) AS hfo ON hfo.HoodOffersId = HO.Id AND hfo.RowIndex = 1
		WHERE (ISNULL(@Search, '') = '' 
				OR HO.OfferNumber LIKE '%' + @Search +'%'
				OR HO.CreatedOn LIKE '%' + @Search +'%'
				OR OB.miasto LIKE '%' + @Search +'%'
				OR HO.FinalValue LIKE '%' + @Search +'%'
				OR OB.nazwa LIKE '%' + @Search +'%'
				OR R.Code LIKE '%' + @Search +'%'
				OR OB.adres LIKE '%' + @Search +'%'
			) 
			AND HO.IsDeleted = 0
			AND (@Statuses IS NULL OR st.Id IS NOT NULL)
			AND HO.Status != 0 /*New*/

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.City END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.City END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Address END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Address END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.InstallationObjectName END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.InstallationObjectName END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.RegionCode END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.RegionCode END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.FinalValue END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.FinalValue END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.Status END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.Status END DESC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'ASC' THEN R.Comment END ASC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'DESC' THEN R.Comment END DESC,
			Id DESC
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodOffers_GridGetHoodOffersList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList]
GO
	print 'Creating procedure pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList] 
	@UserId INT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			HoodNr NVARCHAR(100),
			HoodOfferNr NVARCHAR(50),
			City NVARCHAR(100),
			Price decimal(18, 2),
			Quantity INT,
			FinalPrice DECIMAL(18, 2),
			ObjectName NVARCHAR(250) NULL,
			CreatedOn DATETIME NOT NULL,
			RegionCode NVARCHAR(50),
			Address NVARCHAR(250)
		)

		INSERT INTO @Results
		SELECT HOE.Id
			,HOE.HoodNr
			,HO.OfferNumber
			,O.miasto
			,HOE.FinalPriceSingleElement AS Price
			,HOE.Quantity
			,HOE.FinalPrice
			,O.nazwa
			,HOE.CreatedOn
			,R.Code
			,O.adres
		FROM HM.CRM_HoodOfferElements HOE
		LEFT JOIN HM.CRM_HoodOffers AS HO ON HO.Id = HOE.HoodOfferId
		LEFT JOIN HM.S_OBIEKTY AS O ON O.Id = HO.InstallationObjectObiektyId
		LEFT JOIN HM.CRM_Regions AS R ON R.Id = HO.RegionId
		WHERE (ISNULL(@Search, '') = '' 
				OR HOE.HoodNr LIKE '%' + @Search +'%'
				OR HO.OfferNumber LIKE '%' + @Search +'%'
				OR R.Code LIKE '%' + @Search +'%'
				OR ISNULL(HOE.PriceAdditionalValue, HOE.Price) LIKE '%' + @Search +'%'
				OR HOE.Quantity LIKE '%' + @Search +'%'
				OR HOE.FinalPrice LIKE '%' + @Search +'%'
				OR O.miasto LIKE '%' + @Search +'%'
				OR HOE.CreatedOn LIKE '%' + @Search +'%'
				OR R.Code LIKE '%' + @Search +'%'
				OR O.adres LIKE '%' + @Search +'%'
				OR O.nazwa LIKE '%' + @Search +'%'
			) 
			AND HOE.IsDeleted = 0

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.HoodNr END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.HoodNr END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.HoodOfferNr END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.HoodOfferNr END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.City END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.City END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Address END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Address END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.Price END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.Price END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.Quantity END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.Quantity END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.FinalPrice END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.FinalPrice END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.ObjectName END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.ObjectName END DESC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
			CASE WHEN @SortField = 9 AND @SortDirection = 'ASC' THEN R.RegionCode END ASC,
			CASE WHEN @SortField = 9 AND @SortDirection = 'DESC' THEN R.RegionCode END DESC,
			R.Id
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodOfferElements_GridGetAllHoodOfferElementsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodOfferElements_GridGetHoodOfferElementsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodOfferElements_GridGetHoodOfferElementsList]
GO
	print 'Creating procedure pCRM_HoodOfferElements_GridGetHoodOfferElementsList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodOfferElements_GridGetHoodOfferElementsList] 
	@UserId INT = NULL,
	@HoodOfferId INT,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			HoodNr NVARCHAR(100),
			Price decimal(18, 2),
			CreatedOn DATETIME NOT NULL,
			ModifiedOn DATETIME NOT NULL,
			FinalPrice DECIMAL(18, 2),
			Quantity INT,
			Type NVARCHAR(50),
			FilterType NVARCHAR(50),
			OrderNo TINYINT,
			HoodOfferAccessoryType TINYINT,
			Comments NVARCHAR(MAX),
			HoodOfferAccessoryHoodOfferElementId INT
		)

		INSERT INTO @Results
		SELECT *
		FROM
		(
			SELECT HOE.Id
				,HOE.HoodNr
				,HOE.FinalPriceSingleElement AS Price
				,HOE.CreatedOn
				,HOE.ModifiedOn
				,HOE.FinalPrice
				,HOE.Quantity
				,HOE.Type
				,HOE.FilterType
				,HOE.OrderNo
				,NULL AS HoodOfferAccessoryType
				,HOE.Comments
				,NULL AS HoodOfferAccessoryHoodOfferElementId
			FROM HM.CRM_HoodOfferElements HOE
			WHERE HOE.IsDeleted = 0
				AND HOE.HoodOfferId = @HoodOfferId

			UNION ALL

			SELECT hoea.Id,
				hoea.Name,
				hoea.Price,
				hoea.CreatedOn,
				hoea.ModifiedOn,
				hoea.FinalPrice,
				hoea.Quantity,
				NULL,
				NULL,
				NULL,
				hoea.Type,
				NULL,
				hoea.HoodOfferElementId
			FROM HM.CRM_HoodOfferAccessories hoea
			WHERE hoea.IsDeleted = 0
				AND hoea.HoodOfferId = @HoodOfferId
		) AS HOE
		WHERE (ISNULL(@Search, '') = '' 
				OR HOE.HoodNr LIKE '%' + @Search +'%'
				OR HOE.Price LIKE '%' + @Search +'%'
				OR HOE.Comments LIKE '%' + @Search +'%'
				OR CAST(HOE.OrderNo AS NVARCHAR(50)) LIKE '%' + @Search +'%'
			) 

		DECLARE @accessories TABLE(Name NVARCHAR(50), OrderNo TINYINT)
		INSERT INTO @accessories
		VALUES('Nawiewnik JRS-300x600', 1),
			('Nawiewnik JRS-300x1200', 2),
			('Nawiewnik JRS-600x600', 3),
			('Nawiewnik JRS-600x900', 4),
			('Nawiewnik JRS-600x1200', 5),
			('Nawiewnik JRS-600x1800', 6),
			('SMOKI MAXI GRILL 250', 7),
			('SMOKI MAXI GRILL 350', 8),
			('SMOKI MAXI GRILL 400', 9),
			('SMOKI MAXI GRILL 500', 10),
			('SMOKI JUNIOR 200', 11),
			('SMOKI JUNIOR 250', 12),
			('SMOKI JUNIOR 300', 13),
			('System 1-zbiornikowy ANSUL R-102', 14),
			('System 2-zbiornikowy ANSUL R-102', 15),
			('System 3-zbiornikowy ANSUL R-102', 16),
			('System 4-zbiornikowy ANSUL R-102', 17),
			('System 5-zbiornikowy ANSUL R-102', 18),
			('System 6-zbiornikowy ANSUL R-102', 19),
			('System 7-zbiornikowy ANSUL R-102', 20),
			('System 8-zbiornikowy ANSUL R-102', 21)
			  

		UPDATE r
		SET r.OrderNo = r1.RowIndex
		FROM @Results r
		INNER JOIN
		(
			SELECT r1.Id,
				ROW_NUMBER() OVER(ORDER BY r1.HoodOfferAccessoryType, r1.OrderNo, a.OrderNo) AS RowIndex
			FROM @Results r1
			LEFT JOIN @accessories a ON a.Name = r1.HoodNr
		) AS r1 ON r1.Id = r.Id
		WHERE r.HoodOfferAccessoryType IS NOT NULL
			

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OrderNo END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OrderNo END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.HoodNr END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.HoodNr END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Price END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Price END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.Quantity END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.Quantity END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.FinalPrice END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.FinalPrice END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.CreatedOn END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.CreatedOn END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.ModifiedOn END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.ModifiedOn END DESC,
			R.Id
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodOfferElements_GridGetHoodOfferElementsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_Customers_GridGetCustomersList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_Customers_GridGetCustomersList]
GO
	print 'Creating procedure pCRM_Customers_GridGetCustomersList'
GO

CREATE PROCEDURE [HM].[pCRM_Customers_GridGetCustomersList] 
	@ShowOfferCompanies BIT,
	@ShowSymfoniaCompanies BIT,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			Code NVARCHAR(50) NULL,
			Name NVARCHAR(150) NULL,
			NIP NVARCHAR(20) NULL,
			Street NVARCHAR(50) NULL,
			House NVARCHAR(15) NULL,
			Apartment NVARCHAR(15) NULL,
			PostalCode NVARCHAR(10) NULL,
			City NVARCHAR(50) NULL,
			Type NVARCHAR(MAX) NULL,
			IsOfferCompany BIT not null
		)
		 
		INSERT INTO @Results
		SELECT C.[Id]
			,C.kod
			,C.nazwa
			,C.nip
			,C.ulica
			,C.dom
			,C.lokal
			,C.kodpocz
			,C.miejscowosc
			,C.TYPKH
			,0 as IsOfferCompany
		 FROM HM.vCRM_Firmy C
		 WHERE (ISNULL(@Search, '') = '' 
			OR C.kod LIKE '%' + @Search +'%'
			OR C.nazwa LIKE '%' + @Search +'%'
			OR C.nip LIKE '%' + @Search +'%'
			OR C.ulica LIKE '%' + @Search +'%'
			OR C.dom LIKE '%' + @Search +'%'
			OR C.lokal LIKE '%' + @Search +'%'
			OR C.kodpocz LIKE '%' + @Search +'%'
			OR C.miejscowosc LIKE '%' + @Search +'%'
			OR C.TYPKH LIKE '%' + @Search +'%'
		  ) AND @ShowSymfoniaCompanies = 1

		  UNION ALL

		  SELECT *
		  FROM
		  (
			  SELECT C.[Id]
				,null AS Code
				,C.Name
				,C.NIP
				,C.Address
				,'' AS House
				,'' AS Apartment
				,C.PostalCode
				,C.City
				,stuff((SELECT ', ' + CT.Name
				   FROM CRM_OfferCompanyCustomerType OCU
				   INNER JOIN CRM_CustomerType CT ON CT.Id = OCU.CustomerTypeId
				   WHERE OCU.OfferCompanyId = C.Id AND OCU.IsDeleted = 0
				   ORDER BY CT.Name
				   FOR XML PATH, TYPE).value('.[1]', 'nvarchar(max)'), 1, 2, '' ) AS CustomerType
				,1 as IsOfferCompany
			 FROM HM.CRM_OfferCompanies C
			 WHERE @ShowOfferCompanies = 1 AND C.IsDeleted = 0
		  ) as C
		  WHERE (ISNULL(@Search, '') = '' 
				OR C.Name LIKE '%' + @Search +'%'
				OR C.NIP LIKE '%' + @Search +'%'
				OR C.Address LIKE '%' + @Search +'%'
				OR C.PostalCode LIKE '%' + @Search +'%'
				OR C.City LIKE '%' + @Search +'%'
				OR C.CustomerType LIKE '%' + @Search +'%'
			  ) 

		 SELECT @RecordsTotal = COUNT(*)
		 FROM @Results

		 SELECT * FROM @Results R
		 ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.Type END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.Type END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Name END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Name END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.NIP END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.NIP END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Street END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Street END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.House END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.House END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.Apartment END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.Apartment END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.PostalCode END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.PostalCode END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.City END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.City END DESC
		 OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_Customers_GridGetCustomersList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodFinalOffers_GridGetHoodFinalOffersList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodFinalOffers_GridGetHoodFinalOffersList]
GO
	print 'Creating procedure pCRM_HoodFinalOffers_GridGetHoodFinalOffersList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodFinalOffers_GridGetHoodFinalOffersList] 
	@UserId INT = NULL,
	@Status TINYINT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY
		DECLARE @Results TABLE(
			Id INT NOT NULL,
			OfferNumber NVARCHAR(50),
			OfferDate date,
			CustomerName NVARCHAR(150),
			CatalogValue decimal(18, 2),
			ValueAfterPrimatyDiscount decimal(18, 2),
			FinalValueAfterAllDiscounts decimal(18, 2),
			Status tinyint,
			OfferPdfGeneratedFileName VARCHAR(50),
			OfferPdfOriginalFileName VARCHAR(50),
			InstallationObjectName NVARCHAR(250),
			RegionName NVARCHAR(200),
			HoodOfferId INT NOT NULL,
			HoodOfferNumber NVARCHAR(50) NOT NULL
		)
 
		INSERT INTO @Results
		SELECT hfo.[Id]
			,'JE/' + LEFT(hfo.OfferNumber, 5) + '/' + r.Code + RIGHT(hfo.OfferNumber, LEN(hfo.OfferNumber) - CHARINDEX('_', hfo.OfferNumber) + 1)
			,hfo.OfferDate
			,o.Name
			,hfo.CatalogValue
			,hfo.ValueAfterPrimatyDiscount
			,hfo.FinalValueAfterAllDiscounts
			,hfo.Status
			,fPdf.GeneratedFileName
			,COALESCE(fPdf.OriginalFileName, 
				'Oferta cenowa JE' + LEFT(hfo.OfferNumber, 5) + '/' + r.Code + RIGHT(hfo.OfferNumber, LEN(hfo.OfferNumber) - CHARINDEX('_', hfo.OfferNumber) + 1))
			,ob.Nazwa
			,r.Name
			,ho.Id
			,ho.OfferNumber
		FROM HM.CRM_HoodFinalOffers hfo
		INNER JOIN HM.CRM_HoodOffers ho ON ho.Id = hfo.HoodOffersId
		INNER JOIN HM.CRM_Regions r ON r.Id = hfo.RegionId
		LEFT JOIN HM.CRM_OfferCompanies o ON o.id = hfo.CustomerOfferCompanyId
		LEFT JOIN HM.CRM_Files fPdf ON fPdf.Id = hfo.OfferPdfFileId
		INNER JOIN HM.CRM_Users u ON u.Id = @UserId AND (u.Role = 1/*admin*/ OR u.CustomerId = hfo.SellerFirmaId) 
		LEFT JOIN HM.S_OBIEKTY ob ON ob.id = hfo.InstallationObjectObiektyId
		WHERE (ISNULL(@Search, '') = '' 
				OR 'JE/' + LEFT(hfo.OfferNumber, 5) + '/' + r.Code + RIGHT(hfo.OfferNumber, LEN(hfo.OfferNumber) - CHARINDEX('_', hfo.OfferNumber) + 1) LIKE '%' + @Search +'%'
				OR hfo.OfferDate LIKE '%' + @Search +'%'
				OR o.Name LIKE '%' + @Search +'%'
				OR hfo.CatalogValue LIKE '%' + @Search +'%'
				OR hfo.ValueAfterPrimatyDiscount LIKE '%' + @Search +'%'
				OR hfo.FinalValueAfterAllDiscounts LIKE '%' + @Search +'%'
				OR ob.Nazwa LIKE '%' + @Search +'%'
				OR r.Name LIKE '%' + @Search +'%'
			) 
			AND hfo.IsDeleted = 0
			AND (@Status IS NULL OR hfo.Status = @Status)

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.OfferDate END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.OfferDate END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.InstallationObjectName END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.InstallationObjectName END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.RegionName END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.RegionName END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.CatalogValue END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.CatalogValue END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.ValueAfterPrimatyDiscount END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.ValueAfterPrimatyDiscount END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.FinalValueAfterAllDiscounts END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.FinalValueAfterAllDiscounts END DESC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'ASC' THEN R.Status END ASC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'DESC' THEN R.Status END DESC
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
 
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodFinalOffers_GridGetHoodFinalOffersList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList]
GO
	print 'Creating procedure pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList] 
	@UserId INT = NULL,
	@HoodFinalOfferId INT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			ProductCode NVARCHAR(MAX) NULL,
			ProductName NVARCHAR(MAX) NULL,
			Quantity INT NOT NULL,
			CatalogPriceNet DECIMAL(18,2) NOT NULL,
			Discount DECIMAL(18,2) NOT NULL,
			PriceAfterDiscountNet DECIMAL(18,2) NOT NULL,
			FinalValueNet DECIMAL(18,2) NOT NULL,
			FileName NVARCHAR(100) NULL,
			ProductId INT NULL,
			PersonalProductId INT NULL,
			Type INT NOT NULL,
			PurchasePriceNet decimal(18, 2) NOT NULL,
			PriceFactor decimal(5, 2) NOT NULL
		)
 
		INSERT INTO @Results
		SELECT hfoe.Id
			,COALESCE(p.kod, pp.Code, hoe.HoodNr, hoa.Name)
			,COALESCE(p.nazwa, pp.Name, hfoe.ProductName)
			,hfoe.Quantity
			,hfoe.CatalogPriceNet
			,hfoe.Discount
			,hfoe.PriceAfterDiscountNet
			,hfoe.FinalValueNet
			,p.foto1
			,p.id
			,hfoe.PersonalProductId
			,hfoe.Type
			,hfoe.PurchasePriceNet
			,hfoe.PriceFactor
		FROM HM.CRM_HoodFinalOfferElements hfoe
		INNER JOIN HM.CRM_HoodFinalOffers hfo ON hfo.Id = hfoe.HoodFinalOffersId 
			AND hfo.Id = @HoodFinalOfferId 
		--INNER JOIN HM.CRM_Users u ON u.Id = @UserId AND (u.Id = hfo.OwnerUserId OR u.Role = 1/*admin*/)
		LEFT JOIN HM.vCRM_Produkty p ON p.id = hfoe.ProduktId
		LEFT JOIN HM.CRM_PersonalProducts pp ON pp.Id = hfoe.PersonalProductId
		LEFT JOIN HM.CRM_HoodOfferElements hoe ON hoe.Id = hfoe.HoodOfferElementsId
		LEFT JOIN HM.CRM_HoodOfferAccessories hoa ON hoa.Id = hfoe.HoodOfferAccessoryId
		WHERE (ISNULL(@Search, '') = '' 
			OR COALESCE(p.kod, pp.Code, hoe.HoodNr, hoa.Name) LIKE '%' + @Search +'%'
			OR COALESCE(p.nazwa, pp.Name, hfoe.ProductName) LIKE '%' + @Search +'%'
			OR hfoe.Quantity LIKE '%' + @Search +'%'
			OR hfoe.CatalogPriceNet LIKE '%' + @Search +'%'
			OR hfoe.Discount LIKE '%' + @Search +'%'
			OR hfoe.PriceAfterDiscountNet LIKE '%' + @Search +'%'
			OR hfoe.FinalValueNet LIKE '%' + @Search +'%'
		) 
		AND hfoe.IsDeleted = 0

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY R.Id
  
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodFinalOfferElements_GridGetHoodFinalOfferElementsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_Products_GridGetDocumentsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_Products_GridGetDocumentsList]
GO
	print 'Creating procedure pCRM_Products_GridGetDocumentsList'
GO

CREATE PROCEDURE [HM].[pCRM_Products_GridGetDocumentsList] 
	@ProductIds VARCHAR(MAX),
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

		DECLARE @Results TABLE(
			TypeName NVARCHAR(100) NOT NULL,
			FileName NVARCHAR(250) NULL,
			SortNumber INT NOT NULL,
			ProductId INT NOT NULL,
			ProductCode VARCHAR(40) NOT NULL
		)

		INSERT INTO @Results
		SELECT P.typNazwa,
			P.dokument,
			P.lp,
			P.id,
			P.kod
		FROM
		(
			SELECT TD.typNazwa
				,TD.dokument
				,TD.lp
				,TD.twid
				,P.id
				,P.kod
			FROM HM.vCRM_TowaryDok TD
			INNER JOIN HM.vCRM_Produkty P ON P.id = TD.twid
			WHERE (ISNULL(@Search, '') = ''
				OR TD.dokument LIKE '%' + @Search +'%'
				OR TD.typNazwa LIKE '%' + @Search +'%'
		  )
		) as P
		INNER JOIN [HM].[fCRM_SplitToInt](@ProductIds, ',') pIds ON pIds.Item = P.twid

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY R.SortNumber
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
  
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_Products_GridGetDocumentsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodOrders_GridGetHoodOrdersList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodOrders_GridGetHoodOrdersList]
GO
	print 'Creating procedure pCRM_HoodOrders_GridGetHoodOrdersList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodOrders_GridGetHoodOrdersList] 
	@UserId INT = NULL,
	@Type TINYINT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			OrderNumber NVARCHAR(50),
			OrderDate date,
			CustomerName NVARCHAR(150),
			CatalogValue decimal(18, 2),
			FinalValueAfterAllDiscounts decimal(18, 2),
			OfferNumber NVARCHAR(100),
			Status tinyint,
			OrderPdfGeneratedFileName VARCHAR(50),
			OrderPdfOriginalFileName VARCHAR(50),
			InstallationObjectName NVARCHAR(250),
			RegionName NVARCHAR(200),
			TotalModuleCount INT
		)
 
		INSERT INTO @Results
		SELECT ho.Id
			,ho.OrderType + '/' + ho.OrderNumber + '/' + RIGHT(CAST(YEAR(ho.OrderDate) AS NVARCHAR(4)), 2)
			,ho.OrderDate
			,oc.Name
			,ho.CatalogValue
			,ho.FinalValueAfterAllDiscounts
			,LEFT(hfo.OfferNumber, 5) + '/' + r.Code + RIGHT(hfo.OfferNumber, LEN(hfo.OfferNumber) - CHARINDEX('_', hfo.OfferNumber) + 1)
			,ho.Status
			,fPdf.GeneratedFileName
			,fPdf.OriginalFileName
			,ob.Nazwa
			,r.Name
			,modules.TotalModuleCount
		FROM HM.CRM_HoodOrders ho
		INNER JOIN HM.CRM_Regions r ON r.Id = ho.RegionId
		LEFT JOIN HM.CRM_OfferCompanies oc ON oc.id = ho.CustomerId
		LEFT JOIN HM.CRM_Files fPdf ON fPdf.Id = ho.OrderPdfFileId
		INNER JOIN HM.CRM_HoodFinalOffers hfo ON hfo.Id = ho.HoodFinalOfferId
		INNER JOIN HM.CRM_Users u ON u.Id = @UserId AND (u.Role = 1/*admin*/ OR u.CustomerId = hfo.SellerFirmaId) 
		LEFT JOIN HM.S_OBIEKTY ob ON ob.id = hfo.InstallationObjectObiektyId
		LEFT JOIN
		(
			SELECT SUM(hoe.ModuleCount) AS TotalModuleCount,
				hore.HoodOrderId
			FROM HM.CRM_HoodOffers ho
			INNER JOIN HM.CRM_HoodOfferElements hoe ON hoe.HoodOfferId = ho.Id AND hoe.IsDeleted = 0
			INNER JOIN HM.CRM_HoodFinalOfferElements hfoe ON hfoe.HoodOfferElementsId = hoe.Id AND hfoe.IsDeleted = 0
			INNER JOIN HM.CRM_HoodOrderElements hore ON hore.HoodFinalOfferElementId = hfoe.Id AND hfoe.IsDeleted = 0
			WHERE ho.IsDeleted = 0
			GROUP BY hore.HoodOrderId
		) modules ON modules.HoodOrderId = ho.Id
		WHERE (ISNULL(@Search, '') = '' 
			OR ho.OrderType + '/' + ho.OrderNumber + '/' + RIGHT(CAST(YEAR(ho.OrderDate) AS NVARCHAR(4)), 2) LIKE '%' + @Search +'%'
			OR ho.OrderDate LIKE '%' + @Search +'%'
			OR oc.Name LIKE '%' + @Search +'%'
			OR ho.CatalogValue LIKE '%' + @Search +'%'
			OR ho.FinalValueAfterAllDiscounts LIKE '%' + @Search +'%'
			OR LEFT(hfo.OfferNumber, 5) + '/' + r.Code + RIGHT(hfo.OfferNumber, LEN(hfo.OfferNumber) - CHARINDEX('_', hfo.OfferNumber) + 1) LIKE '%' + @Search +'%'
			OR ob.nazwa LIKE '%' + @Search +'%'
			OR r.Name LIKE '%' + @Search +'%'
		) AND ho.IsDeleted = 0
		AND (@Type IS NULL OR ho.Type = @Type)

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.OrderNumber END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.OrderNumber END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.OrderDate END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.OrderDate END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.InstallationObjectName END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.InstallationObjectName END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.RegionName END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.RegionName END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.CatalogValue END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.CatalogValue END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.FinalValueAfterAllDiscounts END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.FinalValueAfterAllDiscounts END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.OfferNumber END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.OfferNumber END DESC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'ASC' THEN R.Status END ASC,
			CASE WHEN @SortField = 8 AND @SortDirection = 'DESC' THEN R.Status END DESC,
			CASE WHEN @SortField = 9 AND @SortDirection = 'ASC' THEN R.TotalModuleCount END ASC,
			CASE WHEN @SortField = 9 AND @SortDirection = 'DESC' THEN R.TotalModuleCount END DESC
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
 
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodOrders_GridGetHoodOrdersList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_HoodOrderElements_GridGetHoodOrderElementsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_HoodOrderElements_GridGetHoodOrderElementsList]
GO
	print 'Creating procedure pCRM_HoodOrderElements_GridGetHoodOrderElementsList'
GO

CREATE PROCEDURE [HM].[pCRM_HoodOrderElements_GridGetHoodOrderElementsList] 
	@UserId INT = NULL,
	@HoodOrderId INT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			ProductCode NVARCHAR(MAX) NULL,
			ProductName NVARCHAR(MAX) NULL,
			Quantity INT,
			CatalogPriceNet DECIMAL(18,2) NULL,
			Discount DECIMAL(18,2),
			PriceAfterDiscountNet DECIMAL(18,2) NULL,
			FinalValueNet DECIMAL(18,2) NULL,
			FileName NVARCHAR(100) NULL,
			ProductId INT NULL,
			PersonalProductId INT NULL,
			Type INT NOT NULL
		)
 
		INSERT INTO @Results
		SELECT hoe.Id
			,COALESCE(p.kod, pp.Code, hoffe.HoodNr, hoa.Name)
			,COALESCE(p.nazwa, pp.Name, hoe.ProductName)
			,hfoe.Quantity
			,hfoe.CatalogPriceNet
			,hfoe.Discount
			,hfoe.PriceAfterDiscountNet
			,hfoe.FinalValueNet
			,p.foto1
			,p.id
			,hfoe.PersonalProductId
			,hfoe.Type
		FROM HM.CRM_HoodOrderElements hoe
		INNER JOIN HM.CRM_HoodOrders ho ON ho.Id = hoe.HoodOrderId 
			AND ho.Id = @HoodOrderId 
		--INNER JOIN HM.CRM_Users u ON u.Id = @UserId AND (u.Id = ho.OwnerUserId OR u.Role = 1/*admin*/)
		LEFT JOIN HM.vCRM_Produkty p ON p.id = hoe.ProduktId
		LEFT JOIN HM.CRM_PersonalProducts pp ON pp.Id = hoe.PersonalProductId
		LEFT JOIN HM.CRM_HoodFinalOfferElements hfoe ON hfoe.Id = hoe.HoodFinalOfferElementId
		LEFT JOIN HM.CRM_HoodOfferElements hoffe ON hoffe.Id = hfoe.HoodOfferElementsId
		LEFT JOIN HM.CRM_HoodOfferAccessories hoa ON hoa.Id = hfoe.HoodOfferAccessoryId
		WHERE (ISNULL(@Search, '') = '' 
			OR COALESCE(p.kod, pp.Code, hoffe.HoodNr, hoa.Name) LIKE '%' + @Search +'%'
			OR COALESCE(p.nazwa, pp.Name, hoe.ProductName) LIKE '%' + @Search +'%'
			OR hfoe.Quantity LIKE '%' + @Search +'%'
			OR hfoe.CatalogPriceNet LIKE '%' + @Search +'%'
			OR hfoe.Discount LIKE '%' + @Search +'%'
			OR hfoe.PriceAfterDiscountNet LIKE '%' + @Search +'%'
			OR hfoe.FinalValueNet LIKE '%' + @Search +'%'
		) 
		AND hfoe.IsDeleted = 0

		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY R.Id
  
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_HoodOrderElements_GridGetHoodOrderElementsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_WeeklyPlans_GridGetWeeklyPlansList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_WeeklyPlans_GridGetWeeklyPlansList]
GO
	print 'Creating procedure pCRM_WeeklyPlans_GridGetWeeklyPlansList'
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
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

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
		 INNER JOIN HM.CRM_Users Ulogged ON Ulogged.Id = @UserId 
			AND (Ulogged.Role = 1/*admin*/ OR Ulogged.Id = M.OwnerUserId
				OR (@ShowAllWeeklyReports = 1 AND Ulogged.Role = 2 /*Manager*/)) 
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
  
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_WeeklyPlans_GridGetWeeklyPlansList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_MonthlyReport_GridGetMonthlyReportsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_MonthlyReport_GridGetMonthlyReportsList]
GO
	print 'Creating procedure pCRM_MonthlyReport_GridGetMonthlyReportsList'
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
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;

	BEGIN TRY

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
		INNER JOIN HM.CRM_Users Ulogged ON Ulogged.Id = @UserId 
			AND (Ulogged.Role = 1/*admin*/ OR Ulogged.Id = M.OwnerUserId
				OR (@ShowAllSubmittedReports = 1 AND Ulogged.Role = 2 /*Manager*/)) 
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
  
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_MonthlyReport_GridGetMonthlyReportsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_OfferElements_GridGetOfferElementsList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_OfferElements_GridGetOfferElementsList]
GO
	print 'Creating procedure pCRM_OfferElements_GridGetOfferElementsList'
GO

CREATE PROCEDURE [HM].[pCRM_OfferElements_GridGetOfferElementsList] 
	@UserId INT = NULL,
	@OfferId INT = NULL,
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id INT NOT NULL,
			ProductCode NVARCHAR(100) NULL,
			ProductName NVARCHAR(MAX) NULL,
			ProductDimensions NVARCHAR(100) NULL,
			Quantity INT,
			ProductTerminal NVARCHAR(100) NULL,
			ProductPowerGas DECIMAL(18,2),
			ProductPowerGasSum DECIMAL(18,2),
			ProductPowerElectricity DECIMAL(18,2),
			ProductPowerElectricitySum DECIMAL(18,2),
			CatalogPriceNet DECIMAL(18,2) NULL,
			Discount DECIMAL(18,2),
			PriceAfterDiscountNet DECIMAL(18,2) NULL,
			FinalValueNet DECIMAL(18,2) NULL,
			FileName NVARCHAR(100) NULL,
			ProductId INT NULL,
			PersonalProductId INT NULL,
			DeliveryTimeDays TINYINT NOT NULL,
			GrupaId INT
		)
 
		INSERT INTO @Results
		SELECT C.[Id]
			,COALESCE(P.kod, PP.Code)
			,COALESCE(P.nazwa, PP.Name)
			,COALESCE(P.Gabaryty, PP.Dimensions)
			,C.Quantity
			,COALESCE(P.Przylacze, PP.Terminal)
			,COALESCE(P.MocGaz, PP.PowerGas, 0)
			,COALESCE(COALESCE(P.MocGaz, PP.PowerGas) * C.Quantity, 0)
			,COALESCE(P.MocPrad, PP.PowerElectricity, 0)
			,COALESCE(COALESCE(P.MocPrad, PP.PowerElectricity) * C.Quantity, 0)
			,C.CatalogPriceNet
			,C.Discount
			,C.PriceAfterDiscountNet
			,C.FinalValueNet
			,P.foto1
			,P.id
			,C.PersonalProductId
			,C.DeliveryTimeDays
			,P.GrupaId
		FROM HM.CRM_OfferElements C
		INNER JOIN HM.CRM_Offers O ON O.Id = C.OffersId AND O.Id = @OfferId 
		INNER JOIN HM.CRM_Users U ON U.Id = @UserId AND (O.OwnerUserId = U.Id OR U.Role = 1/*admin*/)
		LEFT JOIN HM.vCRM_Produkty P ON P.id = C.ProduktId
		LEFT JOIN HM.CRM_PersonalProducts PP ON PP.Id = C.PersonalProductId
		WHERE (ISNULL(@Search, '') = '' 
				OR P.kod LIKE '%' + @Search +'%'
				OR P.nazwa LIKE '%' + @Search +'%'
				OR P.Gabaryty LIKE '%' + @Search +'%'
				OR C.Quantity LIKE '%' + @Search +'%'
				OR P.Przylacze LIKE '%' + @Search +'%'
				OR P.MocGaz LIKE '%' + @Search +'%'
				OR P.MocPrad LIKE '%' + @Search +'%'
				OR C.CatalogPriceNet LIKE '%' + @Search +'%'
				OR C.Discount LIKE '%' + @Search +'%'
				OR C.PriceAfterDiscountNet LIKE '%' + @Search +'%'
				OR C.FinalValueNet LIKE '%' + @Search +'%'
				OR C.DeliveryTimeDays LIKE '%' + @Search +'%'
				) AND C.IsDeleted = 0

		 SELECT @RecordsTotal = COUNT(*)
		 FROM @Results

		 SELECT * FROM @Results R
		 ORDER BY R.Id
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_OfferElements_GridGetOfferElementsList


if exists (select * from dbo.sysobjects where id = object_id(N'[HM].[pCRM_Users_GridGetUsersList]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop procedure [HM].[pCRM_Users_GridGetUsersList]
GO
	print 'Creating procedure pCRM_Users_GridGetUsersList'
GO

CREATE PROCEDURE [HM].[pCRM_Users_GridGetUsersList] 
	@Search NVARCHAR(100) = NULL,
	@SortField TINYINT = 0,
	@SortDirection VARCHAR(5) = 'ASC',
	@Start INT = 0,
	@Lenght INT = 10,
	@RecordsTotal INT OUTPUT
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	SET NOCOUNT ON;
		
	BEGIN TRY

		DECLARE @Results TABLE(
			Id BIGINT NOT NULL,
			Login NVARCHAR(50) NOT NULL,
			Surname NVARCHAR(100) NOT NULL,
			FirstName NVARCHAR(50) NOT NULL,
			Role NVARCHAR(MAX),
			WelcomeText NVARCHAR(MAX),
			IsActive BIT NOT NULL,
			BirthdayDate Date,
			CustomerName NVARCHAR(150) NULL
		)

		DECLARE @userRolesNames TABLE(Role TINYINT,
			Name NVARCHAR(MAX))

		INSERT INTO @Results
		SELECT *
		FROM
		(
			SELECT U.Id
				,U.Login
				,U.Surname
				,U.FirstName
				,STRING_AGG(urd.Name, ', ') 
					WITHIN GROUP (ORDER BY urd.Name) AS Role
				,U.WelcomeText
				,U.IsActive
				,U.BirthdayDate
				,F.nazwa AS CustomerName
			FROM HM.CRM_Users U
			LEFT JOIN HM.CRM_UserRoles ur ON ur.UserId = u.Id AND ur.IsDeleted = 0
			LEFT JOIN HM.CRM_UserRolesDict urd ON urd.Id = ur.UserRoleDictId
			LEFT JOIN vCRM_Firmy F ON F.id = U.CustomerId
			WHERE U.IsDeleted = 0
			GROUP BY U.Id
				,U.Login
				,U.Surname
				,U.FirstName
				,U.WelcomeText
				,U.IsActive
				,U.BirthdayDate
				,F.nazwa
		) as data
		WHERE (ISNULL(@Search, '') = '' 
				OR data.Login LIKE '%' + @Search +'%'
				OR data.Surname LIKE '%' + @Search +'%'
				OR data.FirstName LIKE '%' + @Search +'%'
				OR data.Role LIKE '%' + @Search +'%'
				OR data.WelcomeText LIKE '%' + @Search +'%'
				OR data.IsActive LIKE '%' + @Search +'%'
				OR data.BirthdayDate LIKE '%' + @Search +'%'
				OR data.CustomerName LIKE '%' + @Search +'%'
				OR data.Role LIKE '%' + @Search +'%'
			) 
		
		SELECT @RecordsTotal = COUNT(*)
		FROM @Results

		SELECT * FROM @Results R
		ORDER BY
			CASE WHEN @SortField = 0 AND @SortDirection = 'ASC' THEN R.FirstName END ASC,
			CASE WHEN @SortField = 0 AND @SortDirection = 'DESC' THEN R.FirstName END DESC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'ASC' THEN R.Surname END ASC,
			CASE WHEN @SortField = 1 AND @SortDirection = 'DESC' THEN R.Surname END DESC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'ASC' THEN R.Login END ASC,
			CASE WHEN @SortField = 2 AND @SortDirection = 'DESC' THEN R.Login END DESC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'ASC' THEN R.Role END ASC,
			CASE WHEN @SortField = 3 AND @SortDirection = 'DESC' THEN R.Role END DESC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'ASC' THEN R.WelcomeText END ASC,
			CASE WHEN @SortField = 4 AND @SortDirection = 'DESC' THEN R.WelcomeText END DESC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'ASC' THEN R.IsActive END ASC,
			CASE WHEN @SortField = 5 AND @SortDirection = 'DESC' THEN R.IsActive END DESC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'ASC' THEN R.BirthdayDate END ASC,
			CASE WHEN @SortField = 6 AND @SortDirection = 'DESC' THEN R.BirthdayDate END DESC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'ASC' THEN R.CustomerName END ASC,
			CASE WHEN @SortField = 7 AND @SortDirection = 'DESC' THEN R.CustomerName END DESC
		OFFSET @Start ROWS FETCH NEXT @Lenght ROWS ONLY
		
	END TRY
	BEGIN CATCH
		THROW
	END CATCH
END
GO
-- END pCRM_Users_GridGetUsersList


SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

