import {useEffect, useState} from 'react';

function useTheme(initialTheme){
    const [theme, setTheme] = useState(initialTheme);
    useEffect(() => {
        if(theme === 'normal'){
            document.body.className = 'normal';
        }
        else{
            document.body.className = 'fancy';
        }
    }, [theme]);

    return [theme, setTheme];
}

export default useTheme;