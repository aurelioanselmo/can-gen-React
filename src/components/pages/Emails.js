import React from 'react'
import '../../App.css';
import '../Modal.css';
import Modal from '../Modal';
import templates from '../../templates.json'


function Emails() {
  const [modalContent, setModalContent] = React.useState(0);
  const modalRef = React.useRef();

  const openModal = (i) => {
    setModalContent(i)
    modalRef.current.openModal()
  };

  return (
    <div className="email-templates">
      { templates.map((e, i) => {
        return (<div key={`template${i}`}>
          <button onClick={() => openModal(i)}>{templates[i].title}</button>
        </div>)
      })
      }
      <Modal ref={modalRef}>
        <h1>{templates[modalContent].title}</h1>
        <p>
          <span>{templates[modalContent].body}</span>
        </p>
        <button onClick={() => modalRef.current.close()}>
          Close Modal
          </button>
      </Modal>
    </div>
  );
}

export default Emails;