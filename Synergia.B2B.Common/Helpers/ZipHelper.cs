using Ionic.Zip;
using Synergia.B2B.Common.Dto.Api.File;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class ZipHelper
    {
        public static byte[] CompressMultiFiles(List<FileDownloadResultDto> source)
        {
            MemoryStream s = new MemoryStream();
            ZipFile zFile = new ZipFile();

            foreach (FileDownloadResultDto entry in source)
            {
                zFile.AddEntry(entry.FileName, entry.FileBytes);
            }

            zFile.Save(s);

            return s.ToArray();
        }

        public static byte[] CompressMultiFiles(List<FileToZipDto> source)
        {
            MemoryStream s = new MemoryStream();
            ZipFile zFile = new ZipFile();
            //Dictionary<string, int> insertedFiles = new Dictionary<string, int>();
            foreach (var entry in source.Select(x=>new {x.FilePath, x.OutputDirectory }).Distinct().ToList())
            {
                //if (insertedFiles.ContainsKey(entry.OutputDirectory))
                //{
                //    entry.OutputDirectory = Path.Combine(Path.GetDirectoryName(entry.OutputDirectory),
                //        Path.GetFileNameWithoutExtension(entry.OutputDirectory) + "_" + insertedFiles[entry.OutputDirectory] + Path.GetExtension(entry.OutputDirectory));
                //    insertedFiles[entry.OutputDirectory] += 1;
                //}
                //else {
                //    insertedFiles[entry.OutputDirectory] = 1;
                //}
                zFile.AddFile(entry.FilePath, entry.OutputDirectory);
            }

            zFile.Save(s);

            return s.ToArray();
        }
    }

    public class FileToZipDto
    {
        public string FilePath { get; set; }
        public string OutputDirectory { get; set; }
    }
}
