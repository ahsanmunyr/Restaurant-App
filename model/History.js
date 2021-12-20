


const Images = [
      {image: require('../src/Assets/Images/D/food2.jpg')},
      {image: require('../src/Assets/Images/D/food3.jpg')},
      {image: require('../src/Assets/Images/D/food0.jpg')},
      {image: require('../src/Assets/Images/D/food1.jpg')},
      {image: require('../src/Assets/Images/D/food2.jpg')},
      {image: require('../src/Assets/Images/D/food3.jpg')},
      {image: require('../src/Assets/Images/D/food0.jpg')},
      {image: require('../src/Assets/Images/D/food1.jpg')},
    ];

export default history = [
        {
            id:1, 
            image: Images[0].image,
            name:"Amazing Food Place", 
            time: "9:58 am",     
            items:['2x Pizza', '1x Biryani', '6x Tikka', '1x Plate Nihari'],
            status: 0, // Complete
            price: '10$',
            reviews: 2,
            location: 'R-659 15-A/4 Bufferzone North Nazimabad, Karachi.',
            paymentMethod: 'On Delivery',
            orderID: '31'
        },
        {
            id:2, 
            image: Images[1].image,
            name:"Second Amazing Food Place", 
            time: "10:00 pm",     
            items:['2x Pizza', '1x Biryani', '6x Tikka', '1x Plate Nihari', '2x Plate Qorma', '1x Pulao', '1x Plate Nihari'],
            status: 1, // Cancel
            price: '340$',
            reviews: 2,
            location: 'R-659 15-A/4 Bufferzone North Nazimabad, Karachi.',
            paymentMethod: 'Card',
            orderID: '435'
        },
        {
            id:3, 
            image: Images[2].image,
            name:"Third Amazing Food Place", 
            time: "1:10 am",     
            items:['2x Pizza', '1x Biryani'],
            status: 2, // Order Accept 
            price: '50$',
            reviews: 2,
            location: 'R-659 15-A/4 Bufferzone North Nazimabad, Karachi.',
            paymentMethod: 'Card',
            orderID: '111'
        },
        {
            id:4, 
            image: Images[3].image,
            name:"KFC", 
            time: "9:58 am",     
            items:['2x Pizza'],
            status: 3, // Cooking
            price: '10$',
            reviews: 2,
            location: 'R-659 15-A/4 Bufferzone North Nazimabad, Karachi.',
            paymentMethod: 'On Delivery',
            orderID: '897'
        },
  ];