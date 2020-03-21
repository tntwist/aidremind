using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFRepo;
using EFRepo.Entities;

namespace ManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointOfOperationsController : ControllerBase
    {
        private readonly AidRemindDbContext _context;

        public PointOfOperationsController(AidRemindDbContext context)
        {
            _context = context;
        }

        // GET: api/PointOfOperations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PointOfOperation>>> GetPointOfOperations()
        {
            return await _context.PointOfOperations.ToListAsync();
        }

        // GET: api/PointOfOperations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PointOfOperation>> GetPointOfOperation(int id)
        {
            var pointOfOperation = await _context.PointOfOperations.FindAsync(id);

            if (pointOfOperation == null)
            {
                return NotFound();
            }

            return pointOfOperation;
        }

        // PUT: api/PointOfOperations/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPointOfOperation(int id, PointOfOperation pointOfOperation)
        {
            if (id != pointOfOperation.PointOfOperationId)
            {
                return BadRequest();
            }

            _context.Entry(pointOfOperation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PointOfOperationExists(id))
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

        // POST: api/PointOfOperations
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PointOfOperation>> PostPointOfOperation(PointOfOperation pointOfOperation)
        {
            _context.PointOfOperations.Add(pointOfOperation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPointOfOperation", new { id = pointOfOperation.PointOfOperationId }, pointOfOperation);
        }

        // DELETE: api/PointOfOperations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PointOfOperation>> DeletePointOfOperation(int id)
        {
            var pointOfOperation = await _context.PointOfOperations.FindAsync(id);
            if (pointOfOperation == null)
            {
                return NotFound();
            }

            _context.PointOfOperations.Remove(pointOfOperation);
            await _context.SaveChangesAsync();

            return pointOfOperation;
        }

        private bool PointOfOperationExists(int id)
        {
            return _context.PointOfOperations.Any(e => e.PointOfOperationId == id);
        }
    }
}
