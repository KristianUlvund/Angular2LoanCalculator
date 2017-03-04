using System.ComponentModel.DataAnnotations;

namespace Angular2Individuell.Models
{
    public class DomeneConsumer
    {
        [Required]
        [RegularExpression("[0-9]{11}")]
        public string personalIdentification { get; set; }
        [Required]
        [RegularExpression("[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")]
        public string email { get; set; }
        [Required]
        [RegularExpression("[0-9]{8}")]
        public string phonenumber { get; set; }
        [Required]
        [RegularExpression("[0-9]{1,2}")]
        public int duration { get; set; }
        [Required]
        [RegularExpression("[0-9]{1,9}")] 
        public double amount { get; set; }
    }
}