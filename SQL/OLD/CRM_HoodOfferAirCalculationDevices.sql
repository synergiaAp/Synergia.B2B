USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_HoodOfferAirCalculationDevices]    Script Date: 2018-11-22 19:19:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_HoodOfferAirCalculationDevices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Ke] [tinyint] NOT NULL,
 CONSTRAINT [PK_CRM_HoodOfferAirCalculationDevices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


