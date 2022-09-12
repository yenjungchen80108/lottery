import { useRef, useEffect } from 'react';

export function useInterval(func, delay) {
    const saveCallback = useRef();

    // save new callback to ref after re-render each time
    useEffect(() => {
        saveCallback.current = func;
    }, [func]);

    useEffect(() => {
        function tick() {
            saveCallback.current();
        }
        // check if set delay ot not, add tick() into setInterval
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },[delay])
}