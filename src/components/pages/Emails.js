import React from 'react'
import '../../App.css';
import '../Modal.css';
import Modal from '../Modal';
import templates from '../../templates.json'


function Emails() {
  const [modalIndex, setModalIndex] = React.useState(0);
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [copied, setCopied] = React.useState();
  const modalRef = React.useRef();

  const openModal = (i) => {
    setModalIndex(i)
    setBody(templates[i].body)
    setTitle(templates[i].title)
    modalRef.current.openModal()
  };

  const copyText = () => {
    const copyText = document.getElementById("template");
    copyText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleVar = (event, variable) => {
    const regex = new RegExp(`--${variable}--`, 'g');
    const updatedBody = body.replace(regex, event.target.value)
    const updatedTitle = title.replace(regex, event.target.value)
    setBody(updatedBody)
    setTitle(updatedTitle)
  }

  const maybeReset = (e) => {
    if (!e.target.value){return}
    setBody(templates[modalIndex].body)
    setTitle(templates[modalIndex].title)
    console.log(body)
    const varInputs = document.querySelectorAll('.var-input')
    varInputs.forEach((e,i) => {
      varInputs[i].value = ''
    })
  }

  return (
    <div className="email-templates">
      { templates.map((e, i) => {
        return (<div key={`template${i}`}>
          <button onClick={() => openModal(i)}>{templates[i].title}</button>
        </div>)
      })
      }
      <Modal ref={modalRef}>
        {templates[modalIndex].vars && templates[modalIndex].vars.map(each => {
          return (
            <input 
            key={each}
            className='var-input'
            placeholder={each}
            onFocus={maybeReset}
            onBlur={event => handleVar(event, each)}
            onKeyDown={event => event.key === 'Enter' && handleVar(event, each)}
            />
          )
        })}
        <h1 className={templates[modalIndex].cssClass}>{title}</h1>
        <p>
          <textarea id='template' value={body} readOnly></textarea>
        </p>
        <button onClick={() => modalRef.current.close()}>
          Close Modal
          </button>
        <button onClick={copyText}>
          Copy
          </button>
          {copied && <span id='copied'>copied text</span>}
      </Modal>
    </div>
  );
}

export default Emails;