using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using HoublonVa.Business.Managers;
using System.Configuration;
using HoublonVa.Business.Models.Entities;
using Newtonsoft.Json;

namespace HoublonVa.Service.API
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Place" in code, svc and config file together.
    public class Place : IPlace
    {
        private PlaceManager _manager = null;

        public Place()
        {
            this._manager = new PlaceManager(ConfigurationManager.ConnectionStrings["Entities"].ConnectionString);
        }



        public string XmlData(string id)
        {
            return string.Concat("xml ", id, " ", this._manager.IsAlive.ToString());
        }

        public string JsonData(string id)
        {
            return "json  " + id;
        }

        public string GetNearestPlace(string longitude, string latitude, string quantity)
        {
            // Parameters Parsing
            LocationEntity location = new LocationEntity();
            decimal longitudeBuffer;
            decimal latitudeBuffer;

            if (decimal.TryParse(longitude, out longitudeBuffer) && decimal.TryParse(latitude, out latitudeBuffer))
            {
                location.Longitude = longitudeBuffer;
                location.Latitude = latitudeBuffer;
            }

            int quantityBuffer;
            if (!int.TryParse(quantity, out quantityBuffer))
            {
                quantityBuffer = 10;
            }

            // Call to the Database
            return JsonConvert.SerializeObject(this._manager.GetNearestPlaces(location, quantityBuffer));
        }
    }
}
