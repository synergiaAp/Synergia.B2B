USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_PersonalProducts]    Script Date: 13.05.2018 19:04:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_PersonalProducts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](300) NOT NULL,
	[Dimensions] [nvarchar](50) NULL,
	[Terminal] [nvarchar](50) NULL,
	[PowerGas] [decimal](18, 2) NULL,
	[PowerElectricity] [decimal](18, 2) NULL,
	[PriceNet] [decimal](18, 2) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_PersonalProducts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_PersonalProducts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_PersonalProducts] CHECK CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users]
GO

ALTER TABLE [HM].[CRM_PersonalProducts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_PersonalProducts] CHECK CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users1]
GO

ALTER TABLE [HM].[CRM_PersonalProducts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_PersonalProducts] CHECK CONSTRAINT [FK_CRM_PersonalProducts_CRM_Users2]
GO

