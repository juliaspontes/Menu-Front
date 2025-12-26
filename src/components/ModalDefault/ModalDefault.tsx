import React, { FC } from "react";
import "./ModalDefault.css";
import { Col, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModalDefaultProps {
  title: string;
  show: boolean;
  sizeModal?: "sm" | "md" | "lg" | "xl" | "xxl";
  onClose?: any;
  icon?: IconProp;
  children: React.ReactNode;
  showFooter: boolean;
  textButtonClose?: string;
  textButtonAdd?: string;
  showCloseButton?: boolean;
  showAddButton?: boolean;
  handleSubmit?: () => void;
}

const ModalDefault: FC<ModalDefaultProps> = ({
  title,
  show,
  sizeModal = "xl",
  onClose,
  icon,
  children,
  showFooter = true,
  textButtonClose,
  textButtonAdd,
  showCloseButton = true,
  showAddButton = true,
  handleSubmit,
}) => {
  const handleOnClose = () => {
    !!onClose && onClose(false);
  };

  return (
    <div className="ModalDefault" data-testid="ModalDefault">
      <Modal
        show={show}
        onHide={handleOnClose}
        size={sizeModal !== "xxl" && sizeModal !== "md" ? sizeModal : undefined}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {icon ? <FontAwesomeIcon icon={icon} /> : null}
            <span className="mx-2">{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <Row>
              <Col md={12}>
                <div className="d-flex align-items-center justify-content-end">
                  {showCloseButton && (
                    <button
                      className="btn btn-label-info me-2"
                      onClick={handleOnClose}
                    >
                      {textButtonClose ? textButtonClose : "Fechar"}
                    </button>
                  )}

                  {showAddButton && (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      {textButtonAdd ? textButtonAdd : "Salvar"}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default ModalDefault;
