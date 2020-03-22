using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EFRepo
{
    class AidRemindDbContextDesignFactory : IDesignTimeDbContextFactory<AidRemindDbContext>
    {

        public AidRemindDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AidRemindDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost:5433;Database=aidremind_db;Username=api;Password=api");

            return new AidRemindDbContext(optionsBuilder.Options);
        }
    }
}
