import { Fragment , useRef , useState,useEffect} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Itodo } from '../interfacess';


type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  saveTodo: (newTodo: Itodo) => void;
  editingTodo: Itodo | null;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  saveTodo,
  editingTodo 
}) => {
  const textInput = useRef<HTMLTextAreaElement>(null);
  const [currentBody, setCurrentBody] = useState('');
  const handleSave = () => {
    if (textInput.current && textInput.current.value) {
      saveTodo({
        id: editingTodo?.id || 0, // Provide a default value for id if it is undefined
        body: textInput.current.value,
      });
      closeModal();
    }
  };

  useEffect(() => {
    if (editingTodo) {
      setCurrentBody(editingTodo.body);
    }
  }, [editingTodo]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Edit Todo Text
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      ref={textInput}
                      className="shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={currentBody}
                  onChange={(e) => setCurrentBody(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
