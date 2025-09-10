import {useState} from 'react'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import './index.css'

const MemoryMatrixRulesPopUp = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (
    <div>
      <button type="button" className="trigger-button" onClick={openModal}>
        RULES
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Memory Matrix Rules"
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        aria={{
          modal: true,
          labelledby: 'rules-heading-popup',
        }}
      >
        <button
          type="button"
          className="cross-icon"
          data-testid="close"
          onClick={closeModal}
          aria-label="Close Rules"
        >
          <CgClose size={24} />
        </button>

        <h1 id="rules-heading-popup" className="rules-heading-popup">
          Rules
        </h1>

        <ul className="rules-list-popup">
          <li className="memory-matrix-rule-item-popup">
            In each level, the grid size starts from 3x3. The grid will
            highlight N cells randomly.
          </li>
          <li className="memory-matrix-rule-item-popup">
            The highlighted cells remain visible for N seconds for memorization.
            No actions allowed during this time.
          </li>
          <li className="memory-matrix-rule-item-popup">
            After N seconds, the highlighted cells disappear.
          </li>
          <li className="memory-matrix-rule-item-popup">
            Click the cells you remember. Correct cells turn blue, incorrect
            cells turn red.
          </li>
          <li className="memory-matrix-rule-item-popup">
            Complete all N highlighted cells correctly to advance to the next
            level.
          </li>
          <li className="memory-matrix-rule-item-popup">
            Clicking a wrong cell or completing all levels takes you to the
            results page.
          </li>
        </ul>
      </Modal>
    </div>
  )
}

export default MemoryMatrixRulesPopUp
