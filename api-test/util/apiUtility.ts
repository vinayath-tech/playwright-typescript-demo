import Ajv from "ajv";
import { expect } from "@playwright/test";

const ajv = new Ajv();
let store = {};


export function validateJsonSchema(schema, body) {
    const validate = ajv.compile(schema);
    const valid = validate(body);
        
    if(valid) console.log(`Schema is valid!`);
    else console.log(`Invalid : ${ajv.errorsText()}`);
    expect(valid).toBe(true);
}

export function setVariable(key: any, data: any) {
    store[key] = data
}

export function getVariable(key: any) {
    return store[key];
}