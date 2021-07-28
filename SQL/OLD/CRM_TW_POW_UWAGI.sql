USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_TW_POW_UWAGI]    Script Date: 13.05.2018 19:05:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_TW_POW_UWAGI](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[powid] [int] NOT NULL,
	[uwagi] [nvarchar](500) NULL,
	[jezyk] [nvarchar](5) NULL
) ON [PRIMARY]
GO

