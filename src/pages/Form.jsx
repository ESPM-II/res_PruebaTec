// - INIT IMPORTE HOOKS, LIBRERIAS -
import { useState } from "react";
import styled from "styled-components";
import image from "../assets/header.png";
// - END IMPORTE HOOKS, LIBRERIAS -

// - INIT OBJETO CON LAS MARCAS Y MODELOS DE LOS VEHICULOS -
const carData = [
  { brand: "Audi", models: ["AS", "A4"] },
  { brand: "BMW", models: ["X3", "X5"] },
  { brand: "MERCEDES", models: ["CA", "CC"] },
  { brand: "TOYOTA", models: ["COROLLA", "CAMRY"] },
  { brand: "HONDA", models: ["CIVIC", "ACCORD"] },
];
// - END OBJETO CON LAS MARCAS Y MODELOS DE LOS VEHICULOS -

// - INIT ESTILOS DE COMPONENTES -
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Title = styled.h1`
  font-weight: normal;
  font-size: 50px;
  margin-right: 200px;
  color: blue;
`;
const Bold = styled.span`
  font-weight: bold;
  color: blue;
`;
const Image = styled.img`
  height: 300px;
  width: 350px;
`;
const StyledHr = styled.hr`
  width: 98%;
  color: #000;
  background-color: #000;
  height: 1px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 850px;
`;
const Subtitle = styled.h2`
  text-align: left;
`;
const NormalText = styled.p`
  text-align: left;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  width: 800px;
  margin-top: 20px;
`;
const FormLabel = styled.label`
  position: relative;
  display: block;
  margin-bottom: 0.5rem;
  color: blue;
  width: ${(props) => props.width || "48%"}; // Ancho personalizado
`;
const FormInput = styled.input`
  display: block;
  width: 100%;
  height: 80;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px solid blue;
  border-radius: 0.25rem;
  margin-bottom: 25px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
const FormLabelSpan = styled.span`
  position: absolute;
  top: -0.6em;
  left: 0.75rem;
  color: blue;
  background: #fff;
  padding: 0 5px;
`;
const Asterisk = styled.span`
  color: red;
`;
const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 85%;
  &:hover {
    background-color: lightblue;
  }
`;
// - END ESTILOS DE COMPONENTES -

