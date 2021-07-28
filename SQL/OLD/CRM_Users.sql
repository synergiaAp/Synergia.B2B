USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Users]    Script Date: 18.05.2018 22:37:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Surname] [nvarchar](100) NOT NULL,
	[Login] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](150) NOT NULL,
	[Salt] [nvarchar](50) NOT NULL,
	[Role] [tinyint] NOT NULL,
	[WelcomeText] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[BirthdayDate] [date] NULL,
	[CustomerId] [int] NOT NULL,
	[OfferLogoFileId] [int] NULL,
	[Boss] [nvarchar](100) NULL,
	[Position] [nvarchar](150) NULL,
	[RegionId] [int] NULL,
	[Phone] [nvarchar](50) NULL,
 CONSTRAINT [PK_CRM_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_Users] ADD  CONSTRAINT [DF_CRM_Users_Salt]  DEFAULT ('') FOR [Salt]
GO

ALTER TABLE [HM].[CRM_Users] ADD  CONSTRAINT [DF_CRM_Users_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [HM].[CRM_Users] ADD  CONSTRAINT [DF_CRM_Users_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

