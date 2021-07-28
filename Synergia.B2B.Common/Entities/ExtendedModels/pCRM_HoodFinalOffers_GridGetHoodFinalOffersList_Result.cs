using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Entities
{
    public partial class pCRM_HoodFinalOffers_GridGetHoodFinalOffersList_Result
    {
        public string StatusText
        {
            get
            {
                return ((OfferStatus)Status).GetDescription();
            }
        }

        public string FileUniqueGuid
        {
            get
            {
                string sha512Hash = !string.IsNullOrEmpty(OfferPdfOriginalFileName) 
                    ? BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(OfferPdfOriginalFileName.Replace("\\", "").Replace("/", "_"))))
                        .Replace("-", "")
                        .Substring(0, 15)
                    : null;
                return sha512Hash;
            }
        }
    }
}
