USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Offers]    Script Date: 15.05.2018 21:44:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Offers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OfferDate] [date] NULL,
	[City] [nvarchar](100) NULL,
	[OfferNumber] [nvarchar](50) NOT NULL,
	[LogoFileId] [int] NULL,
	[SellerFirmaId] [int] NOT NULL,
	[CustomerOfferCompanyId] [int] NULL,
	[Status] [tinyint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CatalogValue] [decimal](18, 2) NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[ValueAfterPrimatyDiscount] [decimal](18, 2) NOT NULL,
	[FinalValueAfterAllDiscounts] [decimal](18, 2) NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[InstallationObjectObiektyId] [int] NULL,
	[OfferPdfFileId] [int] NULL,
	[CopiedFromOfferId] [int] NULL,
	[IsPrepayment] [bit] NOT NULL,
	[PrepaymentPercent] [tinyint] NOT NULL,
	[PaymentType] [tinyint] NOT NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
	[GuaranteeYears] [tinyint] NOT NULL,
 CONSTRAINT [PK_CRM_Offers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_Offers] ADD  CONSTRAINT [DF_CRM_Offers_IsPrepayment]  DEFAULT ((0)) FOR [IsPrepayment]
GO

ALTER TABLE [HM].[CRM_Offers] ADD  CONSTRAINT [DF_CRM_Offers_PrepaymentPercent]  DEFAULT ((0)) FOR [PrepaymentPercent]
GO

ALTER TABLE [HM].[CRM_Offers] ADD  CONSTRAINT [DF_CRM_Offers_PaymentType]  DEFAULT ((0)) FOR [PaymentType]
GO

ALTER TABLE [HM].[CRM_Offers] ADD  CONSTRAINT [DF_CRM_Offers_DeliveryTimeDays]  DEFAULT ((0)) FOR [DeliveryTimeDays]
GO

ALTER TABLE [HM].[CRM_Offers] ADD  CONSTRAINT [DF_CRM_Offers_GuaranteeYears]  DEFAULT ((0)) FOR [GuaranteeYears]
GO

ALTER TABLE [HM].[CRM_Offers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Offers_CRM_Files] FOREIGN KEY([LogoFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

ALTER TABLE [HM].[CRM_Offers] CHECK CONSTRAINT [FK_CRM_Offers_CRM_Files]
GO

ALTER TABLE [HM].[CRM_Offers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Offers_CRM_Files1] FOREIGN KEY([OfferPdfFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

ALTER TABLE [HM].[CRM_Offers] CHECK CONSTRAINT [FK_CRM_Offers_CRM_Files1]
GO

ALTER TABLE [HM].[CRM_Offers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Offers_CRM_OfferCompanies] FOREIGN KEY([CustomerOfferCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO

ALTER TABLE [HM].[CRM_Offers] CHECK CONSTRAINT [FK_CRM_Offers_CRM_OfferCompanies]
GO

ALTER TABLE [HM].[CRM_Offers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Offers_CRM_Offers] FOREIGN KEY([CopiedFromOfferId])
REFERENCES [HM].[CRM_Offers] ([Id])
GO

ALTER TABLE [HM].[CRM_Offers] CHECK CONSTRAINT [FK_CRM_Offers_CRM_Offers]
GO

ALTER TABLE [HM].[CRM_Offers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Offers_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Offers] CHECK CONSTRAINT [FK_CRM_Offers_CRM_Users]
GO

