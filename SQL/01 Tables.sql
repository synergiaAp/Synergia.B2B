SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

print '01 Tables.sql';
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_Campaigns]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_Campaigns](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[StatusChangeDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL CONSTRAINT [DF_CRM_Campaigns_IsDeleted]  DEFAULT ((0)),
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
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_Campaigns_CRM_Campaigns]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_Campaigns]'))
ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Campaigns] FOREIGN KEY([CopiedFromCampaignId])
REFERENCES [HM].[CRM_Campaigns] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_Campaigns_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_Campaigns]'))
ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_Campaigns_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_Campaigns]'))
ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_Campaigns_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_Campaigns]'))
ALTER TABLE [HM].[CRM_Campaigns]  WITH CHECK ADD  CONSTRAINT [FK_CRM_Campaigns_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_CampaignContacts]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_CampaignContacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactId] [int] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[StatusChangeDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CampaignId] [int] NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_CRM_CampaignContacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_CampaignContacts_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_CampaignContacts] ADD  CONSTRAINT [DF_CRM_CampaignContacts_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignContacts_CRM_Campaigns]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignContacts]'))
ALTER TABLE [HM].[CRM_CampaignContacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignContacts_CRM_Campaigns] FOREIGN KEY([CampaignId])
REFERENCES [HM].[CRM_Campaigns] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignContacts_CRM_Contacts]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignContacts]'))
ALTER TABLE [HM].[CRM_CampaignContacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignContacts_CRM_Contacts] FOREIGN KEY([ContactId])
REFERENCES [HM].[CRM_Contacts] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignContacts_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignContacts]'))
ALTER TABLE [HM].[CRM_CampaignContacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignContacts_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_CampaignContacts_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_CampaignContacts]'))
ALTER TABLE [HM].[CRM_CampaignContacts]  WITH CHECK ADD  CONSTRAINT [FK_CRM_CampaignContacts_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/

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

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_CustomerType]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_CustomerType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_CustomerType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_CustomerType_CreatedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_CustomerType] ADD  CONSTRAINT [DF_CRM_CustomerType_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_CustomerType_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_CustomerType] ADD  CONSTRAINT [DF_CRM_CustomerType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END

GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_OfferCompanyCustomerType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomerTypeId] [int] NOT NULL,
	[OfferCompanyId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_OfferCompanyCustomerType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_OfferCompanyCustomerType_CreatedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType] ADD  CONSTRAINT [DF_CRM_OfferCompanyCustomerType_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_OfferCompanyCustomerType_ModifiedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType] ADD  CONSTRAINT [DF_CRM_OfferCompanyCustomerType_ModifiedOn]  DEFAULT (getdate()) FOR [ModifiedOn]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_OfferCompanyCustomerType_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType] ADD  CONSTRAINT [DF_CRM_OfferCompanyCustomerType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_OfferCompanyCustomerType_CRM_CustomerType]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]'))
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferCompanyCustomerType_CRM_CustomerType] FOREIGN KEY([CustomerTypeId])
REFERENCES [HM].[CRM_CustomerType] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_OfferCompanyCustomerType_CRM_OfferCompanies]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]'))
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferCompanyCustomerType_CRM_OfferCompanies] FOREIGN KEY([OfferCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_OfferCompanyCustomerType_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]'))
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferCompanyCustomerType_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_OfferCompanyCustomerType_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]'))
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferCompanyCustomerType_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_OfferCompanyCustomerType_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_OfferCompanyCustomerType]'))
ALTER TABLE [HM].[CRM_OfferCompanyCustomerType]  WITH CHECK ADD  CONSTRAINT [FK_CRM_OfferCompanyCustomerType_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_Languages]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_Languages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CultureName] [char](5) NOT NULL,
	[Abbreviation] [char](2) NOT NULL,
 CONSTRAINT [PK_CRM_Languages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

/*###################################### NOWA TABELA ######################################*/
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_HoodOfferAccessories]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_HoodOfferAccessories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HoodOfferId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Type] [tinyint] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Quantity] [int] NOT NULL,
	[FinalPrice] [decimal](18, 2) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_CRM_HoodOfferAccessories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_HoodOfferAccessories_Quantity]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodOfferAccessories] ADD  CONSTRAINT [DF_CRM_HoodOfferAccessories_Quantity]  DEFAULT ((0)) FOR [Quantity]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_HoodOfferAccessories_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodOfferAccessories] ADD  CONSTRAINT [DF_CRM_HoodOfferAccessories_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_HoodOfferAccessories_CreatedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodOfferAccessories] ADD  CONSTRAINT [DF_CRM_HoodOfferAccessories_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
END

GO

IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[HM].[DF_CRM_HoodOfferAccessories_ModifiedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodOfferAccessories] ADD  CONSTRAINT [DF_CRM_HoodOfferAccessories_ModifiedOn]  DEFAULT (getdate()) FOR [ModifiedOn]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOfferAccessories_CRM_HoodOffers]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOfferAccessories]'))
ALTER TABLE [HM].[CRM_HoodOfferAccessories]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferAccessories_CRM_HoodOffers] FOREIGN KEY([HoodOfferId])
REFERENCES [HM].[CRM_HoodOffers] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOfferAccessories_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOfferAccessories]'))
ALTER TABLE [HM].[CRM_HoodOfferAccessories]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferAccessories_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOfferAccessories_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOfferAccessories]'))
ALTER TABLE [HM].[CRM_HoodOfferAccessories]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferAccessories_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOfferAccessories_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOfferAccessories]'))
ALTER TABLE [HM].[CRM_HoodOfferAccessories]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOfferAccessories_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_HoodFinalOffers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OfferDate] [date] NULL,
	[City] [nvarchar](100) NULL,
	[OfferNumber] [nvarchar](50) NOT NULL,
	[LogoFileId] [int] NULL,
	[SellerFirmaId] [int] NOT NULL,
	[CustomerOfferCompanyId] [int] NULL,
	[Status] [tinyint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CatalogValue] [decimal](18, 2) NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[ValueAfterPrimatyDiscount] [decimal](18, 2) NOT NULL,
	[FinalValueAfterAllDiscounts] [decimal](18, 2) NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[InstallationObjectObiektyId] [int] NULL,
	[OfferPdfFileId] [int] NULL,
	[IsPrepayment] [bit] NOT NULL,
	[PrepaymentPercent] [tinyint] NOT NULL,
	[PaymentType] [tinyint] NOT NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
	[GuaranteeYears] [tinyint] NOT NULL,
	[HoodOffersId] [int] NULL,
	[RegionId] [int] NOT NULL,
	[LanguageId] [int] NOT NULL,
	[CopiedFromHoodFinalOfferId] [int] NULL,
 CONSTRAINT [PK_CRM_HoodFinalOffers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOffers_IsPrepayment]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodFinalOffers] ADD  CONSTRAINT [DF_CRM_HoodFinalOffers_IsPrepayment]  DEFAULT ((0)) FOR [IsPrepayment]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOffers_PrepaymentPercent]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodFinalOffers] ADD  CONSTRAINT [DF_CRM_HoodFinalOffers_PrepaymentPercent]  DEFAULT ((0)) FOR [PrepaymentPercent]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOffers_PaymentType]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_HoodFinalOffers] ADD  CONSTRAINT [DF_CRM_HoodFinalOffers_PaymentType]  DEFAULT ((0)) FOR [PaymentType]
