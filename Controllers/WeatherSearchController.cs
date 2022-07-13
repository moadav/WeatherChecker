using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WeatherChecker.ApiDesc;
using WeatherCheckerApi;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeatherChecker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WeatherSearchController : ControllerBase
    {
        HttpClient Client { get; set; } = new HttpClient();
        List<WeatherCheckerApiResults> WeatherResponse { get; set; } = new List<WeatherCheckerApiResults>();
        // GET <WeatherSearchController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // POST <WeatherSearchController>        
        /// <summary>
        /// Takes the kommune coordinates and names from geonorge.no API and then uses the name and coordinate to find Weather info for that specific place through meteorologisk institutt api
        /// </summary>
        /// <param name="value">Municipality name sendt from react-frontend</param>
        /// <returns></returns>
        [HttpPost]
        public async IAsyncEnumerable<List<WeatherCheckerApiResults>> Post([FromBody] object value)
        {
            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            Client.DefaultRequestHeaders.Add("User-Agent", "Weather check application");

            var CoordinatesRequest = JsonConvert.DeserializeObject<Coord>(value.ToString());


            HttpResponseMessage response2 = await Client.GetAsync($"https://ws.geonorge.no/kommuneinfo/v1/fylkerkommuner");
            var responsebody2 = JsonConvert.DeserializeObject<List<GetKommuneNavn>>(await response2.Content.ReadAsStringAsync());

            foreach (GetKommuneNavn cord in responsebody2)
            {
                foreach (Kommuner kom in cord.Kommuner)
                {
                    if (kom.KommunenavnNorsk.ToLower().Equals(CoordinatesRequest.Municipality.ToLower()))
                    {
                        string latGrammar = kom.PunktIOmrade.Coordinates[1].ToString("G", CultureInfo.InvariantCulture);
                        string lonGrammar = kom.PunktIOmrade.Coordinates[0].ToString("G", CultureInfo.InvariantCulture);
                        using (HttpResponseMessage response = await Client.GetAsync($"https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat={latGrammar}&lon={lonGrammar}"))
                        {
                            try
                            {
                                response.EnsureSuccessStatusCode();
                                var responsebody = JsonConvert.DeserializeObject<Feature>(await response.Content.ReadAsStringAsync());
                                for (int i = 1; i < responsebody.Properties.TimeSeries.Count; i++)
                                {

                                    WeatherResponse.Add(new WeatherCheckerApiResults
                                    {
                                        Coordinates = responsebody.Geometry.Coordinates,
                                        Time = DateTime.Parse(responsebody.Properties.TimeSeries[i].Time, CultureInfo.CurrentCulture).ToString(),
                                        Air_temperature = responsebody.Properties.TimeSeries[i].Data.Instant.Details.Air_temperature,
                                        Wind_speed = responsebody.Properties.TimeSeries[i].Data.Instant.Details.Wind_speed,
                                        Wind_from_direction = responsebody.Properties.TimeSeries[i].Data.Instant.Details.Wind_from_direction,
                                        Symbol_code = responsebody.Properties.TimeSeries[i - 1].Data.Next_1_hours?.Summary.Symbol_code


                                    });

                                }
                            }
                            catch (HttpRequestException e)
                            {
                                Console.WriteLine("error: " + e);
                            }
                        }

                        break;
                    }
                        
                }
              
            }

            

            yield return WeatherResponse;



        }

       
    }
}
