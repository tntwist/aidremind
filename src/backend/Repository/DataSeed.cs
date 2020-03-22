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
                PointOfOperationId = 1,
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
            if (!_ctx.PointOfOperations.Any())
            {
                return;
            }

            var poo = _ctx.PointOfOperations.FirstOrDefault();

            var cats = new List<Category> 
            {  
                new Category
                {
                    CategoryId = 1,
                    PointOfOperationId = poo.PointOfOperationId,
                    Name = "Tent 1",
                    Description = "Test tent we build up in a hurry",
                    Height = 0,
                },
                //new Category
                //{
                //    CategoryId = 2,
                //    PointOfOperationId = poo.PointOfOperationId,
                //    Name = "Bed 1",
                //    Description = "Bed number one",
                //    ParentCategoryId = 1,
                //    Height = 1,
                //},
                //new Category
                //{
                //    CategoryId = 3,
                //    PointOfOperationId = poo.PointOfOperationId,
                //    Name = "Bed 2",
                //    Description = "Bed number two",
                //    ParentCategoryId = 1,
                //    Height = 1,
                //},
            };

            foreach (var item in cats)
            {
                _ctx.Categories.Add(item);
            }
        }

        internal void SeedTasks()
        {
            if (!_ctx.Categories.Any())
            {
                return;
            }

            var c = _ctx.Categories.FirstOrDefault();

            var task = new Task
            {
                TaskId = 0,
                Title = "Turn patient over",
                Description = "The patient needs to be turned over so that he does not lie on one side for too long",
                CategoryId = c.CategoryId,
                StartDate = DateTime.Now.AddHours(-1),
                AmountOfSubscribers = 0,
                Frequency = "30 * * * *",
            };

            _ctx.Tasks.Add(task);
        }

        internal void SeedUsers()
        {
            if (!_ctx.PointOfOperations.Any())
            {
                return;
            }

            var poo = _ctx.PointOfOperations.FirstOrDefault();

            var users = new List<User>
            {
                new User
                {
                    PointOfOperationId = poo.PointOfOperationId,
                    UserId = 1,
                    Username = "Mrs. Jane Doe",
                },
                new User
                {
                    PointOfOperationId = poo.PointOfOperationId,
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
            if(!_ctx.Tasks.Any() || !_ctx.Users.Any())
            {
                return;
            }

            var subscr = new Subscription
            {
                SubscriptionId = 1,
                TaskId = _ctx.Tasks.FirstOrDefault().TaskId,
                UserId = _ctx.Users.FirstOrDefault().UserId,
            };

            _ctx.Subscriptions.Add(subscr);
        }

        internal void SeedTaskActivities()
        {
            var task = _ctx.Tasks.FirstOrDefault();
            var user = _ctx.Users.FirstOrDefault();
            var acts = new List<TaskActivity>
            {
                new TaskActivity
                {
                    TaskActivityId = 1,
                    UserId = user.UserId,
                    TaskId = task.TaskId,
                    DueToDate = DateTime.Now.AddMinutes(-30),
                    DoneDate = DateTime.Now.AddMinutes(-29),
                },
                new TaskActivity
                {
                    TaskActivityId = 2,
                    UserId = user.UserId,
                    TaskId = task.TaskId,
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
