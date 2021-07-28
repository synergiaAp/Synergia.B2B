USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_HoodOfferElementAirCalculationDevices]    Script Date: 29.04.2019 20:11:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HoodOfferElementId] [int] NOT NULL,
	[HoodOfferAirCalculationDeviceId] [int] NULL,
	[OrderNo] [tinyint] NOT NULL,
	[CustomOrderNo] [nvarchar](20) NULL,
	[AdditionalName] [nvarchar](50) NULL,
	[Power] [decimal](18, 2) NULL,
	[SValue] [decimal](3, 2) NULL,
	[MpValue] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_CRM_HoodOfferElementAirCalculationDevices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_HoodOfferAirCalculationDevice] FOREIGN KEY([HoodOfferAirCalculationDeviceId])
REFERENCES [HM].[CRM_HoodOfferAirCalculationDevices] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices] CHECK CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_HoodOfferAirCalculationDevice]
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_HoodOfferElements] FOREIGN KEY([HoodOfferElementId])
REFERENCES [HM].[CRM_HoodOfferElements] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices] CHECK CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_HoodOfferElements]
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices] CHECK CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users]
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices] CHECK CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_HoodOfferElementAirCalculationDevices] CHECK CONSTRAINT [FK_CRM_HoodOfferElementAirCalculationDevices_CRM_Users2]
GO

