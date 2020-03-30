using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFRepo;
using EFRepo.Entities;
using Quartz;

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

        // GET: api/UpcomingTaskActivities?userId=50
        [HttpGet("Upcoming")]
        public async Task<ActionResult<IEnumerable<TaskActivity>>> GetUpcomingTaskActivities([FromQuery] int userId)
        {
            if (userId < 0) return BadRequest();

            var subscriptions = await _context.Subscriptions
                .Include(s => s.Task)
                .Where(s => s.UserId == userId)
                .ToListAsync();

            var tasks = subscriptions.Select(s => s.Task).ToList();

            var taskActivities = new List<TaskActivity>();

            foreach (var task in tasks)
            {
                var expression = new CronExpression(task.Frequency + " ?");
                var currentDate = DateTime.UtcNow;

                var tomorrow = DateTime.UtcNow.AddDays(1).Date;

                while (currentDate < tomorrow)
                {
                    var nextTime = expression.GetTimeAfter(currentDate);
                    if (!nextTime.HasValue) 
                    {
                        break;
                    }

                    var taskActivity = new TaskActivity
                    {
                        DueToDate = nextTime.Value.DateTime,
                        Task = task,
                        TaskId = task.TaskId                        
                    };

                    taskActivities.Add(taskActivity);

                    currentDate = nextTime.Value.DateTime;
                }
            }

            return taskActivities;
        }

        // GET: api/TaskActivities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskActivity>> GetTaskActivity(int id)
        {
            var taskActivity = await _context.TaskActivities
                .Include(t => t.Task)
                .SingleOrDefaultAsync(t => t.TaskActivityId == id);

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
