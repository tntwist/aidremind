using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EFRepo
{
    class AidRemindDbContextDesignFactory : IDesignTimeDbContextFactory<AidRemindDbContext>
    {

        public AidRemindDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AidRemindDbContext>();
            optionsBuilder.UseSqlite("Data Source=aidremind.db");

            return new AidRemindDbContext(optionsBuilder.Options);
        }
    }
}
