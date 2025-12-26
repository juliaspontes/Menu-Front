import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface PagebaseProps {
  title: string;
  descriptionPage?: string;
  children: React.ReactNode;
  showButtonAdd?: boolean;
  showButtonFilter?: boolean;
  handleInsert?: any;
  handleFilter?: any;
}

const Pagebase: FC<PagebaseProps> = ({
  title,
  descriptionPage,
  children,
  showButtonAdd,
  showButtonFilter,
  handleInsert,
  handleFilter,
}) => {
  return (
    <div className="Pagebase">
      <Card>
        <Card.Body>
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
              <h3 className="fw-bold mb-1">{title}</h3>
              {descriptionPage && (
                <h6 className="op-7 mb-3">{descriptionPage}</h6>
              )}
            </div>
            <div className="ms-md-auto py-2 py-md-0">
              {handleInsert && showButtonAdd && (
                <button onClick={handleInsert} className="btn btn-primary me-2">
                  Adicionar
                </button>
              )}
              {handleFilter && showButtonFilter && (
                <button onClick={handleFilter} className="btn btn-label-info">
                  Filtro
                </button>
              )}
            </div>
          </div>
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pagebase;
