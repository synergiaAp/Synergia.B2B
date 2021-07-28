using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Synergia.B2B.Common.Entities
{
    public partial class pCRM_Products_GridGetDocumentsList_Result
    {
        public string IconFileName
        {
            get
            {
                return FileHelper.GetIconFileName(FileName);
            }
        }

        public string MainFileName
        {
            get
            {
                return FileHelper.GetFileName(FileName);
            }
        }
    }
}
