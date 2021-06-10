import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ItemDetails = (props) => {
    const {
        name,
        price,
        imageUrl
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>Button Label</Button>
            <Modal isOpen={modal} toggle={toggle} className='item-details'>
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                     <div className='row'>
                         <div className='col-lg-6 col-sm-12'>
                             <img src={`${imageUrl}`}/>
                         </div>
                         <div className='col-lg-6 col-sm-12'>
                             Product Details
                         </div>
                     </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Add To Cart</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ItemDetails;