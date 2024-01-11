import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';

interface WarningModalProps {
show:boolean;
  title: string;
  body: string;
  handleClose: () => void;
}

const WarningModal: FC<WarningModalProps> = ({ show=false, title="Opps", body="Something went wrong!", handleClose=()=>{} }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModal;
