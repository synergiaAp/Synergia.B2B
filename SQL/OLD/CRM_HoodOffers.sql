USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_HoodOffers]    Script Date: 11.05.2019 22:35:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_HoodOffers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OfferNumber] [nvarchar](50) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CopiedFromHoodOfferId] [int] NULL,
	[InstallationObjectObiektyId] [int] NULL,
	[FinalValue] [decimal](18, 2) NOT NULL,
	[ContactPerson] [nvarchar](100) NULL,
	[ContactEmail] [varchar](50) NULL,
	[ContactPhone] [varchar](20) NULL,
	[RegionId] [int] NULL,
	[Comment] [nvarchar](max) NULL,
	[OfferNumberIndex] [int] NULL,
 CONSTRAINT [PK_CRM_HoodOffers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_CRM_HoodOffers] FOREIGN KEY([CopiedFromHoodOfferId])
REFERENCES [HM].[CRM_HoodOffers] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_CRM_HoodOffers]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_CRM_Regions1] FOREIGN KEY([RegionId])
REFERENCES [HM].[CRM_Regions] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_CRM_Regions1]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_CRM_Users]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_CRM_Users2]
GO

ALTER TABLE [HM].[CRM_HoodOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOffers_S_OBIEKTY] FOREIGN KEY([InstallationObjectObiektyId])
REFERENCES [HM].[S_OBIEKTY] ([id])
GO

ALTER TABLE [HM].[CRM_HoodOffers] CHECK CONSTRAINT [FK_CRM_HoodOffers_S_OBIEKTY]
GO

