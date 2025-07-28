using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SisandUsuariosAPI.Data;
using SisandUsuariosAPI.Models;

namespace SisandUsuariosAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsuariosController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsuariosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/usuarios
    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var usuarios = await _context.Usuarios.ToListAsync();
        return Ok(usuarios);
    }

    // GET: api/usuarios/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Buscar(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
            return NotFound();

        return Ok(usuario);
    }

    // POST: api/usuarios
    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] Usuario usuario)
    {
        var existeEmail = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email);
        if (existeEmail)
        {
            return BadRequest(new { message = "E-mail já cadastrado." });
        }
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Buscar), new { id = usuario.Id }, usuario);
    }

    // PUT: api/usuarios/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] Usuario usuario)
    {
        if (id != usuario.Id)
            return BadRequest();

        var emailUsado = await _context.Usuarios
        .AnyAsync(u => u.Email == usuario.Email && u.Id != usuario.Id);

        if (emailUsado)
        {
            return BadRequest(new { message = "E-mail já está sendo usado por outro usuário." });
        }

        _context.Entry(usuario).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/usuarios/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Remover(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
            return NotFound();

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}