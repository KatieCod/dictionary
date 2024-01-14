import React, { useContext, useState } from "react"

const Context = React.createContext()

export const ContextProvider = ({ children }) => {

    const initialState = {
        searchWord: '',
        globalFiltering: {
            themes: [],
            parts_of_speech: [],
            ratings: [],
        },
        addedWord: {
            lang2_alt: "",
            vocabulary: 1,
            update_time: "2023-12-10",
            top_rating_counter: 0,
            is_exception: 0
        },
        updateGlobalState: () => { },
    };

    const [globalState, setGlobalState] = useState(initialState)

    const updateGlobalState = (newState) => {
        setGlobalState((prevGlobalState) => ({
            ...prevGlobalState,
            ...newState,
        }));
    };


    return (
        <Context.Provider value={{ ...globalState, updateGlobalState }}>
            {children}
        </Context.Provider>
    )
}

export const useMyContext = () => {
    return useContext(Context);
};