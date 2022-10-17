import { app } from "../app";
import request from "supertest"
import { Parser } from "../utils/Parser"
import 'jest-date'

//The QA team don't know what they are doing. Somebody help them. - From: Devs
describe("Cookies Security Tests - Integration",()=>{
    it.only("Cookie Security - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.httpOnly).toBe(true)
       
    });

    it("Cookie Security - Test 2", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.secure).toBe(true)
       
    });

    it("Cookie Security - Test 3", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.sameSite).toBe("Strict")
       
    });

    it("Cookie Security - Test 4", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.path).toBe("localhost/")
       
    });

    it("Cookie Security - Test 5", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        var date = new Date(Date.now());

        date.setHours(date.getHours() + 1)  

        expect(cookieParsed.CookieSession.expires).toBeSameMinuteAs(date)
       
    });

    it("Cookie Security - Test 6", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        const userDecoded = JSON.parse(Buffer.from(cookieParsed.CookieSession.value, 'base64').toString('utf-8'))
    
        expect(userDecoded).toStrictEqual({
            "id": 1,
            "name":"Roberto",
            "email":"roberto@industria.com",
            "token": 87645123
        })
    });


})

describe("Broken Authentication Tests - Integration",()=>{
	

    it("Broken Authentication - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body

        expect(user).toStrictEqual({
            "id": 1,
            "name":"Roberto",
            "email":"roberto@industria.com",
            "token": 87645123
        })

    });

    it("Broken Authentication - Test 2", async () => {

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"12345"})
        
        const user = response.body
        const status = response.status

        expect(user).toBe("Não foi possível fazer login...")
        expect(status).toBeGreaterThanOrEqual(400);

    });

    
});


describe("IDOR and SQLi Tests- Integration",()=>{

    it("SQL Injection - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com2' OR id=2 --", "pass":"1234"})
        
        const user = response.body

        expect(user).toBe("Não foi possível fazer login...")
        expect(response.status).toBeGreaterThanOrEqual(400);
    });


});

