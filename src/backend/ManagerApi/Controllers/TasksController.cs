using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFRepo;
using EFRepo.Entities;
using Amqp.Framing;
using Amqp.Handler;
using Amqp.Listener;
using Amqp.Sasl;
using Amqp.Transactions;
using Amqp.Types;
using Amqp;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AidRemindDbContext _context;

        private IConfiguration _configuration;

        public TasksController(AidRemindDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EFRepo.Entities.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EFRepo.Entities.Task>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, EFRepo.Entities.Task task)
        {
            if (id != task.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<EFRepo.Entities.Task>> PostTask(EFRepo.Entities.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var createdAtAction = CreatedAtAction("GetTask", new { id = task.TaskId }, task);

            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            var taskJSON = JsonConvert.SerializeObject(task, new JsonSerializerSettings 
            {
                ContractResolver = contractResolver,
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            });

            await SendTaskCreatedEventToAMQP(createdAtAction, taskJSON);

            return createdAtAction;
        }

        private async System.Threading.Tasks.Task SendTaskCreatedEventToAMQP(CreatedAtActionResult createdAtAction, string jsonMessage)
        {
            if (createdAtAction.StatusCode == 200
                            || createdAtAction.StatusCode == 201
                            || createdAtAction.StatusCode == 204
                            || createdAtAction.StatusCode == 205)
            {
                var amqpSettings = _configuration.GetSection("AMQPSettings");
                var addressConfiguration = amqpSettings.GetSection("Address").Value;
                var messageForTaskCreatedEventConfiguration = amqpSettings.GetSection("MessageForTaskCreatedEvent").Value;
                var senderLinkNameConfiguration = amqpSettings.GetSection("SenderLinkName").Value;
                var senderLinkAddressConfiguration = amqpSettings.GetSection("SenderLinkAddress").Value;
                
                Address address = new Address(addressConfiguration);
                Connection connection = await Connection.Factory.CreateAsync(address);
                Session session = new Session(connection);
                Message message = new Message(jsonMessage);
                var sender = new SenderLink(session, senderLinkNameConfiguration, senderLinkAddressConfiguration);
                await sender.SendAsync(message);
            }
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EFRepo.Entities.Task>> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}
