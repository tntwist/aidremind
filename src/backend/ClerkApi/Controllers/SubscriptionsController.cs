using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFRepo;
using EFRepo.Entities;

namespace ClerkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController : ControllerBase
    {
        private readonly AidRemindDbContext _context;

        public SubscriptionsController(AidRemindDbContext context)
        {
            _context = context;
        }

        // GET: api/Subscriptions?userId=3&taskId=5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetSubscriptions(
            [FromQuery] int userId,
            [FromQuery] int taskId
        )
        {
            var subscriptionsQuery = _context.Subscriptions.AsQueryable();

            if (userId > 0)
            {
                subscriptionsQuery = subscriptionsQuery.Where(t => t.UserId == userId);
            }

            if (taskId > 0)
            {
                subscriptionsQuery = subscriptionsQuery.Where(t => t.TaskId == taskId);
            }

            return await subscriptionsQuery.ToListAsync();
        }

        // GET: api/Subscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }

        // PUT: api/Subscriptions/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscription(int id, Subscription subscription)
        {
            if (id != subscription.SubscriptionId)
            {
                return BadRequest();
            }

            _context.Entry(subscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Subscriptions
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Subscription>> PostSubscription(Subscription subscription)
        {
            _context.Subscriptions.Add(subscription);

            var task = await _context.Tasks.SingleAsync(t => t.TaskId == subscription.TaskId);
            task.AmountOfSubscribers += 1;

            await _context.SaveChangesAsync();

            subscription.Task = null;

            return CreatedAtAction("GetSubscription", new { id = subscription.SubscriptionId }, subscription);
        }

        // DELETE: api/Subscriptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Subscription>> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);

            var task = await _context.Tasks.FindAsync(subscription.TaskId);
            task.AmountOfSubscribers -= 1;

            await _context.SaveChangesAsync();

            return subscription;
        }

        private bool SubscriptionExists(int id)
        {
            return _context.Subscriptions.Any(e => e.SubscriptionId == id);
        }
    }
}
