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
    
    public partial class pCRM_HoodOfferElements_GridGetHoodOfferElementsList_Result
    {
        public int Id { get; set; }
        public string HoodNr { get; set; }
        public Nullable<decimal> Price { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public Nullable<decimal> FinalPrice { get; set; }
        public Nullable<int> Quantity { get; set; }
        public string Type { get; set; }
        public string FilterType { get; set; }
        public Nullable<byte> OrderNo { get; set; }
        public Nullable<byte> HoodOfferAccessoryType { get; set; }
        public string Comments { get; set; }
        public Nullable<int> HoodOfferAccessoryHoodOfferElementId { get; set; }
    }
}
