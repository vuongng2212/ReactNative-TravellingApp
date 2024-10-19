import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import cấu hình Firebase
import React, { useEffect, useState } from "react";

const hotelData = [
  {
    Name: "Hoàng Gia Hotel",
    Address: "123 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
    Bathrooms: 2,
    Bedrooms: 3,
    Beds: 3,
    Guest: 6,
    Gym: true,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: true,
    Pool: true,
    Price: 150,
    Rate: 4.8,
  },
  {
    Name: "Green Leaf Hotel",
    Address: "456 Đường Lý Tự Trọng, Quận 3, TP. Hồ Chí Minh",
    Bathrooms: 1,
    Bedrooms: 2,
    Beds: 2,
    Guest: 4,
    Gym: false,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: false,
    Pool: true,
    Price: 120,
    Rate: 4.5,
  },
  {
    Name: "Blue Ocean Resort",
    Address: "789 Đường Võ Nguyên Giáp, Đà Nẵng",
    Bathrooms: 2,
    Bedrooms: 3,
    Beds: 4,
    Guest: 8,
    Gym: true,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: true,
    Pool: true,
    Price: 200,
    Rate: 4.9,
  },
  {
    Name: "Lavender Hotel",
    Address: "321 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    Bathrooms: 1,
    Bedrooms: 1,
    Beds: 1,
    Guest: 2,
    Gym: false,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: false,
    Outdoor: false,
    Pool: false,
    Price: 90,
    Rate: 4.0,
  },
  {
    Name: "Sunshine Apartments",
    Address: "654 Đường Bạch Đằng, Hải Châu, Đà Nẵng",
    Bathrooms: 2,
    Bedrooms: 2,
    Beds: 3,
    Guest: 5,
    Gym: true,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: true,
    Pool: true,
    Price: 180,
    Rate: 4.6,
  },
  {
    Name: "The Pearl Hotel",
    Address: "987 Đường Hạ Long, Bãi Cháy, Quảng Ninh",
    Bathrooms: 1,
    Bedrooms: 1,
    Beds: 2,
    Guest: 3,
    Gym: true,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: false,
    Outdoor: true,
    Pool: true,
    Price: 130,
    Rate: 4.3,
  },
  {
    Name: "Palm Tree Villa",
    Address: "258 Đường Trần Phú, Hội An",
    Bathrooms: 3,
    Bedrooms: 4,
    Beds: 4,
    Guest: 10,
    Gym: false,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: true,
    Pool: true,
    Price: 220,
    Rate: 4.7,
  },
  {
    Name: "Cozy Nest Hotel",
    Address: "111 Đường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh",
    Bathrooms: 1,
    Bedrooms: 1,
    Beds: 1,
    Guest: 2,
    Gym: false,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: false,
    Outdoor: false,
    Pool: false,
    Price: 80,
    Rate: 4.1,
  },
  {
    Name: "Horizon Beach Resort",
    Address: "333 Đường Trần Phú, Nha Trang",
    Bathrooms: 2,
    Bedrooms: 3,
    Beds: 3,
    Guest: 6,
    Gym: true,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: true,
    Pool: true,
    Price: 170,
    Rate: 4.5,
  },
  {
    Name: "Moonlight Hotel",
    Address: "159 Đường Ngô Quyền, Huế",
    Bathrooms: 1,
    Bedrooms: 2,
    Beds: 2,
    Guest: 4,
    Gym: false,
    Image: "https://imgur.com/J4OlidD",
    Internet: true,
    Kitchen: true,
    Outdoor: false,
    Pool: false,
    Price: 110,
    Rate: 4.2,
  },
];

const App = () => {
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

  return <></>;
};

export default App;
