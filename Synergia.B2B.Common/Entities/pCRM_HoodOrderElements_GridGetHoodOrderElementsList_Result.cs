//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Synergia.B2B.Common.Entities
{
    using System;
    
    public partial class pCRM_HoodOrderElements_GridGetHoodOrderElementsList_Result
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> CatalogPriceNet { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> PriceAfterDiscountNet { get; set; }
        public Nullable<decimal> FinalValueNet { get; set; }
        public string FileName { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<int> PersonalProductId { get; set; }
        public int Type { get; set; }
    }
}
