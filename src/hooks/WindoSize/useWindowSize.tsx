import {useEffect, useState} from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSize = () =>{
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);

        return () => { window.removeEventListener('resize', handleWindowSize); };
    },['resize']);

    return width;
};