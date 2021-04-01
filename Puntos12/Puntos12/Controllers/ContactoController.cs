//using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
//using MimeKit;
using Puntos12.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Puntos12.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactoController : ControllerBase
    {
        // GET: api/<ContactoController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<ContactoController>
        [HttpPost]
        public IActionResult Post([FromBody] Contacto contact)
        {
            var guest = new Contacto
            {
                Email = contact.Email,
                Message = contact.Message,
                Name = contact.Name,
                Subject = contact.Subject
            };
            Console.WriteLine(guest.Name);


            //smtpClient.Send("prueba.rafael.ospina@gmail.com", guest.Email, guest.Subject, guest.Message);

            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.From = new MailAddress(guest.Email, guest.Name);
            mail.To.Add(new MailAddress(guest.Email, guest.Name));
            mail.Subject = guest.Subject;
            mail.Body = guest.Message;

            using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new NetworkCredential("prueba.rafael.ospina@gmail.com", "secreto01");
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            return Ok();
        }

    }
}
