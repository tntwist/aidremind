using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// Task activity
    /// </summary>
    public class TaskActivity
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int TaskActivityId { get; set; }

        public int TaskId { get; set; }

        /// <summary>
        /// Parent Task identifier
        /// </summary>
        [ForeignKey(nameof(TaskId))]
        public Task Task { get; set; }

        public int UserId { get; set; }

        /// <summary>
        /// User identifier
        /// </summary>
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        /// <summary>
        /// When to do
        /// </summary>
        public DateTime DueToDate { get; set; }

        /// <summary>
        /// When done - null if not done
        /// </summary>
        public DateTime? DoneDate { get; set; }
    }
}
