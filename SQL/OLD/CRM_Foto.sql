USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Foto]    Script Date: 13.05.2018 19:02:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Foto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typ] [int] NOT NULL,
	[obid] [int] NOT NULL,
	[foto1] [nvarchar](250) NULL
) ON [PRIMARY]
GO

