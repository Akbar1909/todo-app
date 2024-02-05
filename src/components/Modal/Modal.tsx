import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  show?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

/**
 * Modal Component
 *
 * A customizable modal dialog component that renders its children within a modal overlay.
 * It supports conditional rendering based on the `show` prop and provides a callback for
 * modal close actions. The modal implements an effect to add an event listener for clicks
 * outside the modal content to trigger the `onClose` callback, allowing for user-friendly
 * interaction patterns. The component utilizes React portals to render the modal content
 * into a specific DOM node outside the regular DOM hierarchy, ensuring proper stacking
 * and accessibility.
 *
 * @component
 * @example
 * // Example usage of the Modal component
 * <Modal show={true} onClose={() => console.log('Modal closed')}>
 *   <p>Modal Content Here</p>
 * </Modal>
 *
 * @param {Object} props - Props for the Modal component
 * @param {boolean} [props.show=false] - Determines if the modal is visible.
 * @param {() => void} [props.onClose] - Callback function to be called when the modal is requested to be closed (e.g., clicking outside).
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {React.ReactPortal|null} A React Portal rendering the modal content if `show` is true, otherwise `null`.
 */

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && onClose) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="bg-gray-500 bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div ref={ref} className="bg-white px-10 py-4 rounded-3xl w-96 h-82">
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
