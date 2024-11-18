import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import cấu hình Firebase
import React, { useEffect, useState } from "react";

const App = () => {
  // const hotelData = [
  //   // Mẫu 1 - Việt Nam, Luxury Hotel
  //   {
  //     Address: {
  //       adr: "123 Đường Trần Hưng Đạo, Quận 1",
  //       city: "Ho Chi Minh",
  //       continent: "Asia"
  //     },
  //     Cord: {
  //       latitude: "10.766454",
  //       longitude: "106.692203"
  //     },
  //     Facilities: {
  //       gym: true,
  //       internet: true,
  //       kitchen: true,
  //       outdoor: true,
  //       pool: true
  //     },
  //     Place: {
  //       description: "Looking for the perfect place to relax and unwind? This stunning Balinese villa is the ultimate tropical getaway. Located on a quiet street just minutes from the beach, this beautiful home offers everything you need for a luxurious and comfortable stay.",
  //       guest: 6,
  //       img: "https://imgur.com/J4OlidD",
  //       name: "Hoàng Gia Hotel",
  //       price: 150,
  //       rate: 4.5
  //     },
  //     Policies: {
  //       checkIn: {
  //         from: "14:00",
  //         to: "22:00"
  //       },
  //       checkInPolicies: {
  //         depositRequired: true,
  //         idRequired: true,
  //         minimumAge: 18,
  //         noPetsAllowed: true,
  //         noSmokingPolicy: true,
  //         selfCheckin: true
  //       },
  //       checkOut: "12:00"
  //     },
  //     Reviews: [
  //       {
  //         content: "Tuyệt vời! Phòng sạch sẽ và nhân viên rất thân thiện",
  //         createAte: "March 15, 2024 at 2:53:52 PM UTC+7",
  //         id: "review1",
  //         rating: 5,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Minh Anh"
  //       },
  //       {
  //         content: "Great location and amazing facilities",
  //         createAte: "February 28, 2024 at 4:30:00 PM UTC+7",
  //         id: "review2",
  //         rating: 4,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "John Smith"
  //       }
  //     ],
  //     Room: {
  //       bathrooms: {
  //         bathtub: true,
  //         hairDryer: true,
  //         quantity: 2
  //       },
  //       bedrooms: {
  //         airConditioner: true,
  //         quantity: 3,
  //         tv: true,
  //         wardrobe: true,
  //         workDesk: true
  //       },
  //       beds: {
  //         pillows: 4,
  //         quantity: 3,
  //         type: "King size"
  //       }
  //     },
  //     Services: {
  //       cleaning: {
  //         dryer: true,
  //         iron: true,
  //         washer: true
  //       }
  //     },
  //     TypeOfPlace: "Entire"
  //   },
  
  //   // Mẫu 2 - Việt Nam, Business Apartment
  //   {
  //     Address: {
  //       adr: "45 Le Thanh Ton Street, District 1",
  //       city: "Ho Chi Minh",
  //       continent: "Asia"
  //     },
  //     Cord: {
  //       latitude: "10.772461",
  //       longitude: "106.698055"
  //     },
  //     Facilities: {
  //       gym: true,
  //       internet: true,
  //       kitchen: true,
  //       outdoor: false,
  //       pool: true
  //     },
  //     Place: {
  //       description: "Modern luxury apartment in the heart of Saigon. Perfect for business travelers and tourists alike.",
  //       guest: 4,
  //       img: "https://imgur.com/J4OlidD",
  //       name: "Saigon Central Apartment",
  //       price: 120,
  //       rate: 4.8
  //     },
  //     Policies: {
  //       checkIn: {
  //         from: "15:00",
  //         to: "21:00"
  //       },
  //       checkInPolicies: {
  //         depositRequired: true,
  //         idRequired: true,
  //         minimumAge: 18,
  //         noPetsAllowed: true,
  //         noSmokingPolicy: true,
  //         selfCheckin: false
  //       },
  //       checkOut: "11:00"
  //     },
  //     Reviews: [
  //       {
  //         content: "Vị trí tuyệt vời, ngay trung tâm thành phố",
  //         createAte: "January 20, 2024 at 9:15:00 AM UTC+7",
  //         id: "review1",
  //         rating: 5,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Thu Hà"
  //       }
  //     ],
  //     Room: {
  //       bathrooms: {
  //         bathtub: false,
  //         hairDryer: true,
  //         quantity: 2
  //       },
  //       bedrooms: {
  //         airConditioner: true,
  //         quantity: 2,
  //         tv: true,
  //         wardrobe: true,
  //         workDesk: true
  //       },
  //       beds: {
  //         pillows: 4,
  //         quantity: 2,
  //         type: "Queen size"
  //       }
  //     },
  //     Services: {
  //       cleaning: {
  //         dryer: true,
  //         iron: true,
  //         washer: false
  //       }
  //     },
  //     TypeOfPlace: "Private"
  //   },
  
  //   // Mẫu 3 - Italy, Historic Apartment
  //   {
  //     Address: {
  //       adr: "Via del Corso 126",
  //       city: "Rome",
  //       continent: "Europe"
  //     },
  //     Cord: {
  //       latitude: "41.902782",
  //       longitude: "12.483313"
  //     },
  //     Facilities: {
  //       gym: false,
  //       internet: true,
  //       kitchen: true,
  //       outdoor: true,
  //       pool: false
  //     },
  //     Place: {
  //       description: "Historic apartment in the heart of Rome with stunning views of the city. Walking distance to major attractions.",
  //       guest: 3,
  //       img: "https://imgur.com/J4OlidD",
  //       name: "Roma Centro Storico",
  //       price: 200,
  //       rate: 4.7
  //     },
  //     Policies: {
  //       checkIn: {
  //         from: "14:00",
  //         to: "20:00"
  //       },
  //       checkInPolicies: {
  //         depositRequired: true,
  //         idRequired: true,
  //         minimumAge: 18,
  //         noPetsAllowed: false,
  //         noSmokingPolicy: true,
  //         selfCheckin: true
  //       },
  //       checkOut: "10:00"
  //     },
  //     Reviews: [
  //       {
  //         content: "Beautiful apartment with amazing location",
  //         createAte: "March 10, 2024 at 6:20:00 PM UTC+2",
  //         id: "review1",
  //         rating: 5,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Emma Watson"
  //       },
  //       {
  //         content: "Perfect location for sightseeing",
  //         createAte: "March 5, 2024 at 3:15:00 PM UTC+2",
  //         id: "review2",
  //         rating: 4,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Marco Rossi"
  //       }
  //     ],
  //     Room: {
  //       bathrooms: {
  //         bathtub: false,
  //         hairDryer: true,
  //         quantity: 1
  //       },
  //       bedrooms: {
  //         airConditioner: true,
  //         quantity: 1,
  //         tv: true,
  //         wardrobe: true,
  //         workDesk: false
  //       },
  //       beds: {
  //         pillows: 4,
  //         quantity: 2,
  //         type: "Queen size"
  //       }
  //     },
  //     Services: {
  //       cleaning: {
  //         dryer: false,
  //         iron: true,
  //         washer: true
  //       }
  //     },
  //     TypeOfPlace: "Entire"
  //   },
  
  //   // Mẫu 4 - Việt Nam, Backpacker Hostel
  //   {
  //     Address: {
  //       adr: "36 Nguyen Cu Trinh Street",
  //       city: "Da Nang",
  //       continent: "Asia"
  //     },
  //     Cord: {
  //       latitude: "16.054407",
  //       longitude: "108.224487"
  //     },
  //     Facilities: {
  //       gym: false,
  //       internet: true,
  //       kitchen: true,
  //       outdoor: true,
  //       pool: false
  //     },
  //     Place: {
  //       description: "Vibrant backpacker hostel near Da Nang beach. Perfect for solo travelers and social butterflies.",
  //       guest: 8,
  //       img: "https://imgur.com/J4OlidD",
  //       name: "Da Nang Backpackers Haven",
  //       price: 25,
  //       rate: 4.3
  //     },
  //     Policies: {
  //       checkIn: {
  //         from: "13:00",
  //         to: "23:00"
  //       },
  //       checkInPolicies: {
  //         depositRequired: false,
  //         idRequired: true,
  //         minimumAge: 18,
  //         noPetsAllowed: true,
  //         noSmokingPolicy: true,
  //         selfCheckin: true
  //       },
  //       checkOut: "11:00"
  //     },
  //     Reviews: [
  //       {
  //         content: "Great place to meet other travelers!",
  //         createAte: "February 25, 2024 at 8:30:00 PM UTC+7",
  //         id: "review1",
  //         rating: 4,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Tom Wilson"
  //       },
  //       {
  //         content: "Friendly staff and clean facilities",
  //         createAte: "February 20, 2024 at 10:15:00 AM UTC+7",
  //         id: "review2",
  //         rating: 5,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Sarah Kim"
  //       }
  //     ],
  //     Room: {
  //       bathrooms: {
  //         bathtub: false,
  //         hairDryer: true,
  //         quantity: 4
  //       },
  //       bedrooms: {
  //         airConditioner: true,
  //         quantity: 2,
  //         tv: false,
  //         wardrobe: true,
  //         workDesk: false
  //       },
  //       beds: {
  //         pillows: 2,
  //         quantity: 8,
  //         type: "Single"
  //       }
  //     },
  //     Services: {
  //       cleaning: {
  //         dryer: true,
  //         iron: false,
  //         washer: true
  //       }
  //     },
  //     TypeOfPlace: "Shared"
  //   },
  
  //   // Mẫu 5 - Spain, Modern Apartment
  //   {
  //     Address: {
  //       adr: "Carrer de Mallorca 401",
  //       city: "Barcelona",
  //       continent: "Europe"
  //     },
  //     Cord: {
  //       latitude: "41.403706",
  //       longitude: "2.174347"
  //     },
  //     Facilities: {
  //       gym: false,
  //       internet: true,
  //       kitchen: true,
  //       outdoor: true,
  //       pool: false
  //     },
  //     Place: {
  //       description: "Modern apartment with stunning views of Sagrada Familia. Perfect blend of comfort and location.",
  //       guest: 4,
  //       img: "https://imgur.com/J4OlidD",
  //       name: "Barcelona Sagrada View",
  //       price: 180,
  //       rate: 4.6
  //     },
  //     Policies: {
  //       checkIn: {
  //         from: "15:00",
  //         to: "21:00"
  //       },
  //       checkInPolicies: {
  //         depositRequired: true,
  //         idRequired: true,
  //         minimumAge: 18,
  //         noPetsAllowed: true,
  //         noSmokingPolicy: true,
  //         selfCheckin: true
  //       },
  //       checkOut: "11:00"
  //     },
  //     Reviews: [
  //       {
  //         content: "Amazing view and perfect location",
  //         createAte: "March 1, 2024 at 9:45:00 AM UTC+1",
  //         id: "review1",
  //         rating: 5,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Maria Garcia"
  //       },
  //       {
  //         content: "Clean and well-equipped apartment",
  //         createAte: "February 28, 2024 at 2:30:00 PM UTC+1",
  //         id: "review2",
  //         rating: 4,
  //         userAvatar: "https://imgur.com/VHbmmpv",
  //         userName: "Pierre Dubois"
  //       }
  //     ],
  //     Room: {
  //       bathrooms: {
  //         bathtub: true,
  //         hairDryer: true,
  //         quantity: 2
  //       },
  //       bedrooms: {
  //         airConditioner: true,
  //         quantity: 2,
  //         tv: true,
  //         wardrobe: true,
  //         workDesk: true
  //       },
  //       beds: {
  //         pillows: 4,
  //         quantity: 2,
  //         type: "Queen size"
  //       }
  //     },
  //     Services: {
  //       cleaning: {
  //         dryer: true,
  //         iron: true,
  //         washer: true
  //       }
  //     },
  //     TypeOfPlace: "Entire"
  //   },
  //     // Mẫu 6 - Việt Nam, Luxury Villa
  //     {
  //       Address: {
  //         adr: "15 Thảo Điền, Quận 2",
  //         city: "Ho Chi Minh",
  //         continent: "Asia"
  //       },
  //       Cord: {
  //         latitude: "10.802978",
  //         longitude: "106.738803"
  //       },
  //       Facilities: {
  //         gym: true,
  //         internet: true,
  //         kitchen: true,
  //         outdoor: true,
  //         pool: true
  //       },
  //       Place: {
  //         description: "Luxurious villa in the exclusive Thao Dien area. Private pool, garden, and full amenities for a perfect family vacation.",
  //         guest: 8,
  //         img: "https://imgur.com/J4OlidD",
  //         name: "Thao Dien River Villa",
  //         price: 300,
  //         rate: 4.9
  //       },
  //       Policies: {
  //         checkIn: {
  //           from: "14:00",
  //           to: "20:00"
  //         },
  //         checkInPolicies: {
  //           depositRequired: true,
  //           idRequired: true,
  //           minimumAge: 21,
  //           noPetsAllowed: false,
  //           noSmokingPolicy: true,
  //           selfCheckin: false
  //         },
  //         checkOut: "12:00"
  //       },
  //       Reviews: [
  //         {
  //           content: "Biệt thự tuyệt đẹp với đầy đủ tiện nghi cao cấp",
  //           createAte: "March 18, 2024 at 3:45:00 PM UTC+7",
  //           id: "review1",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Hương Trần"
  //         },
  //         {
  //           content: "Perfect for our family reunion. Amazing pool!",
  //           createAte: "March 15, 2024 at 10:20:00 AM UTC+7",
  //           id: "review2",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "David Chen"
  //         }
  //       ],
  //       Room: {
  //         bathrooms: {
  //           bathtub: true,
  //           hairDryer: true,
  //           quantity: 4
  //         },
  //         bedrooms: {
  //           airConditioner: true,
  //           quantity: 4,
  //           tv: true,
  //           wardrobe: true,
  //           workDesk: true
  //         },
  //         beds: {
  //           pillows: 6,
  //           quantity: 4,
  //           type: "King size"
  //         }
  //       },
  //       Services: {
  //         cleaning: {
  //           dryer: true,
  //           iron: true,
  //           washer: true
  //         }
  //       },
  //       TypeOfPlace: "Entire"
  //     },
    
  //     // Mẫu 7 - France, Boutique Hotel
  //     {
  //       Address: {
  //         adr: "23 Rue du Faubourg Saint-Honoré",
  //         city: "Paris",
  //         continent: "Europe"
  //       },
  //       Cord: {
  //         latitude: "48.870976",
  //         longitude: "2.318521"
  //       },
  //       Facilities: {
  //         gym: true,
  //         internet: true,
  //         kitchen: false,
  //         outdoor: true,
  //         pool: false
  //       },
  //       Place: {
  //         description: "Elegant boutique hotel in the heart of Paris's fashion district. Walking distance to major attractions and luxury shopping.",
  //         guest: 2,
  //         img: "https://imgur.com/J4OlidD",
  //         name: "Le Petit Palais Hotel",
  //         price: 280,
  //         rate: 4.7
  //       },
  //       Policies: {
  //         checkIn: {
  //           from: "15:00",
  //           to: "23:00"
  //         },
  //         checkInPolicies: {
  //           depositRequired: true,
  //           idRequired: true,
  //           minimumAge: 18,
  //           noPetsAllowed: true,
  //           noSmokingPolicy: true,
  //           selfCheckin: false
  //         },
  //         checkOut: "11:00"
  //       },
  //       Reviews: [
  //         {
  //           content: "Magnifique! Perfect Parisian experience",
  //           createAte: "March 12, 2024 at 9:30:00 PM UTC+1",
  //           id: "review1",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Sophie Laurent"
  //         },
  //         {
  //           content: "Excellent location and service",
  //           createAte: "March 8, 2024 at 4:15:00 PM UTC+1",
  //           id: "review2",
  //           rating: 4,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "James Wilson"
  //         }
  //       ],
  //       Room: {
  //         bathrooms: {
  //           bathtub: true,
  //           hairDryer: true,
  //           quantity: 1
  //         },
  //         bedrooms: {
  //           airConditioner: true,
  //           quantity: 1,
  //           tv: true,
  //           wardrobe: true,
  //           workDesk: true
  //         },
  //         beds: {
  //           pillows: 4,
  //           quantity: 1,
  //           type: "Queen size"
  //         }
  //       },
  //       Services: {
  //         cleaning: {
  //           dryer: true,
  //           iron: true,
  //           washer: true
  //         }
  //       },
  //       TypeOfPlace: "Private"
  //     },
    
  //     // Mẫu 8 - Việt Nam, Beach Resort
  //     {
  //       Address: {
  //         adr: "123 Trường Sa",
  //         city: "Nha Trang",
  //         continent: "Asia"
  //       },
  //       Cord: {
  //         latitude: "12.238791",
  //         longitude: "109.196749"
  //       },
  //       Facilities: {
  //         gym: true,
  //         internet: true,
  //         kitchen: true,
  //         outdoor: true,
  //         pool: true
  //       },
  //       Place: {
  //         description: "Beachfront resort with private beach access. Enjoy stunning ocean views and world-class amenities.",
  //         guest: 4,
  //         img: "https://imgur.com/J4OlidD",
  //         name: "Nha Trang Paradise Resort",
  //         price: 220,
  //         rate: 4.8
  //       },
  //       Policies: {
  //         checkIn: {
  //           from: "14:00",
  //           to: "22:00"
  //         },
  //         checkInPolicies: {
  //           depositRequired: true,
  //           idRequired: true,
  //           minimumAge: 18,
  //           noPetsAllowed: true,
  //           noSmokingPolicy: true,
  //           selfCheckin: false
  //         },
  //         checkOut: "12:00"
  //       },
  //       Reviews: [
  //         {
  //           content: "Kỳ nghỉ tuyệt vời với view biển đẹp",
  //           createAte: "March 20, 2024 at 11:30:00 AM UTC+7",
  //           id: "review1",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Lan Nguyễn"
  //         },
  //         {
  //           content: "Beautiful beach and excellent service",
  //           createAte: "March 18, 2024 at 2:45:00 PM UTC+7",
  //           id: "review2",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Michael Brown"
  //         }
  //       ],
  //       Room: {
  //         bathrooms: {
  //           bathtub: true,
  //           hairDryer: true,
  //           quantity: 2
  //         },
  //         bedrooms: {
  //           airConditioner: true,
  //           quantity: 2,
  //           tv: true,
  //           wardrobe: true,
  //           workDesk: true
  //         },
  //         beds: {
  //           pillows: 4,
  //           quantity: 2,
  //           type: "King size"
  //         }
  //       },
  //       Services: {
  //         cleaning: {
  //           dryer: true,
  //           iron: true,
  //           washer: true
  //         }
  //       },
  //       TypeOfPlace: "Entire"
  //     },
    
  //     // Mẫu 9 - Germany, Modern Loft
  //     {
  //       Address: {
  //         adr: "Torstraße 123",
  //         city: "Berlin",
  //         continent: "Europe"
  //       },
  //       Cord: {
  //         latitude: "52.529577",
  //         longitude: "13.401127"
  //       },
  //       Facilities: {
  //         gym: false,
  //         internet: true,
  //         kitchen: true,
  //         outdoor: true,
  //         pool: false
  //       },
  //       Place: {
  //         description: "Industrial-chic loft in trendy Mitte district. Perfect for digital nomads and art lovers.",
  //         guest: 3,
  //         img: "https://imgur.com/J4OlidD",
  //         name: "Berlin Creative Loft",
  //         price: 150,
  //         rate: 4.6
  //       },
  //       Policies: {
  //         checkIn: {
  //           from: "15:00",
  //           to: "21:00"
  //         },
  //         checkInPolicies: {
  //           depositRequired: true,
  //           idRequired: true,
  //           minimumAge: 18,
  //           noPetsAllowed: false,
  //           noSmokingPolicy: true,
  //           selfCheckin: true
  //         },
  //         checkOut: "11:00"
  //       },
  //       Reviews: [
  //         {
  //           content: "Cool space in a great location",
  //           createAte: "March 15, 2024 at 6:20:00 PM UTC+1",
  //           id: "review1",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Lisa Mueller"
  //         },
  //         {
  //           content: "Perfect for working remotely",
  //           createAte: "March 10, 2024 at 3:45:00 PM UTC+1",
  //           id: "review2",
  //           rating: 4,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Alex Johnson"
  //         }
  //       ],
  //       Room: {
  //         bathrooms: {
  //           bathtub: false,
  //           hairDryer: true,
  //           quantity: 1
  //         },
  //         bedrooms: {
  //           airConditioner: true,
  //           quantity: 1,
  //           tv: true,
  //           wardrobe: true,
  //           workDesk: true
  //         },
  //         beds: {
  //           pillows: 4,
  //           quantity: 2,
  //           type: "Queen size"
  //         }
  //       },
  //       Services: {
  //         cleaning: {
  //           dryer: true,
  //           iron: true,
  //           washer: true
  //         }
  //       },
  //       TypeOfPlace: "Entire"
  //     },
    
  //     // Mẫu 10 - Việt Nam, Mountain Retreat
  //     {
  //       Address: {
  //         adr: "28 Đường Mường Hoa",
  //         city: "Sapa",
  //         continent: "Asia"
  //       },
  //       Cord: {
  //         latitude: "22.336459",
  //         longitude: "103.844185"
  //       },
  //       Facilities: {
  //         gym: false,
  //         internet: true,
  //         kitchen: true,
  //         outdoor: true,
  //         pool: false
  //       },
  //       Place: {
  //         description: "Traditional mountain lodge with modern comforts. Breathtaking views of rice terraces and Fansipan mountain.",
  //         guest: 6,
  //         img: "https://imgur.com/J4OlidD",
  //         name: "Sapa Mountain Lodge",
  //         price: 120,
  //         rate: 4.7
  //       },
  //       Policies: {
  //         checkIn: {
  //           from: "14:00",
  //           to: "20:00"
  //         },
  //         checkInPolicies: {
  //           depositRequired: true,
  //           idRequired: true,
  //           minimumAge: 18,
  //           noPetsAllowed: true,
  //           noSmokingPolicy: true,
  //           selfCheckin: false
  //         },
  //         checkOut: "11:00"
  //       },
  //       Reviews: [
  //         {
  //           content: "Không gian yên bình, view núi tuyệt đẹp",
  //           createAte: "March 22, 2024 at 9:15:00 AM UTC+7",
  //           id: "review1",
  //           rating: 5,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Thành Phạm"
  //         },
  //         {
  //           content: "Amazing mountain views and friendly staff",
  //           createAte: "March 19, 2024 at 4:30:00 PM UTC+7",
  //           id: "review2",
  //           rating: 4,
  //           userAvatar: "https://imgur.com/VHbmmpv",
  //           userName: "Kate Anderson"
  //         }
  //       ],
  //       Room: {
  //         bathrooms: {
  //           bathtub: true,
  //           hairDryer: true,
  //           quantity: 2
  //         },
  //         bedrooms: {
  //           airConditioner: true,
  //           quantity: 3,
  //           tv: true,
  //           wardrobe: true,
  //           workDesk: false
  //         },
  //         beds: {
  //           pillows: 4,
  //           quantity: 3,
  //           type: "Double"
  //         }
  //       },
  //       Services: {
  //         cleaning: {
  //           dryer: true,
  //           iron: true,
  //           washer: true
  //         }
  //       },
  //       TypeOfPlace: "Entire"
  //     }
  // ];
  const addHotelsToFirestore = async () => {
    try {
      for (const hotel of hotelData) {
        const docRef = doc(collection(db, "Place"));
        await setDoc(docRef, hotel);
      }
      console.log("Dữ liệu đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu: ", error);
    }
  };
  useEffect(() => {
    addHotelsToFirestore();
  }, []);

  return (
    <View>
      <Text>Add Document Place</Text>
    </View>
  );
};

export default App;
