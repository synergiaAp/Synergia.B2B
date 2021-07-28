using Synergia.B2B.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Repository.Repositories
{
    public class DocumentPathRepository : BaseRepository<DocumentPath>
    {
        public string GetDocumentPath()
        {
            //DocumentPath result = Ctx.vCRM_DokSc.Single();
            //return result.DocSc;
            return @"D:\Praca\zlecenia\Wojciech Grala\DokSc";  //result.DocSc;
        }
    }
}
