using Microsoft.EntityFrameworkCore.Migrations;

namespace EFRepo.Migrations
{
    public partial class migration_v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountOfSubscribers",
                table: "Tasks",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOfSubscribers",
                table: "Tasks");
        }
    }
}
