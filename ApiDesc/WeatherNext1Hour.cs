﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherCheckerApi
{
    /// <summary>Class used to dekonstruct the API</summary>
    public class WeatherNext1Hour
    {
        public WeatherSummary Summary { get; set; }

        public WeatherNextHourDetail Details { get; set; }


    }
}
