USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Campaigns]    Script Date: 31.07.2018 21:27:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Campaigns](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[StatusChangeDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[MessageSubject] [nvarchar](500) NULL,
	[MessageContent] [nvarchar](max) NULL,
	[SendDate] [datetime] NULL,
	[CopiedFromCampaignId] [int] NULL,
 CONSTRAINT [PK_CRM_Campaigns] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_Campaigns] ADD  CONSTRAINT [DF_CRM_Campaigns_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Campaigns] FOREIGN KEY([CopiedFromCampaignId])
REFERENCES [HM].[CRM_Campaigns] ([Id])
GO

ALTER TABLE [HM].[CRM_Campaigns] CHECK CONSTRAINT [FK_CRM_Campaigns_CRM_Campaigns]
GO

ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Campaigns] CHECK CONSTRAINT [FK_CRM_Campaigns_CRM_Users]
GO

ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Campaigns] CHECK CONSTRAINT [FK_CRM_Campaigns_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Campaigns] CHECK CONSTRAINT [FK_CRM_Campaigns_CRM_Users2]
GO

