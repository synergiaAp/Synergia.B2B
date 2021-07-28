USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_WeeklyPlans]    Script Date: 25.03.2019 21:50:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_WeeklyPlans](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkerId] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[RegionId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[Monday] [nvarchar](max) NULL,
	[Tuesday] [nvarchar](max) NULL,
	[Wednesday] [nvarchar](max) NULL,
	[Thursday] [nvarchar](max) NULL,
	[Friday] [nvarchar](max) NULL,
	[YearValue] [smallint] NULL,
	[WeekValue] [tinyint] NULL,
 CONSTRAINT [PK_CRM_WeaklyPlans] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_WeeklyPlans]  WITH CHECK ADD  CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Regions] FOREIGN KEY([RegionId])
REFERENCES [HM].[CRM_Regions] ([Id])
GO

ALTER TABLE [HM].[CRM_WeeklyPlans] CHECK CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Regions]
GO

ALTER TABLE [HM].[CRM_WeeklyPlans]  WITH CHECK ADD  CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users] FOREIGN KEY([WorkerId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_WeeklyPlans] CHECK CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users]
GO

ALTER TABLE [HM].[CRM_WeeklyPlans]  WITH CHECK ADD  CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_WeeklyPlans] CHECK CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_WeeklyPlans]  WITH CHECK ADD  CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_WeeklyPlans] CHECK CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users2]
GO

ALTER TABLE [HM].[CRM_WeeklyPlans]  WITH CHECK ADD  CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users3] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_WeeklyPlans] CHECK CONSTRAINT [FK_CRM_WeaklyPlans_CRM_Users3]
GO

