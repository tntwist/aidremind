using ClerkApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ClerkApi.Controllers
{
    public class UsersController : AbstractBaseController
    {
        public UsersController()
        {
        }

        [HttpPost]
        public async Task<int> Create([FromBody]UserCreationDto user) 
        {
            return 1;
        }
    }
}
