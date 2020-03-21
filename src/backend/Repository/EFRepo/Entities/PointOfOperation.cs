using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// The point of operation
    /// </summary>
    public class PointOfOperation
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int PointOfOperationId { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Street
        /// </summary>
        public string Street { get; set; }

        /// <summary>
        /// City
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// Zip code
        /// </summary>
        public string Zipcode { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        public string Country { get; set; }

        [InverseProperty(nameof(User.PointOfOperation))]
        public ICollection<User> Users { get; set; }

        [InverseProperty(nameof(Category.PointOfOperation))]
        public ICollection<Category> Categories { get; set; }
    }
}
