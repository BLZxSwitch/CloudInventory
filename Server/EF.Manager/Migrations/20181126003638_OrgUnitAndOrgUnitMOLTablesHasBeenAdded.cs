using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Manager.Migrations
{
    public partial class OrgUnitAndOrgUnitMOLTablesHasBeenAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrgUnit",
                schema: "md",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newsequentialid()"),
                    Name = table.Column<string>(nullable: true),
                    CurrentOrgUnitMOLId = table.Column<Guid>(nullable: false),
                    IsWarehouse = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrgUnit_Employee_CurrentOrgUnitMOLId",
                        column: x => x.CurrentOrgUnitMOLId,
                        principalSchema: "md",
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrgUnitMOL",
                schema: "md",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newsequentialid()"),
                    EmployeeId = table.Column<Guid>(nullable: false),
                    OrgUnitId = table.Column<Guid>(nullable: false),
                    DateIn = table.Column<DateTime>(nullable: false),
                    DateOut = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgUnitMOL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrgUnitMOL_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalSchema: "md",
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrgUnitMOL_OrgUnit_OrgUnitId",
                        column: x => x.OrgUnitId,
                        principalSchema: "md",
                        principalTable: "OrgUnit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_CurrentOrgUnitMOLId",
                schema: "md",
                table: "OrgUnit",
                column: "CurrentOrgUnitMOLId");

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnitMOL_EmployeeId",
                schema: "md",
                table: "OrgUnitMOL",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnitMOL_OrgUnitId",
                schema: "md",
                table: "OrgUnitMOL",
                column: "OrgUnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrgUnitMOL",
                schema: "md");

            migrationBuilder.DropTable(
                name: "OrgUnit",
                schema: "md");
        }
    }
}
