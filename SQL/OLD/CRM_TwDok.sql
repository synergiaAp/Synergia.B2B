USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_TwDok]    Script Date: 13.05.2018 19:05:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_TwDok](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typ] [int] NOT NULL,
	[twid] [int] NOT NULL,
	[lp] [int] NOT NULL,
	[dok] [nvarchar](250) NULL,
 CONSTRAINT [PK_CRM_TwDok] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

