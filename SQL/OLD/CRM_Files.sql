USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Files]    Script Date: 13.05.2018 19:02:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Files](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OriginalFileName] [nvarchar](255) NOT NULL,
	[GeneratedFileName] [varchar](50) NOT NULL,
	[FileSize] [int] NOT NULL,
	[Type] [tinyint] NOT NULL,
 CONSTRAINT [PK_CRM_Files] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