END
GO

--IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOffers_DeliveryTimeWeeks]') AND type = 'D')
--BEGIN
--ALTER TABLE [HM].[CRM_HoodFinalOffers] ADD  CONSTRAINT [DF_CRM_HoodFinalOffers_DeliveryTimeWeeks]  DEFAULT ((0)) FOR [DeliveryTimeDays]
--END
--GO

--IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOffers_GuaranteeYears]') AND type = 'D')
--BEGIN
--ALTER TABLE [HM].[CRM_HoodFinalOffers] ADD  CONSTRAINT [DF_CRM_HoodFinalOffers_GuaranteeYears]  DEFAULT ((0)) FOR [GuaranteeYears]
--END
--GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_Files]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_Files] FOREIGN KEY([LogoFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_Files1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_Files1] FOREIGN KEY([OfferPdfFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_HoodFinalOffers]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_HoodFinalOffers] FOREIGN KEY([CopiedFromHoodFinalOfferId])
REFERENCES [HM].[CRM_HoodFinalOffers] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_HoodOffers]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_HoodOffers] FOREIGN KEY([HoodOffersId])
REFERENCES [HM].[CRM_HoodOffers] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_Languages]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_Languages] FOREIGN KEY([LanguageId])
REFERENCES [HM].[CRM_Languages] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_OfferCompanies]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_OfferCompanies] FOREIGN KEY([CustomerOfferCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_Regions]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_Regions] FOREIGN KEY([RegionId])
REFERENCES [HM].[CRM_Regions] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOffers_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOffers]'))
ALTER TABLE [HM].[CRM_HoodFinalOffers]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOffers_CRM_Users] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_HoodFinalOfferElements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NOT NULL,
	[ProduktId] [int] NULL,
	[CatalogPriceNet] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[PriceAfterDiscountNet] [decimal](18, 2) NOT NULL,
	[FinalValueNet] [decimal](18, 2) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[PersonalProductId] [int] NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
	[HoodFinalOffersId] [int] NOT NULL,
	[Type] [int] NOT NULL,
	[HoodOfferElementsId] [int] NULL,
 CONSTRAINT [PK_CRM_HoodFinalOfferElements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

--IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_HoodFinalOfferElements_DeliveryTimeDays]') AND type = 'D')
--BEGIN
--ALTER TABLE [HM].[CRM_HoodFinalOfferElements] ADD  CONSTRAINT [DF_CRM_HoodFinalOfferElements_DeliveryTimeDays]  DEFAULT ((25)) FOR [DeliveryTimeDays]
--END
--GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_HoodFinalOffers]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_HoodFinalOffers] FOREIGN KEY([HoodFinalOffersId])
REFERENCES [HM].[CRM_HoodFinalOffers] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_HoodOfferElements]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_HoodOfferElements] FOREIGN KEY([HoodOfferElementsId])
REFERENCES [HM].[CRM_HoodOfferElements] ([Id])
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_HoodOfferElements]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements] CHECK CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_HoodOfferElements]
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_PersonalProducts]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_PersonalProducts] FOREIGN KEY([PersonalProductId])
REFERENCES [HM].[CRM_PersonalProducts] ([Id])
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_PersonalProducts]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements] CHECK CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_PersonalProducts]
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodFinalOfferElements_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodFinalOfferElements]'))
ALTER TABLE [HM].[CRM_HoodFinalOfferElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodFinalOfferElements_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_HoodOrders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Status] [tinyint] NULL,
	[OrderDate] [date] NULL,
	[OrderRealTerm] [date] NULL,
	[OrderType] [nvarchar](5) NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[OrderDesc] [nvarchar](150) NOT NULL,
	[OrderNote] [nvarchar](500) NOT NULL,
	[CustomerId] [int] NULL,
	[CustomerCode] [nvarchar](50) NOT NULL,
	[CustomerName] [nvarchar](250) NOT NULL,
	[CustomerAddress] [nvarchar](150) NOT NULL,
	[CustomerPostalCode] [nvarchar](100) NOT NULL,
	[CustomerCity] [nvarchar](100) NOT NULL,
	[CustomerVATId] [nvarchar](20) NOT NULL,
	[CustomerCountryCode] [nvarchar](5) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[CatalogValue] [decimal](18, 2) NOT NULL,
	[ValueAfterPrimatyDiscount] [decimal](18, 2) NOT NULL,
	[FinalValueAfterAllDiscounts] [decimal](18, 2) NOT NULL,
	[IsPrepayment] [bit] NOT NULL,
	[OwnerUserId] [int] NOT NULL,
	[HoodFinalOfferId] [int] NOT NULL,
	[LanguageId] [int] NOT NULL,
	[RegionId] [int] NOT NULL,
	[GuaranteeYears] [tinyint] NOT NULL,
	[PrepaymentPercent] [tinyint] NOT NULL,
	[OrderPdfFileId] [int] NULL,
	[InstallationObjectId] [int] NULL,
	[LogoFileId] [int] NULL,
	[SellerFirmaId] [int] NOT NULL,
 CONSTRAINT [PK_CRM_HoodOrders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Files]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Files] FOREIGN KEY([OrderPdfFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Files1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Files1] FOREIGN KEY([LogoFileId])
REFERENCES [HM].[CRM_Files] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_HoodFinalOffers]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_HoodFinalOffers] FOREIGN KEY([HoodFinalOfferId])
REFERENCES [HM].[CRM_HoodFinalOffers] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Languages]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Languages] FOREIGN KEY([LanguageId])
REFERENCES [HM].[CRM_Languages] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Regions]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Regions] FOREIGN KEY([RegionId])
REFERENCES [HM].[CRM_Regions] ([Id])
GO


IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Users1] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_CRM_Users2] FOREIGN KEY([OwnerUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrders_S_OBIEKTY]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrders]'))
ALTER TABLE [HM].[CRM_HoodOrders]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrders_S_OBIEKTY] FOREIGN KEY([InstallationObjectId])
REFERENCES [HM].[S_OBIEKTY] ([id])
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_HoodOrderElements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HoodOrderId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[ProduktId] [int] NULL,
	[ProductCode] [nvarchar](50) NULL,
	[ProductDesc] [nvarchar](500) NULL,
	[VATRate] [int] NULL,
	[CatalogPriceNet] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[PriceAfterDiscountNet] [decimal](18, 2) NOT NULL,
	[FinalValueNet] [decimal](18, 2) NOT NULL,
	[FinalValueVAT] [decimal](18, 2) NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[OwnerByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[HoodFinalOfferElementId] [int] NOT NULL,
	[UoM] [tinyint] NULL,
	[PersonalProductId] [int] NULL,
	[DeliveryTimeDays] [tinyint] NOT NULL,
	[Type] [int] NOT NULL,
	[HoodOfferAccessoryId] [int] NULL,
 CONSTRAINT [PK_CRM_HoodOrderElements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_HoodFinalOfferElements]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_HoodFinalOfferElements] FOREIGN KEY([HoodFinalOfferElementId])
