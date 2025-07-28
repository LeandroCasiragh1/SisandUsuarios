using System.ComponentModel.DataAnnotations.Schema;

namespace SisandUsuariosAPI.Models
{
    [Table("USUARIOS")]
    public class Usuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; } = string.Empty;
        [Column("EMAIL")]
        public string Email { get; set; } = string.Empty;
        [Column("SENHAHASH")]
        public string SenhaHash { get; set; } = string.Empty;
    }
}
