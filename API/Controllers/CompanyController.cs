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
    [Route("api/company")]
    public class CompanyController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateCompany(Company company)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Company = company }));
        }

        [AllowAnonymous]
        [HttpGet("{id}")] // @route api/company/:id
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetCompany.Query { Id = id }));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(Guid id, Company company)
        {
            company.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Company = company }));
        }

    }
}