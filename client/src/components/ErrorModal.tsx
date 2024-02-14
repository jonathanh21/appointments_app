import React from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  message:string;
  onConfirm: () => void;
  title?:string
}

export const ErrorModal: React.FC<ErrorModalProps> = ({message, isOpen, onConfirm, title }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{title || 'Error'}</h2>
            <p>{message}</p>
            <div className="modal-buttons">
              <button onClick={onConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};