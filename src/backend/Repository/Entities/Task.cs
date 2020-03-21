using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFRepo.Entities
{
    /// <summary>
    /// Task
    /// </summary>
    public class Task
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int TaskId { get; set; }

        public int CategoryId { get; set; }

        /// <summary>
        /// Parent category identifier
        /// </summary>
        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }

        /// <summary>
        /// Point of operation identifier
        /// </summary>
        //public PointOfOperation PointOfOperation { get; set; } // does not make sense because this comes from category

        /// <summary>
        /// Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Datetime when to start
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Datetime when to end
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// String in form of NCRONTAB Expression
        /// see here: <seealso href="https://docs.microsoft.com/de-de/azure/azure-functions/functions-bindings-timer?tabs=csharp"/>
        /// </summary>
        public string Frequency { get; set; }

        [InverseProperty(nameof(TaskActivity.Task))]
        public ICollection<TaskActivity> Activities { get; set; }

        [InverseProperty(nameof(Subscription.Task))]
        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
