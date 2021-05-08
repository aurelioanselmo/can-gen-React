import React from 'react'
import '../../App.css';
import '../Modal.css';
import Footer from '../Footer';
import Modal from '../Modal';
import Close from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import templates from '../../templates.json';


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
    <div className={`email-templates`}>
      { templates.map((e, i) => {
        return (<div key={`template${i}`}>
          <button className={templates[modalIndex].cssClass} onClick={() => openModal(i)}>{templates[i].title}</button>
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
        <div className='top-head'>
          <h1>{title}</h1>
          <button onClick={() => modalRef.current.close()}>
          <Close />
          </button>
        </div>
        <p>
          <textarea id='template' value={body} readOnly></textarea>
        </p>
        <button className='copy-text' onClick={copyText}>
          <FileCopyOutlinedIcon />
        </button>
        {copied && <span id='copied'>copied text</span>}
      </Modal>
      <>
        <Footer />
      </>
    </div>
  );
}

export default Emails;