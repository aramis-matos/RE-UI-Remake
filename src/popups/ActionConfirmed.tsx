import React from "react";

function ActionConfirmed(
  props: Readonly<{
    message: string;
    isError: boolean;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  }>
) {
  const closeModal = () => {
    const modal = document.getElementById("actionConfirmed");
    modal!.style.display = "none";
    props.setIsError(false);
  };
  return (
    <div id="actionConfirmed" className="modal">
      <button
        data-testid="srm-close"
        onClick={closeModal}
        className="modalBack"
      />
      <div id="modalContent" className="modal_content">
        {props.isError && <h2>Warning</h2>}
        {!props.isError && <h2>Notice</h2>}
        <h4>{props.message}</h4>
        {props.isError && <button onClick={closeModal}>Close</button>}
      </div>
    </div>
  );
}

export default ActionConfirmed;
