using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Companies
{
    public class CompanyParams : PagingParams
    {
        public string Name { get; set; }
    }
}