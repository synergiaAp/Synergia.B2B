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
    using System.Collections.Generic;
    
    public partial class PersonalProduct
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PersonalProduct()
        {
            this.CRM_OfferElements = new HashSet<OfferElement>();
        }
    
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Dimensions { get; set; }
        public string Terminal { get; set; }
        public Nullable<decimal> PowerGas { get; set; }
        public Nullable<decimal> PowerElectricity { get; set; }
        public decimal PriceNet { get; set; }
        public string Description { get; set; }
        public int CreatedByUserId { get; set; }
        public int ModifiedByUserId { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public int OwnerUserId { get; set; }
        public bool IsDeleted { get; set; }
        public byte HoodFinalOfferElementType { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OfferElement> CRM_OfferElements { get; set; }
        public virtual User CRM_Users { get; set; }
        public virtual User CRM_Users1 { get; set; }
        public virtual User CRM_Users2 { get; set; }
    }
}