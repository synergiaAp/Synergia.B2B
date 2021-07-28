using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using Synergia.B2B.Repository.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Synergia.B2B.Repository.Services.Mail
{
    public abstract class MailMessageService
    {
        protected string Subject { get; set; }
        protected List<string> Recipients { get; set; }
        private string TemplateFileName { get; set; }
        protected Dictionary<string, string> Replacements { get; set; }
        protected List<Common.Entities.File> Attachments { get; set; }

        protected MailMessageService(string templateFileName)
        {
            try
            {
                Replacements = new Dictionary<string, string>();
                Attachments = new List<Common.Entities.File>();
                Recipients = new List<string>();
                Replacements = new Dictionary<string, string>();

                TemplateFileName = templateFileName;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
            }
        }

        public virtual bool Send()
        {
            try
            {
                if (Recipients.Any())
                {
                    ConfigureReplacements();

                    string content = TemplateHelper.GetTemplateContent("/Files/MailTemplates/Premailer/" + TemplateFileName);
                    content = FillReplacements(content);
                    Subject = FillReplacements(Subject);

                    SmtpClient smtpClient = new SmtpClient();
                    NetworkCredential basicCredential = new NetworkCredential("crm@synergia.pl", "MxL5Wv1v7IGU");
                    MailMessage mailMessage = new MailMessage();
                    MailAddress fromAddress = new MailAddress("crm@synergia.pl");

                    smtpClient.Host = "mail.synergia.pl";
                    smtpClient.Port = 587;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = basicCredential;

                    mailMessage.From = fromAddress;
                    mailMessage.Subject = Subject;
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = content;

                    foreach (var recipient in Recipients)
                    {
                        mailMessage.Bcc.Add(recipient);
                    }
                    //mailMessage.To.Add(message.Recipient);

                    if (Attachments.Any())
                    {
                        foreach (var attachment in Attachments)
                        {
                            string filePath = Path.Combine(SessionHelper.CrmFilesPath, attachment.GeneratedFileName);
                            byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                            mailMessage.Attachments.Add(new Attachment(new MemoryStream(fileBytes),
                                attachment.OriginalFileName, MimeMapping.GetMimeMapping(attachment.OriginalFileName)));
                        }
                    }

                    smtpClient.Send(mailMessage);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return false;
            }
        }

        protected virtual string FillReplacements(string content)
        {
            try
            {
                string result = content;
                foreach (var item in Replacements)
                {
                    result = result.ReplaceIgnoreCase(item.Key, item.Value.ReplaceNewLineToHtml());
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

        }

    }
}
