USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_MonthlyReports]    Script Date: 26.05.2019 21:43:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_MonthlyReports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkerId] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[RegionId] [int] NOT NULL,
	[Holidays] [nvarchar](max) NOT NULL,
	[Summary] [nvarchar](max) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[OrdersValueSum] [decimal](18, 2) NULL,
	[PlannedOrdersValueSum] [decimal](18, 2) NULL,
	[Status] [tinyint] NOT NULL,
	[MarketingActivities] [nvarchar](max) NULL,
	[MarketingPlans] [nvarchar](max) NULL,
	[Troubles] [nvarchar](max) NULL,
	[NewContacts] [nvarchar](max) NULL,
	[MeetingsQuantity] [smallint] NULL,
	[HoodOffers] [smallint] NULL,
	[CentralOffers] [smallint] NULL,
	[SmokiOffers] [smallint] NULL,
	[AnsulOffers] [smallint] NULL,
	[MarenoOffers] [smallint] NULL,
	[VentilatorOffers] [smallint] NULL,
	[KesOffers] [smallint] NULL,
	[CentralTechnicalSelections] [smallint] NULL,
	[SmokiTechnicalSelections] [smallint] NULL,
	[HoodTechnicalSelections] [smallint] NULL,
	[Agreements] [smallint] NULL,
	[MeetingsKitchenTechnologist] [smallint] NULL,
	[MeetingsArchitect] [smallint] NULL,
	[MeetingsConsultingCompany] [smallint] NULL,
	[MeetingsGastronomyCompany] [smallint] NULL,
	[MeetingsGeneralContractor] [smallint] NULL,
	[MeetingsInstallationContractor] [smallint] NULL,
	[MeetingsJevenDealer] [smallint] NULL,
	[MeetingsMarenoDealer] [smallint] NULL,
	[MeetingsNetworkInvestor] [smallint] NULL,
	[MeetingsSingleInvestor] [smallint] NULL,
	[MeetingsSanepid] [smallint] NULL,
	[MeetingsVentilationDesigner] [smallint] NULL,
	[MeetingsVentilationWholesaler] [smallint] NULL,
	[MeetingsKitchentChef] [smallint] NULL,
	[MeetingsSupervisionInspector] [smallint] NULL,
	[OffersSum] [smallint] NULL,
	[TechnicalSelectionsSum] [smallint] NULL,
	[PlannedOrdersThreeMonthsValueSum] [decimal](18, 2) NULL,
 CONSTRAINT [PK_CRM_MonthlyReports] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_MonthlyReports]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReports_CRM_Regions] FOREIGN KEY([RegionId])
REFERENCES [HM].[CRM_Regions] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReports] CHECK CONSTRAINT [FK_CRM_MonthlyReports_CRM_Regions]
GO

ALTER TABLE [HM].[CRM_MonthlyReports]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users] FOREIGN KEY([WorkerId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReports] CHECK CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users]
GO

ALTER TABLE [HM].[CRM_MonthlyReports]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReports] CHECK CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_MonthlyReports]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReports] CHECK CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users2]
GO

ALTER TABLE [HM].[CRM_MonthlyReports]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users3] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReports] CHECK CONSTRAINT [FK_CRM_MonthlyReports_CRM_Users3]
GO

