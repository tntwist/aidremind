using EFRepo.Entities;
using Microsoft.EntityFrameworkCore;

namespace EFRepo
{
    /// <summary>
    /// Database context
    /// </summary>
    public class AidRemindDbContext : DbContext
    {
        #region Ctor
        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="options"></param>
        public AidRemindDbContext(DbContextOptions<AidRemindDbContext> options) : base(options) { }
        #endregion

        #region Properties
        /// <summary>
        /// Set of <see cref="Subscription"/>
        /// </summary>
        public DbSet<Subscription> Subscriptions { get; set; }

        /// <summary>
        /// Set of <see cref="User"/>
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Set of <see cref="PointOfOperation"/>
        /// </summary>
        public DbSet<PointOfOperation> PointOfOperations { get; set; }

        /// <summary>
        /// Set of <see cref="TaskActivities"/>
        /// </summary>
        public DbSet<TaskActivity> TaskActivities { get; set; }

        /// <summary>
        /// Set of <see cref="Task"/>
        /// </summary>
        public DbSet<Task> Tasks { get; set; }

        /// <summary>
        /// Set of <see cref="Category"/>
        /// </summary>
        public DbSet<Category> Categories { get; set; } 
        #endregion
    }
}
