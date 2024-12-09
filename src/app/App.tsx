import React from 'react';
import { Header } from '../widgets/Header';
import { Weather } from '../widgets/Weather';
import { useAppDispatch } from '../shared/hooks';
import { setIsMobile } from '../shared/stores/mobileSlice';

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

export const App = React.memo(() => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (detectMob()) {
      dispatch(setIsMobile(true));
    } else {
      window.onresize = (e) => {
        if ((e.currentTarget as Window).innerWidth <= 800) {
          dispatch(setIsMobile(true));
        } else {
          dispatch(setIsMobile(false));
        }
      };

      if (window.innerWidth <= 800) {
        dispatch(setIsMobile(true));
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className="h-[calc(100dvh-120px)] overflow-auto">
        <Weather />
      </main>
    </>
  );
});
