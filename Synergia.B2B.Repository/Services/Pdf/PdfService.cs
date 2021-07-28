using Synergia.B2B.Common.Dto.Api.File;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using NReco.PdfGenerator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Services.Pdf
{
    public abstract class PdfService
    {
        #region Properties
        protected string FileName { get; set; }
        private string TemplateFileName { get; set; }
        protected Dictionary<string, string> Replacements { get; set; } = new Dictionary<string, string>();
        protected string TemplateContent { get; set; }
        protected string CRMApplicationUrl { get; set; } = ConfigHelper.GetValue("CRMApplicationUrl");
        protected float MarginTop { get; set; } = 10f;
        protected float MarginBottom { get; set; } = 12f;
        protected float MarginLeft { get; set; } = 5f;
        protected float MarginRight { get; set; } = 5f;
        #endregion Properties

        protected PdfService()
        {
            try
            {
                //LoadTemplateContent();
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw;
            }
        }

        protected PdfService(string templateFileName)
        {
            try
            {
                TemplateFileName = templateFileName;
                //LoadTemplateContent();
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw;
            }
        }

        protected virtual void LoadTemplateContent()
        {
            TemplateContent = TemplateHelper.GetTemplateContent("/Files/PdfTemplates/" + TemplateFileName);
        }

        public virtual FileDownloadResultDto Print()
        {
            try
            {
                FileDownloadResultDto result = new FileDownloadResultDto();
                LoadTemplateContent();
                ConfigureReplacements();

                TemplateContent = FillReplacements(TemplateContent);

                //uncomment to write temp html file used to generate pdf file
                //File.WriteAllBytes(@"D:\Test\lastPdf.html", Encoding.ASCII.GetBytes(TemplateContent));

                byte[] fileBytes = GeneratePdfFile(TemplateContent);

                result.FileBytes = fileBytes;
                result.FileName = FileName;

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        protected byte[] GeneratePdfFile(string content)
        {
            try
            {
                byte[] result = null;

                var options = new HtmlToPdfConverter();
                options.GenerateToc = false;
                options.Grayscale = false;
                options.LowQuality = false;
                options.Orientation = PageOrientation.Portrait;
                options.Size = PageSize.A4;
                options.PageWidth = 210f; //mm
                options.PageHeight = 297f; //mm

                options.Margins.Top = MarginTop;
                options.Margins.Right = MarginRight;
                options.Margins.Bottom = MarginBottom;
                options.Margins.Left = MarginLeft;
                options.CustomWkHtmlArgs = "--disable-smart-shrinking";

                if (content.Contains("<!--BeginPageFooterHtml-->"))
                {
                    options.PageFooterHtml = content.Substring(
                               content.IndexOf("<!--BeginPageFooterHtml-->"),
                               content.LastIndexOf("<!--EndPageFooterHtml-->") - content.IndexOf("<!--BeginPageFooterHtml-->")
                           );
                    content = content.Replace(options.PageFooterHtml, "");
                }
                if (content.Contains("<!--BeginPageHeaderHtml-->"))
                {
                    options.PageHeaderHtml = content.Substring(
                               content.IndexOf("<!--BeginPageHeaderHtml-->"),
                               content.LastIndexOf("<!--EndPageHeaderHtml-->") - content.IndexOf("<!--BeginPageHeaderHtml-->")
                           );
                    content = content.Replace(options.PageHeaderHtml, "");
                }

                result = options.GeneratePdf(content);

                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        protected virtual string FillReplacements(string content)
        {
            try
            {
                string result = content;
                foreach (var item in Replacements)
                {
                    result = result.Replace(item.Key, item.Value.ReplaceNewLineToHtml());
                }
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        protected virtual void ConfigureReplacements()
        {
            Replacements.Add("#CRMApplicationUrl#", CRMApplicationUrl);
        }
    }
}
