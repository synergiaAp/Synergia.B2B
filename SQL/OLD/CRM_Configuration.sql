USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Configuration]    Script Date: 13.05.2018 19:01:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Configuration](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WelcomeText] [nvarchar](max) NULL,
	[OverrideUserWelcomeText] [bit] NOT NULL,
	[SmallBirthdayText] [nvarchar](500) NULL,
	[BigBirthdayText] [nvarchar](500) NULL,
	[OrderEmailRecipients] [nvarchar](200) NULL,
	[HoodOfferStartingNumber] [int] NULL,
 CONSTRAINT [PK_CRM_Configuration] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

