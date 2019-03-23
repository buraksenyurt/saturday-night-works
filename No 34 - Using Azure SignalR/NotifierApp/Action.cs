namespace Basketcini.Function
{
    /*
        Table Storage'e yazılacak veri içeriğini temsil eden sınıftır.
        Azure Table Storage'a aşağıdaki özellikler birer alan olarak açılacaktır.
     */
    public class Action
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public string Player { get; set; }
        public string Summary { get; set; }
    }
}