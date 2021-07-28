using Synergia.B2B.Common.Dto.Api.File;
using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Enums;
using Synergia.B2B.Common.Extensions;
using Synergia.B2B.Common.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;

namespace Synergia.B2B.Repository.Repositories
{
    public class FileRepository : BaseRepository<Common.Entities.File>
    {
        public int? Save(HttpPostedFile fileToSave, FileType type)
        {
            try
            {
                return Save(new FileDownloadResultDto()
                {
                    FileBytes = new BinaryReader(fileToSave.InputStream).ReadBytes(fileToSave.ContentLength),
                    FileName = fileToSave.FileName
                }, type);
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public int? Save(FileDownloadResultDto fileToSave, FileType type)
        {
            try
            {
                int? result = null;
                if (fileToSave != null && fileToSave.FileBytes != null)
                {
                    using (TransactionScope tran = new TransactionScope())
                    {
                        var fileEntity = new Common.Entities.File()
                        {
                            FileSize = fileToSave.FileBytes.Length,
                            GeneratedFileName = $"{Guid.NewGuid()}{Path.GetExtension(fileToSave.FileName)}",
                            OriginalFileName = fileToSave.FileName,
                            Type = type.ToByte()
                        };
                        base.Add(fileEntity);
                        result = fileEntity.Id;

                        string crmfilesPath = new SCRepository().GetAll().Where(s => s.Type == "crmfiles").Single().SourcePath;
                        string path = Path.Combine(crmfilesPath, fileEntity.GeneratedFileName);
                        if (!Directory.Exists(Path.GetDirectoryName(path)))
                        {
                            Directory.CreateDirectory(Path.GetDirectoryName(path));
                        }

                        System.IO.File.WriteAllBytes(path, fileToSave.FileBytes);
                        tran.Complete();
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public void Remove(int fileId)
        {
            try
            {
                using (TransactionScope tran = new TransactionScope())
                {
                    var fileEntity = Ctx.CRM_Files.Find(fileId);
                    base.Delete(fileEntity);

                    string crmfilesPath = new SCRepository().GetAll().Where(s => s.Type == "crmfiles").Single().SourcePath;
                    string path = Path.Combine(crmfilesPath, fileEntity.GeneratedFileName);
                    System.IO.File.Delete(path);
                    tran.Complete();
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw;
            }
        }
    }
}
