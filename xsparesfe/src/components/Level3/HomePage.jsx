import React from 'react'
import CarModelSelection from '../Level2/CarModelSelection'

function HomePage() {
    const carBrand = [ //Dummy data
        { option: "Maruti Suzuki" },
        { option: "Hyundai" },
        { option: "Tata Motors" },
        { option: "Mahindra" },
        { option: "Honda" },
      ];
      const carModel = [ //Dummy data
        { option: "Swift" },
        { option: "Creta" },
        { option: "Nexon" },
        { option: "XUV700" },
        { option: "City" },
      ];
    
      const carYears = [ //Dummy data
        { option: "2023" },
        { option: "2023" },
        { option: "2023" },
        { option: "2023" },
        { option: "2023" },
      ];
  return (
    <div>
      <CarModelSelection data1={carBrand} data2={carModel} data3={carYears}/>
    </div>
  )
}

export default HomePage
