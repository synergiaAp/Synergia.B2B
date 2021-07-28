USE [ERP_JEVEN]
GO

/****** Object:  View [HM].[vCRM_FirmyFVS]    Script Date: 23.05.2018 01:07:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [HM].[vCRM_FirmyFVS]
AS
SELECT        HM.DK.id AS fvsid, HM.DK.kod AS fvsnr, HM.DK.data AS fvsdata, HM.DK.netto AS fvsnetto, HM.DK.netto + HM.DK.vat AS fvsbrutto, (CASE WHEN (netto + vat - wplaty) >= 0.01 THEN (netto + vat - wplaty) ELSE 0 END) 
                         AS fvsdozaplaty, HM.DK.khid, vKH.kod AS khkod, (CASE WHEN subtyp = 40 OR
                         subtyp = 136 THEN 'Faktura sprzedaży' ELSE 'Korekta sprzedaży' END) AS nazwa_dok, vKH.kod + '\' + REPLACE(HM.DK.kod, '/', '_') + '.pdf' AS Plik
FROM            HM.DK LEFT OUTER JOIN
                         SSCommon.vKontrahenci AS vKH ON vKH.id = HM.DK.khid
WHERE        (HM.DK.typ = 0) AND (HM.DK.bufor = 0) AND (HM.DK.anulowany = 0) AND (HM.DK.subtyp = 40) OR
                         (HM.DK.subtyp = 136) OR
                         (HM.DK.subtyp = 137)
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[22] 4[39] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "DK (HM)"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 243
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "vKH"
            Begin Extent = 
               Top = 6
               Left = 281
               Bottom = 136
               Right = 451
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 11
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 3210
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'HM', @level1type=N'VIEW',@level1name=N'vCRM_FirmyFVS'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'HM', @level1type=N'VIEW',@level1name=N'vCRM_FirmyFVS'
GO

