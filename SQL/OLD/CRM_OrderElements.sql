USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_OrderElements]    Script Date: 13.05.2018 19:04:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_OrderElements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NOT NULL,
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
	[CreatedFromOfferElementId] [int] NOT NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
 CONSTRAINT [PK_CRM_OrderElements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_OrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OrderElements_CRM_Orders] FOREIGN KEY([OrderId])
REFERENCES [HM].[CRM_Orders] ([Id])
GO

ALTER TABLE [HM].[CRM_OrderElements] CHECK CONSTRAINT [FK_CRM_OrderElements_CRM_Orders]
GO

ALTER TABLE [HM].[CRM_OrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OrderElements_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_OrderElements] CHECK CONSTRAINT [FK_CRM_OrderElements_CRM_Users]
GO

ALTER TABLE [HM].[CRM_OrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OrderElements_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_OrderElements] CHECK CONSTRAINT [FK_CRM_OrderElements_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_OrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OrderElements_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_OrderElements] CHECK CONSTRAINT [FK_CRM_OrderElements_CRM_Users2]
GO

