using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// Subscription
    /// </summary>
    public class Subscription
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int SubscriptionId { get; set; }

        public int UserId { get; set; }

        /// <summary>
        /// User identifier
        /// </summary>
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public int TaskId { get; set; }

        /// <summary>
        /// Task identifier
        /// </summary>
        [ForeignKey(nameof(TaskId))]
        public Task Task { get; set; }

        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }
    }
}
