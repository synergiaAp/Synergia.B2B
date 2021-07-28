using Synergia.B2B.Common.Dto.Api.File;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using Synergia.B2B.Repository.Repositories;
using Synergia.B2B.Repository.Services.Pdf;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Synergia.B2B.Web.Controllers
{
    [Authorize]
    [SessionState(System.Web.SessionState.SessionStateBehavior.ReadOnly)]
    public class FilesController : Controller
    {
        protected int LoggedUserId
        {
            get
            {
                return int.Parse(((ClaimsIdentity)User.Identity).Claims.FirstOrDefault(x => x.Type == "UserId").Value);
            }
        }

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            if (requestContext.HttpContext.Request.Params["cultureName"] != null)
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(requestContext.HttpContext.Request.Params["cultureName"]);
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(requestContext.HttpContext.Request.Params["cultureName"]);
            }
        }

        [AllowAnonymous]
        [OutputCache(Duration = 3600)]
        public FileResult GetFile(string fileName)
        {
            string filePath = Path.Combine(SessionHelper.FilePath, fileName);
            //string filePath = Path.Combine(@"D:\Test", fileName);
            //Response.Clear();
            //Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(filePath));
            //Response.Flush();
            //Response.BinaryWrite(System.IO.File.ReadAllBytes(filePath));
            //Response.Flush();
            //Response.End();
            //return View();
            return File(filePath, MimeMapping.GetMimeMapping(Path.GetFileName(filePath)), Path.GetFileName(filePath));
        }

        public ActionResult GetDocument(string fileName)
        {
            string documentPath = Path.Combine(SessionHelper.DocumentPath, fileName);
            //string filePath = Path.Combine(@"D:\Test", fileName);
            Response.Clear();
            Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(documentPath));
            Response.Flush();
            Response.BinaryWrite(System.IO.File.ReadAllBytes(documentPath));
            Response.Flush();
            Response.End();
            return View();
            //return File(documentPath, MimeMapping.GetMimeMapping(Path.GetFileName(documentPath)), Path.GetFileName(documentPath));
        }

        [AllowAnonymous]
        [OutputCache(Duration = 3600)]
        public ActionResult GetCRMFile(string fileName, string friendlyFileName = "")
        {
            string filePath = Path.Combine(SessionHelper.CrmFilesPath, fileName);
            //string filePath = Path.Combine(@"D:\Test", fileName);
            Response.Clear();
            Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(filePath));
            Response.Flush();
            Response.BinaryWrite(System.IO.File.ReadAllBytes(filePath));
            Response.Flush();
            Response.End();
            return View();
            //return File(filePath, MimeMapping.GetMimeMapping(Path.GetFileName(filePath)), Path.GetFileName(filePath));
        }

        public ActionResult GetOfferElementsZipFile(int offerId, string fileUniqueGuid)
        {
            var offer = new OfferRepository().GetById(offerId);
            var allOfferElements = new OfferElementRepository().GetByOfferId(offerId);
            List<int> productIds = allOfferElements.Where(oe => oe.ProduktId.HasValue).Select(oe => oe.ProduktId.Value).ToList();
            var documents = new ProductDocumentRepository().GetProductDocuments(productIds);

            List<FileToZipDto> filesToZip = documents.Select(d => new FileToZipDto()
            {
                FilePath = Path.Combine(SessionHelper.DocumentPath, d.FileName),
                OutputDirectory = $"OFE_{offer.OfferNumber}/{d.ProductCode}"
            }).ToList();

            var zippedFiles = ZipHelper.CompressMultiFiles(filesToZip);
            string fileName = $"OFE_{offer.OfferNumber}.zip";

            string sha512Hash = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(offer.OfferNumber)))
                   .Replace("-", "")
                   .Substring(0, 15);
            if (sha512Hash != fileUniqueGuid)
            {
                return Content("");
            }

            return File(zippedFiles, MimeMapping.GetMimeMapping(fileName), fileName);
        }

        public ActionResult GetKHDocs(string fileName, string fileUniqueGuid)
        {
            string sha512Hash = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(fileName.Replace("\\", "").Replace("/", ""))))
                   .Replace("-", "")
                   .Substring(0, 15);
            if(sha512Hash != fileUniqueGuid)
            {
                return Content("");
            }

            string documentPath = Path.Combine(SessionHelper.KHDocPath, fileName);
            //string filePath = Path.Combine(@"D:\Test", fileName);
            Response.Clear();
            Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(documentPath));
            Response.Flush();
            Response.BinaryWrite(System.IO.File.ReadAllBytes(documentPath));
            Response.Flush();
            Response.End();
            return View();
            //return File(documentPath, MimeMapping.GetMimeMapping(Path.GetFileName(documentPath)), Path.GetFileName(documentPath));
        }

        //public ActionResult GetHoodOfferPdfFile(int hoodOfferId, string fileUniqueGuid, string fileName = "")
        //{
        //    try
        //    {
        //        string sha512Hash = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(fileName.Replace("/", "").Replace("%", "").Replace("  ", " ").Trim())))
        //           .Replace("-", "")
        //           .Substring(0, 15);
        //        if (sha512Hash != fileUniqueGuid)
        //        {
        //            return Content("");
        //        }

        //        HoodOfferPdfService hoodOfferPdfService = new HoodOfferPdfService(hoodOfferId);
        //        var result = hoodOfferPdfService.Print();

        //        Response.Clear();
        //        Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(result.FileName));
        //        Response.Flush();
        //        Response.BinaryWrite(result.FileBytes);
        //        Response.Flush();
        //        Response.End();
        //        return View();
        //    }
        //    catch(Exception ex)
        //    {
        //        LogHelper.Log.Error(ex);
        //        return View();
        //    }
        //}

        //public ActionResult GetHoodFinalOfferPdfFile(int hoodOfferId, string fileUniqueGuid, string fileName = "")
        //{
        //    try
        //    {
        //        string sha512Hash = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(fileName.Replace("\\", "").Replace("/", ""))))
        //           .Replace("-", "")
        //           .Substring(0, 15);
        //        if (sha512Hash != fileUniqueGuid)
        //        {
        //            return Content("");
        //        }

        //        var hoodFinalOffer = new HoodFinalOfferRepository().GetById(hoodOfferId);

        //        FileDownloadResultDto result = null;

        //        if (hoodFinalOffer.OfferPdfFileId.HasValue)
        //        {
        //            var file = new FileRepository().GetById(hoodFinalOffer.OfferPdfFileId.Value);
        //            string filePath = Path.Combine(SessionHelper.CrmFilesPath, file.GeneratedFileName);
        //            result = new FileDownloadResultDto()
        //            {
        //                FileBytes = System.IO.File.ReadAllBytes(filePath),
        //                FileName = fileName
        //            };
        //        }
        //        else
        //        {
        //            var hoodOfferPdfService = new FinishedHoodFinalOfferPdfService(hoodOfferId, LoggedUserId);
        //            result = hoodOfferPdfService.Print();
        //        }

        //        Response.Clear();
        //        Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(result.FileName));
        //        Response.Flush();
        //        Response.BinaryWrite(result.FileBytes);
        //        Response.Flush();
        //        Response.End();
        //        return View();
        //    }
        //    catch (Exception ex)
        //    {
        //        LogHelper.Log.Error(ex);
        //        return View();
        //    }
        //}

        //public ActionResult GetHoodOrderPdfFile(int hoodOrderId, string friendlyFileName = "")
        //{
        //    try
        //    {
        //        var hoodOrderPdfService = new HoodOrderPdfService(hoodOrderId, 2);
        //        var result = hoodOrderPdfService.Print();

        //        Response.Clear();
        //        Response.ContentType = MimeMapping.GetMimeMapping(Path.GetFileName(result.FileName));
        //        Response.Flush();
        //        Response.BinaryWrite(result.FileBytes);
        //        Response.Flush();
        //        Response.End();
        //        return View();
        //    }
        //    catch (Exception ex)
        //    {
        //        LogHelper.Log.Error(ex);
        //        return View();
        //    }
        //}

        [AllowAnonymous]
        public ActionResult HoodOfferPdfFile(string cultureName)
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult HoodFinalOfferPdfFile(string cultureName)
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult HoodOrderPdfFile(string cultureName)
        {
            return View();
        }
    }
}