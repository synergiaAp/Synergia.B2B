/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.1601)
    Source Database Engine Edition : Microsoft SQL Server Standard Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2016
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [ERP_JEVEN]
GO

/****** Object:  View [HM].[vCRM_Firmy]    Script Date: 2018-01-05 21:01:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [HM].[vCRM_Firmy]
AS
SELECT        vkh.id, vkh.kod, vkh.nazwa, vkh.nip, vkh.kodpocz, vkh.miejscowosc, adr.ulica, adr.dom, adr.lokal, (CASE WHEN vKh.znacznik = 72 THEN 'DEALER' ELSE 'INNY' END) AS TYPKH, vkh.znacznik
FROM            SSCommon.vKontrahenci AS vkh LEFT OUTER JOIN
                         SSCommon.vAdresyKh AS adr ON adr.idkh = vkh.id
WHERE        (adr.nazwaAdr = 'adres domy�lny')
GO