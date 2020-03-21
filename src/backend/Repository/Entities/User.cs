using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// User
    /// </summary>
    public class User
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int UserId { get; set; }

        public int PointOfOperationId { get; set; }

        /// <summary>
        /// Point of operation
        /// </summary>
        [ForeignKey(nameof(PointOfOperationId))]
        public PointOfOperation PointOfOperation { get; set; }

        /// <summary>
        /// Username
        /// </summary>
        public string Username { get; set; }

        [InverseProperty(nameof(Subscription.User))]
        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
