import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header } from '../widgets/Header';
import { Weather } from '../widgets/Weather';
import { useRootStore } from '../shared/stores';

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

export const App = observer(() => {
  const { coreStore } = useRootStore();

  React.useEffect(() => {
    if (detectMob()) {
      coreStore.setIsMobile(true);
    } else {
      window.onresize = (e) => {
        if ((e.currentTarget as Window).innerWidth <= 800) {
          coreStore.setIsMobile(true);
        } else {
          coreStore.setIsMobile(false);
        }
      };

      if (window.innerWidth <= 800) {
        coreStore.setIsMobile(true);
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
