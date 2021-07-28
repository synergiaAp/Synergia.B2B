USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_OfferElements]    Script Date: 13.05.2018 19:03:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_OfferElements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OffersId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[ProduktId] [int] NULL,
	[CatalogPriceNet] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[PriceAfterDiscountNet] [decimal](18, 2) NOT NULL,
	[FinalValueNet] [decimal](18, 2) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[PersonalProductId] [int] NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
 CONSTRAINT [PK_CRM_OfferElements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_OfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferElements_CRM_Offers] FOREIGN KEY([OffersId])
REFERENCES [HM].[CRM_Offers] ([Id])
GO

ALTER TABLE [HM].[CRM_OfferElements] CHECK CONSTRAINT [FK_CRM_OfferElements_CRM_Offers]
GO

ALTER TABLE [HM].[CRM_OfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferElements_CRM_PersonalProducts] FOREIGN KEY([PersonalProductId])
REFERENCES [HM].[CRM_PersonalProducts] ([Id])
GO

ALTER TABLE [HM].[CRM_OfferElements] CHECK CONSTRAINT [FK_CRM_OfferElements_CRM_PersonalProducts]
GO

