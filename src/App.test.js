import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import App from './App';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Header component", () => {
  it("matches the snapshot component", () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("says Github Manager", () => {
    const wrapper = mount(<App />)
    const text = wrapper.find(".header-title").text()
    expect(text).toEqual("Github Manager")
  })
})
