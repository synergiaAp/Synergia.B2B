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

/****** Object:  View [HM].[vCRM_TowaryDok]    Script Date: 2017-12-05 23:07:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [HM].[vCRM_TowaryDok]
AS
SELECT        twid, lp, dok AS dokument, typ, (CASE WHEN typ = 1 THEN 'INSTRUKCJE' WHEN typ = 2 THEN 'ATESTY / CERT' WHEN typ = 3 THEN 'DWG' WHEN typ = 4 THEN 'SERWISOWE' WHEN typ = 5 THEN 'KARTY TECH' END) 
                         AS typNazwa
FROM            HM.CRM_TwDok AS d
GO
