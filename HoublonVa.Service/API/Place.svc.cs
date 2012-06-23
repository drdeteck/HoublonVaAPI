using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using HoublonVa.Business.Managers;

namespace HoublonVa.Service.API
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Place" in code, svc and config file together.
    public class Place : IPlace
    {
        private BaseManager _manager = null;

        public Place()
        {
            this._manager = new PlaceManager();
        }

        public string XmlData(string id)
        {
            return string.Concat("xml ", id, " ", this._manager.IsAlive.ToString());
        }

        public string JsonData(string id)
        {
            return "json  " + id;
        }
    }
}
