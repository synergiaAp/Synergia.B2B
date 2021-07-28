USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[CRM_Contacts]    Script Date: 13.05.2018 19:01:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[CRM_Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[Surname] [nvarchar](100) NULL,
	[MobilePhone] [varchar](20) NULL,
	[LandlinePhone] [varchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[BirthDate] [date] NULL,
	[CustomerType] [nvarchar](100) NULL,
	[Position] [nvarchar](100) NULL,
	[Interests] [nvarchar](300) NULL,
	[BirthdayReminder] [bit] NOT NULL,
	[Attitude] [nvarchar](100) NULL,
	[Comment] [nvarchar](max) NULL,
	[LastContact] [date] NULL,
	[Status] [tinyint] NULL,
	[OffersCompanyId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
 CONSTRAINT [PK_CRM_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[CRM_Contacts] ADD  CONSTRAINT [DF_CRM_Contacts_BirthdayReminder]  DEFAULT ((0)) FOR [BirthdayReminder]
GO

ALTER TABLE [HM].[CRM_Contacts] ADD  CONSTRAINT [DF_CRM_Contacts_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [HM].[CRM_Contacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Contacts_CRM_OfferCompanies] FOREIGN KEY([OffersCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO

ALTER TABLE [HM].[CRM_Contacts] CHECK CONSTRAINT [FK_CRM_Contacts_CRM_OfferCompanies]
GO

ALTER TABLE [HM].[CRM_Contacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Contacts_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

ALTER TABLE [HM].[CRM_Contacts] CHECK CONSTRAINT [FK_CRM_Contacts_CRM_Users]
GO

