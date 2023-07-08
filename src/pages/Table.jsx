import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const Container = styled.div`
  margin: 0 auto;
  max-width: 80%;
`;

const Subtitle = styled.h2`
  text-align: center;
`;

const NormalText = styled.p`
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border: none;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover{
    color: blue;
  }
`;

const TotalText = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const DataTable = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("formData")) || []);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("formData")) || []);
  }, []);

  const displayedData = data.slice(0, 10);

 const handleDelete = (index) => {
    let newData = [...data];
    newData.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(newData));
    setData(newData);
  };

  return (
    <Container>
      <Subtitle>Lista Formulario</Subtitle>
      <NormalText>
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the bed industry standard dummy text ever
        since.
      </NormalText>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Rut Vendedor</TableHeader>
            <TableHeader>Patente vehiculo</TableHeader>
            <TableHeader>Marca vehiculo</TableHeader>
            <TableHeader>Modelo vehículo</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <TableRow key={index}>
              <td>{item.fullName}</td>
              <td>{item.rut}</td>
              <td>{item.patente}</td>
              <td>{item.selectedBrand}</td>
              <td>{item.selectedModel}</td>
              <td>{item.price}</td>
              <td>
                <Button onClick={() => handleDelete(index)}>
                  <RiDeleteBinLine size={25}/>
                </Button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <TotalText>
        Mostrando registros del 1 al {displayedData.length} de un total de{" "}
        {data.length} registros.
      </TotalText>
    </Container>
  );
};
