USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Orders]    Script Date: 13.05.2018 19:04:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderDate] [date] NULL,
	[City] [nvarchar](100) NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[LogoFileId] [int] NULL,
	[SellerFirmaId] [int] NOT NULL,
	[CustomerOfferCompanyId] [int] NULL,
	[Status] [tinyint] NULL,
	[IsDeleted] [bit] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[InstallationObjectObiektyId] [int] NULL,
	[PdfFileId] [int] NULL,
	[OrderFromOfferId] [int] NULL,
	[CatalogValue] [decimal](18, 2) NOT NULL,
	[ValueAfterPrimatyDiscount] [decimal](18, 2) NOT NULL,
	[FinalValueAfterAllDiscounts] [decimal](18, 2) NOT NULL,
	[IsPrepayment] [bit] NOT NULL CONSTRAINT [DF_CRM_Orders_IsPrepayment]  DEFAULT ((0)),
	[PrepaymentPercent] [tinyint] NOT NULL CONSTRAINT [DF_CRM_Orders_PrepaymentPercent]  DEFAULT ((0)),
	[PaymentType] [tinyint] NOT NULL CONSTRAINT [DF_CRM_Orders_PaymentType]  DEFAULT ((0)),
	[DeliveryTimeDays] [tinyint] NOT NULL CONSTRAINT [DF_CRM_Orders_DeliveryTimeDays]  DEFAULT ((0)),
	[GuaranteeYears] [tinyint] NOT NULL CONSTRAINT [DF_CRM_Orders_GuaranteeYears]  DEFAULT ((0)),
 CONSTRAINT [PK_CRM_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Files] FOREIGN KEY([LogoFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Files]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Files1] FOREIGN KEY([PdfFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Files1]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_OfferCompanies] FOREIGN KEY([CustomerOfferCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_OfferCompanies]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Offers] FOREIGN KEY([OrderFromOfferId])
REFERENCES [HM].[CRM_Offers] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Offers]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Users] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Users]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_CRM_Users2]
GO

ALTER TABLE [HM].[CRM_Orders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Orders_S_OBIEKTY] FOREIGN KEY([InstallationObjectObiektyId])
REFERENCES [HM].[S_OBIEKTY] ([id])
GO

ALTER TABLE [HM].[CRM_Orders] CHECK CONSTRAINT [FK_CRM_Orders_S_OBIEKTY]
GO

