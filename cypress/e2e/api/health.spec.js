import HealthEndPoint from "../../endpoints/health-end-point";


let healthEndPoint = new HealthEndPoint();


describe("Notes Health API", () => {
    it("Verify Status Code", () => {
        healthEndPoint.verifySuccessStatusCode()
    })

    it("Verify 'message' and 'success' property and it's valid Values", () => {
        healthEndPoint.verifyPresenceOfPropertyAndItsValue('message', 'Notes API is Running')
        healthEndPoint.verifyPresenceOfPropertyAndItsValue('success', true)
    })

    it("Verify JSON Schema of Response ", () => {
        healthEndPoint.verifyJSONResponseSchema()
    })
})