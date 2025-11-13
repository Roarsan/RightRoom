module.exports = {
  users: [
    {
      username: "JohnLandlord",
      email: "john@example.com",
      password: "hashedpassword1",
      role: "landlord",
    },
    {
      username: "AliceTenant",
      email: "alice@example.com",
      password: "hashedpassword2",
      role: "tenant",
    },
    {
      username: "BobTenant",
      email: "bob@example.com",
      password: "hashedpassword3",
      role: "tenant",
    },
  ],

  listings: [
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      title: "Modern Studio Apartment",
      address: "12 Oxford Road, Oxford",
      description: "Bright studio close to universities and city centre.",
      price: 950,
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Luxury 2 Bedroom Flat",
      address: "89 Kensington High Street, London",
      description: "Spacious flat with excellent transport links.",
      price: 2450,
    },
    {
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      title: "Cozy 1 Bed Flat",
      address: "102 Broad Street, Birmingham",
      description: "Perfect for young professionals.",
      price: 850,
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      title: "Family Home With Garden",
      address: "22 Richmond Avenue, Leeds",
      description: "3 bed home ideal for families. Large garden.",
      price: 1200,
    },
    {
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      title: "Modern En-suite Room",
      address: "5 West Street, Manchester",
      description: "En-suite double room in shared flat, bills included.",
      price: 680,
    },
    {
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      title: "Bright Loft Apartment",
      address: "21 George Square, Edinburgh",
      description: "Stylish loft near historic centre.",
      price: 1400,
    },
    {
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      title: "Luxury Penthouse Suite",
      address: "1 Canary Wharf, London",
      description: "Premium penthouse with river views.",
      price: 3500,
    }
  ],

  reviews: [
    {
      rating: 5,
      comment: "John was a great landlord! Very responsive.",
    },
    {
      rating: 4,
      comment: "Nice flat, good communication overall.",
    },
  ],
};
