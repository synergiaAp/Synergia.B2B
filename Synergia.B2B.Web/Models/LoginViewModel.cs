using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Synergia.B2B.Web.Models
{
    
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Login")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; }

        [Display(Name = "Zapamiętaj użytkownika")]
        public bool RememberMe { get; set; }
    }
    
}