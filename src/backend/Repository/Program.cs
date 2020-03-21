using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace EFRepo
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<AidRemindDbContext>(options =>
            {
                options.UseSqlite("Data Source=C:\\aidRemindDbContext.db;Version=3;UseUTF16Encoding=True");
            });

            using(var sp = serviceCollection.BuildServiceProvider())
            using(var scope = sp.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AidRemindDbContext>();
                //dbContext.Database.Migrate();
            }
        }
    }
}
