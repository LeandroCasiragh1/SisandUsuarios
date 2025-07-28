using Microsoft.EntityFrameworkCore;
using SisandUsuariosAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SisandUsuariosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        [Column("USUARIOS")]
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
