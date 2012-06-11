using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace HoublonVa.Service.API
{
    public class PlaceService : IPlaceService
    {
        public string JsonData(string id)
        {
            // Context _context = new Context();
            //var users = _context.Users;
            //users.ToString();
            return id;
        }

        public string XmlData(string id)
        {
            return "xml" + id;
        }
    }
}
