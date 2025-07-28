using Microsoft.AspNetCore.Mvc;
using SisandUsuariosAPI.Data;
using SisandUsuariosAPI.DTOs;
using SisandUsuariosAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace SisandUsuariosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == login.Email);

            if (usuario == null || usuario.SenhaHash != login.Senha)
            {
                return Unauthorized(new { message = "Credenciais inválidas" });
            }

            var token = TokenService.GerarToken(usuario.Email);

            return Ok(new { token });
        }
    }
}
