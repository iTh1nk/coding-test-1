import { cleanup, render } from "@testing-library/react";
import Home from "../pages/index";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import data from "../lib/data.json";

configure({ adapter: new Adapter() });

describe("Calculation Tests", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("Check initial value is 0", () => {
    // console.log(data);
    expect(wrapper.find("#final-price").text()).toContain("0.00");
  });

  it("Check if all inputs exist", () => {
    expect(wrapper.find("#recipient-associate").text()).toBe("");
    expect(wrapper.find("#recipient-diamond").text()).toBe("");
    expect(wrapper.find("#amount-kone").text()).toBe("");
    expect(wrapper.find("#amount-cartridge").text()).toBe("");
  });

  it("Test sets", () => {
    // pseudo code:
    // Need to find a way to set all inputs values includes recipient, kone, and cartridge
    // then call onClick function on Calculate button
    // All test data is from data.json file under lib directory
    // Thinking to use for loop to iterate all data from json file
    // or separate them to different tests;

    // wrapper.find("#btn-calculate").simulate("click");
    // expect(wrapper.find("#final-price").text()).toContain("");
  });
});
