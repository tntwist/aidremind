using ClerkApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ClerkApi.Controllers
{
    public class SubscriptionsController : AbstractBaseController
    {
        public SubscriptionsController()
        {
        }

        [HttpGet("{id}")]
        public async Task Get(int id) 
        {
        }

        [HttpGet("/GetForUser/{id}")]
        public async Task GetForUser(int userId)
        {
        }

        [HttpPost]
        public async Task<int> Create([FromBody]SubscriptionCreationDto subscription)
        {
            return 1;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id) 
        {
        }
    }
}
