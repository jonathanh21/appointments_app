import React from 'react';

interface CancelationModalProps {
  isOpen: boolean;
  paciente:string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const CancelationModal: React.FC<CancelationModalProps> = ({paciente, isOpen, onCancel, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cancelar cita</h2>
            <p>¿Estás seguro de que deseas cancelar la cita de {paciente}?</p>
            <div className="modal-buttons">
              <button onClick={onCancel}>Cancelar</button>
              <button onClick={onConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
