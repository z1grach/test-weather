import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../shared/stores';

export const SwipeDelete = observer(
  ({ children, id }: { children: React.ReactNode; id: string }) => {
    const { coreStore } = useRootStore();
    const [left, setLeft] = React.useState(0);
    const isSwiping = React.useRef(false);
    const startX = React.useRef<number | null>(null);
    const diffX = React.useRef(0);
    const offsetWidth = React.useRef(0);

    const handleUp = () => {
      if (!isSwiping.current || startX.current === null) return;

      const itemWidth = offsetWidth.current;

      const swipePercentage = Math.min(
        Math.max((diffX.current / itemWidth) * 100, 0),
        100,
      );

      if (swipePercentage > 30) {
        diffX.current = offsetWidth.current + 100;
        coreStore.deleteSavedLocation(id);
      } else {
        diffX.current = 0;
      }

      setLeft(diffX.current);

      isSwiping.current = false;
      startX.current = null;

      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('mouseup', handleUp);
    };

    const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (isSwiping.current) return;

      offsetWidth.current = (e.currentTarget as HTMLElement).offsetWidth;

      let event;
      if (e.type.search('touch') === 0) {
        // eslint-disable-next-line prefer-destructuring
        event = (e as React.TouchEvent).touches[0];
      } else {
        event = e;
      }

      startX.current = (event as React.MouseEvent).clientX;
      isSwiping.current = true;

      document.addEventListener('touchend', handleUp);
      document.addEventListener('mouseup', handleUp);
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isSwiping.current || startX.current === null) return;

      let event;
      if (e.type.search('touch') === 0) {
        // eslint-disable-next-line prefer-destructuring
        event = (e as React.TouchEvent).touches[0];
      } else {
        event = e;
      }

      const currentX = (event as React.MouseEvent).clientX;

      diffX.current = currentX - startX.current;
      setLeft(diffX.current);
    };

    return (
      <div
        className="flex size-full select-none flex-nowrap items-center justify-between overflow-hidden rounded-md bg-white p-4 shadow-md"
        style={{
          transform: `translateX(${left >= 0 ? left : 0}px)`,
        }}
        onMouseDown={handleDown}
        onTouchStart={handleDown}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseLeave={handleUp}
        onTouchCancel={handleUp}
        onMouseUp={handleUp}
        onTouchEnd={handleUp}
      >
        {children}
      </div>
    );
  },
);
