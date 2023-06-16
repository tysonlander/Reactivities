using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long? PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}