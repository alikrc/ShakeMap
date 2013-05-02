using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShakeMap.Models
{
    public class EarthquakeModel
    {
        public string type { get; set; }
        public Metadata metadata { get; set; }
        public List<Feature> features { get; set; }

        public class Metadata
        {
            public long generated { get; set; }
            public string url { get; set; }
            public string title { get; set; }
            public string subTitle { get; set; }
            public int cacheMaxAge { get; set; }
        }

        public class Feature
        {
            public string type { get; set; }
            public Properties properties { get; set; }
            public Geometry geometry { get; set; }
            public string id { get; set; }

            public class Properties
            {
                public double mag { get; set; }
                public string place { get; set; }
                public string time { get; set; }
                public string updated { get; set; }
                public int tz { get; set; }
                public string url { get; set; }
                public int felt { get; set; }
                public double cdi { get; set; }
                public double mmi { get; set; }
                public string alert { get; set; }
                public string status { get; set; }
                public string tsunami { get; set; }
                public string sig { get; set; }
                public string net { get; set; }
                public string code { get; set; }
                public string ids { get; set; }
                public string sources { get; set; }
                public string types { get; set; }
                public string nst { get; set; }
                public string dmin { get; set; }
                public string rms { get; set; }
                public string gap { get; set; }
                public string magnitudeType { get; set; }
            }

            public class Geometry
            {
                public string type { get; set; }
                public List<double> coordinates { get; set; }
            }
        }
    }
}