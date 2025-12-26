import { FC } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Login.css";
import pontes from "../../assets/img/pontes.png";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div className="Login">
      <Container fluid>
        <Row>
          <Col md={9} className="px-0">
            <div className="img-background"></div>
          </Col>
          <Col md={3}>
            <div className="d-flex flex-column justify-content-center align-items-center p-3 h-100">
              <div>
                <div className="tex-center">
                  <img src={pontes} alt="logo" className="logo" />
                  <h2 className="text-center mt-5">Chef Menu Digital</h2>

                  <div className="d-flex flex-column mt-1 text-center">
                    <span>Informe seu login e senha para entrar</span>
                  </div>
                </div>

                <form>
                  <div className="mb-3 mt-5">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Login"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Senha"
                    />
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                    <label className="form-check-label">Lembrar-me</label>
                  </div>
                  <Link
                    type="button"
                    to={"/"}
                    className="w-100 mt-5 btn btn-primary"
                  >
                    Entrar
                  </Link>
                </form>

                <div className="mt-5 d-flex flex-column text-center">
                  <span className="mt-5">Pontes Tecnologia</span>
                  <span>Todos os direitos reservados</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