REFERENCES [HM].[CRM_HoodFinalOfferElements] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_HoodOfferAccessories]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_HoodOfferAccessories] FOREIGN KEY([HoodOfferAccessoryId])
REFERENCES [HM].[CRM_HoodOfferAccessories] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_HoodOrders]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_HoodOrders] FOREIGN KEY([HoodOrderId])
REFERENCES [HM].[CRM_HoodOrders] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_PersonalProducts]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_PersonalProducts] FOREIGN KEY([PersonalProductId])
REFERENCES [HM].[CRM_PersonalProducts] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_Users1] FOREIGN KEY([OwnerByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_HoodOrderElements_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_HoodOrderElements]'))
ALTER TABLE [HM].[CRM_HoodOrderElements]  WITH CHECK ADD  CONSTRAINT [FK_CRM_HoodOrderElements_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_UserRolesDict]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_UserRolesDict](
	[Id] [bigint] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_UserRolesDict] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_UserRolesDict_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_UserRolesDict] ADD  CONSTRAINT [DF_CRM_UserRolesDict_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END
GO

/*###################################### NOWA TABELA ######################################*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[CRM_UserRoles]') AND type in (N'U'))
BEGIN
CREATE TABLE [HM].[CRM_UserRoles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[UserRoleDictId] [bigint] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[ModifiedByUserId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CRM_UserRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_UserRoles_CreatedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_UserRoles] ADD  CONSTRAINT [DF_CRM_UserRoles_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_UserRoles_ModifiedOn]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_UserRoles] ADD  CONSTRAINT [DF_CRM_UserRoles_ModifiedOn]  DEFAULT (getdate()) FOR [ModifiedOn]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HM].[DF_CRM_UserRoles_IsDeleted]') AND type = 'D')
BEGIN
ALTER TABLE [HM].[CRM_UserRoles] ADD  CONSTRAINT [DF_CRM_UserRoles_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_UserRoles_CRM_UserRolesDict]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_UserRoles]'))
ALTER TABLE [HM].[CRM_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_UserRoles_CRM_UserRolesDict] FOREIGN KEY([UserRoleDictId])
REFERENCES [HM].[CRM_UserRolesDict] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_UserRoles_CRM_Users]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_UserRoles]'))
ALTER TABLE [HM].[CRM_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_UserRoles_CRM_Users] FOREIGN KEY([UserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_UserRoles_CRM_Users1]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_UserRoles]'))
ALTER TABLE [HM].[CRM_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_UserRoles_CRM_Users1] FOREIGN KEY([CreatedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[HM].[FK_CRM_UserRoles_CRM_Users2]') AND parent_object_id = OBJECT_ID(N'[HM].[CRM_UserRoles]'))
ALTER TABLE [HM].[CRM_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_CRM_UserRoles_CRM_Users2] FOREIGN KEY([ModifiedByUserId])
REFERENCES [HM].[CRM_Users] ([Id])
GO

/*###################################### NOWA TABELA ######################################*/


SET ANSI_PADDING OFF 
GO
SET QUOTED_IDENTIFIER OFF 
GO
SET ANSI_NULLS ON 
GO


