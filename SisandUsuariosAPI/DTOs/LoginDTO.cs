using System.ComponentModel.DataAnnotations.Schema;

namespace SisandUsuariosAPI.DTOs
{
    public class LoginDTO
    {
        [Column("EMAIL")]
        public string Email { get; set; } = string.Empty;
        [Column("SENHA")]
        public string Senha { get; set; } = string.Empty;
    }
}
