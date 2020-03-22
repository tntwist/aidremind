using EFRepo.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EFRepo
{
    /// <summary>
    /// Object to seed mock data into the database
    /// </summary>
    public class DataSeed
    {
        #region private member
        private readonly AidRemindDbContext _ctx;
        #endregion

        #region private functions
        internal void SeedPointOfOperations()
        {
            var poi = new PointOfOperation
            {
                PointOfOperationId = 0,
                Name = "Test Org",
                City = "Springfield",
                Zipcode = "01020",
                Street = "Second Street",
                Country = "USA",
            };

            _ctx.PointOfOperations.Add(poi);
        }

        internal void SeedCategories()
        {
            var cats = new List<Category> 
            {  
                new Category
                {
                    CategoryId = 1,
                    PointOfOperationId = 1,
                    Name = "Tent 1",
                    Description = "Test tent we build up in a hurry",
                    ParentCategoryId = 0,
                    Height = 0,
                },
                new Category
                {
                    CategoryId = 2,
                    PointOfOperationId = 1,
                    Name = "Bed 1",
                    Description = "Bed number one",
                    ParentCategoryId = 1,
                    Height = 1,
                },
                new Category
                {
                    CategoryId = 3,
                    PointOfOperationId = 1,
                    Name = "Bed 2",
                    Description = "Bed number two",
                    ParentCategoryId = 1,
                    Height = 1,
                },
            };

            foreach (var item in cats)
            {
                _ctx.Categories.Add(item);
            }
        }

        internal void SeedTasks()
        {
            var task = new Task
            {
                TaskId = 0,
                Title = "Turn patient over",
                Description = "The patient needs to be turned over so that he does not lie on one side for too long",
                CategoryId = 2,
                StartDate = DateTime.Now.AddHours(-1),
                AmountOfSubscribers = 0,
                Frequency = "30 * * * *",
            };

            _ctx.Tasks.Add(task);
        }

        internal void SeedUsers()
        {
            var users = new List<User>
            {
                new User
                {
                    PointOfOperationId = 1,
                    UserId = 1,
                    Username = "Mrs. Jane Doe",
                },
                new User
                {
                    PointOfOperationId = 1,
                    UserId = 2,
                    Username = "Mr. John Doe",
                },
            };

            foreach (var item in users)
            {
                _ctx.Users.Add(item);
            }
        }

        internal void SeedSubscriptions()
        {
            var subscr = new Subscription
            {
                SubscriptionId = 1,
                TaskId = 1,
                UserId = 1,
            };

            _ctx.Subscriptions.Add(subscr);
        }

        internal void SeedTaskActivities()
        {
            var acts = new List<TaskActivity>
            {
                new TaskActivity
                {
                    TaskActivityId = 1,
                    UserId = 1,
                    TaskId = 1,
                    DueToDate = DateTime.Now.AddMinutes(-30),
                    DoneDate = DateTime.Now.AddMinutes(-29),
                },
                new TaskActivity
                {
                    TaskActivityId = 2,
                    UserId = 1,
                    TaskId = 1,
                    DueToDate = DateTime.Now,
                },
            };

            foreach (var item in acts)
            {
                _ctx.TaskActivities.Add(item);
            }
        }

        #endregion

        #region public functions
        /// <summary>
        /// Seed mock data
        /// </summary>
        public void SeedData()
        {
            _ctx.Database.Migrate();

            if (!_ctx.PointOfOperations.Any())
            {
                SeedPointOfOperations();
                _ctx.SaveChanges();
            }

            if (!_ctx.Categories.Any())
            {
                SeedCategories();
                _ctx.SaveChanges();
            }

            if (!_ctx.Tasks.Any())
            {
                SeedTasks();
                _ctx.SaveChanges();
            }

            if (!_ctx.Users.Any())
            {
                SeedUsers();
                _ctx.SaveChanges();
            }

            if (!_ctx.Subscriptions.Any())
            {
                SeedSubscriptions();
                _ctx.SaveChanges();
            }

            if (!_ctx.TaskActivities.Any())
            {
                SeedTaskActivities();
                _ctx.SaveChanges();
            }
        }
        #endregion

        #region ctor
        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="ctx"></param>
        public DataSeed(AidRemindDbContext ctx) => _ctx = ctx;
        #endregion
    }
}
