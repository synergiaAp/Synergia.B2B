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
    
    public partial class CampaignFile
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public int FileId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedByUserId { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public int ModifiedByUserId { get; set; }
    
        public virtual Campaign CRM_Campaigns { get; set; }
        public virtual File CRM_Files { get; set; }
        public virtual User CRM_Users { get; set; }
        public virtual User CRM_Users1 { get; set; }
    }
}
