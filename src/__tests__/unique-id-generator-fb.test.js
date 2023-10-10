const {createUniqueID} = require('../unique-id-generator-fb');

// Define the unit test for the createUniqueID constructor function
describe("createUniqueID", function() {
  it("should create a unique ID", () => {
    const firstUID = createUniqueID()
    const secondUID = createUniqueID()
    const thirdUID = createUniqueID()

    expect(firstUID).not.toBe(secondUID);
    expect(secondUID).not.toBe(thirdUID);
  });
});
