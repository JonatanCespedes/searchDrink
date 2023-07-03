import { Form, Row, Col, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCategories from "../../hooks/useCategories";
import useDrinks from "../../hooks/useDrinks";

const SearchForm = () => {
  const { categories } = useCategories();
  const { getDrink, loading } = useDrinks();

  const initialValues = {
    name: "",
    category: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Este campo es obligatorio"),
    category: Yup.string().required("Este campo es obligatorio"),
  });

  const handleSubmit = (values) => {
    getDrink(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          {formik.status && (
            <Alert variant="danger" className="text-center">
              {formik.status}
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Nombre Bebida</Form.Label>

                <Field
                  id="name"
                  type="text"
                  placeholder="Ej: Tequila, Vodka, etc"
                  name="name"
                  as={Form.Control}
                />
                <ErrorMessage
                  name="name"
                  component={Form.Text}
                  className="text-danger"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">Categoría Bebida</Form.Label>

                <Field
                  id="category"
                  name="category"
                  as={Form.Select}
                  placeholder="- Selecciona Categoria -"
                >
                  <option disabled>- Selecciona Categoria -</option>
                  {categories.map((category) => (
                    <option
                      key={category.strCategory}
                      value={category.strCategory}
                    >
                      {category.strCategory}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component={Form.Text}
                  className="text-danger"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col md={3}>
              <button
                className="btn btn-danger text-uppercase w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar Bebidas"}
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
