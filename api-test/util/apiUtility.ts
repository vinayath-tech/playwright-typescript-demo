import Ajv from "ajv";
import { expect } from "@playwright/test";

const ajv = new Ajv();


export function validateJsonSchema(schema, body) {
    const validate = ajv.compile(schema);
    const valid = validate(body);
        
    if(valid) console.log(`${schema} is valid!`);
    else console.log(`Invalid : ${ajv.errorsText()}`);
    expect(valid).toBe(true);
}