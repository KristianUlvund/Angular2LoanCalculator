using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Angular2Individuell.Models
{
    public class Consumer
    {
        [Key]
        public string personalIdentification { get; set; }
        public string email { get; set; }
        public string phonenumber { get; set; }
        public int duration { get; set; }
        public double amount { get; set; }
    }

    public partial class ModelContext : DbContext
    {
        public ModelContext()
            : base("name=ModelContext")
        {
        }

        public DbSet<Consumer> Consumers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
