USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_MonthlyReportStats]    Script Date: 13.05.2018 19:03:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_MonthlyReportStats](
	[int] [int] IDENTITY(1,1) NOT NULL,
	[Meetings] [smallint] NULL,
	[HoodPriceOffers] [smallint] NULL,
	[CentralPriceOffers] [smallint] NULL,
	[SmokiPriceOffers] [smallint] NULL,
	[AnsulPriceOffers] [smallint] NULL,
	[MarenoPriceOffers] [smallint] NULL,
	[VentilatorPriceOffers] [smallint] NULL,
	[KesPriceOffers] [smallint] NULL,
	[CentralTechnicalSelections] [smallint] NULL,
	[SmokiTechnicalSelections] [smallint] NULL,
	[HoodTechnicalSelections] [smallint] NULL,
	[Agreements] [smallint] NULL,
	[MonthlyReportId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_MonthlyReportStats] PRIMARY KEY CLUSTERED 
(
	[int] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_MonthlyReports] FOREIGN KEY([MonthlyReportId])
REFERENCES [HM].[CRM_MonthlyReports] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats] CHECK CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_MonthlyReports]
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats] CHECK CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users]
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats] CHECK CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportStats] CHECK CONSTRAINT [FK_CRM_MonthlyReportStats_CRM_Users2]
GO

