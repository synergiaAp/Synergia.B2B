USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_OfferCompanies]    Script Date: 13.05.2018 19:03:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_OfferCompanies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Address] [nvarchar](200) NULL,
	[City] [nvarchar](100) NULL,
	[PostalCode] [varchar](50) NULL,
	[NIP] [varchar](20) NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[Discription] [nvarchar](max) NULL,
	[StartYear] [smallint] NULL,
	[LastContact] [date] NULL,
	[Challenge] [nvarchar](200) NULL,
	[DeliveredMaterials] [nvarchar](150) NULL,
	[Status] [tinyint] NULL,
	[CustomerType] [nvarchar](100) NULL,
 CONSTRAINT [PK_CRM_OfferCompanies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

