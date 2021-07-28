USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_TwPow]    Script Date: 13.05.2018 19:06:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_TwPow](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[twparid] [int] NOT NULL,
	[twid] [int] NOT NULL,
	[typ] [int] NOT NULL,
	[lp] [int] NULL,
	[cdate] [datetime] NULL,
	[mdate] [datetime] NULL,
	[cuser] [nvarchar](50) NULL,
	[muser] [nvarchar](50) NULL
) ON [PRIMARY]
GO

