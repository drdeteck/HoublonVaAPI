using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using Service.Model;

namespace Service.API
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Place" in code, svc and config file together.
    public class Place : IPlace
    {
        public string XmlData(string id)
        {
            var a = new Entities();
            Test b = a.Tests.FirstOrDefault();
            return string.Concat("xml ", id, " ", b.Name);
        }

        public string JsonData(string id)
        {
            return "json  " + id;
        }
    }
}
