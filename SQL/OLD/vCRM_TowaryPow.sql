USE [ERP_JEVEN]
GO

/****** Object:  View [HM].[vCRM_TowaryPow]    Script Date: 21.08.2018 21:34:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [HM].[vCRM_TowaryPow]
AS
SELECT twparid, twid, typ, lp
FROM HM.CRM_TwPow
GO

