namespace ClerkApi.Dtos
{
    public class SubscriptionCreationDto
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public string Token { get; set; }
    }
}