export const Form = () => {
  // - INIT ESTADOS -
  const [fullName, setFullName] = useState("");
  const [rut, setRut] = useState("");
  const [patente, setPatente] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [price, setPrice] = useState("");
  // - END ESTADOS -

  // - INIT FUNCIONES DE MANEJO DE INPUTS
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleRutChange = (event) => {
    setRut(event.target.value);
  };
  const handlePatenteChange = (event) => {
    setPatente(event.target.value);
  };
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel("");
  };
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  // - END FUNCIONES DE MANEJO DE INPUTS -

  // - INIT OBTENER MODELOS DE LA MARCA SELECCIONADA -
  const getModels = () => {
    if (!selectedBrand) return [];
    const brand = carData.find((b) => b.brand === selectedBrand);
    return brand ? brand.models : [];
  };
  // - END OBTENER MODELOS DE LA MARCA SELECCIONADA -

  // - INIT ENVIO DE FORMULARIO -
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      let previousForms = JSON.parse(localStorage.getItem("formData")) || [];
      previousForms.push({
        fullName,
        rut,
        patente,
        selectedBrand,
        selectedModel,
        price,
      });
      localStorage.setItem("formData", JSON.stringify(previousForms));
      alert("Formulario enviado con éxito");
      resetForm(); // Llamamos a la función de reset después de un envío exitoso
    }
  };
  // - END ENVIO DE FORMULARIOS -

  // - INIT VALIDA RUT -
  const validateRut = (rut) => {
    var body = rut.slice(0, -2);
    var dv = rut.slice(-1);
    var total = 0;
    var factor = 2;
    for (var i = body.length - 1; i >= 0; i--) {
      total += body.charAt(i) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    var expectedDv = 11 - (total % 11);
    if (expectedDv === 11) {
      expectedDv = "0";
    } else if (expectedDv === 10) {
      expectedDv = "k";
    } else {
      expectedDv = String(expectedDv);
    }
    return dv === expectedDv;
  };
  // - END VALIDA RUT -

  // - INIT VALIDA FORMULARIO -
  const validateForm = () => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 4) {
      alert("Debe ingresar sus dos nombres y sus dos apellidos");
      return false;
    }

    if (!validateRut(rut)) {
      alert("Debe ingresar un RUT válido");
      return false;
    }

    const patenteRegex = /^[A-Z]{4}\d{2}$/;
    if (!patenteRegex.test(patente)) {
      alert("Debe ingresar una patente válida");
      return false;
    }

    if (selectedBrand === "") {
      alert("Debe seleccionar una marca de vehículo");
      return false;
    }

    if (selectedModel === "") {
      alert("Debe seleccionar un modelo de vehículo");
      return false;
    }

    if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
      alert("Debe ingresar un precio válido");
      return false;
    }
    // ** DEBO REVISAR ESTO AL FINAL
    return true;
  };
  // - END VALIDA FORMULARIO -

  // - INIT RESET FORMULARIO -
  const resetForm = () => {
    setFullName("");
    setRut("");
    setPatente("");
    setSelectedBrand("");
    setSelectedModel("");
    setPrice("");
  };
  // - END RESET FORMULARIO -

  return (
    <Layout>
      <HeaderContainer>
        <Title>
          Formulario <Bold>de Prueba</Bold>
        </Title>
        <Image src={image} alt="Imagen de Prueba" />
      </HeaderContainer>
      <StyledHr />
      <ContentContainer>
        <Subtitle>Nuevo Formulario</Subtitle>
        <NormalText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since.
        </NormalText>
        <h3>Datos del vendedor:</h3>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormLabel width="95%">
              {" "}
              <FormLabelSpan>
                Nombre completo<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                placeholder="PrimerNombre SegundoNombre PrimerApellido SegundoApellido"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </FormLabel>
            <FormLabel width="60%">
              {" "}
              <FormLabelSpan>
                RUT vendedor<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                placeholder="Rut formato: 00000000-0"
                type="text"
                value={rut}
                onChange={handleRutChange}
                required
              />
            </FormLabel>
          </FormContainer>
          <StyledHr />
          <Subtitle>Datos del vehículo:</Subtitle>
          <FormContainer>
            <FormLabel width="30%">
              {" "}
              <FormLabelSpan>
                Patente del vehículo<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                placeholder="Formato chile, 4 letras 2 dígitos"
                type="text"
                value={patente}
                onChange={handlePatenteChange}
                required
              />
            </FormLabel>
            <FormLabel width="30%">
              <FormLabelSpan>
                Marca del vehículo<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                as="select"
                value={selectedBrand}
                onChange={handleBrandChange}
                required
              >
                <option value="">Seleccione una marca</option>
                {carData.map((brand, index) => (
                  <option key={index} value={brand.brand}>
                    {brand.brand}
                  </option>
                ))}
              </FormInput>
            </FormLabel>
            <FormLabel width="30%">
              <FormLabelSpan>
                Modelo del vehículo<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                as="select"
                value={selectedModel}
                onChange={handleModelChange}
                required
              >
                <option value="">Seleccione un modelo</option>
                {getModels().map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </FormInput>
            </FormLabel>
          </FormContainer>
          <FormContainer>
            <FormLabel width="30%">
              {" "}
              <FormLabelSpan>
                Precio del Vehículo<Asterisk>*</Asterisk>
              </FormLabelSpan>
              <FormInput
                type="text"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </FormLabel>
          </FormContainer>
          <StyledHr />
          <StyledButton type="submit">Enviar</StyledButton>
        </form>
      </ContentContainer>
    </Layout>
  );
};
