// import TealiumArray from "../extensions/data-layer-listener";
const TealiumArray = require('../extensions/data-layer-listener');

const mockDataLayer = jest.fn().mockImplementation(() => {
  return {
    push: jest.fn(),
    pop: jest.fn(),
  }
});

const utag = {
  view: jest.fn(),
  link: jest.fn(),
};

global.utag = utag;

// Define the unit test for the CustomArray constructor function
describe("TealiumArray", function() {
  it("should have store valuse in arrau", () => {
    const mockDataLayer = new TealiumArray([]);

    mockDataLayer.push(1);
    mockDataLayer.push(2);
    mockDataLayer.push(3);

    expect(mockDataLayer.length).toBe(3);
    expect(JSON.stringify(mockDataLayer)).toBe(JSON.stringify([1,2,3]));
  });

  it("should execute call on utag for generic functions", () => {
    jest.clearAllMocks();
    const mockDataLayer = new TealiumArray([]);
    const event = {
      event: 'click',
      data: 1
    }
    mockDataLayer.push(event);
    expect(mockDataLayer.length).toBe(1);
    expect(utag.link).toHaveBeenCalledWith(event);
  });

  it("should execute call on utag for page view functions", () => {
    jest.clearAllMocks();
    const mockDataLayer = new TealiumArray([]);
    const event = {
      event: 'Pageview',
      data: 1
    }
    mockDataLayer.push(event);
    expect(mockDataLayer.length).toBe(1);
    expect(utag.view).toHaveBeenCalledWith(event);
  });

  it("should execute call on utag for page view functions - when executed on SPA", () => {
    jest.clearAllMocks();
    const mockDataLayer = new TealiumArray([]);
    const event = {
      event: 'Pageview',
      data: 1
    }
    mockDataLayer.push(event);
    expect(mockDataLayer.length).toBe(1);
    expect(utag.view).toHaveBeenCalledWith(event);
  });
});
