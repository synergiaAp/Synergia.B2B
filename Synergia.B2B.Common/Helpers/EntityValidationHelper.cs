using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Synergia.B2B.Common.Helpers
{
    public static class EntityValidationHelper
    {
        public static void Log(DbEntityValidationException ex)
        {
            foreach (var validationErrors in ex.EntityValidationErrors)
            {
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    LogHelper.Log.Error("Property: {0} Error: {1}",
                                            validationError.PropertyName,
                                            validationError.ErrorMessage);
                }
            }
        }
    }
}
