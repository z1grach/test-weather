import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {
  deleteSavedLocation,
  ISavedLocation,
} from '../../../shared/stores/locationSlice';
import { ICurrentWeather } from '../../../entities/Weather/types';
import { useAppDispatch } from '../../../shared/hooks';

interface WeatherCardProps {
  location: ISavedLocation;
  data: ICurrentWeather | undefined;
  isPending: boolean;
}

export const WeatherCard = React.memo(
  ({ location, data, isPending }: WeatherCardProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
      dispatch(deleteSavedLocation(location.id));
    };

    return (
      <div className="group relative flex h-[300px] w-[200px] flex-col overflow-hidden rounded-md bg-white px-2 py-4 shadow-md hover:shadow-lg">
        <div className="absolute right-1 top-1 flex size-[20px] items-center justify-center text-[#6C6C6C] opacity-0 hover:text-black group-hover:opacity-100">
          <button type="button" onClick={handleDelete}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <div className="shrink-0 font-semibold">{location.name}</div>
        <div className="shrink-0 text-sm text-gray-400">{location.country}</div>
        {isPending && (
          <div className="flex w-full grow items-center justify-center">
            <span className="absolute inline-flex size-[40px] animate-ping rounded-full bg-sky-400 opacity-75" />
          </div>
        )}
        {!isPending && data ? (
          <div className="flex w-full grow flex-col justify-between">
            <div className="text-3xl font-semibold">
              {data.current?.temp_c}
              <span className="align-top text-sm">°C</span>
            </div>
            <div>
              <img
                loading="lazy"
                className="size-[100px]"
                src={data.current?.condition?.icon || ''}
                alt={data.current?.condition?.text || ''}
              />
            </div>
            <div className="font-semibold">{data.current?.condition?.text}</div>
          </div>
        ) : null}
      </div>
    );
  },
);
