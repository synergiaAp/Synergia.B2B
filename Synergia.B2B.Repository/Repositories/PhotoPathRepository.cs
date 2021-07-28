using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class PhotoPathRepository : BaseRepository<PhotoPath>
    {
        public string GetPhotoPath()
        {
            //PhotoPath result = Ctx.vCRM_FotoSc.Single();
            //return result.FotoSc;
            //return @"D:\Praca\zlecenia\Wojciech Grala\FotoSc"; //result.FotoSc;
            return @"D:\B2BDANE\FotoSc";
        }
    }
}
