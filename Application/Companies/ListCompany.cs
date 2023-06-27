using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class ListCompany
    {
        public class Query : IRequest<Result<PagedList<CompanyDto>>>
        {
            public CompanyParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CompanyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<PagedList<CompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Companies
                    .OrderBy(d => d.Name)
                    .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                Console.WriteLine("request.Params.Name: " + request.Params.Name);
                if (request.Params.Name != null)
                {
                    query = query.Where(x => x.Name.ToLower().Contains(request.Params.Name.ToLower()));
                }

                return Result<PagedList<CompanyDto>>.Success(
                    await PagedList<CompanyDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize));
            }
        }
    }
}