import { render } from "@testing-library/react";
import Home from "../pages/index";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Calculation Tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  test("Check final price", () => {
    expect(wrapper.find("#final-price").text()).toContain("$0.00");
  });
});
