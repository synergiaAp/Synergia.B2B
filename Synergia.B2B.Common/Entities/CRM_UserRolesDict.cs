//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Jeven.CRM.Common.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class CRM_UserRolesDict
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CRM_UserRolesDict()
        {
            this.CRM_UserRoles = new HashSet<UserRole>();
        }
    
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserRole> CRM_UserRoles { get; set; }
    }
}