﻿namespace ClothingAPIs.Models
{
	public class WishList
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public Product Product { get; set; }
		public string UserId { get; set; }
		public AppUser User { get; set; }
	}
}
