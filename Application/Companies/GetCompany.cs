using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class GetCompany
    {
        public class Query : IRequest<Result<CompanyDto>>
        {
            public Guid Id { get; set; }
        }

        // @todo - create validator

        public class Handler : IRequestHandler<Query, Result<CompanyDto>>
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
            public async Task<Result<CompanyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                // if (!company) return Result<Unit>.Failure("Failed to create company");

                return Result<CompanyDto>.Success(company);
            }
        }
    }
}