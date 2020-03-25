using EFRepo;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Threading;

namespace ClerkApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options => 
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            services.AddDbContext<AidRemindDbContext>(options =>
            {
                options.UseNpgsql("Host=api-db;Port=5432;Database=api;Username=api;Password=api");
            });

            services.AddOpenApiDocument(options =>
            {
                options.Title = "Aidremind.ClerkApi";
            });

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger logger)
        {
            using(var httpClient = new HttpClient()) 
            {
                bool managerApiIsUp = false;
                do
                {
                    var response = httpClient.GetAsync("http://manager-api:8081/swagger").Result;
                    managerApiIsUp = response.IsSuccessStatusCode;
                    if (!managerApiIsUp) 
                    {
                        logger.LogInformation("ManagerApi is not up yet. Sleeping 5 secs.");
                        Thread.Sleep(5000);
                    }
                } while (!managerApiIsUp);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("MyPolicy");

            app.UseOpenApi();
            app.UseSwaggerUi3();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
