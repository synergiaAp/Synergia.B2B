USE [ERP_JEVEN]
GO

/****** Object:  Table [HM].[S_OBIEKTY]    Script Date: 16.09.2018 21:41:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [HM].[S_OBIEKTY](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idcrm] [uniqueidentifier] NULL,
	[kod] [nvarchar](150) NULL,
	[nazwa] [nvarchar](250) NULL,
	[adres] [nvarchar](250) NULL,
	[kodpocz] [nvarchar](50) NULL,
	[miasto] [nvarchar](150) NULL,
	[kraj] [nvarchar](50) NULL,
	[typ] [nvarchar](150) NULL,
	[cdate] [datetime] NULL,
	[SymfoniaModifiedOn] [datetime] NULL,
	[CRMModifiedOn] [datetime] NULL,
	[cuser] [nvarchar](50) NULL,
	[muser] [nvarchar](50) NULL,
	[nazwisko] [nvarchar](50) NULL,
	[imie] [nvarchar](50) NULL,
	[status] [int] NULL,
	[przyczyna] [int] NULL,
	[notatka] [text] NULL,
	[khId] [int] NULL,
	[khKod] [nvarchar](50) NULL,
	[OfferCompanyId] [int] NULL,
 CONSTRAINT [PK_S_OBIEKTY] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [HM].[S_OBIEKTY]  WITH CHECK ADD  CONSTRAINT [FK_S_OBIEKTY_CRM_OfferCompanies] FOREIGN KEY([OfferCompanyId])
REFERENCES [HM].[CRM_OfferCompanies] ([Id])
GO

ALTER TABLE [HM].[S_OBIEKTY] CHECK CONSTRAINT [FK_S_OBIEKTY_CRM_OfferCompanies]
GO

