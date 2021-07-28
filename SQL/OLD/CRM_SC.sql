USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_SC]    Script Date: 27.05.2018 21:32:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_SC](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typ] [nvarchar](20) NULL,
	[sc] [nvarchar](250) NULL
) ON [PRIMARY]
GO

