import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ILocation, LocationService } from '../../../entities/Locations';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { setCacheSearch } from '../../../shared/stores/cacheSlice';
import { addSavedLocation } from '../../../shared/stores/locationSlice';

export const SearchLocation = React.memo(() => {
  const { cacheSearch, hashSearch } = useAppSelector((state) => state.cache);
  const { isMobile } = useAppSelector((state) => state.mobile);
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<any>(null);
  const [locations, setLocations] = React.useState<ILocation[]>([]);
  const requestRef = React.useRef<any>(null);

  const onClose = () => {
    setShowInput(false);
    setSearch('');
    setLocations([]);
  };

  const handleClickClose = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      onClose();

      document.removeEventListener('click', handleClickClose);
    }
  };

  const handleFocus = () => {
    if (showInput) return;

    setShowInput(true);

    document.addEventListener('click', handleClickClose);
  };

  const handleShowInput = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showInput) return;

    setShowInput(true);
    (e.currentTarget.parentNode?.lastChild as HTMLInputElement)?.focus();

    document.addEventListener('click', handleClickClose);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSearch(value);

    if (requestRef.current) {
      requestRef.current.abort();

      requestRef.current = null;
    }

    const request = LocationService.getLocations(value);
    requestRef.current = request;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!value.trim()) {
        setLocations([]);

        return;
      }

      if (cacheSearch[value] && hashSearch[cacheSearch[value]]) {
        setLocations((hashSearch[cacheSearch[value]] as ILocation[]) || []);

        return;
      }

      request
        .fetch()
        .then(({ data }) => {
          if (data) {
            dispatch(setCacheSearch({ str: value, data }));
            setLocations(data);
          } else {
            setLocations([]);
          }
        })
        .catch((err) => {
          console.log(err);
          setLocations([]);
        });
    }, 700);
  };

  const handleSaveLocation = (id: string, name: string, country: string) => {
    dispatch(addSavedLocation({ id, name, country }));

    onClose();
  };

  return (
    <>
      <div className="relative z-20 w-full max-w-[540px]">
        {isMobile ? (
          <div
            className="flex h-[40px] w-full flex-nowrap rounded bg-[#f2f2f2]"
            ref={ref}
          >
            <div className="flex size-[40px] items-center justify-center rounded">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              maxLength={40}
              type="text"
              placeholder="Поиск"
              className="h-[40px] grow rounded bg-inherit outline-0"
              value={search}
              onChange={handleChangeSearch}
              onFocus={handleFocus}
            />
          </div>
        ) : (
          <div
            className="flex h-[40px] flex-nowrap rounded transition-all duration-300"
            style={{
              width: showInput ? '540px' : '40px',
              backgroundColor: showInput ? '#f2f2f2' : 'transparent',
            }}
            ref={ref}
          >
            <div
              className="flex size-[40px] items-center justify-center rounded hover:bg-[#f2f2f2]"
              onClick={handleShowInput}
              style={{ cursor: showInput ? 'auto' : 'pointer' }}
            >
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              maxLength={40}
              type="text"
              placeholder="Поиск"
              className="h-[40px] rounded bg-inherit outline-0 transition-all duration-300"
              style={{
                width: !showInput ? '0' : '500px',
              }}
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
        )}
        {showInput && locations?.length ? (
          <div className="absolute mt-2 w-full select-none overflow-hidden rounded-[6px] border border-gray-200 bg-white">
            <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto break-words px-[20px] py-[12px]">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex cursor-pointer flex-nowrap hover:opacity-50"
                  onClick={() =>
                    handleSaveLocation(
                      location.id,
                      location.name,
                      location.country,
                    )
                  }
                >
                  <div className="line-clamp-3">{location.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {showInput && (
        <div className="absolute left-0 top-0 z-10 h-dvh w-full bg-black opacity-40" />
      )}
    </>
  );
});
