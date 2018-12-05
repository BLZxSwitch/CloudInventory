using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EF.Manager.Migrations
{
    public partial class AddCompanyAndTenantFieldsToOrgUnitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                schema: "md",
                table: "OrgUnit",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "md",
                table: "OrgUnit",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_CompanyId",
                schema: "md",
                table: "OrgUnit",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_TenantId",
                schema: "md",
                table: "OrgUnit",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrgUnit_Company_CompanyId",
                schema: "md",
                table: "OrgUnit",
                column: "CompanyId",
                principalSchema: "md",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrgUnit_Tenant_TenantId",
                schema: "md",
                table: "OrgUnit",
                column: "TenantId",
                principalSchema: "sec",
                principalTable: "Tenant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrgUnit_Company_CompanyId",
                schema: "md",
                table: "OrgUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_OrgUnit_Tenant_TenantId",
                schema: "md",
                table: "OrgUnit");

            migrationBuilder.DropIndex(
                name: "IX_OrgUnit_CompanyId",
                schema: "md",
                table: "OrgUnit");

            migrationBuilder.DropIndex(
                name: "IX_OrgUnit_TenantId",
                schema: "md",
                table: "OrgUnit");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                schema: "md",
                table: "OrgUnit");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "md",
                table: "OrgUnit");
        }
    }
}
