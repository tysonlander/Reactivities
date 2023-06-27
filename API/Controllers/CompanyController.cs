using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Companies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.Companies.GetCompany;

namespace API.Controllers
{
    [ApiController]
    [Route("api/companies")]
    public class CompanyController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateCompany(Company company)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Company = company }));
        }

        [AllowAnonymous]
        [HttpGet("{id}")] // @route api/companies/:id
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetCompany.Query { Id = id }));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]  // @route api/companies
        public async Task<IActionResult> UpdateCompany(Guid id, Company company)
        {
            company.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Company = company }));
        }

        [AllowAnonymous]
        [HttpGet] // @route api/companies
        public async Task<IActionResult> GetCompanies([FromQuery] CompanyParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListCompany.Query { Params = param }));
        }
        
        


    }
}