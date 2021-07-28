USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_HoodPartsPriceList]    Script Date: 22.11.2018 20:19:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_HoodPartsPriceList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[PriceNet] [decimal](18, 2) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
 CONSTRAINT [PK_CRM_HoodPartsPriceList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList] CHECK CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users]
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList] CHECK CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users2] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodPartsPriceList] CHECK CONSTRAINT [FK_CRM_HoodPartsPriceList_CRM_Users2]
GO

