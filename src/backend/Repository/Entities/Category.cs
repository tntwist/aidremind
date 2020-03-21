using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// Category
    /// </summary>
    public class Category
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int CategoryId { get; set; }

        public int PointOfOperationId { get; set; }

        /// <summary>
        /// Point of operation identifier
        /// </summary>
        [ForeignKey(nameof(PointOfOperationId))]
        public PointOfOperation PointOfOperation { get; set; }

        public int? ParentCategoryId { get; set; }

        /// <summary>
        /// Parent category identifier
        /// </summary>
        [ForeignKey(nameof(ParentCategoryId))]
        public Category ParentCategory { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Decription
        /// </summary>
        public string Description { get; set; }

        [InverseProperty(nameof(Task.Category))]
        public ICollection<Task> Tasks { get; set; }

        /// <summary>
        /// The height of this item inside the tree of categories
        /// </summary>
        public int Height { get; set; }
    }
}
