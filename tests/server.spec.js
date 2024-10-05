const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Devuelve un status 200 y un array de cafes", async () => {
        const response = await request(server).get("/cafes").send();
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("Devuelve un status 404 si el café no existe", async () => {
        const response = await request(server).delete("/cafes/111").set("Authorization", "token").send();
        expect(response.statusCode).toBe(404);
    });

    it("Devuelve un nuevo café y devolver un status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Café de prueba" };
        const response = await request(server).post("/cafes").send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });

    it("Devuelve un status 400 si el id en el parámetro no coincide con el id del payload", async () => {
        const cafeActualizado = { id: 3, nombre: "Café actualizado" };
        const response = await request(server).put("/cafes/2").send(cafeActualizado);
        expect(response.statusCode).toBe(400);
    });

});
