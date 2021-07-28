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
    
    public partial class InstallationObject
    {
        public int Id { get; set; }
        public Nullable<System.Guid> IdCRM { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Type { get; set; }
        public Nullable<System.DateTime> Cdate { get; set; }
        public Nullable<System.DateTime> SymfoniaModifiedOn { get; set; }
        public Nullable<System.DateTime> CRMModifiedOn { get; set; }
        public string Cuser { get; set; }
        public string Muser { get; set; }
        public string Surname { get; set; }
        public string FirstName { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<int> Reason { get; set; }
        public string Note { get; set; }
        public Nullable<int> KhId { get; set; }
        public string KhCode { get; set; }
        public Nullable<int> OfferCompanyId { get; set; }
        public int OwnerUserId { get; set; }
        public int CreatedByUserId { get; set; }
        public int ModifiedByUserId { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime ModifiedOn { get; set; }
    
        public virtual OfferCompany CRM_OfferCompanies { get; set; }
        public virtual User CRM_Users { get; set; }
        public virtual User CRM_Users1 { get; set; }
        public virtual User CRM_Users2 { get; set; }
    }
}
