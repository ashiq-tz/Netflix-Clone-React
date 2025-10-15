import React,{useState,createContext, useEffect} from "react";

export const ListContext = createContext()

export const ListProvider = ({children}) => {
    const [myWatchlist,setMyWatchlist] = useState(localStorage.getItem('myWatchlist')?JSON.parse(localStorage.getItem('myWatchlist')) : [])
    console.log('list context rendered');

    useEffect(() => {
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist));
      }, [myWatchlist]);

    return(
        <ListContext.Provider value={{myWatchlist,setMyWatchlist}}>
            {children}
        </ListContext.Provider>
    )

}