using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using ShakeMap.Models;

namespace ShakeMap.Controllers
{
    public class HomeController : Controller
    {
        public EarthquakeModel GetLatestShakes()
        {
            WebRequest request = System.Net.WebRequest.Create(@"http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/significant_week.geojson");
            WebResponse response = request.GetResponse();
            Stream contentStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(contentStream);
            string contentString = reader.ReadToEnd();

            var c = JsonConvert.DeserializeObject<EarthquakeModel>(contentString);

            //ViewBag.Message = c.place;

            response.Close();
            reader.Close();

            return c;
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
