using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class FileHelper
    {
        public static string GetIconFileName(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
            {
                string extension = Path.GetExtension(fileName).ToLower();  //ToLower() zmienia na małe litery
                switch (extension)
                {
                    case ".pdf":
                    case ".jpg":
                    case ".gif":
                    case ".doc":
                    case ".xlsx":
                    case ".xls":
                    case ".dwg":
                    case ".tiff":
                    case ".ppt":
                    case ".txt":
                    case ".zip":
                    case ".rar":
                    case ".psd":
                    case ".bmp":
                    case ".avi":
                    case ".png":
                        return string.Format("{0}.png", extension.Replace(".", ""));
                    case ".docx":
                        return "doc.png";
                    case ".pptx":
                        return "ppt.png";
                    case ".jpeg":
                        return "jpg.png";
                    default:
                        return "_blank.png";
                }
            }
            else
            {
                return "_blank.png";
            }
        }

        public static string GetFileName(string fileName)
        {
            return Path.GetFileNameWithoutExtension(fileName);
        }
    }
}
