using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Company Company { get; set; }
        }

        // @todo - create validator

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies.FindAsync(request.Company.Id);

                if (company == null) return null;

                // _mapper.Map(request.Company, company); // the problem with using this here is that if the whole company is not passed in then not passed in fields will be overwritten with null
                company.Name = request.Company.Name ?? company.Name;

                _context.Entry(company).State = EntityState.Modified; // this line changes the behavior to say changes saved successfully even when original object is the same

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update company");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}