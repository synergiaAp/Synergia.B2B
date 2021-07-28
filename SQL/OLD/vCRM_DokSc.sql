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

/****** Object:  View [HM].[vCRM_DokSc]    Script Date: 2017-12-05 23:02:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [HM].[vCRM_DokSc]
AS
SELECT        d.dok AS DokSc, id
FROM          HM.CRM_TwDok as d
WHERE        d.typ=0 and twid=1
GO


