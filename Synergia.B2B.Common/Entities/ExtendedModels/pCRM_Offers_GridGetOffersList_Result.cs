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
    public partial class pCRM_Offers_GridGetOffersList_Result
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
                string sha512Hash = BitConverter.ToString(new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(OfferNumber)))
                    .Replace("-", "")
                    .Substring(0, 15);
                return sha512Hash;
            }
        }
    }
}
