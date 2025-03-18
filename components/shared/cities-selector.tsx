// // components/CityComboBox.tsx

// import { ComboBoxResponsive } from '@/components/shared/combobox';
// import { citiesData } from '@/lib/constants/cities-data';
// import React, { memo, useMemo } from 'react';

// type CityComboBoxProps = {
//   selectedCountry: string | number;
//   selectedCity: string | number;
//   title: string;
//   onChange: (city: string, latitude: number, longitude: number) => void;
// };

// const CityComboBox: React.FC<CityComboBoxProps> = ({ selectedCountry, selectedCity, title, onChange }) => {
//   const memoizedCityData = useMemo(() => {
//     return selectedCountry
//       ? citiesData?.[String(selectedCountry) as keyof typeof citiesData]?.map((item) => ({
//           value: item.id,
//           label: item.name,
//           longitude: item.longitude,
//           latitude: item.latitude,
//         })) || []
//       : [];
//   }, [selectedCountry]);

//   return (
//     <ComboBoxResponsive
//       triggerProps={{
//         variant: 'outline',
//         className: 'col-span-2 justify-between w-full overflow-hidden',
//         disabled: !selectedCountry,
//       }}
//       value={Number(selectedCity)}
//       title={title}
//       data={memoizedCityData}
//       handleChange={(e) => {
//         const selectedCity = memoizedCityData.find((city) => city.value === e);
//         if (selectedCity) {
//           onChange(String(e), Number(selectedCity.latitude), Number(selectedCity.longitude));
//         }
//       }}
//     />
//   );
// };

// export default memo(CityComboBox);
