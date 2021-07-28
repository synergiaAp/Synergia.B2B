using Synergia.B2B.Common.Entities;
using Synergia.B2B.Common.Helpers;
using NLog;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Synergia.B2B.Repository.Repositories
{
    public class BaseRepository<T> where T : class
    {
        protected static Logger Log = LogManager.GetCurrentClassLogger();
        private ERP_SYNERGIAEntities _ctx; //Context
        protected ERP_SYNERGIAEntities Ctx //Ten obiekt przechowuje połączenie z bazą danych, context
        {
            get
            {
                return _ctx;
            }
            private set
            {
                _ctx = value;
            }
        }

        public BaseRepository()
        {
            Ctx = new ERP_SYNERGIAEntities();
            Ctx.Configuration.LazyLoadingEnabled = false;
        }

        //public BaseRepository(ERP_SYNERGIAEntities ctx)
        //{
        //    _ctx = ctx;
        //}

        public virtual void Add(T newItem)
        {
            try
            {
                Ctx.Set<T>().Add(newItem);
                Ctx.SaveChanges();
                Ctx.Entry<T>(newItem).State = System.Data.Entity.EntityState.Detached;
            }
            catch (DbEntityValidationException ex)
            {
                EntityValidationHelper.Log(ex);
                throw ex;
            }
        }

        public virtual void Update(T updatedItem)
        {
            try
            {
                Ctx.Entry<T>(updatedItem).State = System.Data.Entity.EntityState.Modified;
                Ctx.SaveChanges();
                Ctx.Entry<T>(updatedItem).State = System.Data.Entity.EntityState.Detached;
            }
            catch (DbEntityValidationException ex)
            {
                EntityValidationHelper.Log(ex);
                throw ex;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                throw;
            }
        }

        public virtual void Delete(T deletedItem)
        {
            try
            {
                Ctx.Entry<T>(deletedItem).State = System.Data.Entity.EntityState.Deleted;
                Ctx.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                EntityValidationHelper.Log(ex);
                throw ex;
            }
        }

        public virtual T GetById(int id)
        {
            var result = Ctx.Set<T>().Find(id);
            return result;
        }

        public virtual List<T> GetAll()
        {
            try
            {
                var result = Ctx.Set<T>().ToList();
                return result;
            }
            catch (Exception ex)
            {
                LogHelper.Log.Error(ex);
                return null;
            }
        }

        public virtual void Save(T item)
        {
            if (ParseHelper.ToLong(item.GetType().GetProperty("Id").GetValue(item, null)).Equals(default(int)))
            {
                Add(item);
            }
            else
            {
                Update(item);
            }
        }

        public TransactionScope CreateTransaction()
        {
            return new TransactionScope(TransactionScopeOption.Required, new TransactionOptions() { IsolationLevel = IsolationLevel.ReadUncommitted },
                TransactionScopeAsyncFlowOption.Enabled);
        }
    }
}
