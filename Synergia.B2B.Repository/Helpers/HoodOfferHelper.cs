//using Synergia.B2B.Common.Entities;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Synergia.B2B.Common.Extensions;
//using Synergia.B2B.Repository.Repositories;
//using System.Text.RegularExpressions;
//using Synergia.B2B.Common.Helpers;

//namespace Synergia.B2B.Repository.Helpers
//{
//    public class HoodOfferHelper
//    {
//        public static string GetFileDirectoryPath(int hoodOfferId)
//        {
//            string result = null;
//            var hoodOffer = new HoodOfferRepository().GetById(hoodOfferId);
//            if (hoodOffer.RegionId.HasValue && hoodOffer.InstallationObjectObiektyId.HasValue)
//            {
//                var region = new RegionRepository().GetById(hoodOffer.RegionId.Value);
//                var installationObject = new InstallationObjectRepository().GetById(hoodOffer.InstallationObjectObiektyId.Value);

//                result = Path.Combine(SessionHelper.CrmHoodOfferFilesPath, region.Name,
//                    $"20{hoodOffer.OfferNumber.Substring(2, 2)}",
//                    $"{hoodOffer.OfferNumber.Substring(0, hoodOffer.OfferNumber.LastIndexOf("_")).Replace("-", "_")}_{Regex.Replace(installationObject.Name, "[^a-ząęćńśłóźż0-9- _&]+", "", RegexOptions.IgnoreCase)} {Regex.Replace(installationObject.Address, "[^a-ząęćńśłóźż0-9- _&]+", "", RegexOptions.IgnoreCase)} {Regex.Replace(installationObject.City, "[^a-ząęćńśłóźż0-9- _&]+", "", RegexOptions.IgnoreCase)}".TrimDoubleSpaces(),
//                    hoodOffer.OfferNumber.Substring(hoodOffer.OfferNumber.IndexOf("_")));
//            }
//            return result;
//        }

//        public static string GetPdfFileName(int hoodOfferId)
//        {
//            var hoodOffer = new HoodOfferRepository().GetById(hoodOfferId);
//            var installationObject = hoodOffer.InstallationObjectObiektyId.HasValue
//                ? new InstallationObjectRepository().GetById(hoodOffer.InstallationObjectObiektyId.Value)
//                : null;

//            return hoodOffer.OfferNumber + (hoodOffer.InstallationObjectObiektyId.HasValue
//                        ? Regex.Replace($"_{installationObject.Name} {installationObject.Address} {installationObject.City}", "[^a-ząęćńśłóźż0-9- _&.,]+", "", RegexOptions.IgnoreCase)
//                        : "")
//                    + "_A.pdf";
//        }

//        public static void RemoveHoodOfferCatalog(int hoodOfferId)
//        {
//            string prevHoodOfferFilePath = GetFileDirectoryPath(hoodOfferId);
//            string prevPdfFileName = GetPdfFileName(hoodOfferId);
//            RemoveHoodOfferCatalog(prevHoodOfferFilePath, prevPdfFileName, null);
//        }

//        public static void RemoveHoodOfferCatalog(string prevHoodOfferFilePath, string prevPdfFileName, string newHoodOfferFilePath)
//        {
//            // czy istnieje stary katalog od oferty
//            if (Directory.Exists(prevHoodOfferFilePath))
//            {
//                // usuniecie starego pliku pdf z oferta
//                if (System.IO.File.Exists(Path.Combine(prevHoodOfferFilePath, prevPdfFileName)))
//                {
//                    System.IO.File.Delete(Path.Combine(prevHoodOfferFilePath, prevPdfFileName));
//                }

//                // przeniesienie plikow do nowego katalogu
//                if (!string.IsNullOrEmpty(newHoodOfferFilePath) && !DirectoryHelper.IsEmpty(prevHoodOfferFilePath))
//                {
//                    //List<string> allFilesInPrevPath = Directory.GetFiles(prevHoodOfferFilePath, "*.*", 
//                    //    SearchOption.AllDirectories).ToList();

//                    //foreach (string file in allFilesInPrevPath)
//                    //{
//                    //    FileInfo fileInfo = new FileInfo(file);
//                    //    if (!System.IO.File.Exists(Path.Combine(newHoodOfferFilePath, fileInfo.Name)))
//                    //    {
//                    //        fileInfo.MoveTo(Path.Combine(newHoodOfferFilePath, fileInfo.Name));
//                    //    }
//                    //}

//                    var newHoodOfferFilePathParentPath = new DirectoryInfo(newHoodOfferFilePath).Parent.FullName;
//                    if (!Directory.Exists(newHoodOfferFilePathParentPath))
//                    {
//                        Directory.CreateDirectory(newHoodOfferFilePathParentPath);
//                    }
//                    Directory.Move(prevHoodOfferFilePath, newHoodOfferFilePath);
//                }

//                if (Directory.Exists(prevHoodOfferFilePath) && DirectoryHelper.IsEmpty(prevHoodOfferFilePath))
//                {
//                    Directory.Delete(prevHoodOfferFilePath);
//                }

//                var prevHoodOfferFilePathParentPath = new DirectoryInfo(prevHoodOfferFilePath).Parent.FullName;

//                //usuniecie starego rodzica katalogu od oferty o ile jest pusty
//                if (DirectoryHelper.IsEmpty(prevHoodOfferFilePathParentPath))
//                {
//                    Directory.Delete(prevHoodOfferFilePathParentPath);
//                }

//                //usuniecie starego rodzica rodzica katalogu od oferty o ile jest pusty
//                prevHoodOfferFilePathParentPath = new DirectoryInfo(prevHoodOfferFilePathParentPath).Parent.FullName;
//                if (DirectoryHelper.IsEmpty(prevHoodOfferFilePathParentPath))
//                {
//                    Directory.Delete(prevHoodOfferFilePathParentPath);
//                }
//            }
//        }
//    }
//}
