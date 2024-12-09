import React from 'react';
import { WeatherWrapper } from './WeatherWrapper';
import { useAppSelector } from '../../../shared/hooks';

export const Weather = React.memo(() => {
  const { isMobile } = useAppSelector((state) => state.mobile);
  const { savedLocations } = useAppSelector((state) => state.location);

  return (
    <div
      className={
        isMobile
          ? 'flex flex-col gap-2 overflow-x-hidden p-5'
          : 'flex flex-wrap gap-5 p-5'
      }
    >
      {savedLocations.map((item) => (
        <WeatherWrapper key={item.id} location={item} />
      ))}
    </div>
  );
});
