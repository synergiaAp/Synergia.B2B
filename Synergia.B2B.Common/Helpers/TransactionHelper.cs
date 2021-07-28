using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Synergia.B2B.Common.Helpers
{
    public static class TransactionHelper
    {
        public static TransactionScope CreateTransaction()
        {
            return new TransactionScope(TransactionScopeOption.Required, new TransactionOptions() { IsolationLevel = IsolationLevel.ReadUncommitted },
                TransactionScopeAsyncFlowOption.Enabled);
        }
    }
}
