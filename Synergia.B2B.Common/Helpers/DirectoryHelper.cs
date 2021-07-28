using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class DirectoryHelper
    {
        public static bool IsEmpty(string path)
        {
            return !Directory.EnumerateFileSystemEntries(path, "*", SearchOption.AllDirectories).Any();
        }
    }
}
