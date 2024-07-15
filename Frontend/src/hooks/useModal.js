import React, { useState, useEffect } from "react";


const useModal = (togglePopup, actionConfirmedMessage) => {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (actionConfirmedMessage) {
            const modal = document.getElementById("actionConfirmed");
            modal.style.display = "flex";
            !isError && setTimeout(() => {
                modal.style.display = "none";
            }, 2000);
        }
    }, [togglePopup]);

    return { isError, setIsError };
}

export default useModal;