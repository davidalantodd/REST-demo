const app = require('./src/app')
const request = require('supertest')

describe('basic express server test', () => {
    it("make a GET request - jest style", async () => {
        const response = await request(app).get("/data");
        expect(response.ok).toBe(true);
        expect(response.type).toBe("application/json");
        expect(response.body.method).toBe("GET");
        expect(response.body.str).toBe("Hello, World!");
        expect(response.body.num).toBeGreaterThanOrEqual(0);
        expect(response.body.num).toBeLessThan(1);
    })

    it("should call the / function directly", () => {
        const req = { method: 'GET', url: '/' };
        const res = {
            statusCode: 0,
            headers: {},
            body: '',
            setHeader: function (name, value) {
                this.headers[name] = value;
            },
            end: function (chunk) {
                this.body = chunk;
            }
        };

        app(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.headers['Content-Type']).toBe('text/html; charset=utf-8');
        expect(res.body).toBe('This a GET request from the browser.');
    });
    
})
