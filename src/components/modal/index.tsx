import { XIcon } from 'lucide-react';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible bg-black/30' : 'invisible'}`}>
      <div className={` bg-white rounded-lg p-4 shadow-lg ${open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'} transform transition-all duration-300`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <XIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;