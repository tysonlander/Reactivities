using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Companies
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long? PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}