using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using Core.Model;

namespace Core.Persistance
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
    }
}
