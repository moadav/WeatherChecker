using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WeatherCheckerApi
{
    public class WeatherCheckerApiResults
    {
        public List<double> Coordinates { get; set; }
        public string Time { get; set; }
        public double Air_temperature { get; set; }
        public double Wind_from_direction { get; set; }
        public double Wind_speed { get; set; }
        public string Symbol_code { get; set; }
    }
}
