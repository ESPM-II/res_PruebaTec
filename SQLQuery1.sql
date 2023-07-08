CREATE DATABASE PruebaAutos;

USE PruebaAutos;

CREATE TABLE Vendedor
(
    ID INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(50)
);

CREATE TABLE MarcaAuto
(
    ID INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(50)
);

CREATE TABLE ModeloAuto
(
    ID INT IDENTITY PRIMARY KEY,
    MarcaID INT FOREIGN KEY REFERENCES MarcaAuto(ID),
    Nombre NVARCHAR(50),
    Precio MONEY
);

CREATE TABLE Pedido
(
    ID INT IDENTITY PRIMARY KEY,
    Fecha DATETIME,
    ModeloID INT FOREIGN KEY REFERENCES ModeloAuto(ID),
    VendedorID INT FOREIGN KEY REFERENCES Vendedor(ID)
);

CREATE PROCEDURE TopMarcasSolicitadas AS
BEGIN
    SELECT TOP 3 MA.Nombre, COUNT(*) AS CantidadSolicitudes
    FROM Pedido P
    JOIN ModeloAuto MA ON P.ModeloID = MA.ID
    GROUP BY MA.Nombre
    ORDER BY CantidadSolicitudes DESC;
END;

CREATE PROCEDURE SolicitudesMesActual AS
BEGIN
    SELECT *
    FROM Pedido
    WHERE MONTH(Fecha) = MONTH(GETDATE()) AND YEAR(Fecha) = YEAR(GETDATE());
END;

CREATE PROCEDURE VendedorMenosSolicitudes AS
BEGIN
    SELECT TOP 1 V.Nombre, COUNT(*) AS CantidadSolicitudes
    FROM Pedido P
    JOIN Vendedor V ON P.VendedorID = V.ID
    WHERE P.Fecha >= DATEADD(day, -30, GETDATE())
    GROUP BY V.Nombre
    ORDER BY CantidadSolicitudes;
END;

CREATE PROCEDURE ModelosSinSolicitudes AS
BEGIN
    SELECT M.Nombre
    FROM ModeloAuto M
    LEFT JOIN Pedido P ON M.ID = P.ModeloID
    WHERE P.ID IS NULL;
END;

CREATE PROCEDURE TopMesesVentas AS
BEGIN
    SELECT TOP 3 
        FORMAT(P.Fecha, 'MMMM yyyy') AS Mes, 
        SUM(M.Precio) AS TotalVentas
    FROM Pedido P
    JOIN ModeloAuto M ON P.ModeloID = M.ID
    GROUP BY FORMAT(P.Fecha, 'MMMM yyyy')
    ORDER BY TotalVentas DESC;
END;
