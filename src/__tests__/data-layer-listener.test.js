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
    const m1DataLayer = new TealiumArray([]);

    m1DataLayer.push(1);
    m1DataLayer.push(2);
    m1DataLayer.push(3);

    expect(m1DataLayer.length).toBe(3);
    expect(JSON.stringify(m1DataLayer)).toBe(JSON.stringify([1,2,3]));
  });

  it("should execute call on utag for generic functions", () => {
    jest.clearAllMocks();
    const m1DataLayer = new TealiumArray([]);
    const event = {
      event: 'click',
      data: 1
    }
    m1DataLayer.push(event);
    expect(m1DataLayer.length).toBe(1);
    expect(utag.link).toHaveBeenCalledWith(event);
  });

  it("should execute call on utag for page view functions", () => {
    jest.clearAllMocks();
    const m1DataLayer = new TealiumArray([]);
    const event = {
      event: 'Pageview',
      data: 1
    }
    m1DataLayer.push(event);
    expect(m1DataLayer.length).toBe(1);
    expect(utag.view).toHaveBeenCalledWith(event);
  });

  it("should execute call on utag for page view functions - when executed on SPA", () => {
    jest.clearAllMocks();
    const m1DataLayer = new TealiumArray([]);
    const event = {
      event: 'Pageview',
      data: 1
    }
    m1DataLayer.push(event);
    expect(m1DataLayer.length).toBe(1);
    expect(utag.view).toHaveBeenCalledWith(event);
  });
});
