using Angular2Individuell.Models;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Angular2Individuell.Controllers
{
    public class LoanController : ApiController
    {
        DB db = new DB();

        /**
         * Henter og lager et JSON objekt av alle registrerte lån.
         */
        public HttpResponseMessage Get()
        {
            List<DomeneConsumer> allConsumers = db.allConsumers();

            var serializeObject = new JavaScriptSerializer();
            string jsonObject = serializeObject.Serialize(allConsumers);

            return new HttpResponseMessage()
            {
                Content = new StringContent(jsonObject, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }


        /**
         * Registrerer et nytt lån.
         * 
         * Gir ulike tilbakemeldinger avhengig av om registreringen er godkjent eller ikke.
         */
        [HttpPost]
        public HttpResponseMessage Post([FromBody]DomeneConsumer inInformation)
        {
            if (ModelState.IsValid)
            {
                bool success = db.createLoan(inInformation);
                if (success)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK,
                        ReasonPhrase = "Søknad om forbrukslån er sendt inn til vurdering. Svar på søknaden kan ta 1 til 2 virkedager."
                    };
                }
                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.NotAcceptable,
                        ReasonPhrase = "Du har allerede søkt om forbrukslån hos oss!"
                    };
                }
            }
            else
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    ReasonPhrase = "Det oppstod en feil under lagring av data, Vennligst prøv igjen."
                };
            }
        }
    }
}
