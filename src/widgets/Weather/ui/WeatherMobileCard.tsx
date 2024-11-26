import { observer } from 'mobx-react-lite';
import { ISavedLocation } from '../../../shared/stores/CoreStore';
import { ICurrentWeather } from '../../../entities/Weather/types';
import { SwipeDelete } from '../../../features/SwipeDelete';

interface WeatherMobileCardProps {
  location: ISavedLocation;
  data: ICurrentWeather | undefined;
  isPending: boolean;
}

export const WeatherMobileCard = observer(
  ({ location, data, isPending }: WeatherMobileCardProps) => {
    return (
      <div className="relative h-[100px] w-full">
        <SwipeDelete id={location.id}>
          <div className="w-1/4 shrink-0">
            <div className="line-clamp-2 font-semibold xs:text-sm">
              {location.name}
            </div>
            <div className="line-clamp-2 text-sm text-gray-400 xs:text-xs">
              {location.country}
            </div>
          </div>
          {isPending && (
            <div className="flex grow items-center justify-center">
              <span className="absolute inline-flex size-[40px] animate-ping rounded-full bg-sky-400 opacity-75" />
            </div>
          )}
          {!isPending && data ? (
            <>
              <div className="w-1/4 shrink-0 text-center text-3xl font-semibold xs:text-lg">
                {data.current?.temp_c}
                <span className="align-top text-sm">°C</span>
              </div>
              <div className="flex w-1/4 shrink-0 items-center justify-center">
                <img
                  loading="lazy"
                  className="size-[80px] xs:size-[60px]"
                  src={data.current?.condition?.icon || ''}
                  alt={data.current?.condition?.text || ''}
                  draggable={false}
                />
              </div>
              <div className="w-1/4 shrink-0 text-end font-semibold xs:text-sm">
                {data.current?.condition?.text}
              </div>
            </>
          ) : null}
        </SwipeDelete>
      </div>
    );
  },
);
