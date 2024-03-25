using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository;
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicoRepository.ListarTodos());
        }

        [Authorize]
        [HttpPut]
        public IActionResult AtualizarPerfil(MedicoViewModel medico)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(_medicoRepository.AtualizarPerfil(idUsuario, medico));
        }

        [HttpPost]
        public IActionResult Post(MedicoViewModel medicoViewModel)
        {
            Usuario user = new Usuario();

            user.Nome = medicoViewModel.Nome;
            user.Email = medicoViewModel.Email;
            user.TipoUsuarioId = medicoViewModel.IdTipoUsuario;
            user.Foto = medicoViewModel.Foto;
            user.Senha = medicoViewModel.Senha;

            user.Medico = new Medico();

            user.Medico.Crm = medicoViewModel.Crm;

            user.Medico.Especialidade = new Especialidade();
            
            
            
            
           _medicoRepository.Cadastrar(user);

            return Ok();
        }


    }
}
