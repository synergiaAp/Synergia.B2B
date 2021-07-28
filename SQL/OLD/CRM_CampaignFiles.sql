SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_CampaignFiles]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_CampaignFiles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CampaignId] [int] NOT NULL,
	[FileId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
 CONSTRAINT [PK_CRM_CampaignFiles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_CampaignFiles_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_CampaignFiles] ADD  CONSTRAINT [DF_CRM_CampaignFiles_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignFiles_CRM_Campaigns]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignFiles]'))
ALTER TABLE [HM].[CRM_CampaignFiles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignFiles_CRM_Campaigns] FOREIGN KEY([CampaignId])
REFERENCES [HM].[CRM_Campaigns] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignFiles_CRM_Files]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignFiles]'))
ALTER TABLE [HM].[CRM_CampaignFiles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignFiles_CRM_Files] FOREIGN KEY([FileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignFiles_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignFiles]'))
ALTER TABLE [HM].[CRM_CampaignFiles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignFiles_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignFiles_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignFiles]'))
ALTER TABLE [HM].[CRM_CampaignFiles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignFiles_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO
