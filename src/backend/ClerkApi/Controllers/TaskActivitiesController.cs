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
    public class TaskActivitiesController : ControllerBase
    {
        private readonly AidRemindDbContext _context;

        public TaskActivitiesController(AidRemindDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskActivities?userId=50
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskActivity>>> GetTaskActivities([FromQuery] int userId)
        {
            var taskActivitiesQuery =  _context.TaskActivities.AsQueryable();

            if(userId > 0) 
            {
                taskActivitiesQuery = taskActivitiesQuery.Where(t => t.UserId == userId);
            }

            return await taskActivitiesQuery.ToListAsync();
        }

        // GET: api/TaskActivities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskActivity>> GetTaskActivity(int id)
        {
            var taskActivity = await _context.TaskActivities.FindAsync(id);

            if (taskActivity == null)
            {
                return NotFound();
            }

            return taskActivity;
        }

        // PUT: api/TaskActivities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskActivity(int id, TaskActivity taskActivity)
        {
            if (id != taskActivity.TaskActivityId)
            {
                return BadRequest();
            }

            _context.Entry(taskActivity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskActivityExists(id))
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

        // POST: api/TaskActivities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskActivity>> PostTaskActivity(TaskActivity taskActivity)
        {
            _context.TaskActivities.Add(taskActivity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskActivity", new { id = taskActivity.TaskActivityId }, taskActivity);
        }

        // DELETE: api/TaskActivities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskActivity>> DeleteTaskActivity(int id)
        {
            var taskActivity = await _context.TaskActivities.FindAsync(id);
            if (taskActivity == null)
            {
                return NotFound();
            }

            _context.TaskActivities.Remove(taskActivity);
            await _context.SaveChangesAsync();

            return taskActivity;
        }

        private bool TaskActivityExists(int id)
        {
            return _context.TaskActivities.Any(e => e.TaskActivityId == id);
        }
    }
}
