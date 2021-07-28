USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_MonthlyReportInformations]    Script Date: 13.05.2018 19:02:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_MonthlyReportInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Information] [nvarchar](max) NOT NULL,
	[Type] [tinyint] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[MonthlyReportId] [int] NOT NULL,
 CONSTRAINT [PK_CRM_MonthlyReportInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_MonthlyReports] FOREIGN KEY([MonthlyReportId])
REFERENCES [HM].[CRM_MonthlyReports] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations] CHECK CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_MonthlyReports]
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations] CHECK CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users]
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations] CHECK CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations]  WITH CHECK ADD  CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_MonthlyReportInformations] CHECK CONSTRAINT [FK_CRM_MonthlyReportInformations_CRM_Users2]
GO

