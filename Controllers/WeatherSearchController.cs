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

        // GET: <WeatherSearchController>
        [HttpGet]
        public async IAsyncEnumerable<List<WeatherCheckerApiResults>> Get()
        {

            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            Client.DefaultRequestHeaders.Add("User-Agent", "Weather check application");


            string latGrammar = 23.ToString("G", CultureInfo.InvariantCulture);
            string lonGrammar = 23.ToString("G", CultureInfo.InvariantCulture);

            using (HttpResponseMessage response = await Client.GetAsync($"https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=23&lon=23"))
            {
                try
                {
                    response.EnsureSuccessStatusCode();
                    var responsebody = JsonConvert.DeserializeObject<Feature>(await response.Content.ReadAsStringAsync());

                    foreach (WeatherTimeseries body in responsebody.Properties.TimeSeries)
                    {
                        WeatherResponse.Add(new WeatherCheckerApiResults
                        {
                            Coordinates = responsebody.Geometry.Coordinates,
                            Time = body.Time,
                            Air_temperature = body.Data.Instant.Details.Air_temperature,
                            Wind_speed = body.Data.Instant.Details.Wind_speed,
                            Wind_from_direction = body.Data.Instant.Details.Wind_from_direction

                        });
                    }
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("error: " + e);
                }




            }
            yield return WeatherResponse;
        }


        // GET <WeatherSearchController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST <WeatherSearchController>
        [HttpPost]
        public async IAsyncEnumerable<List<WeatherCheckerApiResults>> Post([FromBody] object value)
        {
            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            Client.DefaultRequestHeaders.Add("User-Agent", "Weather check application");

            var CoordinatesRequest = JsonConvert.DeserializeObject<CoordinatesReact>(value.ToString());

            using (HttpResponseMessage response = await Client.GetAsync($"https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat={CoordinatesRequest.Coordinates.lan}&lon={CoordinatesRequest.Coordinates.lon}"))
            {
                try
                {
                    response.EnsureSuccessStatusCode();
                    var responsebody = JsonConvert.DeserializeObject<Feature>(await response.Content.ReadAsStringAsync());

                    foreach (WeatherTimeseries body in responsebody.Properties.TimeSeries)
                    {
                        WeatherResponse.Add(new WeatherCheckerApiResults
                        {
                            Coordinates = responsebody.Geometry.Coordinates,
                            Time = body.Time,
                            Air_temperature = body.Data.Instant.Details.Air_temperature,
                            Wind_speed = body.Data.Instant.Details.Wind_speed,
                            Wind_from_direction = body.Data.Instant.Details.Wind_from_direction

                        });
                    }
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("error: " + e);
                }




            }
            yield return WeatherResponse;



        }

        // PUT <WeatherSearchController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE <WeatherSearchController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
