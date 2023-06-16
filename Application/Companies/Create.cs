using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Create
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
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Companies.Add(request.Company);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create company");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}