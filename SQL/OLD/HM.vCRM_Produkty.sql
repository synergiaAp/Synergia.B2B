USE [ERP_JEVEN]
GO

/****** Object:  View [HM].[vCRM_Produkty]    Script Date: 12.11.2017 23:08:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [HM].[vCRM_Produkty]
AS
SELECT        TW.id, TW.kod, TW.nazwa, (CASE WHEN TW.katalog <> 2200 THEN XT.kod END) AS GrupaKod, (CASE WHEN TW.katalog <> 2200 THEN TW.katalog END) AS GrupaId, TWD.CDim_Linia AS Linia, TWD.CDim_Model AS Model, 
                         TWD.CDim_Oznaczenie AS Oznaczenie, TWD.CDim_Gabaryty AS Gabaryty, TWD.CDim_Przylacze AS Przylacze, TWD.CDim_MocGaz AS MocGaz, TWD.CDim_MocPrad AS MocPrad, f.foto1, HMXT2.super AS ParGrupaId
FROM            HM.TW AS TW LEFT OUTER JOIN
                         SSCommon.KL_VIEW_ProductClassification AS TWD ON TWD.Shortcut = TW.kod LEFT OUTER JOIN
                         HM.XT AS XT ON XT.id = TW.katalog LEFT OUTER JOIN
                         HM.CRM_Foto AS f ON f.obid = TW.id AND f.typ = 10 LEFT OUTER JOIN
                         HM.XT AS HMXT2 ON HMXT2.id = XT.super AND TW.katalog <> 2200
WHERE        (TWD.CDim_Model IS NOT NULL)
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
         Begin Table = "TW"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TWD"
            Begin Extent = 
               Top = 6
               Left = 246
               Bottom = 136
               Right = 430
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "XT"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 268
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "f"
            Begin Extent = 
               Top = 6
               Left = 468
               Bottom = 136
               Right = 638
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "HMXT2"
            Begin Extent = 
               Top = 6
               Left = 676
               Bottom = 136
               Right = 846
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
      Begin ColumnWidths = 15
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
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End' , @level0type=N'SCHEMA',@level0name=N'HM', @level1type=N'VIEW',@level1name=N'vCRM_Produkty'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'
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
' , @level0type=N'SCHEMA',@level0name=N'HM', @level1type=N'VIEW',@level1name=N'vCRM_Produkty'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'HM', @level1type=N'VIEW',@level1name=N'vCRM_Produkty'
GO

