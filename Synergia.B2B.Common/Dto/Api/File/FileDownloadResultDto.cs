using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Dto.Api.File
{
    public class FileDownloadResultDto
    {
        public byte[] FileBytes { get; set; }
        public string FileName { get; set; }
    }
}
